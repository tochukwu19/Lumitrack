import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Filter, SortAsc, Package, Trash } from 'lucide-react';
import { fetchShipmentDetails } from '../lib/api';

const MultiTracker = () => {
  const [trackingIds, setTrackingIds] = useState([]);
  const [newTrackingId, setNewTrackingId] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('lastUpdate');
  const [sortOrder, setSortOrder] = useState('desc');

  const results = useQueries({
    queries: trackingIds.map(id => ({
      queryKey: ['shipment', id],
      queryFn: () => fetchShipmentDetails(id),
      refetchInterval: 5000,
      onSuccess: (data) => {
        if (data.status === 'Delivered') {
          toast.success(`Package ${data.id} has been delivered!`, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      }
    }))
  });

  const handleAddTracking = (e) => {
    e.preventDefault();
    if (newTrackingId && !trackingIds.includes(newTrackingId)) {
      setTrackingIds([...trackingIds, newTrackingId]);
      setNewTrackingId('');
      toast.info(`Added tracking number: ${newTrackingId}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleRemoveTracking = (id) => {
    setTrackingIds(trackingIds.filter(trackingId => trackingId !== id));
    toast.info(`Removed tracking number: ${id}`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const shipments = results
    .map(result => result.data)
    .filter(Boolean)
    .filter(shipment => !filterStatus || shipment.status === filterStatus)
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  return (
    <div className="md:w-1/2 w-[90%] mx-auto space-y-6 py-12">
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <form onSubmit={handleAddTracking} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={newTrackingId}
            onChange={(e) => setNewTrackingId(e.target.value)}
            placeholder="Enter tracking number"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Tracking
          </button>
        </form>
      </div>

      <div className="text-sm bg-white rounded-xl border border-gray-100 p-4 flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          >
            <option value="">All Statuses</option>
            <option value="In Transit">In Transit</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <SortAsc className="h-5 w-5 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          >
            <option value="lastUpdate">Last Update</option>
            <option value="status">Status</option>
            <option value="carrier">Carrier</option>
            <option value="priority">Priority</option>
          </select>
          <button
            onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            {sortOrder.toUpperCase()}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {shipments.map(shipment => (
          <div
            key={shipment.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{shipment.id}</h3>
                  <p className="text-sm text-gray-500">{shipment.carrier}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {shipment.status}
                    </span>
                    <span className="text-sm text-gray-500">{shipment.location}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveTracking(shipment.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                <Trash className='w-4 h-4'/>
              </button> 
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Priority</p>
                <p className="font-medium">{shipment.priority}</p>
              </div>
              <div>
                <p className="text-gray-500">Weight</p>
                <p className="font-medium">{shipment.weight}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Update</p>
                <p className="font-medium">
                  {new Date(shipment.lastUpdate).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {shipments.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No shipments to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiTracker;