import React from "react";
import ErrorMessage from "@/components/messages/ErrorMessage";
import FactionBanner from "@/components/factions/FactionBanner";
import { FactionDatasheetGroupLayout } from "@/components/layout/datasheets/FactionDatasheetGroupLayout";
import { FactionDetachmentCardGridSection } from "@/components/factions/FactionDetachmentCard";
import { FactionRuleCardGridSection } from "@/components/factions/FactionRuleCard";
import { Faction } from "@/types/faction.type";
import { createClient } from "@/utils/supabase/server";

const Index = async ({ params }) => {
    const { id } = await params;
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('factions')
        .select(`
            id,
            name,
            image,
            category:category_id(
                id,
                name
            ),
            rules:faction_rules!faction_rules_faction_id_fkey(
                id,
                factionId:faction_id,
                name,
                createdAt:created_at
            ),
            datasheets:faction_datasheets!faction_units_faction_id_fkey(
                id,
                factionId:faction_id,
                name,
                groupId:group_id,
                group:group_id(
                    id,
                    name:group_name,
                    order:sort_order,
                    createdAt:created_at
                ),
                keywords,
                createdAt:created_at
            ),
            detachments:faction_detachments!faction_detachments_faction_id_fkey1(
                id,
                factionId:faction_id,
                name,
                createdAt:created_at
            ),
            createdAt:created_at
        `)
        .eq('id', id)
        .returns<Faction>()
        .single();

    if (error) {
        return <ErrorMessage />
    }

    return (
        <React.Fragment>
            <FactionBanner data={data} />
            <FactionRuleCardGridSection rules={data?.rules} factionId={id} />
            <FactionDetachmentCardGridSection detachments={data?.detachments} />
            <FactionDatasheetGroupLayout datasheets={data?.datasheets} factionId={id} />
        </React.Fragment>
    );
};

export default Index;