import React, {Suspense, useEffect, useMemo, useRef} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { TextureLoader, Clock } from "three";
import CanvasLoader from "../widgets/CanvasLoader.jsx";
import { isMobile } from "react-device-detect";

const ThinkerModel = () => {
    const scene = useGLTF(process.env.PUBLIC_URL + "/the_thinker.glb", true, "draco");
    const dirLightRef = useRef();
    const scale = isMobile ? 2.5 : 3.5;
    const position = isMobile ? [-1.8, 3, 10] : [-5.0, -0.5, 5];
    const rotationIndex = isMobile ? 0.25 : 1;

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
            <ambientLight intensity={0.2} color={"#ffffff"} />
            <directionalLight
                ref={dirLightRef}
                intensity={0.25}
                position={[-3, 5, 6]}
                castShadow
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
                shadow-radius={10}
            />
            <pointLight
                intensity={10}
                position={[-1, 5, 7]}
                castShadow
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
                shadow-radius={10}
            />
            <pointLight
                intensity={20}
                position={[-8, 6, -3]}
                castShadow
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
                shadow-radius={10}
            />
            <Float speed={1} rotationIntensity={rotationIndex}>
                <mesh>
                    <primitive
                        object={scene.scene}
                        scale={scale}
                        position={position}
                        rotation={[-0.3, 2.5, -0.1]}
                    />
                </mesh>
            </Float>
        </>
    );
};

const GroundPlane = () => {
    const texture = useMemo(() => new TextureLoader().load(process.env.PUBLIC_URL + "/hero-ground.webp"), []);

    return (
        <mesh
            rotation={[-Math.PI / 2 - 0.3, 0, -0.1]}
            position={[0, -3, 0]}
            receiveShadow
            castShadow
        >
            <planeGeometry args={[400, 400]} />
            <meshPhysicalMaterial map={texture} metalness={0.7} roughness={0.2} />
        </mesh>
    );
};

const DynamicFrameControl = ({ children }) => {
    const clock = useMemo(() => new Clock(), []);
    const fps = 30; // 设置帧率上限

    useFrame(({ invalidate }) => {
        if (clock.getDelta() < 1 / fps) return;
        invalidate();
    });

    return <>{children}</>;
};

const TheThinkerCanvas = () => {
    const maxPolarAngle = isMobile ? Math.PI / 4 : Math.PI / 4;
    const minPolarAngle = isMobile ? Math.PI / 3 : Math.PI / 3;
    const minAzimuthAngle = isMobile ? -Math.PI / 12 : -Math.PI / 8;
    const maxAzimuthAngle = isMobile ? Math.PI / 30 : Math.PI / 12;

    return (
        <div className="thinker-bg">
            <Canvas
                shadows
                dpr={[1, window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio]}
                camera={{ position: [0, 30, 0], fov: 25, near: 0.1, far: 200 }}
                gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <DynamicFrameControl>
                        <OrbitControls
                            enableRotate={true}
                            enableZoom={false}
                            maxPolarAngle={maxPolarAngle}
                            minPolarAngle={minPolarAngle}
                            minAzimuthAngle={minAzimuthAngle}
                            maxAzimuthAngle={maxAzimuthAngle}
                        />
                        <ThinkerModel />
                        <GroundPlane />
                    </DynamicFrameControl>
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
};

export default TheThinkerCanvas;
