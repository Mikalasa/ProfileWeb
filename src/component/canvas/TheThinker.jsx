import React, {Suspense, useEffect, useMemo, useRef} from "react";
import {Canvas} from "@react-three/fiber";
import {Float, OrbitControls, Preload, useGLTF} from "@react-three/drei";
import {CanvasTexture, LinearFilter} from "three";
import CanvasLoader from "./CanvasLoader";

const HeroModel = () => {
    const scene = useGLTF("./the_thinker.glb");
    const dirLightRef = useRef();

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
            <ambientLight intensity={0.2} color={"#ffffff"}/>
            <directionalLight
                ref={dirLightRef}
                intensity={0.25}
                position={[-3, 5, 6]}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            {/* 主光源 */}
            <pointLight intensity={10} position={[-1, 5, 7]} castShadow shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048} shadow-radius={10}/>
            {/* 背光 */}
            <pointLight intensity={20} position={[-8, 6, -3]}  castShadow shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048} shadow-radius={10}/>
            {/* 填充光 */}
            <pointLight intensity={40} position={[-10, 3, 7]} castShadow shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048} shadow-radius={10}/>
            <Float rotateOnAxis={1} rotationIntensity={1}>
                <mesh>
                    <primitive object={scene.scene} scale={3.5} position={[-5.0, -0.5, 5]}
                               rotation={[-0.3, 2.5, -0.1]}/>
                </mesh>
            </Float>
        </>
    );
};


const GroundPlane = () => {
    const gradientTexture = useMemo(() => {
        const size = 200;
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#383838'); // start color
        gradient.addColorStop(1, '#ffffff'); // end color
        context.fillStyle = gradient;
        context.fillRect(0, 0, size, size);
        const texture = new CanvasTexture(canvas);
        texture.minFilter = LinearFilter;
        return texture;
    }, []);

    return (
        <mesh
            rotation={[-Math.PI / 2 - 0.3, 0, -0.1]}
            position={[0, -3, 0]}
            receiveShadow
            castShadow
        >
            <planeGeometry args={[400, 400]}/>
            <meshPhysicalMaterial
                map={gradientTexture}
                metalness={0.7}
                roughness={0.2}
            />
        </mesh>
    );
};



const TheThinkerCanvas = () => {
    return (
        <div className="thinker-bg">
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 30, 0], fov: 25, near: 0.1, far: 200 }}
                gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls
                        enableZoom={false}
                        maxPolarAngle={Math.PI / 4}
                        minPolarAngle={Math.PI / 3}
                        minAzimuthAngle={-Math.PI / 6}
                        maxAzimuthAngle={Math.PI / 6}
                    />
                    <HeroModel/>
                    <GroundPlane />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
};

export default TheThinkerCanvas;
