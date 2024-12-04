import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import Navbar from "./component/widgets/Navbar.jsx";
import Projects from "./component/layout/Projects.jsx";
import Hero from "./component/layout/Hero.jsx";
import About from "./component/layout/About.jsx";
import MobileWarningModal from "./component/modal/MobileWarningModal.jsx";
import ParticleText from "./component/canvas/ParticleText.jsx";

function App() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isMobile) {
            setShowModal(true);
        }
    }, []);

    return (
        <div className="App">
            {showModal && <MobileWarningModal onClose={() => setShowModal(false)} />}
            <Navbar />
            <Hero />
            <ParticleText text="China is a beautiful country！She has a long history and a colorful culture！"/>
            <Projects />
            <About />
        </div>
    );
}

export default App;
