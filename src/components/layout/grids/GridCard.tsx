"use client";

import React from "react";
import Link from "next/link";
import classNames from "classnames";

type GridCardProps = {
    children?: React.ReactNode | string | null,
    className?: string | any | null,
    href?: string | null,
    image?: string | null
};

export const GridCard = ({ children, className, href, image, ...rest } : Readonly<GridCardProps>) => {
    // configure the styling for the images, which are dynamic..
    // see: https://stackoverflow.com/questions/70805041/background-image-in-tailwindcss-using-dynamic-url-react-js
    const baseStyles = image ? { '--image-url': `url(${image})` } as any : null;
    const baseClassName = classNames(
        'flex flex-col relative rounded px-2 py-3 cursor-pointer' as any,
        {
            'bg-[image:var(--image-url)] bg-top bg-cover bg-no-repeat': image,
            'border border-primary bg-primary text-primary-content': !image
        } as any,
        className
    );

    if (href) {
        return (
            <Link href={href} className={baseClassName} style={baseStyles}>
                {children}
            </Link>
        )
    }

    return (
        <div className={baseClassName} style={baseStyles} {...rest}>
            {children}
        </div>
    );
};

export default GridCard;