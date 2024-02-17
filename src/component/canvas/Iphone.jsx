import {Environment, Html, Preload, PresentationControls, useGLTF} from "@react-three/drei";
import React, {Suspense, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import CanvasLoader from "./CanvasLoader";

function Model({ setCanRotate }) {
    const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf')
    const meshRef = useRef();
    const handlePointerDown = (event) => {
        setCanRotate(true);
    };
    return (
        <>
            <Environment preset="city" />
            <ambientLight intensity={10} color={"#ffffff"}/>
            <mesh
                ref={meshRef}
                onPointerDown={handlePointerDown}
            >
                <primitive object={scene} scale={1.5} position={[-0.25, -2, 0]}/>
            </mesh>
            <Html
                position={[0, 0, 0.18]}
                transform occlude
                wrapperClass="webgl-iframe-wrapper"
                distanceFactor={1.25}
                rotation-x={0}
            >
                <iframe
                    className="webgl-iframe-iphone"
                    src="https://mikalasa.github.io/nz-travel-web/?#"
                />
            </Html>
        </>
    )
}

function Iphone() {
    const [canRotate, setCanRotate] = useState(false);
    return (
        <div className="mac-bg">
            <h1>Apple Mac</h1>
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 15], fov: 25, near: 0.1, far: 200 }}
                gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    {canRotate ? (
                        <PresentationControls
                            snap={true}
                            config={{ tension: 170, friction: 26 }}
                            azimuth={[(-25 * Math.PI) / 180, (25 * Math.PI) / 180]}
                            polar={[(-5 * Math.PI) / 180, (15 * Math.PI) / 180]}
                        >
                            <Model setCanRotate={setCanRotate} />
                        </PresentationControls>
                    ) : (
                        <Model setCanRotate={setCanRotate} />
                    )}
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    )
}

export default Iphone;