import {Environment, Html, Preload, PresentationControls, useGLTF} from "@react-three/drei";
import React, {Suspense, useState, useEffect} from "react";
import {Canvas} from "@react-three/fiber";
import CanvasLoader from "./CanvasLoader";
import {isMobile} from "react-device-detect";


function useLongPress(onLongPress, ms = 300) {
    const [startLongPress, setStartLongPress] = useState(false);

    useEffect(() => {
        let timerId;
        if (startLongPress) {
            timerId = setTimeout(onLongPress, ms);
        } else {
            clearTimeout(timerId);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [onLongPress, ms, startLongPress]);

    const start = (event) => {
        event.preventDefault();
        setStartLongPress(true);
    };

    const stop = (event) => {
        event.preventDefault();
        setStartLongPress(false);
    };

    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    };
}


function Model({ setCanRotate }) {
    const { scene } = useGLTF('./iphone.gltf')
    return (
        <>
            <ambientLight intensity={10} color={"#ffffff"}/>
            <pointLight position={[-0.25, 5, 0]} intensity={100} color={"#ebebee"} />
            <pointLight position={[4, 0, 0]} intensity={50} color={"#ebebee"} />
            <pointLight position={[-6, -1, 0]} intensity={50} color={"#ebebee"} />
            <mesh>
                <primitive object={scene} scale={1.5} position={[-0.25, -2, 0]}/>
            </mesh>
            <Html
                position={[0, 0, 0.18]}
                transform occlude
                wrapperClass="webgl-iframe-wrapper"
                distanceFactor={1.25}
                rotation-x={0}
            >
                <div className="iframe-iphone-container">
                    <iframe
                        className="webgl-iframe-iphone"
                        src="https://mikalasa.github.io/nz-travel-web/?#"
                    />
                </div>
            </Html>
        </>
    )
}

function Iphone() {
    const [enableRotate, setEnableRotate] = useState(false);
    const onLongPress = () => {
        setEnableRotate(true);
    };

    const longPressEvents = useLongPress(onLongPress, 500);

    return (
        <div className="mac-bg">
            <Canvas
                {...(isMobile ? longPressEvents : {})}
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 15], fov: 25, near: 0.1, far: 200 }}
                gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <PresentationControls
                        snap={enableRotate} // enableRotate is a boolean
                        config={{ tension: 170, friction: 26 }}
                        azimuth={[(-25 * Math.PI) / 180, (25 * Math.PI) / 180]}
                        polar={[(-5 * Math.PI) / 180, (15 * Math.PI) / 180]}
                    >
                        <Model setCanRotate={setEnableRotate}/>
                    </PresentationControls>
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
}

export default Iphone;
