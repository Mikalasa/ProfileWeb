import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

export const navLinks = [
    {
        id: "overview",
        title: "Overview",
    },
    {
        id: "projects",
        title: "Projects",
    },
    {
        id: "about",
        title: "About",
    },
];

export const heroText = {
    title_f: "Hi, I'm ",
    title_l: "Xingyi",
    description: <>
        {"A passion developer creating beautiful web applications."}
    </>
}

export const IntroductionOverView = {
    paragraph: `I’m passionate about front-end development because it provides real-time results.
    I’ve also developed solid knowledge of back-end technologies.
    Both are essential for building complete applications, and becoming a full-stack developer is one of my goals.
    Below are the main languages and tech stacks I’ve mastered.`
}
export const projectOverView = {
    paragraph:
        <>
            {
                `This portfolio showcases my diverse projects from the past two years,
                ranging from games to fully integrated web applications with robust front-end and back-end systems.
                It highlights my versatility in programming.`
            }
            <br/>
            <br/>
            <b>
                {"* Click on the cards to experience the live demo."}
            </b>
            <br/>
            <b>
                {"* Click on the GitHub icon to view the source code."}
            </b>
        </>
}

export const aboutOverView = {
    paragraph:
        <>
            {
                `During more than two years of learning and working in code development, I have accumulated experience in the relevant industry.
                If you would like to know more about my experiences, please kindly browse through the webpage on the monitor below.`
            }
        </>
}

export {
    menu,
    close,
};
