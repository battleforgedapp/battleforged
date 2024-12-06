"use client";

import React from "react";
import FactionDetachmentDataLayout from "@/components/layout/datasheets/FactionDetachmentDataLayout";
import useFactionDetachmentData from "@/hooks/useFactionDetachmentData";

const FactionDetachmentModal = ({ id } : Readonly<{ id: string }>) => {
    const { detachment } = useFactionDetachmentData();
    return (
        <dialog id={id} className="modal md:modal-bottom">
            <div className="modal-box p-0">
                <FactionDetachmentDataLayout detachment={detachment} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default FactionDetachmentModal;