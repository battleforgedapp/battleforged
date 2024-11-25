"use client";

import React from "react";
import classNames from "classnames";
import { Faction } from "@/types/faction.type";

export const FactionBanner = ({ data } : Readonly<{ data: Faction }>) => {
    // configure the styling for the images, which are dynamic..
    // see: https://stackoverflow.com/questions/70805041/background-image-in-tailwindcss-using-dynamic-url-react-js
    const baseStyles = data?.image
        ? { '--image-url': `url(${data!.image})` } as any
        : null;

    // Let's configure the base classes that will be used regardless of if an image is present
    const baseClassName = 'flex flex-col relative h-32 md:h-48 lg:h-64 p-4' as any;
    const conditionalClassNames = {
        'bg-[image:var(--image-url)] bg-top bg-cover bg-no-repeat': data?.image,
        //'faction-card-banner' : data?.image,
        'bg-primary text-primary-content': !data?.image
    } as any;

    return (
        <section className={classNames(baseClassName, conditionalClassNames)} style={baseStyles}>
            <h1 className="text-4xl">{data.name}</h1>
            <p className="text-xl">{data.category?.name ?? 'Unknown Allegiance'}</p>
        </section>
    );
};

export default  FactionBanner;