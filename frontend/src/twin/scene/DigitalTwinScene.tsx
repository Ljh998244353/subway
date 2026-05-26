import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { DigitalTwinRouteParams } from '../../routes/demoFlow.ts';
import type { DigitalTwinViewModel } from '../../pages/digitalTwinModel.ts';
import { buildSceneAdapterState, type SceneAdapterState, type SceneStore, type SceneAlert, type SceneInteractionEvent } from '../adapter/sceneAdapter.ts';

type DigitalTwinSceneProps = {
  viewModel: DigitalTwinViewModel;
  buildTwinUrl: (params: DigitalTwinRouteParams) => string;
  onInteraction?: (event: SceneInteractionEvent) => void;
  useGLBModel?: boolean;
};

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

function HeatmapPoint({ position, intensity }: { position: [number, number, number]; intensity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0.5);

  useFrame((state) => {
    if (ref.current) {
      const targetScale = 0.5 + intensity * 0.5 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      setScale(prev => prev + (targetScale - prev) * 0.1);
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color={intensity > 0.7 ? '#ef4444' : intensity > 0.4 ? '#f59e0b' : '#3b82f6'}
        emissive={intensity > 0.7 ? '#ef4444' : intensity > 0.4 ? '#f59e0b' : '#3b82f6'}
        emissiveIntensity={0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function AlertIndicator({ alert }: { alert: SceneAlert }) {
  const ref = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(true);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = alert.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      setVisible(Math.sin(state.clock.elapsedTime * 3) > 0);
    }
  });

  return (
    <mesh ref={ref} position={alert.position} visible={visible}>
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
  const { scene } = useGLTF('/models/mall_floor_f2.glb');

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

function StoreMesh({ store, onClick, onHover, onUnhover, isHovered }: {
  store: SceneStore;
  onClick: (storeId: string) => void;
  onHover: (storeId: string) => void;
  onUnhover: () => void;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hoverScale, setHoverScale] = useState(1);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered ? 1.05 : 1;
      setHoverScale(prev => prev + (targetScale - prev) * 0.1);
      meshRef.current.scale.set(hoverScale, hoverScale, hoverScale);
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
  const heatmapPoints: Array<{ position: [number, number, number]; intensity: number }> = [
    { position: [-2, 0.2, 1], intensity: 0.8 },
    { position: [1, 0.2, -1], intensity: 0.6 },
    { position: [-1, 0.2, 2], intensity: 0.4 },
    { position: [3, 0.2, 0], intensity: 0.9 },
    { position: [0, 0.2, -2], intensity: 0.7 },
  ];

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
        {showHeatmap && heatmapPoints.map((point, index) => (
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
  const heatmapPoints: Array<{ position: [number, number, number]; intensity: number }> = [
    { position: [-2, 0.2, 1], intensity: 0.8 },
    { position: [1, 0.2, -1], intensity: 0.6 },
    { position: [-1, 0.2, 2], intensity: 0.4 },
    { position: [3, 0.2, 0], intensity: 0.9 },
    { position: [0, 0.2, -2], intensity: 0.7 },
  ];

  return (
    <>
      <color args={['#f7f9fc']} attach="background" />
      <ambientLight intensity={0.72} />
      <directionalLight intensity={1.85} position={[4, 8, 5]} castShadow />
      <group rotation={[-0.18, -0.34, 0]}>
        <MallFloorModel onClick={onStoreClick} onHover={onStoreHover} onUnhover={onStoreUnhover} />
        {adapterState.floor && (
          <FloorLabel code={adapterState.floor.code} name={adapterState.floor.name} />
        )}
        {adapterState.stores.map((store) => (
          <StoreLabel key={store.id} store={store} isHovered={hoveredStoreId === store.storeId} />
        ))}
        {showHeatmap && heatmapPoints.map((point, index) => (
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
  const adapterState = buildSceneAdapterState(viewModel);
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
      <Canvas camera={{ fov: 43, position: [0, 7.2, 8.4] }} dpr={[1, 1.5]} shadows>
        <CameraController targetPosition={cameraTarget} />
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
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
      </Canvas>
      <div className="digital-twin-scene__overlay" aria-hidden="true">
        <span>WebGL synthetic scene · Three.js / R3F · {useGLBModel ? 'GLB model' : 'P7-I4 adapter'}</span>
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
