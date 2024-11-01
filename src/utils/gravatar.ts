import { createHash } from "node:crypto";

export function getGravatarUrl(email: string | undefined, size = 80) : string {
    if (!email) {
        return `https://www.gravatar.com/avatar/000000000000000000000000000000000000000000000000000000?s=${size}&d=retro`;
    }

    const trimmed = email.trim().toLowerCase();
    const hash = createHash('sha256').update(trimmed).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro`;
}