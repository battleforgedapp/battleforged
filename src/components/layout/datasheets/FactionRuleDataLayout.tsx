"use client";

import React from "react";
import {FactionRule} from "@/types/faction.rule.type";

const FactionRuleDataLayout = ({ rule } : Readonly<{ rule : FactionRule | null }>) => {
    if (!rule) {
        return (
            <div>
                <p>Rule data could not be found.</p>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="px-5 py-3 bg-blue-800 text-white sticky">
                <h3 className="font-bold text-xl uppercase mb-1">{rule.name}</h3>
            </div>
            <div className="flex flex-row px-5 py-4">
                {rule.rule}
            </div>
        </React.Fragment>
    );
};

export default FactionRuleDataLayout;