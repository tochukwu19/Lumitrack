# Shipment Tracking Application

A modern, real-time shipment tracking application built with React and Vite.

## Features

- **Individual package tracking**
- **Bulk tracking capabilities**
- **Real-time status updates**
- **Advanced filtering and sorting**
- **Toast notifications** for status changes
- **Responsive design** for all devices
- **Skeleton loading states** for a smooth user experience

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

## Installation

### Clone the repository:

```bash
git clone [https://github.com/tochukwu19/Lumitrack]
cd lumitrack
```

### Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

## Build

Create a production build:

```bash
npm run build
```

## Project Structure

```bash
src/
├── components/         # Reusable components
├── lib/               # Utilities and API services
├── pages/             # Page components
├── index.css          # Global styles
└── main.jsx           # Application entry point
```

## Key Dependencies

- [React](https://react.dev/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Toastify](https://github.com/fkhadra/react-toastify)
- [Lucide React](https://lucide.dev/)
- [React Router](https://reactrouter.com/en/main)

## Real-Time Updates

- Implemented **polling with React Query** instead of WebSockets
- Maintains **frontend architecture boundaries**
- Provides **efficient caching and retry mechanisms**

## Styling

- Used **Tailwind CSS** for utility-first styling
- Created **custom components** for a consistent UI
- Implemented **responsive design patterns**

## Contributing

We welcome contributions! Follow these steps:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature-branch`)
3. **Commit** your changes (`git commit -m "Add new feature"`)
4. **Push** to the branch (`git push origin feature-branch`)
5. **Open a Pull Request**

## License

This project is licensed under the **MIT License**.
