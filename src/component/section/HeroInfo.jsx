import { motion } from 'framer-motion';
import { heroText} from "../../constants/config-web-paragraph";
import {customTailwind} from "../../constants/custom-tailwind";
import {isMobile} from "react-device-detect";
import HeroCard from "../widgets/HeroCard";

function HeroInfo() {
    // const isMobileCanvasCoverDiv = (
    //     <>
    //         <div className="isMobileCanvasCoverDiv-right"></div>
    //         <div className="isMobileCanvasCoverDiv-buttom"></div>
    //     </>
    // )
    // return (
    //     <motion.div
    //       className={`hero-info ${customTailwind.paddingX} flex flex-row items-start gap-5`}
    //       initial={{opacity: 0, scale: 0.5}}
    //       animate={{opacity: 1, scale: 1}}
    //       transition={{duration: 5, type: 'spring', damping: 10, stiffness: 100}}
    //     >
    //       <div className='flex flex-col justify-center items-center mt-5'>
    //           <div className='w-5 h-5 rounded-full bg-[#FF7F50]'/>
    //           <div className='w-1 sm:h-80 h-40 violet-gradient'/>
    //       </div>
    //       <motion.div>
    //           <h1 className={`${customTailwind.heroHeadText} text-white`}>{heroText.title_f}
    //               <span className='text-[#FF7F50]'>{heroText.title_l}</span>
    //           </h1>
    //           <br/>
    //           <p className={`${customTailwind.heroSubText} mt-2 text-white-100`}>
    //               {heroText.description}
    //           </p>
    //       </motion.div>
    //       {isMobile ? (
    //           isMobileCanvasCoverDiv
    //       ) : null}
    //     </motion.div>
    // );


    return (
        <HeroCard />
    );
}

export default HeroInfo;