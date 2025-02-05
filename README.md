Shipment Tracking Application
A modern, real-time shipment tracking application built with React and Vite.
Features

Individual package tracking
Bulk tracking capabilities
Real-time status updates
Advanced filtering and sorting
Toast notifications
Responsive design
Skeleton loading states

Prerequisites

Node.js (v16 or higher)
npm or yarn

Installation

Clone the repository:

bashCopygit clone [repository-url\]](https://github.com/tochukwu19/Lumitrack)
cd lumitrack

Install dependencies:

bashCopynpm install
Development
Start the development server:
bashCopynpm run dev
The application will be available at http://localhost:5173
Build
Create a production build:
bashCopynpm run build
Project Structure
Copysrc/
├── components/         # Reusable components
├── lib/               # Utilities and API services
├── pages/             # Page components
├── index.css            # Global styles
└── main.jsx          # Application entry point
Key Dependencies

react
@tanstack/react-query
tailwindcss
react-toastify
lucide-react
react-router-dom


Real-Time Updates:

Implemented polling with React Query instead of WebSockets
Maintains frontend architecture boundaries
Provides efficient caching and retry mechanisms


Styling:

Used Tailwind CSS for utility-first styling
Custom components for consistent UI
Responsive design patterns



Contributing

Fork the repository
Create your feature branch
Commit your changes
Push to the branch
Open a Pull Request

License
MIT