import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Shop from './Shop.jsx'
import CardPage from './CardPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage.jsx'
import { CartProvider } from './CartContext.jsx'
import Layout from './Layout.jsx'
import "/src/static/global-style.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <App /> },
      { path: "shop", element: <Shop /> },
      { path: "item", element: <CardPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <RouterProvider router={router}/>
  </CartProvider>
)
