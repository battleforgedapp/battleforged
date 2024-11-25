"use client";

import React from "react";
import classNames from "classnames";

type SectionProps = {
    children?: React.ReactNode | null,
    className?: string | any | null
};

export const Section = ({ children, className, ...rest } : Readonly<SectionProps>) => (
    <section className={classNames('px-4 py-2' as any, className)} {...rest}>{children}</section>
);

export default Section;