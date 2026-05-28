import * as THREE from 'three';
import { floorOrder, getStoresForFloor } from './twin-data.ts';
import type { FlowPath, FlowScope, FloorId, NavEdge, NavGraph, NavNode } from '../types/index.ts';

function distance(a: NavNode, b: NavNode) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function edge(source: NavNode, target: NavNode): NavEdge {
  return { source: source.id, target: target.id, distance: distance(source, target) };
}

export function buildNavGraph(floorId: FloorId): NavGraph {
  const spine: NavNode[] = Array.from({ length: 8 }, (_, index) => ({
    id: `NODE_${floorId}_CORRIDOR_${String(index + 1).padStart(2, '0')}`,
    floor: floorId,
    x: 16 + index * 9.7,
    y: index % 2 === 0 ? 43 : 57,
    type: 'corridor'
  }));
  const vertical: NavNode[] = [
    { id: `NODE_${floorId}_ESCALATOR_A`, floor: floorId, x: 39, y: 50, type: 'escalator' },
    { id: `NODE_${floorId}_ELEVATOR_CORE`, floor: floorId, x: 54, y: 50, type: 'elevator' },
    { id: `NODE_${floorId}_ESCALATOR_B`, floor: floorId, x: 68, y: 50, type: 'escalator' }
  ];
  const storeNodes: NavNode[] = getStoresForFloor(floorId).map((store) => ({
    id: `NODE_${floorId}_${store.id}_GATE`,
    floor: floorId,
    x: store.x,
    y: store.y < 50 ? store.y + 10 : store.y - 10,
    type: 'store_gate'
  }));
  const nodes = [...spine, ...vertical, ...storeNodes];
  const edges: NavEdge[] = [];

  for (let index = 0; index < spine.length - 1; index += 1) {
    edges.push(edge(spine[index], spine[index + 1]));
  }
  vertical.forEach((node) => {
    const nearest = spine.reduce((best, current) => (distance(node, current) < distance(node, best) ? current : best), spine[0]);
    edges.push(edge(node, nearest));
  });
  storeNodes.forEach((node) => {
    const nearest = spine.reduce((best, current) => (distance(node, current) < distance(node, best) ? current : best), spine[0]);
    edges.push(edge(node, nearest));
  });

  return { nodes, edges };
}

export function findPath(graph: NavGraph, sourceId: string, targetId: string): NavNode[] {
  const nodes = new Map(graph.nodes.map((node) => [node.id, node]));
  const neighbors = new Map<string, NavEdge[]>();
  graph.edges.forEach((item) => {
    neighbors.set(item.source, [...(neighbors.get(item.source) ?? []), item]);
    neighbors.set(item.target, [...(neighbors.get(item.target) ?? []), { source: item.target, target: item.source, distance: item.distance }]);
  });

  const open = new Set([sourceId]);
  const cameFrom = new Map<string, string>();
  const gScore = new Map<string, number>([[sourceId, 0]]);
  const fScore = new Map<string, number>([[sourceId, 0]]);

  while (open.size > 0) {
    const current = [...open].reduce((best, id) => ((fScore.get(id) ?? Infinity) < (fScore.get(best) ?? Infinity) ? id : best));
    if (current === targetId) {
      const path = [current];
      let cursor = current;
      while (cameFrom.has(cursor)) {
        cursor = cameFrom.get(cursor) as string;
        path.unshift(cursor);
      }
      return path.map((id) => nodes.get(id)).filter((node): node is NavNode => Boolean(node));
    }
    open.delete(current);
    const currentNode = nodes.get(current);
    const targetNode = nodes.get(targetId);
    if (!currentNode || !targetNode) break;

    (neighbors.get(current) ?? []).forEach((item) => {
      const tentative = (gScore.get(current) ?? Infinity) + item.distance;
      if (tentative < (gScore.get(item.target) ?? Infinity)) {
        cameFrom.set(item.target, current);
        gScore.set(item.target, tentative);
        const nextNode = nodes.get(item.target);
        fScore.set(item.target, tentative + (nextNode ? distance(nextNode, targetNode) : 0));
        open.add(item.target);
      }
    });
  }

  return [];
}

export function getStoreGateNodeId(floorId: FloorId, storeId: string) {
  return `NODE_${floorId}_${storeId}_GATE`;
}

export function buildFlowPath(floorId: FloorId, storeId: string, scope: FlowScope): FlowPath {
  const graph = buildNavGraph(floorId);
  const gate = getStoreGateNodeId(floorId, storeId);
  const source = scope === 'inbound' ? `NODE_${floorId}_ESCALATOR_A` : gate;
  const target = scope === 'inbound' ? gate : `NODE_${floorId}_ESCALATOR_B`;
  const nodes = findPath(graph, source, target);

  return {
    id: `FLOW_${floorId}_${storeId}_${scope}`,
    floorId,
    storeId,
    scope,
    density: 0.42 + (floorOrder.indexOf(floorId) + 1) * 0.08,
    nodes
  };
}

export function toSmoothCurve(nodes: NavNode[]) {
  const points = nodes.map((node) => new THREE.Vector3(node.x - 50, 0.12, node.y - 50));
  return new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.45);
}
