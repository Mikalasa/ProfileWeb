import StarsCanvas from "./component/canvas/StarsBG";
import Navbar from "./component/common/Navbar";
import {BrowserRouter} from "react-router-dom";
import TheThinkerCanvas from "./component/canvas/TheThinker";
import Projects from "./component/layout/Projects";
import HeroInfo from "./component/content/HeroInfo";
import {useEffect, useRef, useState} from "react";
import MouseScrollicon from "./component/common/MouseScrollicon";
import WebglPc from "./component/canvas/WebglPc";
import About from "./component/content/About";


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
            <div className="hero-container layout-container">
                <HeroInfo/>
                <TheThinkerCanvas/>
                <MouseScrollicon/>
            </div>
            <div className="gradient-transition"></div>
            <div className="projects-container layout-container">
                <Projects/>
                <StarsCanvas/>
            </div>
            <About/>
            <div ref={webglPcRef} className="about-container layout-container">
                {loadWebglPc && <WebglPc/>}
            </div>
        </div>
    );
}

export default App;
