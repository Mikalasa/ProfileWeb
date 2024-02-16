import { motion } from 'framer-motion';
import {customTailwind} from "../../constants/custom-tailwind";
import { fadeIn, textVariant } from "../../utility/custom-motion";
import {IntroductionOverView} from "../../constants/custom-config";
import { useInView } from 'react-intersection-observer';

function Overview() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-100px 0px",
    });
    return (
        <>
            <motion.div
                ref={ref}
                className={`mt-14`} variants={textVariant(0)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}>
                <p className={customTailwind.sectionSubText}>Introduction Skills</p>
                <h2 className={customTailwind.sectionHeadText}>Overview.</h2>
            </motion.div>

            <motion.p
                ref={ref}
                variants={fadeIn("", "", 0.3, 4)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className='mt-4 text-[#C0C0C0] text-[17px] max-w-3xl leading-[30px]'
            >
                {IntroductionOverView.paragraph}
            </motion.p>
        </>
    );
}

export default Overview;
