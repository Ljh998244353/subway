import assert from 'node:assert/strict';
import test from 'node:test';
import { productionChunkNames, productionChunkSizeWarningLimitKb, resolveProductionChunk } from './buildChunks.ts';

test('P8-I1 keeps large production dependencies in explicit chunks', () => {
  assert.equal(
    resolveProductionChunk('D:/subway/frontend/node_modules/@react-three/fiber/dist/index.mjs'),
    productionChunkNames.r3f
  );
  assert.equal(
    resolveProductionChunk('D:/subway/frontend/node_modules/@react-three/drei/index.js'),
    productionChunkNames.drei
  );
  assert.equal(
    resolveProductionChunk('D:/subway/frontend/node_modules/three/build/three.module.js'),
    productionChunkNames.three
  );
  assert.equal(
    resolveProductionChunk('D:/subway/frontend/node_modules/framer-motion/dist/es/index.mjs'),
    productionChunkNames.motion
  );
  assert.equal(
    resolveProductionChunk('D:/subway/frontend/node_modules/react-router/dist/development/index.mjs'),
    productionChunkNames.router
  );
  assert.equal(
    resolveProductionChunk('D:/subway/frontend/node_modules/react-dom/client.js'),
    productionChunkNames.react
  );
});

test('P8-I1 leaves application modules to route-level lazy chunks', () => {
  assert.equal(resolveProductionChunk('D:/subway/frontend/src/pages/DigitalTwinPage.tsx'), undefined);
});

test('P8-I1 keeps the warning limit scoped to the known Three.js vendor chunk', () => {
  assert.equal(productionChunkSizeWarningLimitKb, 800);
});
