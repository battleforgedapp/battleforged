"use client";

import React from "react";
import classNames from "classnames";

type GenericCardGridProps = {
    children?: React.ReactNode | null,
    className?: string | any | null
};

/**
 * The generic card is used when displaying a set of cards in a grid. Displaying Factions, Datasheets, Rules,
 * etc. are all in cards, which we want to be consistent in displaying.
 * @constructor
 */
export const GenericCardGrid = ({ children, className, ...rest } : Readonly<GenericCardGridProps>) => (
    <div className={classNames("grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" as any, className)} {...rest}>
        {children}
    </div>
);

export default GenericCardGrid;