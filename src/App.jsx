import './App.css'
import { Header } from './components/Header'
import TrackingPage from './pages/TrackingPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MultiTracker from './pages/TrackMultiple';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs';
import { Package, Truck } from 'lucide-react';


function App() {

  const queryClient = new QueryClient();

  const tabs = ["Individual Tracking", "Batch Tracking"]

  const tabIcons = {
    "Individual Tracking": <Package className="h-4 w-4" />,
    "Batch Tracking": <Truck className="h-4 w-4" />,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Header />
      <Tabs defaultValue={"Individual Tracking"} className='w-full bg-[#F9FAFB]'>
        <TabsList className="w-1/2 mx-auto mt-16 flex gap-3 p-1 bg-gray-50/50 rounded-lg">
          {tabs?.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab}
              className="
                flex-1 px-4 py-2.5
                flex items-center justify-center gap-2
                text-sm font-medium text-gray-600
                rounded-md transition-all duration-200
                hover:bg-gray-50
                data-[state=active]:bg-white 
                data-[state=active]:text-blue-600
                data-[state=active]:shadow-sm
                data-[state=active]:ring-1
                data-[state=active]:ring-gray-200/75
                disabled:pointer-events-none
                disabled:opacity-50
              "
            >
              {tab}   {tabIcons[tab]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value='Individual Tracking'>
          <TrackingPage />
        </TabsContent>

        <TabsContent value='Batch Tracking'>
          <MultiTracker />
        </TabsContent>
      </Tabs>

    </QueryClientProvider>
  )
}

export default App
