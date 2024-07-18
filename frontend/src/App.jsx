import { Outlet } from "react-router-dom"
import Navigation from "./pages/Auth/Navigation"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Footer from "./components/Footer"

const App = () => {
  return (
   <>
    <ToastContainer/>
    <Navigation />
    <div className="py-3 mt-12">
      <Outlet/>
    </div>
    <Footer/>
   </>
  )
}

export default App