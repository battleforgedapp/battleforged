"use client";

import React from "react";
import Link from 'next/link';

export const NavigationDrawerLink = ({ label, href, navId } : Readonly<{ label: string, href: string, navId: string }>) => {

    const onClick = () => document.getElementById(navId).click();

    return (
        <li>
            <Link href={href} onClick={onClick}>{label}</Link>
        </li>
    );
};

const NavigationDrawer = ({ children, navId = "my-drawer-3" } : Readonly<{ children: React.ReactNode, navId: string }>) => {
    return (
        <div className="drawer">
            <input id={navId} type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">
                {/* Main content here -- this comes from the dashboard layout tsx file and will display the header, etc */}
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor={navId} aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <NavigationDrawerLink navId={navId} href={'/dashboard'} label={'My Dashboard'} />
                    <NavigationDrawerLink navId={navId} href={'/factions'} label={'Factions'} />
                </ul>
            </div>
        </div>
    );
};

export default NavigationDrawer;