"use client"
import Link from "next/link";
import { useState } from "react";

const arrayMenu = [
    {
        menuTrigger: "Anime",
        link: null,
        childs: [
            { text: "Anime Search", link: "/anime/search", },
            { text: "Top Anime", link: "/anime/top", },
            { text: "Seasonal Anime", link: "/anime/season", },
            { text: "Reviews", link: "/anime/reviews", },
            { text: "Recommendations", link: "/anime/recommendations", },
        ]
    },
    {
        menuTrigger: "Manga",
        link: null,
        childs: [
            { text: "Manga Search", link: "/manga/search", },
            { text: "Top Manga", link: "/manga/top", },
            { text: "Reviews", link: "/manga/reviews", },
            { text: "Recommendations", link: "/manga/recommendations", },
        ]
    },
    
];

export default function Navbar() {

    // Estado para controlar qué submenú está abierto
    const [openSubmenu, setOpenSubmenu] = useState<number | undefined>(undefined);

    // Función para manejar el hover o clic en un ítem del menú
    const handleSubmenuToggle = (index: number) => {
        if (openSubmenu === index) {
            setOpenSubmenu(undefined); // Cierra el submenú si ya está abierto
        } else {
            setOpenSubmenu(index); // Abre el submenú correspondiente
        }
    };

    return (
        <nav>
            <ul className="flex flex-wrap">
                {
                    arrayMenu.map((menu, index) => (
                        <li
                            key={index}
                            onMouseEnter={() => handleSubmenuToggle(index)}
                            onMouseLeave={() => handleSubmenuToggle(0 - 1)}
                            className="relative py-4 px-8 bg-orange-500"
                        >
                            {
                                menu.link ? (
                                    <Link href={menu.link}>
                                        {menu.menuTrigger}
                                    </Link>
                                ) : (
                                    <div>
                                        {menu.menuTrigger}
                                    </div>
                                )
                            }
                            {openSubmenu === index && (
                                <ul className="absolute top-14 bg-slate-400 z-10">
                                    {
                                        menu.childs?.map((subMenu, subIndex) => (
                                            <li key={subIndex}>
                                                <Link href={subMenu.link}>
                                                    {subMenu.text}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            )}
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}