"use client";

import React from "react";
import NoResultsMessage from "@/components/messages/NoResultsMessage";
import Section from "@/components/layout/sections/Section";
import SectionTitle from "@/components/layout/sections/SectionTitle";
import useFactionDatasheetGroups from "@/hooks/useFactionDatasheetGroups";
import { FactionDatasheetCardGridSection } from "@/components/factions/FactionDatasheetCard";
import { FactionDatasheet } from "@/types/faction.datasheet.type";

export const FactionDatasheetGroupLayout = ({ datasheets, factionId } : Readonly<{ datasheets: FactionDatasheet[] | null, factionId: string }>) => {
    if (!datasheets || datasheets.length === 0) {
        return (
            <Section>
                <SectionTitle>Datasheets</SectionTitle>
                <NoResultsMessage />
            </Section>
        );
    }

    const groups = useFactionDatasheetGroups(datasheets);
    return groups.map(grp => (
        <FactionDatasheetCardGridSection
            key={`dt-grp-${grp.id}`}
            datasheets={grp.datasheets}
            factionId={factionId}
            title={grp.name}
        />
    ))
};

export default FactionDatasheetGroupLayout;