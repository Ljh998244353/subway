import { Canvas } from '@react-three/fiber';
import type { DigitalTwinRouteParams } from '../../routes/demoFlow.ts';
import type { DigitalTwinViewModel } from '../../pages/digitalTwinModel.ts';
import { buildSceneAdapterState, type SceneAdapterState, type SceneStore, type SceneInteractionEvent } from '../adapter/sceneAdapter.ts';

type DigitalTwinSceneProps = {
  viewModel: DigitalTwinViewModel;
  buildTwinUrl: (params: DigitalTwinRouteParams) => string;
  onInteraction?: (event: SceneInteractionEvent) => void;
};

function StoreMesh({ store, onClick }: { store: SceneStore; onClick: (storeId: string) => void }) {
  return (
    <mesh
      position={store.position}
      onClick={() => onClick(store.storeId)}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <boxGeometry args={store.size} />
      <meshStandardMaterial
        color={store.color}
        emissive={store.emissive}
        emissiveIntensity={store.emissiveIntensity}
        metalness={0.08}
        roughness={0.48}
      />
    </mesh>
  );
}

function SceneContent({ adapterState, onStoreClick }: { adapterState: SceneAdapterState; onStoreClick: (storeId: string) => void }) {
  return (
    <>
      <color args={['#f7f9fc']} attach="background" />
      <ambientLight intensity={0.72} />
      <directionalLight intensity={1.85} position={[4, 8, 5]} />
      <group rotation={[-0.18, -0.34, 0]}>
        {adapterState.floor && (
          <mesh position={[0, adapterState.floor.elevation, 0]} receiveShadow>
            <boxGeometry args={[adapterState.floor.width, 0.12, adapterState.floor.depth]} />
            <meshStandardMaterial color="#eef3f8" roughness={0.72} />
          </mesh>
        )}
        {adapterState.corridors.map((corridor) => (
          <mesh key={corridor.id} position={corridor.position}>
            <boxGeometry args={corridor.size} />
            <meshStandardMaterial color={corridor.direction === 'horizontal' ? '#dbe7f2' : '#e5edf6'} roughness={0.66} />
          </mesh>
        ))}
        {adapterState.stores.map((store) => (
          <StoreMesh key={store.id} store={store} onClick={onStoreClick} />
        ))}
      </group>
    </>
  );
}

export function DigitalTwinScene({ viewModel, buildTwinUrl, onInteraction }: DigitalTwinSceneProps) {
  const adapterState = buildSceneAdapterState(viewModel);
  const selectedStore = viewModel.selectedStore;

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

  if (!adapterState.hasSpatialData) {
    return (
      <div className="state-panel" role="status">
        当前楼层没有可展示的 WebGL 空间数据
      </div>
    );
  }

  return (
    <div className="digital-twin-scene" aria-label={`${viewModel.floor.name} WebGL 合成数字孪生场景`}>
      <Canvas camera={{ fov: 43, position: [0, 7.2, 8.4] }} dpr={[1, 1.5]}>
        <SceneContent adapterState={adapterState} onStoreClick={handleStoreClick} />
      </Canvas>
      <div className="digital-twin-scene__overlay" aria-hidden="true">
        <span>WebGL synthetic scene · Three.js / R3F · P7-I4 adapter</span>
        <strong>{adapterState.floor?.code} · {adapterState.stores.length} store blocks · {adapterState.alerts.length} alerts</strong>
      </div>
      {selectedStore ? (
        <a className="digital-twin-scene__focus" href={buildTwinUrl({ floorId: viewModel.floor.id, mode: viewModel.mode, storeId: selectedStore.id })}>
          当前聚焦：{selectedStore.name} · {selectedStore.level} · {selectedStore.score}
        </a>
      ) : null}
    </div>
  );
}
