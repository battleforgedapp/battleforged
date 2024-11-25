import React from "react";
import ErrorMessage from "@/components/messages/ErrorMessage";
import { FactionCardGridSection } from "@/components/factions/FactionCard";
import { Faction } from "@/types/faction.type";
import { createClient } from "@/utils/supabase/server";

const Index = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("factions")
        .select(`
            id,
            name,
            image,
            category:category_id(
                id,
                name
            ),
            createdAt:created_at
        `)
        .order('name', { ascending: true })
        .returns<Faction[]>();

    if (error) {
        return <ErrorMessage />
    }

    return <FactionCardGridSection factions={data} />
};

export default Index;