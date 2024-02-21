import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import {Html, Preload, PresentationControls, useGLTF} from '@react-three/drei';
import CanvasLoader from "./CanvasLoader";
import {CanvasTexture, LinearFilter} from "three";


function useOperatingSystem() {
    const [os, setOs] = useState('');

    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        if (userAgent.includes('Win')) setOs('windows');
        if (userAgent.includes('Mac')) setOs('mac');
        // Add more conditions if you want to detect other operating systems.
    }, []);

    return os;
}


const MacModel = ({startAnimation}) => {
    const scene = useGLTF("./pc.glb");
    const dirLightRef = useRef();
    const os = useOperatingSystem();

    useEffect(() => {
        if (scene) {
            scene.scene.traverse((child) => {
                if (child.isMesh) {
                    // console.log(child.material.map.source)
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }
    }, [scene]);

    return (
        <>
            <ambientLight intensity={2} color={"#ffffff"}/>
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
                        shadow-mapSize-height={512} shadow-radius={10}/>
            <pointLight position={[-7, 1, 8]} intensity={100} color={"#d24e4e"} castShadow shadow-mapSize-width={512}
                        shadow-mapSize-height={512} shadow-radius={10}/>
            <pointLight position={[2, 1, -8]} intensity={50} color={"#a308ef"} castShadow shadow-mapSize-width={512}
                        shadow-mapSize-height={512} shadow-radius={10}/>
            <primitive
                object={scene.scene} scale={1} position={[3, -2.8, 5.5]}
                rotation={[0, -Math.PI / 2, 0]}
            />
            <Html
                position={[0, 0.2, 4.3]}
                transform occlude
                wrapperClass="webgl-iframe-wrapper"
                distanceFactor={1.65}
                rotation-x={(-4.55 * Math.PI) / 180}
            >
                <iframe
                    className={`webgl-iframe webgl-iframe-${os}`}
                    src="https://mikalasa.github.io/ProfileWeb-Iframe-About/"
                />
            </Html>
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
            <planeGeometry args={[200, 200]}/>
            <meshPhysicalMaterial
                map={gradientTexture}
                metalness={0.5}
                roughness={0.4}
            />
        </mesh>
    );
};


function WebglPc() {
    return (
        <div className="mac-bg">
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{position: [0, 0, 15], fov: 25, near: 0.1, far: 200}}
                gl={{antialias: true, alpha: false, preserveDrawingBuffer: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <PresentationControls
                        snap={true}
                        config={{ tension: 170, friction: 26 }}
                        azimuth={[(-20 * Math.PI) / 180, (20 * Math.PI) / 180]}
                        polar={[(-5 * Math.PI) / 180, (15 * Math.PI) / 180]}
                    >
                        <MacModel/>
                        <Wall />
                    </PresentationControls>
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
}


export default WebglPc;
