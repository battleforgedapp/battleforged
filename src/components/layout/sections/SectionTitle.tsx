"use client";

import React from "react";
import classNames from "classnames";

type SectionTitleProps = {
    children?: React.ReactNode | string | null,
    className?: string | any | null
}

export const SectionTitle = ({ children, className, ...rest } : Readonly<SectionTitleProps>) => (
    <h2 className={classNames('text-xl mb-1.5' as any, className)} {...rest}>{children}</h2>
);

export default SectionTitle;