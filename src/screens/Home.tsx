import HomeHeader from "../components/HomeHeader";
import TasteSection from "../components/TasteSection";
import VeggieBanner from "../components/VeggieBanner";
import FoodList from "../components/FoodList";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
    const { data } = location.state || {};
    console.log(data,"data in home");
  return (
    <div className="min-h-screen bg-gray-100 pb-6">
      <HomeHeader data={data} />
      <TasteSection />
      <VeggieBanner />
      <FoodList />
    </div>
  );
}
