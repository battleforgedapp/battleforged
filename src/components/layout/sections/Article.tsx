"use client";

import React from "react";
import classNames from "classnames";

type ArticleProps = {
    children?: React.ReactNode | string | null,
    className?: string | any | null
};

export const Article = ({ children, className, ...rest } : Readonly<ArticleProps>) => (
    <article className={classNames('' as any, className)} {...rest}>{children}</article>
);

export default Article;