import bnrM from "../../assets/images/bnrM.jpg"
import bnr from "../../assets/images/bnr.jpg"

import Card from "../../components/Card"


const Home = () => {
  return (
    <>
      <div className=" w-screen px-2 lg:px-10">

        <div className="flex flex-col items-center">
        <div className="banner w-full lg:hidden px-6">
          <img src={bnrM} alt="" />
        </div>
        <div className="banner w-full hidden lg:block px-10 ">
          <img className="rounded-2xl shadow-lg" src={bnr} alt="" />
        </div>

        <div className="product flex flex-col items-center py-10 gap-3 font-semibold text-gray-600">
          <h1 className="text-2xl uppercase">New Products</h1>
          <div className="grid  gap-3 md:grid-cols-2  xl:grid-cols-4">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Home