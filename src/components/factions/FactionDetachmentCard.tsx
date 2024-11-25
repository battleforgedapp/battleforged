"use client";

import _ from "lodash";
import React from "react";
import GridCard from "@/components/layout/grids/GridCard";
import GenericCardGrid from "@/components/layout/grids/GenericCardGrid";
import NoResultsMessage from "@/components/messages/NoResultsMessage";
import Section from "@/components/layout/sections/Section";
import SectionTitle from "@/components/layout/sections/SectionTitle";
import { FactionDetachment } from "@/types/faction.detachment.type";

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

export const FactionDetachmentCardGridSection = ({ detachments, title = "Detachments" } : Readonly<{ detachments: FactionDetachment[] | null, title?: string }>) => (
    <Section>
        <SectionTitle>{title}</SectionTitle>
        <FactionDetachmentCardGrid detachments={detachments} />
    </Section>
);

export const FactionDetachmentCard = ({ data } : Readonly<{ data: FactionDetachment }>) => {
    return (
        <GridCard>
            {data.name}
        </GridCard>
    );
};

export default FactionDetachmentCard;