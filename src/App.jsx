import { Canvas, useFrame } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll, Html, Scroll } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import theatreState from "./mgsflythrough.json";
import { editable as e } from "@theatre/r3f"

import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import { useState, useEffect } from "react";
import ToolTip from "./components/Tooltip";

export default function App() {
  const sheet = getProject("Fly Through", { state: theatreState }).sheet(
    "Scene"
  );

  return (
    <>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <ScrollControls pages={10}>
          <SheetProvider sheet={sheet}>
            <Scene />
          </SheetProvider>
          <Scroll html>
            <ToolTip />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useEffect(() => {
    console.clear()
    console.log('%cMade with Theatre.js and React Three Fiber by Sadman Yasar Sayem', 'color: yellow;');

    console.log('%cHire Me on Upwork https://www.upwork.com/freelancers/~01cfd344d945d1f282', 'color: yellow;');
    console.log('%c"Chibi Gear Solid" (https://skfb.ly/BHU8) by glenatron is licensed under CC Attribution-NonCommercial-NoDerivs (http://creativecommons.org/licenses/by-nc-nd/4.0/).', 'color: yellow;')
  }, [])

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  const bgColor = "#000000";

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" color={bgColor} near={-4} far={40} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <Gltf src="/chibi_gear_solid.glb" castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} />
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}
