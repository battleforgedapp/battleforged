"use client";

import React from "react";
import { Typewriter as ReactTypewriter } from "react-simple-typewriter";

const Typewriter = () => {
    return (
        <ReactTypewriter
            words={['Army Builder', 'Game Tracker', 'Battle Companion']}
            loop={false}
            typeSpeed={100}
            deleteSpeed={100}
            delaySpeed={1000}
        />
    );
};

export default Typewriter;