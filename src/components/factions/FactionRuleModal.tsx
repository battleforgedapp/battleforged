"use client";

import React from "react";
import FactionRuleDataLayout from "@/components/layout/datasheets/FactionRuleDataLayout";
import useFactionRuleData from "@/hooks/useFactionRuleDataContext";

const FactionRuleModal = ({ id } : Readonly<{ id: string }>) => {
    const { rule } = useFactionRuleData();
    return (
        <dialog id={id} className="modal md:modal-bottom">
            <div className="modal-box p-0">
                <FactionRuleDataLayout rule={rule} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default FactionRuleModal;