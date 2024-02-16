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
        {"I'm a Front-end developer with a passion for creating beautiful Web APP."}
        <br/>
        <br/>
        {"Love Coding and Designing."}
    </>
}

export const IntroductionOverView = {
    paragraph: `As a programming developer, I have a great interest in front-end development due to its impressive 
    characteristic of seeing the results of development in real-time. Of course, 
    I am equally curious about back-end languages and related technology stacks and have learned a lot in these areas. 
    For a complete application, both front-end and back-end are essential components, and becoming a full-stack developer is one of my goals. 
    I will showcase the main languages and technology stacks I have mastered so far.`
}
export const projectOverView = {
    paragraph:
        <>
            {
                `This portfolio showcases my diverse projects over the last two years, 
                ranging from games to fully-integrated web applications with robust front and back-end systems. 
                It highlights my versatility in programming, including building dynamic interfaces for a 
                "Todo List" and a secure "Encrypt & Decrypt" application, mastering user authentication, data encryption, 
                and content management using technologies like PHP, MySQL, React, and Node.js. 
                My work on game development has also enhanced my algorithmic skills.`

            }
            <br/>
            <br/>
            <b>
            {"* Click cards to experience live demo and github icon to access the repository."}
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
