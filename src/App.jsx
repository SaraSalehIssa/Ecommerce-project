import { RouterProvider } from "react-router-dom";
import { CartContext } from './components/web/context/Cart';
import { router } from './layouts/routes';
import { useContext, useEffect } from "react";
import { UserContext } from "./components/web/context/User";

function App() {
  let { setUserToken } = useContext(UserContext);
  let { setCount, getCartContext } = useContext(CartContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setUserToken(localStorage.getItem("userToken"));
      setCount(getCartContext().count);
    }
  }, []);

  return (
    <RouterProvider router={router} />
  )
}

export default App