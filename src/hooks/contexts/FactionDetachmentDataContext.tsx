import React from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { FactionDetachment } from "@/types/faction.detachment.type";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type FactionDetachmentDataContextType = {
    modalId: string,
    error: Error | null,
    factionId: string,
    detachment: FactionDetachment | null,
    selectDetachment: (detachmentId: string) => void
};

const FactionDetachmentDataContext = React.createContext<FactionDetachmentDataContextType>({
    modalId: "",
    error: null,
    factionId: "",
    detachment: null,
    selectDetachment: () => { }
});

const getFactionDetachmentDataQuery = async (detachmentId: string) : Promise<PostgrestSingleResponse<FactionDetachment | null>> => {
    const supabase = createClient();
    return supabase
        .from("faction_detachments")
        .select(`
            id,
            factionId:faction_id,
            name,
            rule,
            enhancements:faction_detachment_enhancements!faction_detachment_enhancements_detachment_id_fkey(
                id,
                detachmentId:detachment_id,
                name,
                rule,
                cost,
                createdAt:created_at
            ),
            stratagems:faction_detachment_stratagems!faction_detachment_stratagems_detachment_id_fkey(
                id,
                detachmentId:detachment_id,
                name,
                type,
                cost,
                when,
                target,
                effect,
                restriction,
                createdAt:created_at
            ),
            createdAt:created_at
        `)
        .eq('id', detachmentId)
        .limit(1)
        .returns<FactionDetachment>()
        .single();
};

export const FactionDetachmentDataProvider = ({ children, factionId, modalId } : Readonly<{ factionId: string, modalId: string, children: React.ReactNode }>) => {
    const [detachmentId, setDetachmentId] = React.useState<string | null>(null);
    const { data, error } = useQuery<PostgrestSingleResponse<FactionDetachment | null>, Error>({
        queryKey: [detachmentId],
        queryFn: () => getFactionDetachmentDataQuery(detachmentId!),
        enabled: !!detachmentId
    });

    return (
        <FactionDetachmentDataContext.Provider value={{
            modalId,
            error,
            factionId,
            detachment: data ? data.data as FactionDetachment : null,
            selectDetachment: (detachmentId) => setDetachmentId(_ => detachmentId)
        }}>
            {children}
        </FactionDetachmentDataContext.Provider>
    );
};

export default FactionDetachmentDataContext;