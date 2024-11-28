import Overview from "../section/Overview";
import SkillCardList from "../section/SkillCardList";
import ProjectCardList from "../section/ProjectCardList";
import ProjectIntroduction from "../section/ProjectIntroduction";
import PageExtender from "../widgets/pageExtender";
import {isMobile} from "react-device-detect";
import StarsCanvas from "../canvas/StarsBG";

function Projects() {
  return (
      <>
          <div className="gradient-transition"></div>
          <div className="projects-container layout-container">
              <div className="projects">
                  <Overview/>
                  <SkillCardList/>
                  <ProjectIntroduction/>
                  <ProjectCardList/>
                  {isMobile ? <></> : <PageExtender/>}
              </div>
              {/*{isMobile ? <></> : <StarsCanvas/>}*/}
          </div>
      </>

  );
}

export default Projects;