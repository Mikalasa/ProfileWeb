import StarsCanvas from "./component/canvas/StarsBG";
import Navbar from "./component/common/Navbar";
import TheThinkerCanvas from "./component/canvas/TheThinker";
import Projects from "./component/layout/Projects";
import HeroInfo from "./component/content/HeroInfo";
import {useEffect, useRef, useState} from "react";
import MouseScrollicon from "./component/common/MouseScrollicon";
import WebglPc from "./component/canvas/WebglPc";
import { isMobile } from 'react-device-detect';
import Iphone from "./component/canvas/Iphone";


function App() {
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
        <div className="App">
            <Navbar/>
            <div className="hero-container h-screen layout-container">
                <HeroInfo/>
                <TheThinkerCanvas/>
                <MouseScrollicon/>
            </div>
            <div className="gradient-transition"></div>
            <div className="projects-container layout-container">
                <Projects/>
                <StarsCanvas/>
            </div>
            <div ref={webglPcRef} className="about-container layout-container">
                {!isMobile && loadWebglPc ? <WebglPc /> : loadWebglPc && <Iphone />}
            </div>
        </div>
    );
}

export default App;
