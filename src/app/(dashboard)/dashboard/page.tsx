import { createClient } from "@/utils/supabase/server";

const Index = async () => {
    const supabase = await createClient();
    const { data } = await supabase.from('factions').select('*');

    console.log('dashboard data', data);

    return (
        <section className={"p-3"}>
            <div>You are signed into the dashboard...</div>
        </section>
    );
};

export default Index;