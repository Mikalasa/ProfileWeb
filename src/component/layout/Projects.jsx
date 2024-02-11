import Overview from "../content/Overview";
import SkillCardList from "../content/SkillCardList";
import ProjectCardList from "../content/ProjectCardList";
import ProjectIntroduction from "../content/ProjectIntroduction";

function Projects() {
  return (
    <div className="projects">
        <Overview />
        <SkillCardList />
        <ProjectIntroduction />
        <ProjectCardList />
    </div>
  );
}

export default Projects;