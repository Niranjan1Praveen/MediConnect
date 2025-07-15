'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} scale={1.5} />;
}

export default function GLBModelViewer({ url }) {
  return (
    <div className="w-[500px] h-[400px]">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        {/* <OrbitControls enableZoom={true} /> */}
      </Canvas>
    </div>
  );
}
