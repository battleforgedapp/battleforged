"use client";

import React from "react";
import { FactionDatasheetUnit } from "@/types/faction.datasheet.unit.type";

export const UnitStatsBlockGroup = ({ unitName, stats }: Readonly<{ unitName: string, stats: FactionDatasheetUnit[] | null }>) => {
    return (
        <div>
            <h3 className="font-bold text-xl uppercase mb-1">{unitName}</h3>
            {!stats && (
                <p>There are no stats available for this unit.</p>
            )}
            {stats && stats.map(el => (
                <div key={el.id} className="flex flex-row items-end mb-2">
                    <UnitStatsBlock label="m" value={el.movement} suffix={'"'} />
                    <UnitStatsBlock label="t" value={el.toughness} suffix={null} />
                    <UnitStatsBlock label="sv" value={el.saveThrow} suffix={'+'} />
                    <UnitStatsBlock label="w" value={el.wounds} suffix={null} />
                    <UnitStatsBlock label="ld" value={el.leadership} suffix={'+'} />
                    <UnitStatsBlock label="oc" value={el.objectiveControl} suffix={null} />
                    {el.name && (
                        <div>
                            <span>{el.name}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
};

const UnitStatsBlock = ({label, value, suffix }: Readonly<{ label: string, value: number, suffix: string | null | undefined }>) => {
    return (
        <div className="flex flex-col me-3">
            <span className="text-center font-bold text-xs uppercase mb-1">{label}</span>
            <div className="border w-9 h-9 flex justify-center items-center bg-white text-black rounded">
                <p className="font-bold text-lg uppercase">{value ?? '-'}{suffix}</p>
            </div>
        </div>
    );
};

export default UnitStatsBlock;