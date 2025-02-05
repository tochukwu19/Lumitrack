import { useQuery } from '@tanstack/react-query';
import { fetchShipmentDetails } from '../lib/api';
import { Package } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const ShipmentDetails = ({ trackingId }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['shipment', trackingId],
        queryFn: () => fetchShipmentDetails(trackingId),
        refetchInterval: 5000,
    });

    if (isLoading) return <ShipmentSkeleton />;
    if (error) return <div className="text-red-500">Error loading shipment details</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-500';
            case 'In Transit': return 'bg-blue-500';
            case 'Out for Delivery': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden w-full max-w-3xl mx-auto border border-gray-100">
            <div className="p-6 bg-gray-50 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">#{trackingId}</h2>
                            <p className="text-sm text-gray-500">International Priority</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(data.status)}`} />
                        <span className="font-medium text-gray-900">{data.status}</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Current Location</p>
                        <p className="font-medium">{data.location}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                        <p className="font-medium">{new Date(data.lastUpdate).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                        <p className="font-medium">{new Date(data.estimatedDelivery).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="relative">
                    <h3 className="text-lg font-semibold mb-6">Shipment Progress</h3>
                    <div className="absolute left-[4px] h-full w-0.5 bg-gray-200" />
                    <div className="space-y-8">
                        {data.updates.map((update, index) => (
                            <div key={index} className="ml-6 relative">
                                <div className="absolute -left-[1.625rem] top-1 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-medium text-gray-900">{update.message}</p>
                                        <span className="text-sm text-gray-500">
                                            {new Date(update.time).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{data.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const ShipmentSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-2xl mx-auto">
        <div className="p-6 border-b border-gray-100">
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
        </div>
        <div className="p-6">
            <div className="space-y-6">
                <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
                </div>
                <div className="space-y-4">
                    <div className="h-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-20 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        </div>
    </div>
);

export default ShipmentDetails;