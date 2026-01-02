import { useNavigate } from "react-router-dom";

type FoodCardProps = {
  id:string;
  image: string;
  name: string;
  address?: string | null;
};

export default function FoodCard({
    id,
  image,
  name,
  address,
}: FoodCardProps) {
    const navigate = useNavigate();
    const handleClick = () => {
    navigate(`/detail/${id}`, {
      state: {
        image,
        name,
        address,
      },
    });
  };
  return (
    <div
    onClick={handleClick}
    className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
      <img
        src={image}
        onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1578985545062-69928b1d9587";
        }}
        alt={name}
        className="w-24 h-24 rounded-xl object-cover shrink-0"
      />

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base font-semibold text-gray-800">
            {name}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2">
            {address == "null" ? "Location not available" : address}
          </p>

          <p className="text-sm text-orange-500 mt-1">
            🔥 4 Offers trending
          </p>
        </div>

        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <div>
            ⭐ 4.5
            <span className="block text-xs text-gray-400">
              Popularity
            </span>
          </div>

          <div className="text-right">
            ₹ 200
            <span className="block text-xs text-gray-400">
              Cost for two
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
