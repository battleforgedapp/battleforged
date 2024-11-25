export type FactionDetachmentStratagem = {
    id: string,
    detachmentId: string,
    name: string,
    type: string,
    cost: number,
    when: string,
    target: string,
    effect: string,
    restriction: string | null,
    createdAt: Date
};