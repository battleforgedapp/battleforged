import React from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { FactionRule } from "@/types/faction.rule.type";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type FactionRuleDataContextType = {
    modalId: string,
    error: Error | null,
    factionId: string,
    rule: FactionRule | null,
    selectRule: (ruleId: string) => void
};

const FactionRuleDataContext = React.createContext<FactionRuleDataContextType>({
    modalId: "",
    error: null,
    factionId: "",
    rule: null,
    selectRule: () => { }
});

const getFactionRuleDataQuery = async (ruleId: string) : Promise<PostgrestSingleResponse<FactionRule | null>> => {
    const supabase = createClient();
    return supabase
        .from("faction_rules")
        .select(`
            id,
            factionId:faction_id,
            name,
            rule,
            createdAt:created_at
        `)
        .eq('id', ruleId)
        .limit(1)
        .returns<FactionRule>()
        .single();
};

export const FactionRuleDataProvider = ({ children, factionId, modalId } : Readonly<{ factionId: string, modalId: string, children: React.ReactNode }>) => {
    const [ruleId, setRuleId] = React.useState<string | null>(null);
    const { data, error } = useQuery<PostgrestSingleResponse<FactionRule | null>, Error>({
        queryKey: [ruleId],
        queryFn: () => getFactionRuleDataQuery(ruleId!),
        enabled: !!ruleId
    });

    return (
        <FactionRuleDataContext.Provider value={{
            modalId,
            error,
            factionId,
            rule: data ? data.data as FactionRule : null,
            selectRule: (ruleId) => setRuleId(_ => ruleId)
        }}>
            {children}
        </FactionRuleDataContext.Provider>
    );
};

export default FactionRuleDataContext;