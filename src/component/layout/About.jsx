import {isMobile} from "react-device-detect";
import WebglPc from "../canvas/WebglPc";
import Flat from "../canvas/Flat";
import {useEffect, useRef, useState} from "react";

function About() {
    useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 100);
    }, []);
    const [loadWebglPc, setLoadWebglPc] = useState(false);
    const webglPcRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setLoadWebglPc(true);
                    observer.unobserve(webglPcRef.current);
                }
            },
            { threshold: 0.1 }
        );
        if (webglPcRef.current) {
            observer.observe(webglPcRef.current);
        }

        return () => observer.disconnect();
    }, []);
    return (
        <div ref={webglPcRef} className="about-container layout-container">
            {!isMobile && loadWebglPc ? <WebglPc/> : loadWebglPc && <Flat/>}
        </div>
    );
}

export default About;