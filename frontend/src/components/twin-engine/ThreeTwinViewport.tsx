'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';
import { buildFlowPath, toSmoothCurve } from '../../lib/nav-graph.ts';
import { getStoresForFloor, heatPoints } from '../../lib/twin-data.ts';
import type { TwinUrlState } from '../../types/index.ts';
import { flowParticleFragmentShader, flowParticleVertexShader, heatmapFragmentShader } from './shaders.ts';

function MallScene({ state }: { state: TwinUrlState }) {
  const stores = getStoresForFloor(state.floorId);
  const selected = state.storeId ?? stores[0]?.id;
  const flow = selected ? buildFlowPath(state.floorId, selected, state.flowScope) : undefined;
  const curve = useMemo(() => (flow ? toSmoothCurve(flow.nodes) : undefined), [flow]);
  const heat = heatPoints.filter((point) => point.floorId === state.floorId).slice(0, 50);
  const heatUniforms = useMemo(
    () =>
      Array.from({ length: 50 }, (_, index) => {
        const point = heat[index];
        return point ? new THREE.Vector3(point.x / 100, point.y / 100, point.intensity) : new THREE.Vector3(0, 0, 0);
      }),
    [heat]
  );
  const flowParticles = useMemo(() => {
    const count = 800;
    return {
      positions: new Float32Array(count * 3),
      offsets: new Float32Array(Array.from({ length: count }, (_, index) => index / count))
    };
  }, []);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight intensity={1.6} position={[8, 12, 10]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[90, 58, 1, 1]} />
        <shaderMaterial
          transparent
          fragmentShader={heatmapFragmentShader}
          vertexShader="varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
          uniforms={{
            uHeatPointCount: { value: state.mode === 'heatmap' ? heat.length : 0 },
            uHeatPoints: { value: heatUniforms }
          }}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[90, 0.18, 58]} />
        <meshStandardMaterial color="#ffffff" roughness={0.72} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <ringGeometry args={[11, 20, 72]} />
        <meshStandardMaterial color="#f4f6f9" roughness={0.8} />
      </mesh>
      {stores.map((store) => (
        <mesh key={store.id} position={[store.x - 50, 1.15, store.y - 50]}>
          <boxGeometry args={[5.5, 2.2, 3.8]} />
          <meshStandardMaterial color={store.id === selected ? '#d9ffff' : '#ffffff'} roughness={0.62} metalness={0.02} />
        </mesh>
      ))}
      {state.mode === 'flow' && curve ? (
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[flowParticles.positions, 3]} />
            <bufferAttribute attach="attributes-aProgressOffset" args={[flowParticles.offsets, 1]} />
          </bufferGeometry>
          <shaderMaterial
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            fragmentShader={flowParticleFragmentShader}
            vertexShader={flowParticleVertexShader}
            uniforms={{ uTime: { value: 0.3 }, uSpeed: { value: 0.14 } }}
          />
        </points>
      ) : null}
      <OrbitControls enableDamping makeDefault />
    </>
  );
}

export function ThreeTwinViewport({ state }: { state: TwinUrlState }) {
  return (
    <Canvas camera={{ position: [0, 58, 72], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <MallScene state={state} />
    </Canvas>
  );
}
