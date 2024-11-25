import React from "react";
import Header from "@/components/layout/dashboard/Header";
import NavigationDrawer from "@/components/layout/dashboard/NavigationDrawer";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children } : Readonly<{ children: React.ReactNode }>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const navId = "my-drawer-3";

    if (!user) {
        redirect('/sign-in');
    }

    return (
        <NavigationDrawer navId={navId}>
            <Header navId={navId} />
            <main className="mb-3">
                {children}
            </main>
        </NavigationDrawer>
    );
};