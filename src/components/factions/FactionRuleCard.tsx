"use client";

import _ from "lodash";
import React from "react";
import GridCard from "@/components/layout/grids/GridCard";
import GenericCardGrid from "@/components/layout/grids/GenericCardGrid";
import NoResultsMessage from "@/components/messages/NoResultsMessage";
import Section from "@/components/layout/sections/Section";
import SectionTitle from "@/components/layout/sections/SectionTitle";
import FactionRuleModal from "@/components/factions/FactionRuleModal";
import useFactionRuleData from "@/hooks/useFactionRuleDataContext";
import { FactionRule } from "@/types/faction.rule.type";
import { FactionRuleDataProvider } from "@/hooks/contexts/FactionRuleDataContext";
import { queryClient, QueryClientProvider } from "@/utils/queries/queryClient";

/**
 * Displays a grid with each rule as card within that card. Fully scalable depending on the screen size.
 * @param rules
 * @constructor
 */
export const FactionRuleCardGrid = ({ rules } : Readonly<{ rules: FactionRule[] | null }>) => {
    if (!rules || rules.length === 0) {
        return <NoResultsMessage />
    }

    return (
        <GenericCardGrid>
            {_.orderBy(rules, ['name'], ['asc']).map(el => <FactionRuleCard key={el.id} data={el} />)}
        </GenericCardGrid>
    );
};

/**
 * Represents a full section component with heading and then outputting the grid. For when you want a full
 * section and header on the page.
 * @param factionId
 * @param rules
 * @param title
 * @constructor
 */
export const FactionRuleCardGridSection = ({ factionId, rules, title = "Faction Rules" } : Readonly<{ factionId: string, rules: FactionRule[] | null, title?: string }>) => {
    const modalId = React.useId();
    return (
        <QueryClientProvider client={queryClient}>
            <FactionRuleDataProvider factionId={factionId} modalId={modalId}>
                <Section>
                    <SectionTitle>{title}</SectionTitle>
                    <FactionRuleCardGrid rules={rules} />
                    <FactionRuleModal id={modalId} />
                </Section>
            </FactionRuleDataProvider>
        </QueryClientProvider>
    );
}

export const FactionRuleCard = ({ data } : Readonly<{ data: FactionRule }>) => {
    const { modalId, selectRule } = useFactionRuleData();

    const handleClickEvent = (e) => {
        selectRule(data.id);
        document.getElementById(modalId)?.showModal();
    };

    return (
        <GridCard onClick={handleClickEvent}>
            {data.name}
        </GridCard>
    );
};

export default FactionRuleCard;