import React from "react";
import {useQuery} from "@tanstack/react-query";
import {createClient} from "@/utils/supabase/client";
import {FactionDatasheet} from "@/types/faction.datasheet.type";
import {PostgrestSingleResponse} from "@supabase/supabase-js";

export type FactDatasheetContextType = {
    modalId: string,
    error: Error | null,
    factionId: string,
    datasheet: FactionDatasheet | null,
    selectDatasheet: (datasheetId: string) => void
};

const FactionDatasheetStatsContext = React.createContext<FactDatasheetContextType>({
    modalId: "",
    error: null,
    factionId: "",
    datasheet: null,
    selectDatasheet: () => { }
});

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
            weapons:faction_datasheet_weapons!faction_datasheet_weapons_datasheet_id_fkey(
                id,
                datasheetId:datasheet_id,
                name,
                range,
                attacks,
                skill,
                strength,
                ap,
                damage,
                abilities
            ),
            abilities:faction_datasheet_abilities!faction_datasheet_abilities_datasheet_id_fkey(
                id,
                createdAt:created_at,
                datasheetId:datasheet_id,
                type,
                name,
                text
            ),
            keywords,
            createdAt:created_at
        `)
        .eq('id', datasheetId)
        .limit(1)
        .returns<FactionDatasheet>()
        .single();
}

export const FactionDatasheetStatsProvider = ({ children, factionId, modalId } : Readonly<{ factionId: string, modalId: string, children: React.ReactNode }>) => {
    const [datasheetId, setDatasheetId] = React.useState<string | null>(null);
    const { data, error, ...rest } = useQuery<PostgrestSingleResponse<FactionDatasheet | null>, Error>({
        queryKey: [datasheetId],
        queryFn: () => getArmyDatasheetStatsQuery(datasheetId!),
        enabled: !!datasheetId
    });

    return (
        <FactionDatasheetStatsContext.Provider value={{
            modalId,
            error,
            factionId,
            datasheet: data ? data.data as FactionDatasheet : null,
            selectDatasheet: (datasheetId) => setDatasheetId(_ => datasheetId)
        }}>
            {children}
        </FactionDatasheetStatsContext.Provider>
    );
};

export default FactionDatasheetStatsContext;