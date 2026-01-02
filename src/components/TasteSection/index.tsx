const tastes = [
  {
    name: "Nik Baker’s",
    location: "Connaught Place, New Delhi",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    bg: "bg-pink-100",
  },
  {
    name: "It’s Bake",
    location: "Connaught Place, New Delhi",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    bg: "bg-cyan-100",
  },
  {
    name: "Cakery",
    location: "Connaught Place, New Delhi",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    bg: "bg-orange-100",
  },
];

export default function TasteSection() {
  return (
    <div className="px-4 mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Your taste</h3>
        <span className="text-sm text-gray-400">see all →</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {tastes.map((item, index) => (
          <div
            key={index}
            className={`min-w-[160px] rounded-2xl ${item.bg} overflow-hidden`}
          >
            <img
              src={item.image}
              className="h-28 w-full object-cover"
            />
            <div className="p-3">
              <h4 className="text-sm font-semibold">
                {item.name}
              </h4>
              <p className="text-xs text-gray-500">
                {item.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
