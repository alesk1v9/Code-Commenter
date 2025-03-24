import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex w-full h-16 justify-center items-center text-lg font-bold">
        <h3 className="flex flex-row gap-4">Made by Alexsander 
        <a href="http://www.github.com/alesk1v9" 
        target="_blank" rel="noopener noreferrer">
        <FaGithub /></a>
        </h3>
    </div>
  )
}

export default Footer