import { motion } from 'framer-motion';
import {customTailwind} from "../../constants/custom-tailwind";
import { fadeIn, textVariant } from "../../utility/custom-motion";
import { projectOverView } from "../../constants/custom-config";
import { useInView } from 'react-intersection-observer';

function ProjectIntroduction() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-100px 0px",
    });
    return (
        <div id="projects" className="projects-introduction flex flex-col items-center justify-center">
            <motion.div
                ref={ref}
                className={`mt-14`} variants={textVariant(0)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}>
                <h2 className={customTailwind.sectionHeadText}>Projects.</h2>
            </motion.div>

            <motion.p
                ref={ref}
                variants={fadeIn("", "", 0.3, 4)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className='mt-4 text-[#C0C0C0] text-[17px] max-w-3xl leading-[30px]'
            >
                {projectOverView.paragraph}
            </motion.p>
        </div>
    );
}

export default ProjectIntroduction;
