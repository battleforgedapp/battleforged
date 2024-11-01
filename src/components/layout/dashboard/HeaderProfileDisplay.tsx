import React from "react";
import LogoutButton from "@/components/auth/LogoutButton";
import { createClient } from "@/utils/supabase/server";
import { getGravatarUrl } from "@/utils/gravatar";

const HeaderProfileDisplay = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const imageUrl = getGravatarUrl(user.email);
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img alt={user.email} src={imageUrl} />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Settings</a></li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </div>
    )
};

export default HeaderProfileDisplay;