import React , {useState} from 'react'

const Header = () => {

    // <div>Header</div>

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-[#FACC15] text-black p-6 flex justify-between items-center">
            <div className="text-2xl font-bold  ">Nukkad-Thela</div>
            <div className="hidden md:flex space-x-4">
                <a href="/dashboard" className="hover:underline">Home</a>
                <a href="/about" className="hover:underline">About</a>
                <a href="/service" className="hover:underline">Services</a>
                <a href="#contact" className="hover:underline">Contact</a>
            </div>
            <div className="md:hidden">
                <button onClick={toggleMenu} className="focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="absolute top-16 right-0 bg-[#FACC15]">
                    <nav>
                        <ul className="flex flex-col space-y-2 p-4">
                            <li><a href="#home" className="hover:underline">Home</a></li>
                            <li><a href="#about" className="hover:underline">About</a></li>
                            <li><a href="#services" className="hover:underline">Services</a></li>
                            <li><a href="#contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
  )
}

export default Header