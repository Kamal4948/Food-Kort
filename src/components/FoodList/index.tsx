import { useEffect, useState } from "react";
import FoodCard from "../FoodCard";
import { fetchRestaurantsList } from "../../apis/login/login";
import { Restaurant } from "../../types/login";

export default function FoodList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetchRestaurantsList();

        setRestaurants(res.data.results);
      } catch (error) {
        console.error("Failed to fetch restaurants", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-400">
        Loading restaurants...
      </div>
    );
  }

  return (
  <div className="max-w-5xl mx-auto px-[30px] mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {restaurants?.map((item) => (
      <FoodCard
        key={item.restaurant_id}
        id={item.restaurant_id}
        image={item.logo}
        name={item.restaurant_name}
        address={item.address_complete}
      />
    ))}
  </div>
);

}
