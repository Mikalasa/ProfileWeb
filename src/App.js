import Navbar from "./component/widgets/Navbar";
import Projects from "./component/layout/Projects";
import Hero from "./component/layout/Hero";
import About from "./component/layout/About";


function App() {
    return (
        <div className="App">
            <Navbar/>
            <Hero/>
            <Projects/>
            <About/>
        </div>
    );
}

export default App;
