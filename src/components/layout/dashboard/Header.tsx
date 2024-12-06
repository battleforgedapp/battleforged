import Link from 'next/link';
import HeaderProfileDisplay from "@/components/layout/dashboard/HeaderProfileDisplay";

const Header = ({ navId } : Readonly<{ navId: string }>) => {
    return (
        <header className="navbar sticky top-0 z-40 duration-500 ease-in transition-colors bg-base-100">
            <div className="flex-none">
                <label htmlFor={navId} aria-label="open sidebar" className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
            </div>
            <div className="flex-1">
                <Link href={"/dashboard"} className="btn btn-ghost text-xl">Battleforged ⚒️</Link>
            </div>
            <div className="flex-none">
                <HeaderProfileDisplay />
            </div>
        </header>
    );
};

export default Header;