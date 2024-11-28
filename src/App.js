import Navbar from "./component/widgets/Navbar";
import Projects from "./component/layout/Projects";
import Hero from "./component/layout/Hero";
import About from "./component/layout/About";
import Test from "./test/Test";
import HeroCard from "./component/widgets/HeroCard";


function App() {
    return (
        <div className="App">
            <Navbar/>
            <Hero/>
            <Projects/>
            <About/>
            {/*<Test/>*/}
        </div>
    );
}

export default App;
