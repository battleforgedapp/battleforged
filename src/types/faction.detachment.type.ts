import { FactionDetachmentEnhancement } from "@/types/faction.detachment.enhancement.type";
import { FactionDetachmentStratagem } from "@/types/faction.detachment.stratagem.type";

export type FactionDetachment = {
    id: string,
    factionId: string,
    name: string,
    rule: string | null,
    enhancements: FactionDetachmentEnhancement[] | null,
    stratagems: FactionDetachmentStratagem[] | null,
    createdAt: Date
};