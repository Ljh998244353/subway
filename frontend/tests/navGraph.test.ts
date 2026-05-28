import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildFlowPath, buildNavGraph, getStoreGateNodeId } from '../src/lib/nav-graph.ts';

describe('NavGraph and A* pathing', () => {
  it('keeps nodes on corridor and gate topology', () => {
    const graph = buildNavGraph('F2');
    assert.ok(graph.nodes.length > 20);
    assert.equal(graph.nodes.some((node) => node.type === 'store_gate'), true);
    assert.equal(graph.nodes.some((node) => node.x === 50 && node.y === 50), false);
  });

  it('routes through corridor nodes instead of a direct building-cut line', () => {
    const path = buildFlowPath('F2', 'S043', 'inbound');
    assert.ok(path.nodes.length >= 3);
    assert.equal(path.nodes[0].type, 'escalator');
    assert.equal(path.nodes[path.nodes.length - 1].id, getStoreGateNodeId('F2', 'S043'));
    assert.equal(path.nodes.some((node) => node.type === 'corridor'), true);
  });
});
