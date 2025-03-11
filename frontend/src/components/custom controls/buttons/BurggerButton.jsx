import { Menu, X } from "lucide-react"; // مكتبة أيقونات lucide-react

export default function BurggerButton({isOpen,setIsOpen}){
    const handleClick = () => {
        setIsOpen(!isOpen)
    };
    return(
        <button onClick={handleClick}>
            <Menu size={24} className="text-white ltr:mr-4 rtl:ml-4 visible md:hidden"/>
        </button>
    );
}