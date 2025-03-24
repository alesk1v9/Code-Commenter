import { FaCode } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex w-full h-16 justify-center items-center text-lg font-bold">
        <h1 className="w-1/2">Code Commenter</h1>
        <FaCode className="w=1/2"/>
    </div>
  )
}

export default Header