"use client";

import React from "react";
import classNames from "classnames";

type ArticleTitleProps = {
    children?: React.ReactNode | null,
    className?: string | any | null
};

export const ArticleTitle = ({ children, className, ...rest } : Readonly<ArticleTitleProps>) => (
    <div className="bg-primary text-primary-content px-5 py-2">
        <h2 className={classNames('font-bold text-xl uppercase' as any, className)} {...rest}>{children}</h2>
    </div>
);

export default ArticleTitle;