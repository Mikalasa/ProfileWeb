import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./component/widgets/Navbar.jsx";
import { AutoScrollContext } from './utility/AutoScrollContext';
import withAutoScroll from "./customHooks/withAutoScroll.jsx";
import HeroCard from "./component/widgets/HeroCard";

const Hero = lazy(() => import("./component/layout/Hero.jsx"));
const ParticleTextWrapper = lazy(() => import("./component/layout/ParticleTextWrapper.jsx"));
const Overview = lazy(() => import("./component/layout/Overview.jsx"));
const Projects = lazy(() => import("./component/layout/Projects.jsx"));
const About = lazy(() => import("./component/layout/About.jsx"));

const AutoScrollHero = withAutoScroll(Hero);
const AutoScrollParticleText = withAutoScroll(ParticleTextWrapper);
const AutoScrollOverview = withAutoScroll(Overview);
const AutoScrollProjects = withAutoScroll(Projects);
const AutoScrollAbout = withAutoScroll(About);

function App() {
    const [isNavClick, setIsNavClick] = useState(false);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <AutoScrollContext.Provider value={{ isNavClick, setIsNavClick }}>
            <div className="App">
                <Navbar />
                <Suspense fallback={<div>Loading...</div>}>
                    <AutoScrollHero />
                    <AutoScrollParticleText text="Welcome to my profile website！🚀" />
                    <AutoScrollOverview />
                    <AutoScrollProjects />
                    <AutoScrollAbout />
                </Suspense>
            </div>
        </AutoScrollContext.Provider>
    );
}

export default App;
