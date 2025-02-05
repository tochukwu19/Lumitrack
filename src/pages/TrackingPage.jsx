import { useState } from 'react';
import ShipmentDetails from '../components/ShipmentDetails';
import { Search } from 'lucide-react';


const TrackingPage = () => {
    const [trackingId, setTrackingId] = useState('');
    const [activeTracking, setActiveTracking] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setActiveTracking(trackingId);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="md:w-1/2 w-[90%] mx-auto space-y-8">
                <div className="bg-white rounded-xl p-8 border border-gray-100">
                    <div className="max-w-xl mx-auto text-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Track Your Shipment</h2>
                        <p className="text-gray-500 mb-6">Enter your tracking number to get real-time updates</p>
                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Enter tracking number (e.g., GT123456789)"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 font-medium transition-colors text-sm"
                            >
                                <Search className="h-5 w-5" />
                                Track
                            </button>
                        </form>
                    </div>
                </div>

                {activeTracking && <ShipmentDetails trackingId={activeTracking} />}
            </div>
        </div>
    );
};

export default TrackingPage;