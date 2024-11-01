"use client";

import React from "react";
import useFactionDatasheetStats from "@/hooks/useFactionDatasheetStatsContext";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { FactionDatasheet } from "@/types/faction.datasheet.type";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import {number} from "prop-types";

const getArmyDatasheetStatsQuery = async (datasheetId: string) : Promise<PostgrestSingleResponse<FactionDatasheet | null>> => {
    const supabase = createClient();
    return supabase
        .from('faction_datasheets')
        .select(`
            id,
            factionId:faction_id,
            name,
            groupId:group_id,
            stats:faction_datasheet_units!faction_datasheet_units_faction_datasheet_id_fkey1(   
                id,
                datasheetId:faction_datasheet_id,
                name,
                movement,
                toughness,
                saveThrow:save_throw,
                invulnerableSave:save_invuln,
                wounds,
                leadership,
                objectiveControl:objective_control,
                createdAt:created_at
            ),
            createdAt:created_at
        `)
        .eq('id', datasheetId)
        .limit(1)
        .returns<FactionDatasheet>()
        .single();
}

const FactionDatasheetStatsModal = ({ id } : Readonly<{ id: string }>) => {
    const { datasheetId } = useFactionDatasheetStats();
    const { data, ...rest } = useQuery<PostgrestSingleResponse<FactionDatasheet | null>, Error>({
        queryKey: [datasheetId],
        queryFn: () => getArmyDatasheetStatsQuery(datasheetId!),
        enabled: !!datasheetId
    });

    const datasheet : FactionDatasheet | null | undefined = data?.data;
    return (
        <dialog id={id} className="modal modal-bottom">
            <div className="modal-box">
                {datasheet && (
                    <React.Fragment>
                        <h3 className="font-bold text-xl uppercase mb-3">{datasheet.name}</h3>
                        {datasheet.stats?.map(el => (
                            <div key={el.id} className="flex flex-row items-end mb-2">
                                <StatBlock label="m" value={el.movement} />
                                <StatBlock label="t" value={el.toughness} />
                                <StatBlock label="sv" value={el.saveThrow} />
                                <StatBlock label="w" value={el.wounds} />
                                <StatBlock label="ld" value={el.leadership} />
                                <StatBlock label="oc" value={el.objectiveControl} />
                                {el.name && (
                                    <div>
                                        <span>{el.name}</span>
                                    </div>
                                )}
                            </div>
                        ))}

                    </React.Fragment>
                )}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

const StatBlock = ({ label, value }: Readonly<{ label: string, value: number | null }>) => {
    return (
        <div className="flex flex-col me-3">
            <span className="text-center font-bold text-lg uppercase">{label}</span>
            <div className="border w-9 h-9 flex justify-center items-center bg-white text-black rounded">
                <p className="font-bold text-lg uppercase">{value ?? '-'}</p>
            </div>
        </div>
    );
};

export default FactionDatasheetStatsModal;