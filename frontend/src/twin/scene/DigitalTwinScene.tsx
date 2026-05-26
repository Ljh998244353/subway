import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { DigitalTwinRouteParams } from '../../routes/demoFlow.ts';
import type { DigitalTwinViewModel } from '../../pages/digitalTwinModel.ts';
import { buildSceneAdapterState, SCENE_LAYER_HEIGHTS, type SceneAdapterState, type SceneStore, type SceneAlert, type SceneFlowLine, type SceneHeatmapPoint, type SceneInteractionEvent } from '../adapter/sceneAdapter.ts';

type DigitalTwinSceneProps = {
  viewModel: DigitalTwinViewModel;
  buildTwinUrl: (params: DigitalTwinRouteParams) => string;
  onInteraction?: (event: SceneInteractionEvent) => void;
  useGLBModel?: boolean;
};

const viteBaseUrl = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/';
const GLB_MODEL_PATH = `${viteBaseUrl}models/mall_floor_f2.glb`;

export function getStoreIdFromObject(object: THREE.Object3D): string | null {
  let current: THREE.Object3D | null = object;

  while (current) {
    const directMatch = current.name.match(/^Store_(S\d{3})$/);
    if (directMatch) return directMatch[1];

    const detailMatch = current.name.match(/_(S\d{3})(?:_|$)/);
    if (detailMatch) return detailMatch[1];

    current = current.parent;
  }

  return null;
}

function getScoreColor(score: number): string {
  if (score >= 85) return '#10b981';
  if (score >= 70) return '#3b82f6';
  if (score >= 55) return '#f59e0b';
  return '#ef4444';
}

function FloorLabel({ code, name }: { code: string; name: string }) {
  return (
    <Html position={[0, 0.5, -3.5]} center>
      <div className="scene-label scene-label--floor">
        <strong>{code}</strong>
        <small>{name}</small>
      </div>
    </Html>
  );
}

function StoreLabel({ store, isHovered }: { store: SceneStore; isHovered: boolean }) {
  return (
    <Html position={[store.position[0], store.position[1] + store.size[1] / 2 + 0.3, store.position[2]]} center>
      <div className={`scene-label scene-label--store ${store.selected ? 'is-selected' : ''} ${isHovered ? 'is-hovered' : ''}`}>
        <span>{store.name}</span>
        <small>{store.level} · {store.score}</small>
      </div>
    </Html>
  );
}

function HeatmapPoint({ point }: { point: SceneHeatmapPoint }) {
  const ref = useRef<THREE.Mesh>(null);
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  useFrame((state) => {
    if (ref.current) {
      const scale = 0.92 + Math.sin(state.clock.elapsedTime * 1.8 + point.position[0]) * 0.04;
      targetScale.current.set(scale, scale, scale);
      ref.current.scale.lerp(targetScale.current, 0.1);
    }
  });

  return (
    <mesh ref={ref} position={point.position} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[point.radius, 36]} />
      <meshStandardMaterial
        color={point.intensity > 0.7 ? '#ef4444' : point.intensity > 0.4 ? '#f59e0b' : '#3b82f6'}
        emissive={point.intensity > 0.7 ? '#ef4444' : point.intensity > 0.4 ? '#f59e0b' : '#3b82f6'}
        emissiveIntensity={0.18}
        transparent
        opacity={0.24 + point.intensity * 0.28}
        depthWrite={false}
      />
    </mesh>
  );
}

function FlowLine({ flow }: { flow: SceneFlowLine }) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(...flow.from),
      new THREE.Vector3((flow.from[0] + flow.to[0]) / 2, flow.from[1] + 0.04, (flow.from[2] + flow.to[2]) / 2),
      new THREE.Vector3(...flow.to)
    ]),
    [flow.from, flow.to]
  );
  const points = useMemo(() => curve.getPoints(18), [curve]);
  const arrowRotation = Math.atan2(flow.to[0] - flow.from[0], flow.to[2] - flow.from[2]);

  return (
    <group>
      <line>
        <bufferGeometry attach="geometry" setFromPoints={points} />
        <lineBasicMaterial
          attach="material"
          color={flow.direction === 'inbound' ? '#2563eb' : flow.direction === 'outbound' ? '#0f766e' : '#f59e0b'}
          transparent
          opacity={0.32 + flow.intensity * 0.42}
        />
      </line>
      <mesh position={flow.to} rotation={[Math.PI / 2, 0, arrowRotation]}>
        <coneGeometry args={[0.08 + flow.intensity * 0.05, 0.22, 16]} />
        <meshStandardMaterial
          color={flow.direction === 'inbound' ? '#2563eb' : flow.direction === 'outbound' ? '#0f766e' : '#f59e0b'}
          emissive={flow.direction === 'inbound' ? '#2563eb' : flow.direction === 'outbound' ? '#0f766e' : '#f59e0b'}
          emissiveIntensity={0.18}
          transparent
          opacity={0.74}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function AlertIndicator({ alert }: { alert: SceneAlert }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = alert.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.visible = Math.sin(state.clock.elapsedTime * 3) > 0;
    }
  });

  return (
    <mesh ref={ref} position={alert.position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={alert.level === 'high' ? '#ef4444' : alert.level === 'medium' ? '#f59e0b' : '#3b82f6'}
        emissive={alert.level === 'high' ? '#ef4444' : alert.level === 'medium' ? '#f59e0b' : '#3b82f6'}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function SceneStatusPanel({ title, detail }: { title: string; detail: string }) {
  return (
    <Html center position={[0, 1.1, 0]}>
      <div className="scene-status-panel" role="status">
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
    </Html>
  );
}

type ModelErrorBoundaryProps = {
  children: ReactNode;
  fallbackPath: string;
};

type ModelErrorBoundaryState = {
  error?: Error;
};

class ModelErrorBoundary extends Component<ModelErrorBoundaryProps, ModelErrorBoundaryState> {
  state: ModelErrorBoundaryState = {};

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <SceneStatusPanel
          title="GLB 模型加载失败"
          detail={`${this.props.fallbackPath} · ${this.state.error.message}`}
        />
      );
    }

    return this.props.children;
  }
}

function CameraController({ targetPosition }: { targetPosition?: [number, number, number] }) {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 7.2, 8.4));
  const lerpFactor = 0.05;

  useEffect(() => {
    if (targetPosition) {
      targetRef.current.set(
        targetPosition[0] + 2,
        targetPosition[1] + 4,
        targetPosition[2] + 5
      );
    }
  }, [targetPosition]);

  useFrame(() => {
    camera.position.lerp(targetRef.current, lerpFactor);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function MallFloorModel({ onClick, onHover, onUnhover }: {
  onClick?: (storeId: string) => void;
  onHover?: (storeId: string) => void;
  onUnhover?: () => void;
}) {
  const { scene } = useGLTF(GLB_MODEL_PATH);

  return (
    <primitive
      object={scene}
      onClick={(e: { object: { name: string }; stopPropagation: () => void }) => {
        e.stopPropagation();
        if (onClick && e.object.name.startsWith('Store_')) {
          const storeId = e.object.name.replace('Store_', '');
          onClick(storeId);
        }
      }}
      onPointerOver={(e: { object: { name: string }; stopPropagation: () => void }) => {
        e.stopPropagation();
        if (e.object.name.startsWith('Store_')) {
          document.body.style.cursor = 'pointer';
          const storeId = e.object.name.replace('Store_', '');
          onHover?.(storeId);
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        onUnhover?.();
      }}
    />
  );
}

useGLTF.preload(GLB_MODEL_PATH);

function StoreMesh({ store, onClick, onHover, onUnhover, isHovered }: {
  store: SceneStore;
  onClick: (storeId: string) => void;
  onHover: (storeId: string) => void;
  onUnhover: () => void;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  useFrame(() => {
    if (meshRef.current) {
      const scale = isHovered ? 1.05 : 1;
      targetScale.current.set(scale, scale, scale);
      meshRef.current.scale.lerp(targetScale.current, 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={store.position}
      onClick={() => onClick(store.storeId)}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(store.storeId);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        onUnhover();
      }}
    >
      <boxGeometry args={store.size} />
      <meshStandardMaterial
        color={getScoreColor(store.score)}
        emissive={getScoreColor(store.score)}
        emissiveIntensity={isHovered ? 0.3 : 0.1}
        metalness={0.08}
        roughness={0.48}
      />
    </mesh>
  );
}

function ProgrammaticScene({ adapterState, onStoreClick, onStoreHover, onStoreUnhover, hoveredStoreId, showHeatmap }: {
  adapterState: SceneAdapterState;
  onStoreClick: (storeId: string) => void;
  onStoreHover: (storeId: string) => void;
  onStoreUnhover: () => void;
  hoveredStoreId: string | null;
  showHeatmap: boolean;
}) {
  return (
    <>
      <color args={['#f7f9fc']} attach="background" />
      <ambientLight intensity={0.72} />
      <directionalLight intensity={1.85} position={[4, 8, 5]} castShadow />
      <group rotation={[-0.18, -0.34, 0]}>
        {adapterState.floor && (
          <>
            <mesh position={[0, adapterState.floor.elevation, 0]} receiveShadow>
              <boxGeometry args={[adapterState.floor.width, 0.12, adapterState.floor.depth]} />
              <meshStandardMaterial color="#eef3f8" roughness={0.72} />
            </mesh>
            <FloorLabel code={adapterState.floor.code} name={adapterState.floor.name} />
          </>
        )}
        {adapterState.corridors.map((corridor) => (
          <mesh key={corridor.id} position={corridor.position}>
            <boxGeometry args={corridor.size} />
            <meshStandardMaterial color={corridor.direction === 'horizontal' ? '#dbe7f2' : '#e5edf6'} roughness={0.66} />
          </mesh>
        ))}
        {adapterState.stores.map((store) => (
          <group key={store.id}>
            <StoreMesh
              store={store}
              onClick={onStoreClick}
              onHover={onStoreHover}
              onUnhover={onStoreUnhover}
              isHovered={hoveredStoreId === store.storeId}
            />
            <StoreLabel store={store} isHovered={hoveredStoreId === store.storeId} />
          </group>
        ))}
        {showHeatmap && heatmapScenePoints.map((point, index) => (
          <HeatmapPoint key={index} position={point.position} intensity={point.intensity} />
        ))}
        {adapterState.alerts.map((alert) => (
          <AlertIndicator key={alert.id} alert={alert} />
        ))}
      </group>
    </>
  );
}

function GLBScene({ adapterState, onStoreClick, onStoreHover, onStoreUnhover, hoveredStoreId, showHeatmap }: {
  adapterState: SceneAdapterState;
  onStoreClick: (storeId: string) => void;
  onStoreHover: (storeId: string) => void;
  onStoreUnhover: () => void;
  hoveredStoreId: string | null;
  showHeatmap: boolean;
}) {
  return (
    <>
      <color args={['#f7f9fc']} attach="background" />
      <ambientLight intensity={0.72} />
      <directionalLight intensity={1.85} position={[4, 8, 5]} castShadow />
      <group rotation={[-0.18, -0.34, 0]}>
        <ModelErrorBoundary fallbackPath={GLB_MODEL_PATH}>
          <MallFloorModel onClick={onStoreClick} onHover={onStoreHover} onUnhover={onStoreUnhover} />
        </ModelErrorBoundary>
        {adapterState.floor && (
          <FloorLabel code={adapterState.floor.code} name={adapterState.floor.name} />
        )}
        {adapterState.stores.map((store) => (
          <StoreLabel key={store.id} store={store} isHovered={hoveredStoreId === store.storeId} />
        ))}
        {showHeatmap && heatmapScenePoints.map((point, index) => (
          <HeatmapPoint key={index} position={point.position} intensity={point.intensity} />
        ))}
        {adapterState.alerts.map((alert) => (
          <AlertIndicator key={alert.id} alert={alert} />
        ))}
      </group>
    </>
  );
}

export function DigitalTwinScene({ viewModel, buildTwinUrl, onInteraction, useGLBModel = false }: DigitalTwinSceneProps) {
  const adapterState = useMemo(() => buildSceneAdapterState(viewModel), [viewModel]);
  const selectedStore = viewModel.selectedStore;
  const [hoveredStoreId, setHoveredStoreId] = useState<string | null>(null);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number] | undefined>();
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStoreClick = (storeId: string) => {
    if (onInteraction) {
      onInteraction({
        type: 'store-click',
        objectId: `store-${storeId}`,
        storeId,
        floorId: viewModel.floor.id
      });
    }
  };

  const handleStoreHover = (storeId: string) => {
    setHoveredStoreId(storeId);
    if (onInteraction) {
      onInteraction({
        type: 'store-hover',
        objectId: `store-${storeId}`,
        storeId,
        floorId: viewModel.floor.id
      });
    }
  };

  const handleStoreUnhover = () => {
    setHoveredStoreId(null);
  };

  useEffect(() => {
    if (selectedStore) {
      const store = adapterState.stores.find(s => s.storeId === selectedStore.id);
      if (store) {
        setCameraTarget(store.position);
      }
    } else {
      setCameraTarget(undefined);
    }
  }, [selectedStore, adapterState.stores]);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [viewModel.floor.id]);

  if (!adapterState.hasSpatialData) {
    return (
      <div className="state-panel" role="status">
        当前楼层没有可展示的 WebGL 空间数据
      </div>
    );
  }

  return (
    <div className="digital-twin-scene" aria-label={`${viewModel.floor.name} WebGL 合成数字孪生场景`}>
      <Canvas
        camera={{ fov: 43, position: [0, 7.2, 8.4] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.55 }}
        shadows
        fallback={<div className="state-panel" role="status">WebGL 不可用，保留 SVG/2.5D 平面作为兜底。</div>}
      >
        <CameraController targetPosition={cameraTarget} />
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
        <Suspense fallback={<SceneStatusPanel title="正在加载 GLB 商场模型" detail={GLB_MODEL_PATH} />}>
          <group visible={!isTransitioning}>
            {useGLBModel ? (
              <GLBScene
                adapterState={adapterState}
                onStoreClick={handleStoreClick}
                onStoreHover={handleStoreHover}
                onStoreUnhover={handleStoreUnhover}
                hoveredStoreId={hoveredStoreId}
                showHeatmap={showHeatmap}
              />
            ) : (
              <ProgrammaticScene
                adapterState={adapterState}
                onStoreClick={handleStoreClick}
                onStoreHover={handleStoreHover}
                onStoreUnhover={handleStoreUnhover}
                hoveredStoreId={hoveredStoreId}
                showHeatmap={showHeatmap}
              />
            )}
          </group>
        </Suspense>
      </Canvas>
      <div className="digital-twin-scene__overlay" aria-hidden="true">
        <span>WebGL synthetic scene · Three.js / R3F · {useGLBModel ? `GLB model · ${GLB_MODEL_PATH}` : 'procedural adapter'}</span>
        <strong>{adapterState.floor?.code} · {adapterState.stores.length} store blocks · {adapterState.alerts.length} alerts</strong>
      </div>
      <div className="digital-twin-scene__controls">
        <button
          className={`scene-control ${showHeatmap ? 'is-active' : ''}`}
          onClick={() => setShowHeatmap(!showHeatmap)}
          aria-label={showHeatmap ? '隐藏热力图' : '显示热力图'}
        >
          {showHeatmap ? '隐藏热力图' : '显示热力图'}
        </button>
      </div>
      {selectedStore ? (
        <a className="digital-twin-scene__focus" href={buildTwinUrl({ floorId: viewModel.floor.id, mode: viewModel.mode, storeId: selectedStore.id })}>
          当前聚焦：{selectedStore.name} · {selectedStore.level} · {selectedStore.score}
        </a>
      ) : null}
    </div>
  );
}
