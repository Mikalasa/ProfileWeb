import StarsCanvas from "./component/canvas/StarsBG";
import Navbar from "./component/common/Navbar";
import {HashRouter} from "react-router-dom";
import TheThinkerCanvas from "./component/canvas/TheThinker";
import Projects from "./component/layout/Projects";
import HeroInfo from "./component/content/HeroInfo";
import {useEffect} from "react";
import MouseScrollicon from "./component/common/MouseScrollicon";
import WebglPc from "./component/canvas/WebglPc";
import About from "./component/content/About";


function App() {
    useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 100);
    }, []);

    useEffect(() => {
        // adjustParentHeight();
    }, []);

    return (
        <HashRouter>
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
                <About />
                <div className="about-container layout-container">
                    <WebglPc/>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
