import Overview from "../content/Overview";
import SkillCardList from "../content/SkillCardList";
import ProjectCardList from "../content/ProjectCardList";
import ProjectIntroduction from "../content/ProjectIntroduction";
import About from "../content/About";
import {isMobile} from "react-device-detect";

function Projects() {
  return (
    <div className="projects">
        <Overview />
        <SkillCardList />
        <ProjectIntroduction />
        <ProjectCardList />
        {isMobile ? <></> : <About />}
    </div>
  );
}

export default Projects;