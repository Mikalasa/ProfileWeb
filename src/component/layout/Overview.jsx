import OverviewInfo from "../section/OverviewInfo";
import SkillCardList from "../section/SkillCardList";

function overview() {
    return (
        <section id="overview">
            <div className="gradient-transition"></div>
            <div className="layout-container">
                <div className="projects">
                    <OverviewInfo/>
                    <SkillCardList/>
                </div>
            </div>
        </section>
    );
}

export default overview;