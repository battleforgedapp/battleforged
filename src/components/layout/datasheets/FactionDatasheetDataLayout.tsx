"use client";

import React from "react"
import FactionDatasheet from "@/types/faction.datasheet.type";
import UnitKeywordsBlock from "@/components/units/UnitKeywordsBlock";
import { UnitStatsBlockGroup } from "@/components/units/UnitStatsBlock";
import { UnitWeaponsBlockGroup, WeaponType } from "@/components/units/UnitWeaponsBlock";
import { UnitAbilitiesBlockGroup, UnitAbilityLeaderCustomBlock, UnitAbilityRestrictionsCustomBlock } from "@/components/units/UnitAbilitiesBlock";

/**
 * Used to display all the stats, weapons and abilities about a specific datasheet/unit
 * @constructor
 */
const FactionDatasheetDataLayout = ({ autoHideEmpty, datasheet }: Readonly<{ autoHideEmpty: boolean | null | undefined, datasheet: FactionDatasheet | null | undefined }>) => {
    if (!datasheet) {
        return (
            <div>
                <p>Datasheet data could not be found.</p>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="px-5 py-3 bg-blue-800 text-white sticky">
                <UnitStatsBlockGroup unitName={datasheet.name} stats={datasheet.stats} />
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col flex-1 md:border-r-2 md:border-blue-800">
                    <UnitWeaponsBlockGroup autoHide={autoHideEmpty ?? false} displayType={WeaponType.range} weapons={datasheet.weapons} />
                    <UnitWeaponsBlockGroup autoHide={autoHideEmpty ?? false} displayType={WeaponType.melee} weapons={datasheet.weapons} />
                    <UnitAbilitiesBlockGroup className="md:hidden" abilities={datasheet.abilities} />
                    <UnitAbilityLeaderCustomBlock abilities={datasheet.abilities} />
                    <UnitAbilityRestrictionsCustomBlock abilities={datasheet.abilities} />
                </div>
                <div className="w-1/3 hidden md:block">
                    <UnitAbilitiesBlockGroup abilities={datasheet.abilities} />
                </div>
            </div>
            <UnitKeywordsBlock keywords={datasheet.keywords} />
        </React.Fragment>
    );
};

export default  FactionDatasheetDataLayout;