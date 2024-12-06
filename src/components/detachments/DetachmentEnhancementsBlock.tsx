"use client";

import React from "react";
import { Article } from "@/components/layout/sections/Article";
import { ArticleTitle } from "@/components/layout/sections/ArticleTitle";
import { DetachmentDataGrid } from "@/components/layout/grids/DetachmentDataGrid";
import { DetachmentEnhancementCard } from "@/components/detachments/DetachmentEnhancementCard";
import { FactionDetachmentEnhancement } from "@/types/faction.detachment.enhancement.type";

export const DetachmentEnhancementsBlock = ({ enhancements } : Readonly<{ enhancements: FactionDetachmentEnhancement[] | null | undefined }>) => {
    if (!enhancements) {
        return null;
    }

    return (
        <Article>
            <ArticleTitle>Enhancements</ArticleTitle>
            <DetachmentDataGrid className="p-4">
                {enhancements.map(el => <DetachmentEnhancementCard key={el.id} enhancement={el} />)}
            </DetachmentDataGrid>
        </Article>
    );
};

export default DetachmentEnhancementsBlock;