import HeroInfo from "../section/HeroInfo";
import TheThinkerCanvas from "../canvas/TheThinker";
import MouseScrollicon from "../widgets/MouseScrollicon";

function Hero() {
    return (
        <div className="hero-container h-screen layout-container">
            <HeroInfo/>
            <TheThinkerCanvas/>
            <MouseScrollicon/>
        </div>
    );
}

export default Hero;