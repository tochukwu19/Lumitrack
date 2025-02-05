import { Package } from 'lucide-react';

export const Header = () => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Package className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold logo">LumiTrack</h1>
            <p className="text-blue-100 text-sm">Real-time shipment tracker</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);