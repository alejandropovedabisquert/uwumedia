"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: 'Home', href: '/',
    },
    {
        name: 'Seasonal Animes', href: "/anime/seasonal"
    }
]

export default function HeaderNavLinks() {
    const pathname =usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                <Link
                    key={link.name}
                    href={link.href}
                    className={`${pathname == link.href ? 'bg-primary-color text-white': 'text-black'} transition-all p-3 text-lg font-bold hover:bg-primary-color hover:text-white md:p-4`}
                >
                    <p className="hidden md:block">{link.name}</p>
                </Link>
                );
            })}
        </>
    );
}