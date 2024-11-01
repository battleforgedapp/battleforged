import { DefArmyGroup } from "@/types/def.armygroup.type";
import { FactionDatasheetUnit } from "@/types/faction.datasheet.unit.type";

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
    createdAt: Date,
};

export default FactionDatasheet;