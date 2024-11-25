import { DefFactionCategory } from "@/types/def.factioncategory.type";
import { FactionDatasheet } from "@/types/faction.datasheet.type";
import { FactionDetachment } from "@/types/faction.detachment.type";
import { FactionRule } from "@/types/faction.rule.type";

export type Faction = {
    id: string,
    name: string,
    image: string | null,
    category: DefFactionCategory | null,
    rules: FactionRule[] | null,
    datasheets: FactionDatasheet[] | null,
    detachments: FactionDetachment[] | null,
    createdAt: Date
};