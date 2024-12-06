"use client";

import React from "react";
import FactionDatasheetDataLayout from "@/components/layout/datasheets/FactionDatasheetDataLayout";
import useFactionDatasheetStats from "@/hooks/useFactionDatasheetStatsContext";

const FactionDatasheetStatsModal = ({ id } : Readonly<{ id: string }>) => {
    const { datasheet } = useFactionDatasheetStats();
    return (
        <dialog id={id} className="modal md:modal-bottom">
            <div className="modal-box p-0">
                <FactionDatasheetDataLayout
                    autoHideEmpty={false}
                    datasheet={datasheet}
                />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default FactionDatasheetStatsModal;