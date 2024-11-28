import { motion } from 'framer-motion';
import { skillCardVariants } from '../../utility/custom-motion';
import { skills } from '../../constants/config-skills';
import { useInView } from 'react-intersection-observer';


const SkillCard = ({ skill, custom }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-100px 0px",
    });
    return (
        <motion.div whileHover={{scale: 1.05}}>
            <motion.div
                ref={ref}
                className="skill-card bg-white shadow-lg overflow-hidden relative my-4 sm:my-6 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
                variants={skillCardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={custom}
            >
                <motion.div/>
                <img src={process.env.PUBLIC_URL + skill.logoURL} alt={`${skill.title} logo`}
                     className="object-cover w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] absolute"/>
            </motion.div>
        </motion.div>

    );
};

function SkillCardList() {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-0 sm:p-4 mt-14">
            {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-center">
                    <SkillCard skill={skill} custom={index}/>
                </div>
            ))}
        </div>
    );
}

export default SkillCardList;