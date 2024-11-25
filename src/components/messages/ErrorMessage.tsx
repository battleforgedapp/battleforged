"use client";

import React from "react";
import { BsDatabaseFillExclamation } from "react-icons/bs";

export const ErrorMessage = ({ message = "There was a problem getting your results." } : Readonly<{ message?: string }>) => (
    <section id="fetch-error" role="alert" className="alert alert-error">
        <BsDatabaseFillExclamation />
        <span>{message}</span>
    </section>
);

export default ErrorMessage;