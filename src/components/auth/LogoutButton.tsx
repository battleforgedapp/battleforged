"use client"

import React from "react";
import { useRouter} from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const LogoutButton = () => {
    const router = useRouter();
    const supabase = createClient();

    return (
        <button onClick={async () => {
            await supabase.auth.signOut();
            router.push('/');
        }}>
            Logout
        </button>
    );
};

export default LogoutButton;