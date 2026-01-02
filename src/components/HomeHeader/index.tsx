import { UserData } from "../../types/login";

interface HomeHeaderProps {
    data?: UserData;
}


export default function HomeHeader({ data }: HomeHeaderProps) {
    return (
        <div className="bg-white shadow-sm">
            <div className="px-4 py-3 border-b flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-400">Pre Order From</p>
                    <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                        Connaught Place
                        <span className="text-gray-400">📍</span>
                    </h2>
                </div>

                <img
                    src={data?.user_image || "https://images.unsplash.com/photo-1578985545062-69928b1d9587"}
                    alt="Logo"
                    className="h-8 w-8 object-contain"
                />
            </div>

            <div className="flex items-center justify-between p-4">
                <div className="bg-gray-50 rounded-2xl p-4 w-[60%]">
                    <h3 className="text-lg font-semibold text-gray-700">{data?.user_name}</h3>
                    <p className="text-sm text-gray-500">
                        Let’s explore this evening
                    </p>
                </div>

                <div className="flex gap-3">
                    <IconCard label="Offers" emoji="%" />
                    <IconCard label="Wallet" emoji="💳" />
                </div>
            </div>
        </div>
    );
}

function IconCard({ label, emoji }: { label: string; emoji: string }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white text-xl">
                {emoji}
            </div>
            <span className="text-xs text-gray-500">{label}</span>
        </div>
    );
}
