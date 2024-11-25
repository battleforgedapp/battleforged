"use client";

import _ from "lodash";
import React from "react";
import { FactionDatasheetWeapon } from "@/types/faction.datasheet.weapon.type";
import { GiAncientSword } from "react-icons/gi";
import { RiCrosshair2Fill } from "react-icons/ri";

export enum WeaponType {
    range,
    melee
}

export const UnitWeaponsBlockGroup = ({ autoHide, displayType, weapons }: Readonly<{ autoHide: boolean, displayType: WeaponType, weapons: FactionDatasheetWeapon[] | null }>) => {
    const displayWeapons: FactionDatasheetWeapon[] = React.useMemo(() => {
        if (!weapons) {
            return [];
        }

        const filteredWeapons = displayType === WeaponType.range
            ? weapons.filter(el => el.range !== null)
            : weapons.filter(el => el.range === null);

        return _.orderBy(filteredWeapons, ['name']);
    }, [ displayType, weapons ]);

    if (!displayWeapons || displayWeapons.length === 0 && autoHide) {
        return null;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr className="bg-blue-800 text-white">
                        <th className="max-w-2 w-2 text-center uppercase">
                            {displayType === WeaponType.range
                                ? (<RiCrosshair2Fill />)
                                : (<GiAncientSword />)
                            }
                        </th>
                        <th>{displayType === WeaponType.range ? 'Ranged Weapons' : 'Melee Weapons'}</th>
                        <th className="w-20 text-center">Range</th>
                        <th className="w-16 text-center uppercase">A</th>
                        <th className="w-16 text-center uppercase">BS</th>
                        <th className="w-16 text-center uppercase">S</th>
                        <th className="w-16 text-center uppercase">AP</th>
                        <th className="w-16 text-center uppercase">D</th>
                    </tr>
                </thead>
                <tbody>
                    {!displayWeapons || displayWeapons.length === 0 && (
                        <tr>
                            <td colSpan={8}>
                                {displayType === WeaponType.range
                                    ? `There are no ranged weapons available for this unit.`
                                    : `There are no melee weapons available for this unit.`
                                }
                            </td>
                        </tr>
                    )}
                    {displayWeapons.length > 0 && displayWeapons.map(el => (
                        <tr>
                            <td></td>
                            <td>
                                <div className="mb-1">
                                    {el.name}
                                </div>
                                {el.abilities && (
                                    <div className="flex flex-row gap-1.5">
                                        {el.abilities.map((ab, i) => <div key={i} className="text-xs border px-1 py-0.5">{ab}</div>)}
                                    </div>
                                )}
                            </td>
                            <td className="text-center">{el.range ?? 'Melee'}</td>
                            <td className="text-center">{el.attacks}</td>
                            <td className="text-center">{el.skill ?? 'N/A'}</td>
                            <td className="text-center">{el.strength}</td>
                            <td className="text-center">{el.ap}</td>
                            <td className="text-center">{el.damage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};