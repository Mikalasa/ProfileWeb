import React, { useEffect, useState, useRef } from "react";
import ParticleText from "../canvas/ParticleText";

const LazyParticleText = React.lazy(() => import("../canvas/ParticleText.jsx"));

const ParticleTextWrapper = ({ text }) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);


    return (
        <div id="ParticleText-Warpper" ref={containerRef} style={{ minHeight: "100vh" }}>
            {isVisible && (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <LazyParticleText text={text} />
                </React.Suspense>
            )}
        </div>
    );
};

export default ParticleTextWrapper;
