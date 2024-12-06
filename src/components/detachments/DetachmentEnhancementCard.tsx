"use client";

import React from "react";
import { FactionDetachmentEnhancement } from "@/types/faction.detachment.enhancement.type";

type DetachmentEnhancementCardProps = {
    enhancement: FactionDetachmentEnhancement
};

export const DetachmentEnhancementCard = ({ enhancement }: Readonly<DetachmentEnhancementCardProps>) => {
    return (
        <div className="border border-accent">
            <div className="flex">
                <div className="flex flex-1 items-center bg-accent text-accent-content px-2 me-2">
                    <span className="uppercase">{enhancement.name}</span>
                </div>
                <div className="bg-accent w-2 me-2">&nbsp;</div>
                <div className="bg-accent w-2 me-6">&nbsp;</div>
            </div>
            <div className="px-3 py-2">
                {enhancement.rule}
            </div>
        </div>
    );
};

export default DetachmentEnhancementCard;