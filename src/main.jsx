import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from './components/web/context/User.jsx';
import { CartContextProvider } from './components/web/context/Cart.jsx';
import { OrderContextProvider } from './components/web/context/Order.jsx';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <UserContextProvider>
      <CartContextProvider>
        <OrderContextProvider>
          <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <App />
          </QueryClientProvider>
        </OrderContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  </>
)
