import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/user/Home.jsx";
const App = () => {
  return (

    <BrowserRouter>
    <Navbar/>
    
      <Routes>
          
          <Route index element={<Home/>} />
          <Route path="/signup" element={<Home/>} />
          
        
      </Routes>
    </BrowserRouter>

  )
}

export default App