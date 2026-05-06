'use client';

import { Billboard, OrbitControls, RoundedBox, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type Agent = {
  name: string;
  orbitRadius: number;
  speed: number;
  startAngle: number;
  color: string;
};

const agents: Agent[] = [
  { name: 'Resume Analyzer', orbitRadius: 3.8, speed: 0.4, startAngle: 0, color: '#d4af37' },
  {
    name: 'Skill Gap Agent',
    orbitRadius: 4.5,
    speed: 0.28,
    startAngle: Math.PI * 0.4,
    color: '#d97757',
  },
  {
    name: 'Interview AI',
    orbitRadius: 4.0,
    speed: 0.35,
    startAngle: Math.PI * 0.8,
    color: '#d4af37',
  },
  {
    name: 'Job Matching',
    orbitRadius: 4.8,
    speed: 0.22,
    startAngle: Math.PI * 1.3,
    color: '#d97757',
  },
  {
    name: 'Career Intel',
    orbitRadius: 4.2,
    speed: 0.31,
    startAngle: Math.PI * 1.7,
    color: '#d4af37',
  },
];

function CoreSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.003;
    }
    if (ringARef.current) {
      ringARef.current.rotation.z += 0.002;
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.z -= 0.003;
    }
  });

  return (
    <group>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      <mesh ref={ringARef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.015, 16, 200]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.4} />
      </mesh>

      <mesh ref={ringBRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.8, 0.008, 16, 200]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function SatellitesAndLines() {
  const satelliteRefs = useRef<(THREE.Group | null)[]>([]);
  const lineRefs = useRef<(THREE.Line | null)[]>([]);
  const angles = useRef<number[]>(agents.map((agent) => agent.startAngle));

  useFrame((_, delta) => {
    for (let i = 0; i < agents.length; i += 1) {
      const agent = agents[i];
      angles.current[i] += agent.speed * delta;

      const x = Math.cos(angles.current[i]) * agent.orbitRadius;
      const z = Math.sin(angles.current[i]) * agent.orbitRadius;

      const satellite = satelliteRefs.current[i];
      if (satellite) {
        satellite.position.set(x, 0, z);
      }

      const line = lineRefs.current[i];
      if (line) {
        const positions = line.geometry.attributes.position as THREE.BufferAttribute;
        positions.setXYZ(0, 0, 0, 0);
        positions.setXYZ(1, x, 0, z);
        positions.needsUpdate = true;
        line.computeLineDistances();
      }
    }
  });

  return (
    <group>
      {agents.map((agent, index) => {
        const startX = Math.cos(agent.startAngle) * agent.orbitRadius;
        const startZ = Math.sin(agent.startAngle) * agent.orbitRadius;

        return (
          <group key={agent.name}>
            <line
              ref={(line: any) => {
                lineRefs.current[index] = line;
              }}
            >
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 0, 0, startX, 0, startZ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineDashedMaterial
                color="#d4af37"
                transparent
                opacity={0.2}
                dashSize={0.15}
                gapSize={0.1}
              />
            </line>

            <group
              ref={(group) => {
                satelliteRefs.current[index] = group;
              }}
              position={[startX, 0, startZ]}
            >
              <RoundedBox args={[0.8, 0.45, 0.12]} radius={0.08} smoothness={4}>
                <meshStandardMaterial color="#1a1a18" emissive="#2a3038" emissiveIntensity={0.3} />
              </RoundedBox>

              <mesh position={[0, 0.28, 0]}>
                <sphereGeometry args={[0.08, 24, 24]} />
                <meshStandardMaterial color={agent.color} emissive={agent.color} emissiveIntensity={0.8} />
              </mesh>

              <Billboard position={[0, -0.45, 0]}>
                <Text fontSize={0.18} color="#b4bac0" anchorX="center" anchorY="middle" maxWidth={2.6}>
                  {agent.name}
                </Text>
              </Billboard>
            </group>
          </group>
        );
      })}
    </group>
  );
}

function ParticleField() {
  const particleCount = 500;
  const radius = 10;
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const data: { position: THREE.Vector3; drift: THREE.Vector3 }[] = [];

    for (let i = 0; i < particleCount; i += 1) {
      const direction = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ).normalize();
      const distance = Math.cbrt(Math.random()) * radius;
      const position = direction.multiplyScalar(distance);

      const drift = new THREE.Vector3(
        (Math.random() * 2 - 1) * 0.02,
        (Math.random() * 2 - 1) * 0.02,
        (Math.random() * 2 - 1) * 0.02,
      );

      data.push({ position, drift });
    }

    return data;
  }, []);

  useEffect(() => {
    if (!instancedRef.current) return;

    for (let i = 0; i < particleCount; i += 1) {
      dummy.position.copy(particles[i].position);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
    }

    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, particleCount, particles]);

  useFrame((_, delta) => {
    if (!instancedRef.current) return;

    for (let i = 0; i < particleCount; i += 1) {
      const particle = particles[i];
      particle.position.addScaledVector(particle.drift, delta);

      if (particle.position.length() > radius) {
        particle.position.multiplyScalar(-1);
      }

      dummy.position.copy(particle.position);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
    }

    instancedRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instancedRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color="#2a3038" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function CameraParallax() {
  useFrame((state) => {
    const { camera, mouse } = state;
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function OrbitalCore() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} color="#d4af37" intensity={2} distance={8} />
      <pointLight position={[5, 5, 5]} color="#ffffff" intensity={0.4} />

      <CoreSphere />
      <SatellitesAndLines />
      <ParticleField />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.8}
      />

      <CameraParallax />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
      </EffectComposer>
    </>
  );
}
