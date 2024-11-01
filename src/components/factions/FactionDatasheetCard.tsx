"use client";
import React from "react";
import useFactionDatasheetStats from "@/hooks/useFactionDatasheetStatsContext";
import FactionDatasheetStatsModal from "@/components/factions/FactionDatasheetStatsModal";
import { DefArmyGroup } from "@/types/def.armygroup.type";
import { FactionDatasheet } from "@/types/faction.datasheet.type";
import { FactionDatasheetStatsProvider } from "@/hooks/contexts/FactionDatasheetStatsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const FactionDatasheetCardGrid = ({ datasheets } : Readonly<{ datasheets: FactionDatasheet[] | null }>) => {
    if (!datasheets || datasheets.length === 0) {
        return (
            <div>
                <p>There are no results available.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {datasheets.map(el => <FactionDatasheetCard key={el.id} data={el} />)}
        </div>
    );
};

export const FactionDatasheetCardGroup = ({ factionId, group, datasheets } : Readonly<{ factionId: string, group: DefArmyGroup | null, datasheets: FactionDatasheet[] | null }>) => {
    const groupModalId = `modal-${group?.id ?? '000'}`;
    const groupName = group?.name ?? "Uncategorized";

    if (!datasheets || datasheets.length === 0) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <FactionDatasheetStatsProvider factionId={factionId} modalId={groupModalId}>
                <section id={`group-${groupName}`}>
                    <h2>{groupName}</h2>
                    <FactionDatasheetCardGrid datasheets={datasheets} />
                    <FactionDatasheetStatsModal id={groupModalId} />
                </section>
            </FactionDatasheetStatsProvider>
        </QueryClientProvider>
    );
};

const FactionDatasheetCard = ({ data }: Readonly<{ data: FactionDatasheet }>) => {
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
        <div onClick={handleClickEvent} className="flex flex-row border px-2 py-3 cursor-pointer bg-accent text-accent-content">
            {data.name}
        </div>  
    );
};

export default FactionDatasheetCard;