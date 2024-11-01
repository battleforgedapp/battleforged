import React from "react";
import Link from "next/link";
import Typewriter from "@/components/Typewriter";
import { createClient } from "@/utils/supabase/server";

const Index = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Battleforged ⚒️</h1>
                    <p className="py-6">
                        Your very own{' '}
                        <Typewriter />
                    </p>
                    {!user && (
                        <Link className={"btn"} href={"/sign-in"}>You need to sign in</Link>
                    )}
                    {user && (
                        <Link className={"btn"} href={"/dashboard"}>Welcome back, {user.email}</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;

/*

words={['Army Builder', 'Game Tracker', 'Battle Companion']}
                            loop={false}
                            typeSpeed={100}
                            deleteSpeed={100}
                            delaySpeed={1000}
                    {!session && (
                        <Link to="/signin" reloadDocument className="btn btn-primary">Get Started</Link>
                    )}
                    {session && (
                        <Link to="/dashboard" reloadDocument className="btn btn-primary">Continue to your
                            Dashboard</Link>
                    )}

 */