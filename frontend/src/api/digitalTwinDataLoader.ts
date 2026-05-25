import { mockFlowEdges, mockHeatmapPoints, mockMall } from '../mock/index.ts';
import type { FlowEdge, HeatmapPoint } from '../types/index.ts';
import { resolveApiBaseUrl, resolveFrontendDataMode, type FrontendDataMode } from './apiMode.ts';
import {
  createReferenceApiClient,
  type HeatmapPointDto,
  type ReferenceApiClient,
  type TrajectoryFlowDto
} from './referenceClient.ts';

export type DigitalTwinDataSource = 'mock' | 'api';

export type DigitalTwinDataLoaderOptions = {
  mode?: string;
  apiBaseUrl?: string;
  mallId?: string;
  client?: Pick<ReferenceApiClient, 'getHeatmap' | 'getTrajectories'>;
  fetchImpl?: typeof fetch;
  requestIdFactory?: () => string;
};

export type DigitalTwinDataResult = {
  mode: FrontendDataMode;
  source: DigitalTwinDataSource;
  heatmapPoints: HeatmapPoint[];
  flowEdges: FlowEdge[];
  traceIds: string[];
  timestamp?: string;
};

export async function loadDigitalTwinData(
  options: DigitalTwinDataLoaderOptions = {}
): Promise<DigitalTwinDataResult> {
  const mode = resolveFrontendDataMode(options.mode);

  if (mode === 'mock') {
    return {
      mode,
      source: 'mock',
      heatmapPoints: mockHeatmapPoints,
      flowEdges: mockFlowEdges,
      traceIds: []
    };
  }

  const client =
    options.client ??
    createReferenceApiClient({
      baseUrl: resolveApiBaseUrl(options.apiBaseUrl),
      fetchImpl: options.fetchImpl,
      requestIdFactory: options.requestIdFactory
    });
  const mallId = options.mallId ?? mockMall.id;
  const [heatmapEnvelope, trajectoriesEnvelope] = await Promise.all([
    client.getHeatmap(mallId),
    client.getTrajectories(mallId)
  ]);

  return {
    mode,
    source: 'api',
    heatmapPoints: heatmapEnvelope.data.points.map(mapHeatmapPointDtoToDomain),
    flowEdges: trajectoriesEnvelope.data.flows.map(mapTrajectoryFlowDtoToDomain),
    traceIds: [heatmapEnvelope.traceId, trajectoriesEnvelope.traceId],
    timestamp: heatmapEnvelope.timestamp
  };
}

export function mapHeatmapPointDtoToDomain(point: HeatmapPointDto): HeatmapPoint {
  return {
    id: point.pointId,
    floorId: point.floorId,
    x: point.x,
    y: point.y,
    intensity: normalizeIntensity(point.intensity)
  };
}

export function mapTrajectoryFlowDtoToDomain(flow: TrajectoryFlowDto): FlowEdge {
  return {
    id: flow.flowId,
    floorId: flow.floorId,
    from: { ...flow.fromPoint },
    to: { ...flow.toPoint },
    traffic: Math.max(0, Math.round(flow.traffic)),
    direction: normalizeDirection(flow.direction)
  };
}

function normalizeIntensity(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(1, Math.max(0, value));
}

function normalizeDirection(value: string): FlowEdge['direction'] {
  if (value === 'inbound' || value === 'outbound' || value === 'cross') {
    return value;
  }

  return 'cross';
}
