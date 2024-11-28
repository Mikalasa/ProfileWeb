import TheThinkerCanvas from "../canvas/TheThinker.jsx";
import MouseScrollicon from "../widgets/MouseScrollicon.jsx";
import HeroCard from "../widgets/HeroCard.jsx";
import HeroCard_Mobile from "../widgets/HeroCard_Mobile.jsx";
import { isMobile } from "react-device-detect";


function Hero() {
    return (
        <div className="hero-container h-screen layout-container">
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            {isMobile ? <HeroCard_Mobile/> : <HeroCard/>}
            <TheThinkerCanvas/>
            <MouseScrollicon/>
        </div>
    );
}

export default Hero;