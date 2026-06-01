'use client';

import { Html, OrbitControls, useGLTF, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useTwinStore, type ScenarioDensity } from '../../store/twin-store.ts';
import type { TwinUrlState } from '../../types/index.ts';

const PROTOTYPE_GLB_PATH = '/models/mall_exploded_three_layer_prototype.glb';
const SCENARIO_DENSITY_LABEL: Record<ScenarioDensity, string> = {
  baseline: '常态',
  peak: '高峰',
  surge: '涌入'
};

function PrototypeLoadingState() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="min-w-[220px] rounded-md border border-[#CBD5E1] bg-white/88 px-4 py-3 text-center text-xs font-semibold text-[#334155] shadow-[0_16px_40px_-28px_rgba(15,23,42,0.5)] backdrop-blur">
        <div className="text-[11px] uppercase text-[#64748B]">GLB review asset</div>
        <div className="mt-1 text-sm text-[#172033]">加载自建三层原型</div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
          <div className="h-full rounded-full bg-[#3F5FB5]" style={{ width: `${Math.round(progress)}%` }} />
        </div>
      </div>
    </Html>
  );
}

function PrototypeMallModel() {
  const gltf = useGLTF(PROTOTYPE_GLB_PATH);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group name="ReviewPrototypeRoot" position={[0, -4.5, 0]} rotation={[0, -0.32, 0]} scale={0.18}>
      <primitive object={scene} />
    </group>
  );
}

function PrototypeScene({ state }: { state: TwinUrlState }) {
  const label = state.floorId === 'B1' ? 'F1' : state.floorId === 'F4' ? 'F3' : state.floorId;
  const scenarioDensity = useTwinStore((store) => store.scenarioDensity);
  const scenarioSpeed = useTwinStore((store) => store.scenarioSpeed);
  const incidentLevel = useTwinStore((store) => store.incidentLevel);
  const incidentScale = Math.max(0, Math.min(3, incidentLevel));
  const markerScale = scenarioDensity === 'surge' ? 1.18 : scenarioDensity === 'baseline' ? 0.86 : 1;

  return (
    <>
      <color attach="background" args={['#f6f8fb']} />
      <ambientLight intensity={1.8} />
      <directionalLight castShadow intensity={2.6} position={[16, 24, 18]} />
      <directionalLight intensity={1.2} position={[-18, 10, -14]} />
      <gridHelper args={[120, 24, '#ccd6e3', '#e7edf4']} position={[0, -4.8, 0]} />
      <Suspense fallback={<PrototypeLoadingState />}>
        <PrototypeMallModel />
      </Suspense>
      <group name="PrototypeReviewMarker" position={[-28, 5, -24]}>
        <mesh>
          <boxGeometry args={[8 * markerScale, 0.4 + incidentScale * 0.06, 8 * markerScale]} />
          <meshStandardMaterial color={state.mode === 'alerts' ? '#ffb4a8' : '#a7f3d0'} transparent opacity={0.62 + incidentScale * 0.08} />
        </mesh>
      </group>
      <group name={`Prototype_${label}_FocusHint`} position={[28, 5, 24]}>
        <mesh>
          <boxGeometry args={[7 * scenarioSpeed, 0.4, 7 * scenarioSpeed]} />
          <meshStandardMaterial color={state.mode === 'flow' ? '#7dd3fc' : '#fef3c7'} transparent opacity={0.64 + scenarioSpeed * 0.08} />
        </mesh>
      </group>
      <OrbitControls enableDamping makeDefault maxDistance={125} minDistance={32} target={[0, 5, 0]} />
    </>
  );
}

export function PrototypeGlbViewport({ state }: { state: TwinUrlState }) {
  const scenarioDensity = useTwinStore((store) => store.scenarioDensity);
  const scenarioSpeed = useTwinStore((store) => store.scenarioSpeed);
  const incidentLevel = useTwinStore((store) => store.incidentLevel);

  return (
    <div className="relative h-full">
      <Canvas camera={{ position: [46, 38, 58], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }} shadows>
        <PrototypeScene state={state} />
      </Canvas>
      <div className="pointer-events-none absolute left-4 top-4 z-30 max-w-[360px] rounded-md border border-[#CBD5E1]/80 bg-[#F8FAFC]/86 px-3 py-2 text-xs text-[#475569] shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] backdrop-blur-md">
        <div className="font-bold text-[#172033]">自建 GLB 原型审阅模式</div>
        <div className="mt-1 leading-5">三层蓝色剖开展示模型，仅用于形体与扶梯关系评审；默认演示仍使用程序化 3D 主视图。</div>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 z-30 rounded-md border border-[#DFE6EF]/80 bg-white/82 px-3 py-2 text-[11px] font-semibold text-[#64748B] backdrop-blur-md">
        asset: mall_exploded_three_layer_prototype.glb · synthetic only · no external textures
        <span className="ml-2 text-[#334155]">场景密度 {SCENARIO_DENSITY_LABEL[scenarioDensity]} · 速度 {scenarioSpeed}x · 事件强度 {incidentLevel}</span>
      </div>
    </div>
  );
}

useGLTF.preload(PROTOTYPE_GLB_PATH);
