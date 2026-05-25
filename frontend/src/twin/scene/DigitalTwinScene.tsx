import { Canvas } from '@react-three/fiber';
import type { DigitalTwinRouteParams } from '../../routes/demoFlow.ts';
import type { DigitalTwinViewModel } from '../../pages/digitalTwinModel.ts';

type DigitalTwinSceneProps = {
  viewModel: DigitalTwinViewModel;
  buildTwinUrl: (params: DigitalTwinRouteParams) => string;
};

function normalize(value: number, size: number, span: number) {
  return (value / size - 0.5) * span;
}

function getStoreTone(level: string, selected: boolean) {
  if (selected) return '#2f54eb';
  if (level === 'A' || level === 'B') return '#14b8a6';
  if (level === 'C') return '#f59e0b';
  return '#f43f5e';
}

function SceneContent({ viewModel }: { viewModel: DigitalTwinViewModel }) {
  const { floor, selectedStore, stores } = viewModel;
  const floorSpan = 12;
  const floorDepth = 7;

  return (
    <>
      <color args={['#f7f9fc']} attach="background" />
      <ambientLight intensity={0.72} />
      <directionalLight intensity={1.85} position={[4, 8, 5]} />
      <group rotation={[-0.18, -0.34, 0]}>
        <mesh position={[0, -0.08, 0]} receiveShadow>
          <boxGeometry args={[floorSpan, 0.12, floorDepth]} />
          <meshStandardMaterial color="#eef3f8" roughness={0.72} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[floorSpan * 0.86, 0.05, 0.8]} />
          <meshStandardMaterial color="#dbe7f2" roughness={0.66} />
        </mesh>
        <mesh position={[0, 0.03, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[floorDepth * 0.68, 0.05, 0.72]} />
          <meshStandardMaterial color="#e5edf6" roughness={0.68} />
        </mesh>
        {stores.map((store) => {
          const width = Math.max(0.46, (store.geometry.width / floor.width) * floorSpan);
          const depth = Math.max(0.46, (store.geometry.height / floor.height) * floorDepth);
          const x = normalize(store.geometry.x + store.geometry.width / 2, floor.width, floorSpan);
          const z = normalize(store.geometry.y + store.geometry.height / 2, floor.height, floorDepth);
          const selected = store.id === selectedStore?.id;
          const height = 0.26 + store.currentOccupancy / 220;

          return (
            <mesh key={store.id} position={[x, height / 2, z]}>
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial
                color={getStoreTone(store.level, selected)}
                emissive={selected ? '#183b8f' : '#000000'}
                emissiveIntensity={selected ? 0.18 : 0}
                metalness={0.08}
                roughness={0.48}
              />
            </mesh>
          );
        })}
      </group>
    </>
  );
}

export function DigitalTwinScene({ viewModel, buildTwinUrl }: DigitalTwinSceneProps) {
  const selectedStore = viewModel.selectedStore;

  if (!viewModel.hasSpatialData) {
    return (
      <div className="state-panel" role="status">
        当前楼层没有可展示的 WebGL 空间数据
      </div>
    );
  }

  return (
    <div className="digital-twin-scene" aria-label={`${viewModel.floor.name} WebGL 合成数字孪生场景`}>
      <Canvas camera={{ fov: 43, position: [0, 7.2, 8.4] }} dpr={[1, 1.5]}>
        <SceneContent viewModel={viewModel} />
      </Canvas>
      <div className="digital-twin-scene__overlay" aria-hidden="true">
        <span>WebGL synthetic scene · Three.js / R3F baseline</span>
        <strong>{viewModel.floor.code} · {viewModel.stores.length} self-authored store blocks</strong>
      </div>
      {selectedStore ? (
        <a className="digital-twin-scene__focus" href={buildTwinUrl({ floorId: viewModel.floor.id, mode: viewModel.mode, storeId: selectedStore.id })}>
          当前聚焦：{selectedStore.name} · {selectedStore.level} · {selectedStore.score}
        </a>
      ) : null}
    </div>
  );
}
