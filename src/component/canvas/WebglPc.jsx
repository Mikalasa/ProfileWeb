// WebglPc.jsx

import React, { Suspense, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Preload, PresentationControls, useGLTF, PerformanceMonitor } from '@react-three/drei';
import CanvasLoader from "../widgets/CanvasLoader.jsx";
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

// Custom hook to detect the user's operating system
const useOperatingSystem = () => {
    const [os, setOs] = React.useState('unknown');

    React.useEffect(() => {
        const userAgent = window.navigator.userAgent;
        if (userAgent.includes('Win')) setOs('windows');
        else if (userAgent.includes('Mac')) setOs('mac');
    }, []);

    return os;
};

// Memoized MacModel component
const MacModel = React.memo(() => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/pc.glb`);

    // Memoized positions and rotations
    const modelPosition = useMemo(() => [3, -2.8, 5.5], []);
    const modelRotation = useMemo(() => [0, -Math.PI / 2, 0], []);
    const iframePosition = useMemo(() => [0, 0.2, 4.3], []);

    const os = useOperatingSystem();

    // Enable shadows on meshes
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);


    return (
        <>
            {/* Original ambient light */}
            <ambientLight intensity={2} color={"#ffffff"} />

            {/* Original point lights */}
            <pointLight
                position={[4, 0, 8]}
                intensity={50}
                color={"#7cb3c4"}
                castShadow
                shadow-mapSize-width={128}
                shadow-mapSize-height={128}
                shadow-radius={10}
            />
            <pointLight
                position={[-7, 1, 8]}
                intensity={100}
                color={"#d24e4e"}
                castShadow
                shadow-mapSize-width={128}
                shadow-mapSize-height={128}
                shadow-radius={10}
            />
            <pointLight
                position={[2, 1, -8]}
                intensity={50}
                color={"#a308ef"}
                castShadow
                shadow-mapSize-width={128}
                shadow-mapSize-height={128}
                shadow-radius={10}
            />

            {/* Mac model */}
            <group position={modelPosition} rotation={modelRotation}>
                <primitive object={scene} scale={1} />
            </group>

            {/* iFrame content */}
            <group position={iframePosition}>
                <Html
                    transform
                    wrapperClass="webgl-iframe-wrapper"
                    distanceFactor={1.65}
                    occlude
                >
                    <iframe
                        title="iframe-pc"
                        className={`webgl-iframe webgl-iframe-${os}`}
                        sandbox="allow-scripts allow-same-origin"
                        loading="lazy"
                        src="https://mikalasa.github.io/ProfileWeb-Iframe-About/"
                    />
                </Html>
            </group>
        </>
    );
});

// Preload the GLTF model to improve loading times
useGLTF.preload(`${process.env.PUBLIC_URL}/pc.glb`);

// Memoized Wall component
const Wall = React.memo(() => {
    const texture = useLoader(TextureLoader, `${process.env.PUBLIC_URL}/pc-ground.webp`);

    return (
        <mesh
            position={[0, 0, -12]}
            rotation={[0, 0, Math.PI / 2]}
            receiveShadow
        >
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
});

// Main WebglPc component
const WebglPc = () => {
    return (
        <div className="mac-bg">
            <Canvas
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 15], fov: 25 }}
                gl={{ antialias: true }}
            >
                {/* Performance monitor to adjust settings based on device capability */}
                <PerformanceMonitor />

                {/* Suspense for lazy loading */}
                <Suspense fallback={<CanvasLoader />}>
                    {/* PresentationControls with your original values */}
                    <PresentationControls
                        snap
                        config={{ tension: 120, friction: 20 }}
                        azimuth={[(-20 * Math.PI) / 180, (20 * Math.PI) / 180]}
                        polar={[(-5 * Math.PI) / 180, (15 * Math.PI) / 180]}
                    >
                        <MacModel />
                        <Wall />
                    </PresentationControls>
                </Suspense>

                {/* Preload all assets */}
                <Preload all />
            </Canvas>
        </div>
    );
};

export default WebglPc;
