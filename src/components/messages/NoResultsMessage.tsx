"use client";

import React from "react";
import { BsDatabaseFillX } from "react-icons/bs";

export const NoResultsMessage = ({ message = "There are no results available" } : Readonly<{ message?: string }>) => (
    <article id="no-results" role="alert" className="alert my-1">
        <BsDatabaseFillX className="text-info" />
        <span>{message}</span>
    </article>
);

export default NoResultsMessage;