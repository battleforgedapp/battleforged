"use client";

import React from "react";
import { FaCrosshairs } from "react-icons/fa";
import { FactionDetachmentStratagem } from "@/types/faction.detachment.stratagem.type";

type DetachmentStratagemCardProps = {
    stratagem: FactionDetachmentStratagem
};

const StratagemDiamond = ({ children } : Readonly<{ children: React.ReactNode }>) => (
    <div className="flex items-center justify-center bg-base-100 border-2 border-accent w-10 h-10 mb-3 -rotate-45">
        <div className="rotate-45 text-accent">
            {children}
        </div>
    </div>
);

const StratagemPhaseSection = ({title, text}: Readonly<{ title: string, text: string }>) => (
    <div className="mb-1">
        <span className="text-accent uppercase">{title}:</span> <span>{text}</span>
    </div>
);

export const DetachmentStratagemCard = ({stratagem}: Readonly<DetachmentStratagemCardProps>) => {
    return (
        <div className="flex flex-row mx-2">
            <div className="flex flex-col items-center w-8 bg-accent py-3">
                <StratagemDiamond>
                    <FaCrosshairs />
                </StratagemDiamond>
                <StratagemDiamond>
                    <span className="uppercase">{stratagem.cost}CP</span>
                </StratagemDiamond>
            </div>
            <div className="border-b border-dotted">
                <div className="border-b-2 border-b-accent px-4 py-1">
                    <span className="uppercase">{stratagem.name}</span>
                </div>
                <div className="border-b border-dotted px-4 py-1 text-xs">
                    <span className="uppercase">{stratagem.type}</span>
                </div>
                <div className="px-4 py-1 text-sm">
                    <StratagemPhaseSection title="When" text={stratagem.when} />
                    <StratagemPhaseSection title="Target" text={stratagem.target} />
                    <StratagemPhaseSection title="Effect" text={stratagem.effect} />
                    {stratagem.restriction && <StratagemPhaseSection title="Restriction" text={stratagem.restriction!} />}
                </div>
            </div>

        </div>
    );
};

export default DetachmentStratagemCard;