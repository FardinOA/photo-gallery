"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export const ImageAsync = ({ src, alt, loaderSize, ...props }) => {
    const { height, width, ...rest } = props;
    const [reveal, setReveal] = useState(false);
    const visibility = reveal ? "visible" : "hidden";
    const loader = reveal ? "none" : "inline-block";
    useEffect(() => {
        setReveal(false);
    }, [src]);
    // console.log(props);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: reveal ? 1 : 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
            style={{
                height: "100%",
            }}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                {...rest}
                style={{ ...props.style, visibility, height: "100%" }}
                onError={() => setReveal(true)}
                // onLoadStart={() => setReveal(false)}
                onLoadingComplete={() => setReveal(true)}
            />
            <div
                style={{
                    display: loader,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    ...loaderSize,
                }}
                className="image-loading"
            >
                <div className="image"></div>
            </div>
        </motion.div>
    );
};
