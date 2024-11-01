import _ from "lodash";
import React from "react";
import { FactionDatasheet } from "@/types/faction.datasheet.type";
import { FactionDatasheetCardGroup } from "@/components/factions/FactionDatasheetCard";
import { createClient } from "@/utils/supabase/server";

const Index = async ({params}) => {
    const supabase = await createClient();
    const {id} = await params;
    const { data, error } = await supabase
        .from('faction_datasheets')
        .select(`
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
            createdAt:created_at
        `)
        .eq('faction_id', id)
        .order('sort_order', { ascending: true, referencedTable: 'group' })
        .order('name', { ascending: true })
        .returns<FactionDatasheet[]>();

    const dataGroup = !error && data ? _.groupBy(data, 'groupId') : { };
    return (
        <React.Fragment>
            {error && (
                <section id="fetch-error" role="alert" className="alert alert-error">
                    <span>There was a problem getting your results.</span>
                </section>
            )}
            {!error && data && Object.keys(dataGroup).map(groupId => (
                <FactionDatasheetCardGroup
                    key={groupId}
                    factionId={id}
                    datasheets={dataGroup[groupId]}
                    group={dataGroup[groupId].length > 0 ? dataGroup[groupId][0].group : null}
                />
            ))}
        </React.Fragment>
    );
};

export default Index;