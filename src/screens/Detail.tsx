import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Detail() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { image, name, address } = state || {};

  const images = [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="pb-6">
      <div className="relative">
        <img
          src={images[active]}
          className="w-full object-cover
             h-[320px] sm:h-[420px] md:h-[520px] lg:h-[580px]"
        />



        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2"
        >
          <img
            src="/assets/Icons/back-arrow.svg"
            alt="Back"
            width={24}
            height={24}
          />
        </button>

        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {images.map((_, i) => (
            <span
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full ${active === i ? "bg-red-500" : "bg-white/70"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">{name}</h1>
            <p className="text-sm text-gray-500">{address == "null" ? "Location not available" : address}</p>
          </div>

          <div className="flex items-center gap-1 text-sm">
            ⭐ 4.5
          </div>
        </div>

        <p className="text-sm text-orange-500 mt-2">
          🔥 4 Offers Trending
        </p>

        <p className="text-sm text-gray-600 mt-4">
          Our delicate vanilla cake swirled with chocolate and
          filled with mocha chocolate chip cream and a layer of
          dark chocolate ganache.
        </p>
      </div>
    </div>
  );
}
