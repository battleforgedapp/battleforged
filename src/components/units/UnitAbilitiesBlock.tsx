"use client";

import _ from "lodash";
import React from "react";
import classNames from "classnames";
import { FactionDatasheetAbility } from "@/types/faction.datasheet.ability.type";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import { GiChewedSkull } from "react-icons/gi";
import { GiBattleTank } from "react-icons/gi";
import { IoIosWarning } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

export enum AbilityType {
    core = "core",
    faction = "faction",
    transport = "transport",
    damage = "damage",
    unit = "unit",
    restriction = "restriction"
}

export const UnitAbilitiesBlockGroup = ({ abilities, className = null }: Readonly<{ abilities: FactionDatasheetAbility[] | null | undefined, className?: string | null }>) => {
    return (
        <div className={className ?? ""}>
            <UnitAbilityDisplayTitleDisplay icon={<FaPersonDotsFromLine />} label="Abilities" />
            <UnitAbilitiesCsv type={AbilityType.core} abilities={abilities} />
            <UnitAbilitiesCsv type={AbilityType.faction} abilities={abilities} />
            <UnitAbilitiesList type={AbilityType.unit} abilities={abilities} />
            <UnitAbilityDamageCustomBlock abilities={abilities} />
            <UnitAbilityTransportCustomBlock abilities={abilities} />
        </div>
    );
};

/*
For when displaying multiple abilities one after the other. Places a dotted border below each to separate them.
 */
export const UnitAbilityDisplaySeparator = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <div className="border-b border-dotted last:border-none text-sm px-1 py-2">
        {children}
    </div>
);

/*
Custom title component that shows the block header with the faction background colour. Used to prevent replicating
class names across different components. Update once, have it change everywhere!
 */
export const UnitAbilityDisplayTitle = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <h3 className="flex items-center font-bold bg-blue-800 text-white text-sm uppercase max-h-10 p-2.5">
        {children}
    </h3>
);

/*
Custom title component that shows the block header with a custom icon all spaced evenly using classes
 */
export const UnitAbilityDisplayTitleDisplay = ({ icon = null, label }: Readonly<{ icon?: React.ReactNode | null | undefined, label: React.ReactNode | string }>) => {
    const titleClass = ['uppercase', { "mx-1.5": icon !== null }] as const;
    return (
        <UnitAbilityDisplayTitle>
            {icon && (
                <span>{icon}</span>
            )}
            <span className={classNames(titleClass)}>{label}</span>
        </UnitAbilityDisplayTitle>
    );
}

/*
Custom specific component that will display the damage information of the unit. This is because we want a custom
header vs. the generic component afforded by the UnitAbilitiesBlock
 */
export const UnitAbilityDamageCustomBlock = ({ abilities }: Readonly<{ abilities: FactionDatasheetAbility[] | null | undefined }>) => {
    const displayAbilities : FactionDatasheetAbility[] = !abilities ? [] : _.filter(abilities, el => el.type === AbilityType.damage);
    if (!displayAbilities || displayAbilities.length === 0) {
        return null;
    }

    return displayAbilities.map((el, i) => (
        <UnitAbilitiesBlock
            key={i}
            ability={el}
            icon={<GiChewedSkull />}
            title={<span className="uppercase mx-1.5">DAMAGED: {el.name} REMAINING</span>}
        />
    ))
};

/*
Custom component that will display the leader ability information including a block background colour header and custom text.
 */
export const UnitAbilityLeaderCustomBlock = ({ abilities }: Readonly<{ abilities: FactionDatasheetAbility[] | null | undefined }>) => {
    const displayAbilities : FactionDatasheetAbility[] = !abilities ? [] : _.filter(abilities, el => el.type === AbilityType.core && el.name === 'Leader');
    if (!displayAbilities || displayAbilities.length === 0) {
        return null;
    }
    return displayAbilities.map((el, i) => <UnitAbilitiesBlock key={i} ability={el} icon={<IoPerson />} />);
};

/*
Custom component that will display any restrictive abilities that the unit has including a block background colour header.
 */
export const UnitAbilityRestrictionsCustomBlock = ({ abilities }: Readonly<{ abilities: FactionDatasheetAbility[] | null | undefined }>) => {
    const displayAbilities : FactionDatasheetAbility[] = !abilities ? [] : _.filter(abilities, el => el.type === AbilityType.restriction);
    if (!displayAbilities || displayAbilities.length === 0) {
        return null;
    }
    return displayAbilities.map((el, i) => <UnitAbilitiesBlock key={i} ability={el} icon={<IoIosWarning />} />);
};

/*
Custom component that will display the transport ability information including a block background colour header.
 */
export const UnitAbilityTransportCustomBlock = ({ abilities }: Readonly<{ abilities: FactionDatasheetAbility[] | null | undefined }>) => {
    const displayAbilities : FactionDatasheetAbility[] = !abilities ? [] : _.filter(abilities, el => el.type === AbilityType.transport);
    if (!displayAbilities || displayAbilities.length === 0) {
        return null;
    }
    return displayAbilities.map((el, i) => <UnitAbilitiesBlock key={i} ability={el} icon={<GiBattleTank />}/>)
};

/*
Displaying it with CSV means it will display it in a long string/text format. (Example: Leader, Stealth, Infiltrators)
*/
export const UnitAbilitiesCsv = ({type, abilities}: Readonly<{ type: AbilityType, abilities: FactionDatasheetAbility[] | null | undefined }>) => {
    const displayAbilities : FactionDatasheetAbility[] = !abilities ? [] : _.filter(abilities, el => el.type === type);
    if (!displayAbilities || displayAbilities.length === 0) {
        return null;
    }

    return (
        <UnitAbilityDisplaySeparator>
            <p className="text-sm px-1.5">
                <span className="uppercase">{type}: </span>
                {displayAbilities.map((el, i) => (
                    <span key={i} className="font-bold">{el.name}{i < displayAbilities.length - 1 ? ', ' : ''}</span>
                ))}
            </p>
        </UnitAbilityDisplaySeparator>
    );
};

/*
Displays a list of all ability types, including the text to be displayed. See the CSV component if you just want to display
the data as just the name of the ability and not just the rule.
 */
export const UnitAbilitiesList = ({type, abilities}: Readonly<{ type: AbilityType, abilities: FactionDatasheetAbility[] | null | undefined  }>) => {
    const displayAbilities: FactionDatasheetAbility[] = !abilities ? [] : _.filter(abilities, el => el.type === type);
    if (!displayAbilities || displayAbilities.length === 0) {
        return null;
    }

    return displayAbilities.map((el) => (
        <UnitAbilityDisplaySeparator key={el.id}>
            <p className="text-sm px-1.5">
                <span className="font-bold">{el.name}: </span><span>{el.text ?? ""}</span>
            </p>
        </UnitAbilityDisplaySeparator>
    ))
}

/*
Displays an ability as a block with a custom title header (that has the background colour of the faction) and then
the text in a paragraph below the header.
 */
const UnitAbilitiesBlock = ({ ability, icon = null, title = null  }: Readonly<{ ability: FactionDatasheetAbility | null | undefined, icon?: React.ReactNode | null, title?: React.ReactNode | null }>) => {
    if (!ability) {
        return null;
    }
    return (
        <div>
            <UnitAbilityDisplayTitleDisplay icon={icon} label={title ?? ability.name} />
            {ability.text && (<p className="text-sm p-2">{ability.text}</p>)}
        </div>
    );
};
