import React from "react";
import { motion, useInView } from 'framer-motion';

function MySocial({handle808Page}) {
    const [isOrbit1Paused, setIsOrbit1Paused] = React.useState(false);
    const [isOrbit2Paused, setIsOrbit2Paused] = React.useState(false);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 3, delay: 0 },
        },
    };

    const handleHover = (e) => {
        // console.log(e.target);
        let theTarget = e.target.firstChild
        // console.log(theTarget);
        if (theTarget.alt.includes('orbit1')) {
            setIsOrbit1Paused(true);
        }
        if (theTarget.alt.includes('orbit2')) {
            setIsOrbit2Paused(true);
        }
    }

    const handleHoverLeave = (e) => {
        let theTarget = e.target.firstChild
        if (theTarget.alt.includes('orbit1')) {
            setIsOrbit1Paused(false);
        }
        if (theTarget.alt.includes('orbit2')) {
            setIsOrbit2Paused(false);
        }
    }

    const handleIconClick = (url, orbit, socialStatus, name) => {
        if (socialStatus === 'done') {
            window.open(url, '_blank');
        } else if (socialStatus === 'undone') {
            handle808Page(name);
        }
        if (orbit === 'orbit1') {
            setIsOrbit1Paused(false);
        }
        if (orbit === 'orbit2') {
            setIsOrbit2Paused(false);
        }
    }

    const myBlogIcon = process.env.PUBLIC_URL + '/blog.png';
    const mediumIcon = "https://cdn.simpleicons.org/medium/000000";
    const youtubeIcon = "https://cdn.simpleicons.org/youtube/FF0000";
    const bilibiliIcon = "https://cdn.simpleicons.org/bilibili/00A1D6";
    const xIcon = "https://cdn.simpleicons.org/x/000000";
    const behanceIcon = "https://cdn.simpleicons.org/behance/1769FF";

    const orbitHTML = () => {
        return (
            <div className="my-social-box">
                <h2 className={"text-[30px] gradient-title-text"}>Follow me on</h2>
                <div className="orbit-system-box">
                    <div className={'orbit-system-box-bg'}></div>
                    {/* GitHub Icon */}
                    <div className="sun"
                         onClick={() => handleIconClick('https://github.com/Mikalasa', 'sun', 'done')}
                    >
                        <img
                            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            alt="GitHub"
                        />
                    </div>

                    {/* Orbit1: Medium, Youtube, Medium */}
                    <div className={`orbit-1 orbit-1-move ${isOrbit1Paused ? 'paused' : ''}`}>
                        <div className="planet-wrapper">
                            <div className="planet"
                                 onMouseEnter={handleHover}
                                 onMouseLeave={handleHoverLeave}
                                 onClick={() => handleIconClick('https://medium.com/@xingyi-posts', 'orbit1', 'done', 'medium')}
                            >
                                <img
                                    src={mediumIcon}
                                    alt="Medium orbit1"
                                />
                            </div>
                        </div>
                        <div className="planet-wrapper">
                            <div className="planet"
                                 onMouseEnter={handleHover}
                                 onMouseLeave={handleHoverLeave}
                                 onClick={() => handleIconClick('https://youtube.com', 'orbit1', 'undone', 'youtube')}
                            >
                                <img
                                    src={youtubeIcon}
                                    alt="Youtube orbit1"
                                />
                            </div>
                        </div>
                        <div className="planet-wrapper">
                            <div className="planet"
                                 onMouseEnter={handleHover}
                                 onMouseLeave={handleHoverLeave}
                                 onClick={() => handleIconClick('https://mikalasa.github.io/my-blog/', 'orbit1', 'done', 'blog')}
                            >
                                <img
                                    src={myBlogIcon}
                                    alt="Medium orbit1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Orbit2: Bilibili, Twitter, Behance */}
                    <div className={`orbit-2 orbit-2-move ${isOrbit2Paused ? 'paused' : ''}`}>
                        <div className="planet-wrapper">
                            <div className="planet"
                                 onMouseEnter={handleHover}
                                 onMouseLeave={handleHoverLeave}
                                 onClick={() => handleIconClick('https://www.bilibili.com', 'orbit2', 'undone', 'bilibili')}
                            >
                                <img
                                    src={bilibiliIcon}
                                    alt="Bilibili orbit2"
                                />
                            </div>
                        </div>
                        <div className="planet-wrapper">
                            <div className="planet"
                                 onMouseEnter={handleHover}
                                 onMouseLeave={handleHoverLeave}
                                 onClick={() => handleIconClick('https://twitter.com', 'orbit2', 'undone', 'twitter')}
                            >
                                <img
                                    src={xIcon}
                                    alt="Twitter orbit2"
                                />
                            </div>
                        </div>
                        <div className="planet-wrapper">
                            <div className="planet"
                                 onMouseEnter={handleHover}
                                 onMouseLeave={handleHoverLeave}
                                 onClick={() => handleIconClick('https://www.behance.net/xingyixxx', 'orbit2', 'done', 'behance')}
                            >
                                <img
                                    src={behanceIcon}
                                    alt="Behance orbit2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'} // 滚动触发动画
            variants={fadeInVariants}
        >
            {orbitHTML()}
        </motion.div>
    );
}

export default MySocial;
