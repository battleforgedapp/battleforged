"use client";

import _ from "lodash";
import React from "react";
import GridCard from "@/components/layout/grids/GridCard";
import GenericCardGrid from "@/components/layout/grids/GenericCardGrid";
import NoResultsMessage from "@/components/messages/NoResultsMessage";
import Section from "@/components/layout/sections/Section";
import SectionTitle from "@/components/layout/sections/SectionTitle";
import FactionDetachmentModal from "@/components/factions/FactionDetachmentModal";
import useFactionDetachmentData from "@/hooks/useFactionDetachmentData";
import { FactionDetachment } from "@/types/faction.detachment.type";
import { FactionDetachmentDataProvider } from "@/hooks/contexts/FactionDetachmentDataContext";
import { queryClient, QueryClientProvider } from "@/utils/queries/queryClient";

export const FactionDetachmentCardGrid = ({ detachments } : Readonly<{ detachments: FactionDetachment[] | null }>) => {
    if (!detachments || detachments.length === 0) {
        return <NoResultsMessage />
    }

    return (
        <GenericCardGrid>
            {_.orderBy(detachments, ['name'], ['asc']).map(el => <FactionDetachmentCard key={el.id} data={el} />)}
        </GenericCardGrid>
    );
};

export const FactionDetachmentCardGridSection = ({ factionId, detachments, title = "Detachments" } : Readonly<{ factionId: string, detachments: FactionDetachment[] | null, title?: string }>) => {
    const modalId = React.useId();
    return (
        <QueryClientProvider client={queryClient}>
            <FactionDetachmentDataProvider factionId={factionId} modalId={modalId}>
                <Section>
                    <SectionTitle>{title}</SectionTitle>
                    <FactionDetachmentCardGrid detachments={detachments} />
                    <FactionDetachmentModal id={modalId} />
                </Section>
            </FactionDetachmentDataProvider>
        </QueryClientProvider>
    );
};

export const FactionDetachmentCard = ({ data } : Readonly<{ data: FactionDetachment }>) => {
    const { modalId, selectDetachment } = useFactionDetachmentData();

    const handleClickEvent = (e) => {
        selectDetachment(data.id);
        document.getElementById(modalId)?.showModal();
    };

    return (
        <GridCard onClick={handleClickEvent}>
            {data.name}
        </GridCard>
    );
};

export default FactionDetachmentCard;