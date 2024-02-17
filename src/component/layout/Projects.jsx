import Overview from "../content/Overview";
import SkillCardList from "../content/SkillCardList";
import ProjectCardList from "../content/ProjectCardList";
import ProjectIntroduction from "../content/ProjectIntroduction";
import About from "../content/About";

function Projects() {
  return (
    <div className="projects">
        <Overview />
        <SkillCardList />
        <ProjectIntroduction />
        <ProjectCardList />
        <About/>
    </div>
  );
}

export default Projects;