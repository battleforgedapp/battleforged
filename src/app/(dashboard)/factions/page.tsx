import React from "react";
import { Faction } from "@/types/faction.type";
import { FactionCardGrid } from "@/components/factions/FactionCard";
import { createClient } from "@/utils/supabase/server";

const Index = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("factions")
        .select(`
            id,
            name,
            image,
            createdAt:created_at
        `)
        //.eq('name', 'peekaboo')
        .order('name', { ascending: true })
        .returns<Faction[]>();

    console.log('data', data);

    return (
        <React.Fragment>
            {error && (
                <section id="fetch-error" role="alert" className="alert alert-error">
                    <span>There was a problem getting your results.</span>
                </section>
            )}
            {!error && <FactionCardGrid factions={data} />}
        </React.Fragment>
    );
};

export default Index;