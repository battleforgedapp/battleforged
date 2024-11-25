"use client";

import _ from "lodash";
import React from "react";
import GridCard from "@/components/layout/grids/GridCard";
import GenericCardGrid from "@/components/layout/grids/GenericCardGrid";
import NoResultsMessage from "@/components/messages/NoResultsMessage";
import Section from "@/components/layout/sections/Section";
import SectionTitle from "@/components/layout/sections/SectionTitle";
import useFactionDatasheetStats from "@/hooks/useFactionDatasheetStatsContext";
import FactionDatasheetStatsModal from "@/components/factions/FactionDatasheetStatsModal";
import { FactionDatasheet } from "@/types/faction.datasheet.type";
import { FactionDatasheetStatsProvider } from "@/hooks/contexts/FactionDatasheetStatsContext";
import { queryClient, QueryClientProvider } from "@/utils/queries/queryClient";

export const FactionDatasheetCardGrid = ({ datasheets } : Readonly<{ datasheets: FactionDatasheet[] | null }>) => {
    if (!datasheets || datasheets.length === 0) {
        return <NoResultsMessage />
    }

    return (
        <GenericCardGrid>
            {_.orderBy(datasheets, ['name'], ['asc']).map(el => <FactionDatasheetCard key={el.id} data={el} />)}
        </GenericCardGrid>
    );
};

export const FactionDatasheetCardGridSection = ({ datasheets, factionId, title } : Readonly<{ datasheets: FactionDatasheet[] | null, factionId: string, title: string }>) => {
    const modalId = React.useId();
    return (
        <QueryClientProvider client={queryClient}>
            <FactionDatasheetStatsProvider factionId={factionId} modalId={modalId}>
                <Section>
                    <SectionTitle>{title}</SectionTitle>
                    <FactionDatasheetCardGrid datasheets={datasheets} />
                    <FactionDatasheetStatsModal id={modalId} />
                </Section>
            </FactionDatasheetStatsProvider>
        </QueryClientProvider>
    );
};

export const FactionDatasheetCard = ({ data }: Readonly<{ data: FactionDatasheet }>) => {
    const { modalId, selectDatasheet } = useFactionDatasheetStats();

    const handleClickEvent = (e) => {
        // we want to set the selected datasheet element to be the card id we just selected
        selectDatasheet(data.id);

        // sets up displaying the modal
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            modalElement.showModal();
        }
    };

    return (
        <GridCard onClick={handleClickEvent}>
            {data.name}
        </GridCard>
    );
};

export default FactionDatasheetCard;