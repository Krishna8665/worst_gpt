import Navbar from "../components/Navbar"
import Pricing from "../components/Pricing"

export default function Price(){
    return(
        <div className="font-sans bg-white text-gray-900 min-h-screen flex flex-col">
            <Navbar/>
            <Pricing/>
        </div>
        
    )
}