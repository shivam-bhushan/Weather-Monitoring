import { Cog } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-black text-white p-8 h-screen w-screen">
      <div className="grid grid-cols-12 gap-3 h-full w-full">
        {/* Cities Panel */}
        <div className="col-span-2 bg-[#212121] rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-4">Cities</h2>
          {/* Add city list here */}
        </div>

        {/* Main Content */}
        <div className="col-span-7 grid grid-rows-8 gap-3">
          {/* Map */}
          <div className="row-span-3 bg-[#212121] rounded-3xl p-6 w-full">
            <h2 className="text-3xl font-bold mb-4">Map</h2>
            {/* Add map component here */}
          </div>

          {/* Feels like sections */}
          <div className="row-span-2 grid grid-cols-2 gap-3 w-full">
            <div className="bg-[#212121] rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-2">Feels like</h2>
              {/* Add weather info here */}
            </div>
            <div className="bg-[#212121] rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-2">Feels like</h2>
              {/* Add weather info here */}
            </div>
          </div>

          {/* Summary */}
          <div className="row-span-3 bg-[#212121] rounded-3xl p-6 w-full">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            {/* Add summary content here */}
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="col-span-3 bg-[#212121] rounded-3xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Notifications</h2>
            <Cog className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Event</p>
            <p className="text-sm text-gray-400">Timestamp</p>
          </div>
          {/* Add more notification items here */}
        </div>
      </div>
    </div>
  );
}
