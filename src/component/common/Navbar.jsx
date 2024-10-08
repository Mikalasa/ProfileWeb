import React, { useEffect, useState } from "react";
import { customTailwind } from "../../constants/custom-tailwind";
import { navLinks } from "../../constants/custom-config";
import { menu, close } from "../../constants/custom-config";

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`${
                customTailwind.paddingX
            } w-full flex items-center py-4 fixed top-0 z-20 custom-navbar ${
                scrolled ? "custom-navbar-bg" : "bg-transparent"
            }`}
        >
            <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
                <div className="flex gap-4">
                    <img src={process.env.PUBLIC_URL + "/web-icon.png"} className="h-[32px] w-[32px]" />
                    <a
                        href="#"
                        className='flex items-center gap-2'
                        onClick={() => {
                            setActive("");
                            window.scrollTo(0, 0);
                        }}
                    >
                        <p className='text-white text-[18px] font-bold cursor-pointer flex '>
                            Xingyi &nbsp;
                            <span className='sm:block hidden'> | Front-end Developer</span>
                        </p>
                    </a>
                </div>

                <ul className='list-none hidden sm:flex flex-row gap-10'>
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className={`hover:text-gray-300 text-white text-[18px] font-medium cursor-pointer`}
                            onClick={() => setActive(nav.title)}
                        >
                            <a href={`#${nav.id}`}>{nav.title}</a>
                        </li>

                    ))}
                </ul>

                <div className='sm:hidden flex flex-1 justify-end items-center'>
                    <img
                        src={toggle ? close : menu}
                        alt='menu'
                        className='w-[28px] h-[28px] object-contain'
                        onClick={() => setToggle(!toggle)}
                    />

                    <div
                        className={`${
                            !toggle ? "hidden" : "flex"
                        } p-6 custom-drop-down-menu absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
                    >
                        <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                                        active === nav.title ? "text-gray-300" : "text-white"
                                    }`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                    }}
                                >
                                    <a href={`#${nav.id}`}>{nav.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
