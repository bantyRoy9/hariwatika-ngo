"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Torus, Octahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Floating orb with distort shader ── */
function FloatingOrb({
  position, color, size, speed, distort,
}: {
  position: [number, number, number];
  color: string; size: number; speed: number; distort: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed;
    mesh.current.position.y = position[1] + Math.sin(t) * 0.4;
    mesh.current.position.x = position[0] + Math.cos(t * 0.7) * 0.2;
    mesh.current.rotation.x = t * 0.3;
    mesh.current.rotation.z = t * 0.2;
  });
  return (
    <Sphere ref={mesh} args={[size, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color} distort={distort} speed={2}
        transparent opacity={0.55} roughness={0.1} metalness={0.8}
      />
    </Sphere>
  );
}

/* ── Spinning ring ── */
function Ring({
  position, color, speed,
}: {
  position: [number, number, number]; color: string; speed: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed;
    mesh.current.rotation.x = t;
    mesh.current.rotation.y = t * 0.6;
    mesh.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
  });
  return (
    <Torus ref={mesh} args={[0.7, 0.07, 16, 100]} position={position}>
      <meshStandardMaterial
        color={color} transparent opacity={0.6}
        roughness={0.2} metalness={0.9} wireframe={false}
      />
    </Torus>
  );
}

/* ── Diamond (octahedron) ── */
function Diamond({
  position, color, speed,
}: {
  position: [number, number, number]; color: string; speed: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed;
    mesh.current.rotation.y = t;
    mesh.current.rotation.x = t * 0.5;
    mesh.current.position.y = position[1] + Math.cos(t) * 0.35;
  });
  return (
    <Octahedron ref={mesh} args={[0.5]} position={position}>
      <meshStandardMaterial
        color={color} transparent opacity={0.7}
        roughness={0.05} metalness={1.0}
        emissive={color} emissiveIntensity={0.15}
      />
    </Octahedron>
  );
}

/* ── Particle star field ── */
function StarField() {
  const count = 280;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#F4A433"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#48cc84"),
      new THREE.Color("#ffd580"),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const geom = useRef<THREE.BufferGeometry>(null);
  useFrame((state) => {
    if (!geom.current) return;
    const pos = geom.current.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime * 0.06;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t + i * 0.3) * 0.001;
    }
    geom.current.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geom}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

/* ── Mouse-tracking camera rig ── */
function CameraRig() {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [gl.domElement]);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.current.y * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Scene ── */
function Scene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]}   color="#F4A433" intensity={3} />
      <pointLight position={[-5, -3, 3]} color="#63d2ff" intensity={2} />
      <pointLight position={[0, 3, -4]}  color="#48cc84" intensity={1.5} />
      <spotLight   position={[0, 8, 4]}  color="#ffd580" intensity={4} angle={0.3} penumbra={1} castShadow={false} />

      <StarField />

      {/* Big central distorted orb */}
      <FloatingOrb position={[0, 0, -2]}    color="#63d2ff" size={1.5}  speed={0.4} distort={0.5} />

      {/* Mid orbs */}
      <FloatingOrb position={[3.5, 1, -3]}  color="#F4A433" size={0.8}  speed={0.6} distort={0.4} />
      <FloatingOrb position={[-3.5, -1, -3]}color="#006d3e" size={0.9}  speed={0.5} distort={0.3} />
      <FloatingOrb position={[-2, 2.5, -4]} color="#ffd580" size={0.55} speed={0.8} distort={0.6} />
      <FloatingOrb position={[2.5, -2, -4]} color="#48cc84" size={0.6}  speed={0.7} distort={0.45} />

      {/* Rings */}
      <Ring position={[4, -1.5, -3.5]} color="#F4A433" speed={0.5} />
      <Ring position={[-4, 2, -4]}     color="#63d2ff" speed={0.4} />
      <Ring position={[0.5, 3, -5]}    color="#ffffff" speed={0.3} />

      {/* Diamonds */}
      <Diamond position={[-1.5, -2.5, -2.5]} color="#F4A433" speed={0.6} />
      <Diamond position={[2, 2.8, -3]}       color="#ffffff" speed={0.5} />
      <Diamond position={[-4.5, 0.5, -5]}    color="#48cc84" speed={0.7} />
    </>
  );
}

/* ── Exported canvas component ── */
export default function Hero3DCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}
