import { DefArmyGroup } from "@/types/def.armygroup.type";
import { FactionDatasheetKeyword } from "@/types/faction.datasheet.keyword.type";
import { FactionDatasheetUnit } from "@/types/faction.datasheet.unit.type";
import { FactionDatasheetWeapon } from "@/types/faction.datasheet.weapon.type";
import FactionDatasheetAbility from "@/types/faction.datasheet.ability.type";

/**
 * Represents a datasheet that comes under an army faction
 * For example: Necron Warrior
 * Details/Stats for that unit would be unit the DataSheetUnits
 */
export type FactionDatasheet = {
    id: string,
    factionId: string,
    name: string,
    groupId: string | null,
    group: DefArmyGroup | null,
    stats: FactionDatasheetUnit[] | null,
    weapons: FactionDatasheetWeapon[] | null,
    abilities: FactionDatasheetAbility[] | null,
    keywords: FactionDatasheetKeyword | null,
    createdAt: Date,
};

export default FactionDatasheet;