"use client";

import React from "react";
import classNames from "classnames";

type DetachmentDataGridProps = {
    children?: React.ReactNode | null,
    className?: string | any | null
};

export const DetachmentDataGrid = ({ children, className, ...rest } : Readonly<DetachmentDataGridProps>) => (
    <div className={classNames("grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" as any, className)} {...rest}>
        {children}
    </div>
);

export default DetachmentDataGrid;