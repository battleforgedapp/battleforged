"use client";

import React from "react";
import { Article } from "@/components/layout/sections/Article";
import { ArticleTitle } from "@/components/layout/sections/ArticleTitle";
import { DetachmentDataGrid } from "@/components/layout/grids/DetachmentDataGrid";
import { DetachmentStratagemCard } from "@/components/detachments/DetachmentStratagemCard";
import { FactionDetachmentStratagem } from "@/types/faction.detachment.stratagem.type";

export const DetachmentStratagemsBlock = ({ stratagems }: Readonly<{ stratagems: FactionDetachmentStratagem[] | null | undefined }>) => {
    if (!stratagems) {
        return null;
    }

    return (
        <Article>
            <ArticleTitle>Stratagems</ArticleTitle>
            <DetachmentDataGrid className="p-4">
                {stratagems.map(el => <DetachmentStratagemCard key={el.id} stratagem={el} />)}
            </DetachmentDataGrid>
        </Article>
    );
};

export default DetachmentStratagemsBlock;