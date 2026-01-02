import { useEffect, useState } from "react";

const banners = [
  {
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    title: "VEGGIE FRIENDLY\nEATERIES",
  },
  {
    img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    title: "HEALTHY\nMEALS",
  },
  {
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    title: "FRESH\nGREENS",
  },
];

export default function VeggieBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 mt-6">
      <div className="relative rounded-2xl overflow-hidden shadow h-40">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {banners.map((item, i) => (
            <div key={i} className="min-w-full relative">
              <img
                src={item.img}
                className="h-40 w-full object-cover"
                alt="banner"
              />

              <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-center">
                <h3 className="text-white text-lg font-bold whitespace-pre-line">
                  {item.title}
                </h3>

                <button className="mt-2 w-fit bg-green-600 text-white text-xs px-3 py-1 rounded-md">
                  TRY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition ${
              i === active ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
