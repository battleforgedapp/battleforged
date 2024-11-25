export type FactionDatasheetWeapon = {
    id: string,
    datasheetId: string,
    name: string,
    range: number | null,
    attacks: number,
    skill: number | null,
    strength: number,
    ap: number,
    damage: string,
    abilities: string[] | null
};

export default FactionDatasheetWeapon;