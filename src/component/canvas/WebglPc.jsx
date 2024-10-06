import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Preload, PresentationControls, useGLTF } from '@react-three/drei';
import CanvasLoader from "./CanvasLoader";
import { CanvasTexture, LinearFilter } from "three";
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
    const scene = useGLTF("./pc.glb");
    const dirLightRef = useRef();
    const os = useOperatingSystem();

    const { position: modelPosition, rotation: modelRotation } = useSpring({
        from: { position: [-10, -2.8, -15], rotation: [0, Math.PI / 2, 0] },
        to: { position: [3, -2.8, 5.5], rotation: [0, - Math.PI / 2, 0] },
        config: { tension: 40, friction: 15 },
        reset: startAnimation,
    });

    // compute relative position of iframe
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
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-radius={10}
            />
            <pointLight position={[4, 0, 8]} intensity={50} color={"#7cb3c4"} castShadow shadow-mapSize-width={512}
                shadow-mapSize-height={512} shadow-radius={10} />
            <pointLight position={[-7, 1, 8]} intensity={100} color={"#d24e4e"} castShadow shadow-mapSize-width={512}
                shadow-mapSize-height={512} shadow-radius={10} />
            <pointLight position={[2, 1, -8]} intensity={50} color={"#a308ef"} castShadow shadow-mapSize-width={512}
                shadow-mapSize-height={512} shadow-radius={10} />

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
                        className={`webgl-iframe webgl-iframe-${os}`}
                        src="https://mikalasa.github.io/ProfileWeb-Iframe-About/"
                    />
                </Html>
            </animated.group>
        </>
    );
};


const Wall = () => {
    const gradientTexture = useMemo(() => {
        const size = 100;
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#1e1e1e'); // start color
        gradient.addColorStop(1, '#212121'); // end color
        context.fillStyle = gradient;
        context.fillRect(0, 0, size, size);
        const texture = new CanvasTexture(canvas);
        texture.minFilter = LinearFilter;
        return texture;
    }, []);

    return (
        <mesh
            position={[0, 0, -12]}
            rotation={[0, 0, Math.PI / 2]}
            receiveShadow
            castShadow
        >
            <planeGeometry args={[200, 200]} />
            <meshPhysicalMaterial
                map={gradientTexture}
                metalness={0.5}
                roughness={0.4}
            />
        </mesh>
    );
};

function WebglPc() {
    const [startAnimation, setStartAnimation] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStartAnimation(true);

                        const currentScrollY = window.scrollY;  // current scroll position
                        const sectionTop = sectionRef.current.getBoundingClientRect().top + currentScrollY;  // active section top

                        window.scrollTo({
                            top: sectionTop,
                            behavior: 'smooth',
                        });
                    }
                });
            },
            { threshold: 0.05 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div className="mac-bg" ref={sectionRef}>
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 15], fov: 25, near: 0.1, far: 200 }}
                gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <PresentationControls
                        snap={true}
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
}

export default WebglPc;
