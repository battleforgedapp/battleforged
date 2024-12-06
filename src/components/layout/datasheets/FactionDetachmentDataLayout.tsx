"use client";

import React from "react";
import { FactionDetachment } from "@/types/faction.detachment.type";
import { DetachmentEnhancementsBlock } from "@/components/detachments/DetachmentEnhancementsBlock";
import { DetachmentStratagemsBlock } from "@/components/detachments/DetachmentStatagemsBlock";

const FactionDetachmentDataLayout = ({ detachment } : Readonly<{ detachment: FactionDetachment | null | undefined }>) => {
    if (!detachment) {
        return (
            <div>
                <p>Detachment data could not be found.</p>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="px-5 py-3 bg-primary text-primary-content sticky top-0">
                <h3 className="font-bold text-xl uppercase mb-1">{detachment.name}</h3>
            </div>
            <div className="flex flex-col">
                <div className="px-5 py-4">
                    <p>{detachment.rule}</p>
                </div>
                <DetachmentEnhancementsBlock enhancements={detachment.enhancements} />
                <DetachmentStratagemsBlock stratagems={detachment.stratagems} />
            </div>
        </React.Fragment>
)
};

export default FactionDetachmentDataLayout;