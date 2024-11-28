import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import Navbar from "./component/widgets/Navbar.jsx";
import Projects from "./component/layout/Projects.jsx";
import Hero from "./component/layout/Hero.jsx";
import About from "./component/layout/About.jsx";
import MobileWarningModal from "./component/modal/MobileWarningModal.jsx";

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
            <Projects />
            <About />
        </div>
    );
}

export default App;
