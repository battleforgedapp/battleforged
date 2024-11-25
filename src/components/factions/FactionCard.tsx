"use client";

import _ from "lodash";
import React from "react";
import GridCard from "@/components/layout/grids/GridCard";
import GenericCardGrid from "@/components/layout/grids/GenericCardGrid";
import NoResultsMessage from "@/components/messages/NoResultsMessage";
import Section from "@/components/layout/sections/Section";
import { Faction } from "@/types/faction.type";

/**
 * Component that will generate a grid of FactionCard components based on the number of faction objects
 * passed in as an argument. The grid will be responsive depending on the screen size and each child FactionCard
 * component will be clickable to navigate to that specific faction details page.
 */
export const FactionCardGrid = ({ factions } : Readonly<{ factions: Faction[] | null }>) => {
    if (!factions || factions.length === 0) {
        return <NoResultsMessage />
    }

    return (
        <GenericCardGrid>
            {_.orderBy(factions, ['name'], ['asc']).map(el => <FactionCard key={el.id} data={el} />)}
        </GenericCardGrid>
    );
};

/**
 * Component to display a grid of faction cards with a section to include padding around the main section
 */
export const FactionCardGridSection = ({ factions } : Readonly<{ factions: Faction[] | null }>) => (
    <Section>
        <FactionCardGrid factions={factions} />
    </Section>
);

/**
 * Component that displays the base faction information as a card. This is a basic name, image and clickable display
 * where it will navigate to the base faction information page, including unit information, rules & stratagems
 */
const FactionCard = ({ data } : Readonly<{ data: Faction }>) => {
    return (
        <GridCard href={`/factions/${data.id}`} className="h-24" image={data?.image}>
            <h2 className="font-bold uppercase">{data.name}</h2>
            <p className="text-sm">{data.category?.name ?? 'Unknown Allegiance'}</p>
        </GridCard>
    );
};

export default FactionCard;