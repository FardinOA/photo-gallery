"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export const ImageAsync = ({ src, alt, ...props }) => {
    const { height, width, ...rest } = props;
    const [reveal, setReveal] = useState(false);
    const visibility = reveal ? "visible" : "hidden";
    const loader = reveal ? "none" : "inline-block";
    useEffect(() => {
        setReveal(false);
    }, [src]);

    return (
        <motion.div className="relative h-full rounded-lg">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: reveal ? 1 : 0 }}
                transition={{ duration: 0.9 }}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    {...rest}
                    style={{ ...props.style, visibility }}
                    onError={() => setReveal(true)}
                    // onLoadStart={() => setReveal(false)}
                    onLoadingComplete={() => setReveal(true)}
                />
            </motion.div>
            {!reveal && (
                <div className="  h-full w-full absolute top-0 left-0 rounded-lg image-loading ">
                    <div className=""></div>
                </div>
            )}
        </motion.div>
    );
};
