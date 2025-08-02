import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ onHover }) => {
  const modelRef = useRef();

  // Always rotate
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  const glb = useGLTF('/3d.glb'); // Make sure your model is in the public folder

  return (
    <primitive
      object={glb.scene}
      ref={modelRef}
      scale={0.6}
      position={[0, -0.6, 0]} // move model slightly down
      rotation={[0.2, 0.4, 0]} // initial tilt
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    />
  );
};

const ThreeDModel = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Speech Bubble */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            color: 'black',
            padding: '8px 16px',
            borderRadius: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            fontSize: '14px',
            animation: 'floatUp 2s ease-out infinite',
            zIndex: 10,
          }}
        >
          💬 Hi, how can I help you?
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <Suspense fallback={null}>
          <Model onHover={setIsHovered} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Floating bubble animation */}
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateX(-50%) translateY(0); opacity: 1; }
            100% { transform: translateX(-50%) translateY(-20px); opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
};

export default ThreeDModel;
