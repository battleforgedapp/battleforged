"use client";
import React from "react";
import Link from "next/link";
import { Faction } from "@/types/faction.type";

/**
 * Component that will generate a grid of FactionCard components based on the number of faction objects
 * passed in as an argument. The grid will be responsive depending on the screen size and each child FactionCard
 * component will be clickable to navigate to that specific faction details page.
 */
export const FactionCardGrid = ({ factions } : Readonly<{ factions: Faction[] | null }>) => {
    if (!factions || factions.length === 0) {
        return (
            <section id="no-results">
                <p>There are no results available.</p>
            </section>
        );
    }

    return (
        <section id="factions" className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {factions.map(el => <FactionCard key={el.id} data={el} />)}
        </section>
    );
};

/**
 * Component that displays the base faction information as a card. This is a basic name, image and clickable display
 * where it will navigate to the base faction information page, including unit information, rules & stratagems
 */
const FactionCard = ({ data } : Readonly<{ data: Faction }>) => {
    return (
        <Link
            href={`/factions/${data.id}`}
            className="flex flex-row border px-2 py-3 cursor-pointer bg-secondary text-secondary-content"
        >
            <span className="flex-1 font-bold uppercase">{data.name}</span>
        </Link>
    );
};

export default FactionCard;