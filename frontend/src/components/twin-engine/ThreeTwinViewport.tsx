'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';
import { buildFlowPath, toSmoothCurve } from '../../lib/nav-graph.ts';
import { getStoresForFloor, heatPoints } from '../../lib/twin-data.ts';
import type { TwinUrlState } from '../../types/index.ts';
import { PROCEDURAL_MALL_SPEC, getSceneFloorSpecs, isPointInsideAtrium, mapStoreToMallScene } from './proceduralMallSpec.ts';
import { flowParticleFragmentShader, flowParticleVertexShader, heatmapFragmentShader } from './shaders.ts';

const FLOOR_TO_STAGE_KEY = {
  B1: 'F1',
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  F4: 'F3'
} as const;

function createRoundedRectShape(width: number, depth: number, radius: number) {
  const x = -width / 2;
  const z = -depth / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, z);
  shape.lineTo(x + width - radius, z);
  shape.absarc(x + width - radius, z + radius, radius, -Math.PI / 2, 0, false);
  shape.lineTo(x + width, z + depth - radius);
  shape.absarc(x + width - radius, z + depth - radius, radius, 0, Math.PI / 2, false);
  shape.lineTo(x + radius, z + depth);
  shape.absarc(x + radius, z + depth - radius, radius, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, z + radius);
  shape.absarc(x + radius, z + radius, radius, Math.PI, Math.PI * 1.5, false);
  return shape;
}

function createAtriumShape() {
  const { length, width, innerRadius } = PROCEDURAL_MALL_SPEC.atrium;
  return createRoundedRectShape(length, width, innerRadius);
}

function createAtriumLoopShape(innerOffset: number, outerOffset: number) {
  const { length, width, innerRadius } = PROCEDURAL_MALL_SPEC.atrium;
  const outer = createRoundedRectShape(length + outerOffset * 2, width + outerOffset * 2, innerRadius + outerOffset);
  const inner = createRoundedRectShape(length + innerOffset * 2, width + innerOffset * 2, Math.max(0.2, innerRadius + innerOffset));
  outer.holes.push(inner);
  return outer;
}

function createSlabShape(hasAtriumVoid: boolean) {
  const { width, depth } = PROCEDURAL_MALL_SPEC.footprint;
  const slab = createRoundedRectShape(width, depth, 4);
  if (hasAtriumVoid) {
    const hole = createAtriumShape();
    hole.holes = [];
    slab.holes.push(hole);
  }
  return slab;
}

function FlowParticles({ curve, elevation }: { curve: THREE.CatmullRomCurve3; elevation: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const point = curve.getPoint(index / count);
      positions[index * 3] = point.x;
      positions[index * 3 + 1] = elevation;
      positions[index * 3 + 2] = point.z;
    }
    return {
      positions,
      offsets: new Float32Array(Array.from({ length: count }, (_, index) => index / count))
    };
  }, [curve, elevation]);

  useEffect(() => {
    if (!materialRef.current) return;
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = frame * 0.012;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geometry.positions, 3]} />
        <bufferAttribute attach="attributes-aProgressOffset" args={[geometry.offsets, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        fragmentShader={flowParticleFragmentShader}
        vertexShader={flowParticleVertexShader}
        uniforms={{
          uTime: { value: 0 },
          uSpeed: { value: 0.18 }
        }}
      />
    </points>
  );
}

function MallScene({ state }: { state: TwinUrlState }) {
  const stores = getStoresForFloor(state.floorId);
  const selected = state.storeId ?? stores[0]?.id;
  const flow = selected ? buildFlowPath(state.floorId, selected, state.flowScope) : undefined;
  const curve = useMemo(() => (flow ? toSmoothCurve(flow.nodes) : undefined), [flow]);
  const heat = heatPoints.filter((point) => point.floorId === state.floorId).slice(0, 50);
  const sceneFloors = useMemo(() => getSceneFloorSpecs(state.floorId), [state.floorId]);
  const activeFloorKey = FLOOR_TO_STAGE_KEY[state.floorId];
  const activeSceneFloor = sceneFloors.find((floor) => floor.isActive) ?? sceneFloors[1];
  const heatUniforms = useMemo(
    () =>
      Array.from({ length: 50 }, (_, index) => {
        const point = heat[index];
        return point ? new THREE.Vector3(point.x / 100, point.y / 100, point.intensity) : new THREE.Vector3(0, 0, 0);
      }),
    [heat]
  );
  const columnPositions = useMemo(() => {
    const positions: Array<[number, number]> = [];
    const { width, depth } = PROCEDURAL_MALL_SPEC.footprint;
    const { spacingX, spacingZ } = PROCEDURAL_MALL_SPEC.columnGrid;

    for (let x = -width / 2 + spacingX / 2; x <= width / 2 - spacingX / 2; x += spacingX) {
      for (let z = -depth / 2 + spacingZ / 2; z <= depth / 2 - spacingZ / 2; z += spacingZ) {
        if (!isPointInsideAtrium(x, z)) {
          positions.push([x, z]);
        }
      }
    }

    return positions;
  }, []);
  const escalators = useMemo(
    () =>
      sceneFloors.slice(0, 2).flatMap((floor, index) =>
        PROCEDURAL_MALL_SPEC.escalators.map((spec) => ({
          key: `${floor.floorKey}_${spec.key}`,
          x: spec.x,
          z: spec.z + (index === 0 ? 0 : spec.key === 'WEST' ? -4 : 4),
          y: floor.baseY + 0.24,
          length: spec.rise / Math.sin((spec.angleDeg * Math.PI) / 180),
          rise: index === 0 ? 5.5 : 4.5,
          rotationZ: spec.key === 'WEST' ? -Math.PI / 2 : Math.PI / 2,
          rotationX: spec.key === 'WEST' ? -Math.PI / 6 : Math.PI / 6
        }))
      ),
    [sceneFloors]
  );

  return (
    <>
      <color attach="background" args={['#eef3f6']} />
      <fog attach="fog" args={['#eef3f6', 92, 180]} />
      <ambientLight intensity={0.6} color="#ffffff" />
      <hemisphereLight intensity={0.45} groundColor="#cad3de" color="#f8fbff" />
      <directionalLight castShadow intensity={1.15} position={[48, 62, 28]} color="#fff4de" />
      <group name="Root_Mall">
        <group name="Environment">
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow>
            <planeGeometry args={[160, 120, 1, 1]} />
            <meshStandardMaterial color="#dfe7ee" roughness={0.98} metalness={0} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, activeSceneFloor.baseY + 0.03, 0]}>
            <planeGeometry args={[120, 80, 1, 1]} />
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
          <group name="Skylight_Frame" position={[0, 14.55, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <shapeGeometry args={[createAtriumShape(), 64]} />
              <meshPhysicalMaterial color="#e6f7fb" transparent transmission={0.95} roughness={0.04} thickness={0.12} />
            </mesh>
            {Array.from({ length: 9 }, (_, index) => {
              const x = -24 + index * 6;
              return (
                <mesh key={`skylight-x-${x}`} position={[x, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <boxGeometry args={[0.2, 24, 0.2]} />
                  <meshStandardMaterial color="#7c8ea2" roughness={0.35} metalness={0.88} />
                </mesh>
              );
            })}
            {Array.from({ length: 7 }, (_, index) => {
              const z = -9 + index * 3;
              return (
                <mesh key={`skylight-z-${z}`} position={[0, 0.05, z]} rotation={[-Math.PI / 2, 0, 0]}>
                  <boxGeometry args={[50, 0.2, 0.2]} />
                  <meshStandardMaterial color="#7c8ea2" roughness={0.35} metalness={0.88} />
                </mesh>
              );
            })}
          </group>
        </group>

        {sceneFloors.map((floor) => (
          <group key={floor.floorKey} name={`Floor_${floor.floorKey.slice(1)}`}>
            <group name={`${floor.floorKey}_Slab`}>
              <mesh position={[0, floor.slabY, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <extrudeGeometry
                  args={[
                    createSlabShape(floor.floorKey !== 'F1'),
                    { depth: PROCEDURAL_MALL_SPEC.floors[floor.levelIndex]?.slabThickness ?? 0.5, bevelEnabled: false, curveSegments: 32 }
                  ]}
                />
                <meshStandardMaterial
                  color={floor.isActive ? '#f6f5ef' : '#f0f2f4'}
                  roughness={0.16}
                  metalness={0}
                  emissive={floor.isActive ? '#10262b' : '#000000'}
                  emissiveIntensity={floor.isActive ? 0.02 : 0}
                />
              </mesh>
              {floor.floorKey !== 'F1' ? (
                <mesh position={[0, floor.baseY + 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <shapeGeometry args={[createAtriumLoopShape(-0.05, 0.05), 96]} />
                  <meshPhysicalMaterial color="#e0f7fa" transparent transmission={0.95} roughness={0.02} metalness={0.1} />
                </mesh>
              ) : null}
              {floor.floorKey !== 'F1' ? (
                <mesh position={[0, floor.baseY + 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <shapeGeometry args={[createAtriumLoopShape(0.08, 0.22), 96]} />
                  <meshStandardMaterial color="#ffd9a8" emissive="#ffe4b5" emissiveIntensity={state.mode === 'heatmap' ? 2.8 : 1.6} />
                </mesh>
              ) : null}
              <mesh position={[0, floor.ceilingY - 0.12, 0]}>
                <boxGeometry args={[116, 0.08, 76]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.92} metalness={0} />
              </mesh>
            </group>

            <group name={`${floor.floorKey}_Columns`}>
              {floor.floorKey === 'F1'
                ? columnPositions.map(([x, z], index) => (
                    <mesh key={`${floor.floorKey}-col-${index}`} position={[x, 7.25, z]} castShadow>
                      <cylinderGeometry args={[0.4, 0.4, 14.5, 20, 1, false]} />
                      <meshStandardMaterial color="#e0e0e0" roughness={0.4} metalness={0.8} />
                    </mesh>
                  ))
                : null}
            </group>

            <group name={`${floor.floorKey}_Storefronts`}>
              {stores.map((store) => {
                const placement = mapStoreToMallScene(store);
                const active = store.id === selected;
                return (
                  <group key={`${floor.floorKey}-${store.id}`} position={[placement.x, floor.baseY + 2.75, placement.z]} rotation={[0, placement.facing, 0]}>
                    <mesh position={[0, -0.95, 0]}>
                      <boxGeometry args={[7.2, 0.2, 0.22]} />
                      <meshStandardMaterial color="#8d9096" roughness={0.45} metalness={0.68} />
                    </mesh>
                    <mesh position={[0, 0, 0]}>
                      <boxGeometry args={[7.2, 4.2, 0.12]} />
                      <meshPhysicalMaterial color={active ? '#f2ffff' : '#ffffff'} transparent transmission={0.94} roughness={0.02} metalness={0.1} />
                    </mesh>
                    <mesh position={[0, 1.85, -0.03]}>
                      <boxGeometry args={[7.2, 1, 0.2]} />
                      <meshStandardMaterial color={active ? '#9a6a36' : '#8b5a2b'} roughness={0.6} metalness={0} />
                    </mesh>
                  </group>
                );
              })}
            </group>

            {floor.floorKey !== 'F1' ? (
              <group name={`${floor.floorKey}_Balustrade`}>
                <mesh position={[0, floor.baseY + 0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <shapeGeometry args={[createAtriumLoopShape(-0.02, 0.02), 96]} />
                  <meshPhysicalMaterial color="#e0f7fa" transparent transmission={0.95} roughness={0.02} metalness={0.1} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0, floor.baseY + 1.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <shapeGeometry args={[createAtriumLoopShape(-0.03, 0.03), 96]} />
                  <meshStandardMaterial color="#8e97a3" roughness={0.34} metalness={0.78} />
                </mesh>
              </group>
            ) : null}

            {(floor.floorKey === 'F1' || floor.floorKey === 'F2') && floor.floorKey === activeFloorKey ? (
              <group name={`${floor.floorKey}_Escalators`}>
                {escalators
                  .filter((item) => item.key.startsWith(floor.floorKey))
                  .map((item) => (
                    <group key={item.key} position={[item.x, item.y, item.z]}>
                      <mesh rotation={[item.rotationX, 0, item.rotationZ]}>
                        <boxGeometry args={[1.4, item.length, 3.1]} />
                        <meshStandardMaterial color="#b0b0b0" roughness={0.3} metalness={1} />
                      </mesh>
                      <mesh position={[0, item.rise / 2, 0]} rotation={[item.rotationX, 0, item.rotationZ]}>
                        <boxGeometry args={[0.12, item.length, 3.3]} />
                        <meshStandardMaterial color="#151515" roughness={0.56} metalness={0.04} />
                      </mesh>
                    </group>
                  ))}
              </group>
            ) : null}
          </group>
        ))}

        {state.mode === 'flow' && curve ? <FlowParticles curve={curve} elevation={activeSceneFloor.baseY + 0.3} /> : null}
      </group>
      <OrbitControls enableDamping makeDefault />
    </>
  );
}

export function ThreeTwinViewport({ state }: { state: TwinUrlState }) {
  return (
    <Canvas camera={{ position: [0, 34, 86], fov: 34 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <MallScene state={state} />
    </Canvas>
  );
}
