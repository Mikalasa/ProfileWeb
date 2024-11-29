import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Preload, PresentationControls, useGLTF } from '@react-three/drei';
import CanvasLoader from "../widgets/CanvasLoader.jsx";
import { TextureLoader, Clock } from "three";
import { useSpring, animated } from '@react-spring/three';

function useOperatingSystem() {
    const [os, setOs] = useState('');

    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        if (userAgent.includes('Win')) setOs('windows');
        if (userAgent.includes('Mac')) setOs('mac');
    }, []);

    return os;
}

const MacModel = ({ startAnimation }) => {
    const scene = useGLTF(process.env.PUBLIC_URL + '/pc.glb', true, "draco");

    const dirLightRef = useRef();
    const os = useOperatingSystem();

    const { position: modelPosition, rotation: modelRotation } = useSpring({
        from: { position: [-10, -2.8, -15], rotation: [0, Math.PI / 2, 0] },
        to: { position: [3, -2.8, 5.5], rotation: [0, -Math.PI / 2, 0] },
        config: { tension: 40, friction: 15 },
        reset: startAnimation,
    });

    const { position: iframePosition } = useSpring({
        from: { position: [-10 - 3, -2.8 + 3, -15 - 1.2] },
        to: { position: [3 - 3, -2.8 + 3, 5.5 - 1.2] },
        config: { tension: 40, friction: 15 },
        reset: startAnimation,
    });

    useEffect(() => {
        if (scene) {
            scene.scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }
    }, [scene]);

    return (
        <>
            <ambientLight intensity={2} color={"#ffffff"} />
            <directionalLight
                ref={dirLightRef}
                intensity={0.3}
                position={[4, -1, 10]}
                castShadow
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
                shadow-radius={10}
            />
            <pointLight position={[4, 0, 8]} intensity={50} color={"#7cb3c4"} castShadow shadow-mapSize-width={256}
                        shadow-mapSize-height={256} shadow-radius={10} />
            <pointLight position={[-7, 1, 8]} intensity={100} color={"#d24e4e"} castShadow shadow-mapSize-width={256}
                        shadow-mapSize-height={256} shadow-radius={10} />
            <pointLight position={[2, 1, -8]} intensity={50} color={"#a308ef"} castShadow shadow-mapSize-width={256}
                        shadow-mapSize-height={256} shadow-radius={10} />

            <animated.group position={modelPosition} rotation={modelRotation}>
                <primitive
                    object={scene.scene}
                    scale={1}
                />
            </animated.group>

            <animated.group position={iframePosition}>
                <Html
                    transform
                    occlude
                    wrapperClass="webgl-iframe-wrapper"
                    distanceFactor={1.65}
                >
                    <iframe
                        title={"iframe-pc"}
                        className={`webgl-iframe webgl-iframe-${os}`}
                        sandbox="allow-scripts allow-same-origin"
                        loading="lazy"
                        src="https://mikalasa.github.io/ProfileWeb-Iframe-About/"
                    />
                </Html>
            </animated.group>
        </>
    );
};


const Wall = () => {
    const texture = useMemo(() => new TextureLoader().load(process.env.PUBLIC_URL + "/pc-ground.webp"), []);

    return (
        <mesh
            position={[0, 0, -12]}
            rotation={[0, 0, Math.PI / 2]}
            receiveShadow
            castShadow
        >
            <planeGeometry args={[200, 200]} />
            <meshPhysicalMaterial
                map={texture}
                metalness={0.5}
                roughness={0.4}
            />
        </mesh>
    );
};

const WebglPc = () => {
    const [startAnimation, setStartAnimation] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let timer = null;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            setStartAnimation(true);
                        }, 500);
                    }
                });
            },
            { threshold: 0.05 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const FrameLimiter = ({ fps }) => {
        const clock = useRef(new Clock());
        const frameInterval = 1 / fps;
        const lastFrameTime = useRef(0);

        useFrame((state) => {
            const elapsedTime = clock.current.getElapsedTime();
            if (elapsedTime - lastFrameTime.current >= frameInterval) {
                lastFrameTime.current = elapsedTime;
                state.gl.render(state.scene, state.camera);
            }
        });

        return null;
    };

    return (
        <div className="mac-bg" ref={sectionRef}>
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 15], fov: 25 }}
                gl={{ antialias: true, alpha: false }}
            >
                <FrameLimiter fps={30} />

                <Suspense fallback={<CanvasLoader />}>
                    <PresentationControls
                        snap
                        config={{ tension: 120, friction: 20 }}
                        azimuth={[(-20 * Math.PI) / 180, (20 * Math.PI) / 180]}
                        polar={[(-5 * Math.PI) / 180, (15 * Math.PI) / 180]}
                    >
                        <MacModel startAnimation={startAnimation} />
                        <Wall />
                    </PresentationControls>
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
};

export default WebglPc;
