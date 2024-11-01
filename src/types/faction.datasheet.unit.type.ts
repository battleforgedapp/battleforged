export type FactionDatasheetUnit = {
    id: string,
    datasheetId: string,
    name: string | null,
    movement: number,
    toughness: number,
    saveThrow: number,
    invulnerableSave: number | null,
    wounds: number,
    leadership: number,
    objectiveControl: number,
    createdAt: Date
};

export default FactionDatasheetUnit;