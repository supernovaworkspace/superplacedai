'use client';

import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';

const OrbitalCore = dynamic(() => import('./OrbitalCore'), {
  ssr: false,
  loading: () => (
    <Html center>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: '#687078',
        }}
      >
        Initializing...
      </div>
    </Html>
  ),
});

export default function OrbitalScene() {
  return (
    <div className="orbital-scene-container" style={{ width: '100%', height: 600, position: 'relative' }}>
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 2, 10] }}
        style={{ background: 'transparent' }}
      >
        <OrbitalCore />
      </Canvas>

      <style>{`
        @media (max-width: 768px) {
          .orbital-scene-container {
            height: 400px !important;
          }
        }
      `}</style>
    </div>
  );
}
