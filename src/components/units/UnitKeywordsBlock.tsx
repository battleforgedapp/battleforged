"use client";

import React from "react";
import { FactionDatasheetKeyword } from "@/types/faction.datasheet.keyword.type";

const UnitKeywordsBlock = ({ keywords }: Readonly<{ keywords: FactionDatasheetKeyword | null | undefined }>) => {
    return (
        <div className="flex flex-row border-t-2 border-b-2 border-blue-800 text-sm">
            {!keywords && (
                <p>There are no keywords available for this unit.</p>
            )}
            {keywords && (
                <React.Fragment>
                    <div className="flex-1 p-2 md:border-r-2 md:border-blue-800">
                        <p>
                            <span className="uppercase">Keywords: </span>
                            {keywords.core.map((el, i) => <span key={i} className="font-bold">{el}{i < keywords.core.length - 1 ? ',' : ''}</span>)}
                        </p>
                    </div>
                    <div className="w-1/3 p-2">
                        <p>
                            <span className="uppercase">Faction Keywords: </span>
                            {keywords.faction.map((el, i) => <span key={i} className="font-bold">{el}{i < keywords.faction.length - 1 ? ',' : ''}</span>)}
                        </p>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default UnitKeywordsBlock;