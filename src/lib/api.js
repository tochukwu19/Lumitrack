// Simulating an API call with random status and location

export const fetchShipmentDetails = async (trackingId) => {
    const statuses = ['In Transit', 'Out for Delivery', 'Delivered', 'Processing'];
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle'];
    const carriers = ['FedEx', 'UPS', 'DHL', 'USPS'];
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: trackingId,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          carrier: carriers[Math.floor(Math.random() * carriers.length)],
          lastUpdate: new Date().toISOString(),
          estimatedDelivery: '2025-02-10T15:00:00Z',
          priority: Math.random() > 0.5 ? 'High' : 'Standard',
          weight: Math.floor(Math.random() * 20) + 1 + ' kg',
          updates: [
            { time: new Date().toISOString(), message: 'Package scanned at facility', location: locations[Math.floor(Math.random() * locations.length)] },
            { time: new Date(Date.now() - 3600000).toISOString(), message: 'In transit to next facility', location: locations[Math.floor(Math.random() * locations.length)] }
          ]
        });
      }, 800);
    });
  };