import { Outlet } from "react-router-dom"
import Navigation from "./pages/Auth/Navigation"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Footer from "./components/Footer"

const App = () => {
  return (
   <>
    <ToastContainer/>
    <div style={{zIndex:999}} className="w-screen h-[90vh] fixed top-0 left-0 lg:h-auto">
    <Navigation />
    </div>
    <div style={{zIndex:-1}} className="py-3 mt-12">
      <Outlet/>
    </div>
    <Footer/>
   </>
  )
}

export default App