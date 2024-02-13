import { motion } from 'framer-motion';
import { skillCardVariants } from '../../utility/custom-motion';
import { skills } from '../../constants/custom-skill-config';
import { useInView } from 'react-intersection-observer';
import { Tilt } from 'react-tilt';


const SkillCard = ({ skill, custom }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-100px 0px",
    });
    return (
        <motion.div whileHover={{ scale: 1.05 }}>
            <Tilt className="Tilt" options={{max: 25}}>
                <motion.div
                    ref={ref}
                    className="skill-card bg-white shadow-lg overflow-hidden relative my-8"
                    variants={skillCardVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={custom}
                >
                    <motion.div
                        className="absolute"
                        initial={{rotate: 0, opacity: 0.5}}
                        animate={{rotate: 360, opacity: [0.2, 1, 0.2]}}
                        transition={{
                            rotate: {
                                repeat: Infinity,
                                ease: "linear",
                                duration: 5,
                            },
                            opacity: {
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        style={{
                            top: '-5px',
                            left: '-5px',
                            right: '-5px',
                            bottom: '-5px',
                            borderRadius: '50%',
                            background: 'linear-gradient(45deg, #08D9D6, #FF2E63, #8338EC, #08D9D6, #FF2E63, #8338EC)',
                            filter: 'blur(12px)',
                            zIndex: 1
                        }}
                    />

                    <img src={process.env.PUBLIC_URL + skill.logoURL} alt={`${skill.title} logo`}
                         className="object-cover absolute"/>
                </motion.div>
            </Tilt>
        </motion.div>

    );
};

function SkillCardList() {
    return (
        <div className="grid grid-cols-5 gap-4 p-4 mt-14">
            {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-center">
                    <SkillCard skill={skill} custom={index}/>
                </div>
            ))}
        </div>
    );
}

export default SkillCardList;