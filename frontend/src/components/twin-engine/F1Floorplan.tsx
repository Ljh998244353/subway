'use client';

import { useUrlState } from '../../hooks/use-url-state.ts';
import { getStoresForFloor } from '../../lib/twin-data.ts';
import type { FloorId, TwinUrlState } from '../../types/index.ts';

interface StoreUnitDef {
  id: string;
  d: string;
  cx: number;
  cy: number;
  type: 'anchor' | 'inline' | 'atrium' | 'fb' | 'public';
}

function makeStorePath(x: number, y: number, w: number, h: number, shape: string): string {
  if (shape === 'rect') {
    return `M${x},${y}h${w}v${h}h${-w}Z`;
  }
  if (shape === 'curved') {
    const cpx = x + w / 2;
    return `M${x},${y}h${w}v${h}Q${cpx},${h + y + 1.8} ${x},${h + y}Z`;
  }
  if (shape === 'trapezoid') {
    const inset = 0.8;
    return `M${x + inset},${y}h${w - inset * 2}l${inset},${h}h${-w}l${inset},${-h}Z`;
  }
  return `M${x},${y}h${w}v${h}h${-w}Z`;
}

const storeUnits: StoreUnitDef[] = [
  // Anchors
  { id: 'S001', d: makeStorePath(5, 8, 16, 10, 'rect'), cx: 13, cy: 13, type: 'anchor' },
  { id: 'S007', d: makeStorePath(79, 8, 16, 10, 'rect'), cx: 87, cy: 13, type: 'anchor' },
  { id: 'S015', d: makeStorePath(5, 82, 16, 10, 'rect'), cx: 13, cy: 87, type: 'anchor' },
  { id: 'S021', d: makeStorePath(79, 82, 16, 10, 'rect'), cx: 87, cy: 87, type: 'anchor' },
  // Inline North
  { id: 'S002', d: makeStorePath(23, 8, 8, 10, 'rect'), cx: 27, cy: 13, type: 'inline' },
  { id: 'S003', d: makeStorePath(33, 8, 8, 10, 'rect'), cx: 37, cy: 13, type: 'inline' },
  { id: 'S004', d: makeStorePath(43, 8, 7, 10, 'rect'), cx: 46.5, cy: 13, type: 'inline' },
  { id: 'S005', d: makeStorePath(52, 8, 7, 10, 'rect'), cx: 55.5, cy: 13, type: 'inline' },
  { id: 'S006', d: makeStorePath(61, 8, 8, 10, 'rect'), cx: 65, cy: 13, type: 'inline' },
  { id: 'S014', d: makeStorePath(71, 8, 6, 10, 'rect'), cx: 74, cy: 13, type: 'inline' },
  // Inline South
  { id: 'S016', d: makeStorePath(23, 82, 8, 10, 'rect'), cx: 27, cy: 87, type: 'inline' },
  { id: 'S017', d: makeStorePath(33, 82, 8, 10, 'rect'), cx: 37, cy: 87, type: 'inline' },
  { id: 'S018', d: makeStorePath(43, 82, 16, 10, 'rect'), cx: 51, cy: 87, type: 'inline' },
  { id: 'S019', d: makeStorePath(61, 82, 8, 10, 'rect'), cx: 65, cy: 87, type: 'inline' },
  { id: 'S020', d: makeStorePath(71, 82, 6, 10, 'rect'), cx: 74, cy: 87, type: 'inline' },
  // Atrium-facing
  { id: 'S008', d: makeStorePath(26, 28, 10, 5, 'curved'), cx: 31, cy: 30.5, type: 'atrium' },
  { id: 'S009', d: makeStorePath(64, 28, 10, 5, 'curved'), cx: 69, cy: 30.5, type: 'atrium' },
  { id: 'S010', d: makeStorePath(26, 67, 10, 5, 'curved'), cx: 31, cy: 69.5, type: 'atrium' },
  { id: 'S011', d: makeStorePath(64, 67, 10, 5, 'curved'), cx: 69, cy: 69.5, type: 'atrium' },
  // F&B corners
  { id: 'S012', d: makeStorePath(12, 45, 7, 10, 'trapezoid'), cx: 15.5, cy: 50, type: 'fb' },
  { id: 'S013', d: makeStorePath(81, 45, 7, 10, 'trapezoid'), cx: 84.5, cy: 50, type: 'fb' },
];

const storeFill: Record<StoreUnitDef['type'], string> = {
  anchor: '#F0F4F8',
  inline: '#FBFCFE',
  atrium: '#F5F9F9',
  fb: '#FFFBF5',
  public: '#F3F4F6',
};

function EscalatorSymbol({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={5} height={3.5} rx={0.4} fill="#E8EDF3" stroke="#94A3B8" strokeWidth={0.35} />
      <line x1={x + 1} y1={y} x2={x + 1} y2={y + 3.5} stroke="#94A3B8" strokeWidth={0.18} />
      <line x1={x + 2.5} y1={y} x2={x + 2.5} y2={y + 3.5} stroke="#94A3B8" strokeWidth={0.18} />
      <line x1={x + 4} y1={y} x2={x + 4} y2={y + 3.5} stroke="#94A3B8" strokeWidth={0.18} />
      <polygon points={`${x + 0.5},${y + 2.8} ${x + 2.5},${y + 0.7} ${x + 4.5},${y + 2.8}`} fill="none" stroke="#64748B" strokeWidth={0.25} />
      <text x={x + 2.5} y={y - 0.5} textAnchor="middle" className="select-none fill-[#64748B]" style={{ fontSize: '1.8px', fontFamily: 'system-ui, sans-serif' }}>
        {label}
      </text>
    </g>
  );
}

function ElevatorSymbol({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={3.5} height={3.5} rx={0.3} fill="#E8EDF3" stroke="#94A3B8" strokeWidth={0.35} />
      <line x1={x + 1.75} y1={y + 0.4} x2={x + 1.75} y2={y + 3.1} stroke="#94A3B8" strokeWidth={0.2} />
      <line x1={x + 0.5} y1={y + 1.75} x2={x + 3} y2={y + 1.75} stroke="#94A3B8" strokeWidth={0.2} />
      <text x={x + 1.75} y={y - 0.5} textAnchor="middle" className="select-none fill-[#64748B]" style={{ fontSize: '1.6px', fontFamily: 'system-ui, sans-serif' }}>
        ELEV
      </text>
    </g>
  );
}

function RestroomGroup({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={7} height={6} rx={0.4} fill="#F1F5F9" stroke="#94A3B8" strokeWidth={0.3} />
      <line x1={x + 3.5} y1={y} x2={x + 3.5} y2={y + 6} stroke="#94A3B8" strokeWidth={0.2} strokeDasharray="0.6 0.4" />
      <rect x={x + 0.6} y={y + 0.6} width={1.2} height={0.8} rx={0.15} fill="#CBD5E1" />
      <rect x={x + 2} y={y + 0.6} width={1.2} height={0.8} rx={0.15} fill="#CBD5E1" />
      <rect x={x + 3.8} y={y + 0.6} width={1.2} height={0.8} rx={0.15} fill="#CBD5E1" />
      <rect x={x + 5.2} y={y + 0.6} width={1.2} height={0.8} rx={0.15} fill="#CBD5E1" />
      <rect x={x + 0.6} y={y + 2} width={2} height={1.5} rx={0.15} fill="#CBD5E1" />
      <rect x={x + 4.2} y={y + 2} width={2} height={1.5} rx={0.15} fill="#CBD5E1" />
      <text x={x + 3.5} y={y + 5.3} textAnchor="middle" className="select-none fill-[#64748B]" style={{ fontSize: '1.6px', fontFamily: 'system-ui, sans-serif' }}>
        WC
      </text>
    </g>
  );
}

function FireStair({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={4.5} height={5} rx={0.3} fill="#FEF2F2" stroke="#B91C1C" strokeWidth={0.3} />
      <line x1={x + 0.5} y1={y + 1} x2={x + 4} y2={y + 1} stroke="#B91C1C" strokeWidth={0.15} />
      <line x1={x + 0.5} y1={y + 2} x2={x + 4} y2={y + 2} stroke="#B91C1C" strokeWidth={0.15} />
      <line x1={x + 0.5} y1={y + 3} x2={x + 4} y2={y + 3} stroke="#B91C1C" strokeWidth={0.15} />
      <line x1={x + 0.5} y1={y + 4} x2={x + 4} y2={y + 4} stroke="#B91C1C" strokeWidth={0.15} />
      <polygon points={`${x + 2.25},${y + 0.3} ${x + 3.5},${y + 2.5} ${x + 1},${y + 2.5}`} fill="none" stroke="#B91C1C" strokeWidth={0.25} />
      <text x={x + 2.25} y={y + 4.6} textAnchor="middle" className="select-none fill-[#B91C1C]" style={{ fontSize: '1.4px', fontFamily: 'system-ui, sans-serif' }}>
        STAIR
      </text>
    </g>
  );
}

function ServiceRoom({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={5} height={4} rx={0.3} fill="#F8FAFC" stroke="#94A3B8" strokeWidth={0.25} />
      <text x={x + 2.5} y={y + 2.4} textAnchor="middle" className="select-none fill-[#94A3B8]" style={{ fontSize: '1.4px', fontFamily: 'system-ui, sans-serif' }}>
        {label}
      </text>
    </g>
  );
}

function EntranceMarker({ x, y, side }: { x: number; y: number; side: 'n' | 's' | 'e' | 'w' }) {
  const size = 1.8;
  const points =
    side === 'n'
      ? `${x},${y - size} ${x - size},${y} ${x + size},${y}`
      : side === 's'
        ? `${x},${y + size} ${x - size},${y} ${x + size},${y}`
        : side === 'w'
          ? `${x - size},${y} ${x},${y - size} ${x},${y + size}`
          : `${x + size},${y} ${x},${y - size} ${x},${y + size}`;
  return (
    <g>
      <polygon points={points} fill="#3F8F91" fillOpacity={0.35} stroke="#3F8F91" strokeWidth={0.3} />
      <text
        x={side === 'n' || side === 's' ? x : side === 'w' ? x - size - 1.2 : x + size + 1.2}
        y={side === 'n' ? y - size - 0.6 : side === 's' ? y + size + 1.6 : y + 0.5}
        textAnchor="middle"
        className="select-none fill-[#3F8F91]"
        style={{ fontSize: '1.6px', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}
      >
        ENTRY
      </text>
    </g>
  );
}

export function F1Floorplan({ floorId }: { floorId: FloorId }) {
  const { setState } = useUrlState();
  const stores = getStoresForFloor(floorId);
  const selectedId = undefined as string | undefined;

  return (
    <g>
      {/* Background */}
      <rect x={0} y={0} width={100} height={100} fill="#F8FAFC" />

      {/* Floor plate fill */}
      <rect x={3} y={6} width={94} height={88} rx={3} fill="#FBFCFE" />

      {/* Corridor zones */}
      {/* Perimeter N */}
      <rect x={21} y={20} width={58} height={2.5} fill="#F1F4F8" />
      {/* Perimeter S */}
      <rect x={21} y={77.5} width={58} height={2.5} fill="#F1F4F8" />
      {/* Perimeter W */}
      <rect x={21} y={20} width={2.5} height={60} fill="#F1F4F8" />
      {/* Perimeter E */}
      <rect x={76.5} y={20} width={2.5} height={60} fill="#F1F4F8" />
      {/* Ring N */}
      <rect x={26} y={35} width={48} height={3} fill="#F1F4F8" />
      {/* Ring S */}
      <rect x={26} y={62} width={48} height={3} fill="#F1F4F8" />
      {/* Ring W */}
      <rect x={26} y={35} width={3} height={30} fill="#F1F4F8" />
      {/* Ring E */}
      <rect x={71} y={35} width={3} height={30} fill="#F1F4F8" />
      {/* Cross N-S */}
      <rect x={48.5} y={20} width={3} height={60} fill="#F1F4F8" />
      {/* Cross W-E */}
      <rect x={21} y={48.5} width={58} height={3} fill="#F1F4F8" />

      {/* Store units (below atrium so atrium void clips overlapping stores) */}
      <g>
        {storeUnits.map((unit) => {
          const isSelected = unit.id === selectedId;
          return (
            <path
              key={unit.id}
              d={unit.d}
              fill={isSelected ? '#E7F3F3' : storeFill[unit.type]}
              stroke={isSelected ? '#3F8F91' : '#CBD5E1'}
              strokeWidth={isSelected ? 0.6 : 0.35}
              className="cursor-pointer transition-colors"
              onClick={() =>
                setState({
                  view: 'store',
                  floorId,
                  storeId: unit.id,
                  mode: 'score',
                })
              }
            />
          );
        })}
      </g>

      {/* Atrium void */}
      <path
        d="M35,37 Q35,35 37,35 L63,35 Q65,35 65,37 L65,63 Q65,65 63,65 L37,65 Q35,65 35,63 Z"
        fill="#F1F4F8"
        stroke="#94A3B8"
        strokeWidth={0.5}
        strokeDasharray="1.2 0.6"
      />
      {/* Balustrade inner line */}
      <path
        d="M36.2,38 Q36.2,36.2 38,36.2 L62,36.2 Q63.8,36.2 63.8,38 L63.8,62 Q63.8,63.8 62,63.8 L38,63.8 Q36.2,63.8 36.2,62 Z"
        fill="none"
        stroke="#CBD5E1"
        strokeWidth={0.25}
      />
      {/* Atrium label */}
      <text x={50} y={49.5} textAnchor="middle" className="select-none fill-[#64748B]" style={{ fontSize: '2.4px', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>
        ATRIUM
      </text>
      <text x={50} y={52} textAnchor="middle" className="select-none fill-[#94A3B8]" style={{ fontSize: '1.4px', fontFamily: 'system-ui, sans-serif' }}>
        Central Void
      </text>

      {/* Outer walls */}
      <rect x={3} y={6} width={94} height={88} rx={3} fill="none" stroke="#1E293B" strokeWidth={0.8} />
      {/* Entrance gaps: clear openings in outer wall */}
      {/* N entrance left: gap at x=35-42 */}
      <line x1={35} y1={6} x2={42} y2={6} stroke="#FBFCFE" strokeWidth={1.2} />
      {/* N entrance right: gap at x=58-65 */}
      <line x1={58} y1={6} x2={65} y2={6} stroke="#FBFCFE" strokeWidth={1.2} />
      {/* S entrance left: gap at x=35-42 */}
      <line x1={35} y1={94} x2={42} y2={94} stroke="#FBFCFE" strokeWidth={1.2} />
      {/* S entrance right: gap at x=58-65 */}
      <line x1={58} y1={94} x2={65} y2={94} stroke="#FBFCFE" strokeWidth={1.2} />
      {/* W entrance: gap at y=47-53 */}
      <line x1={3} y1={47} x2={3} y2={53} stroke="#FBFCFE" strokeWidth={1.2} />
      {/* E entrance: gap at y=47-53 */}
      <line x1={97} y1={47} x2={97} y2={53} stroke="#FBFCFE" strokeWidth={1.2} />

      {/* Entrance markers */}
      <EntranceMarker x={38.5} y={6} side="n" />
      <EntranceMarker x={61.5} y={6} side="n" />
      <EntranceMarker x={38.5} y={94} side="s" />
      <EntranceMarker x={61.5} y={94} side="s" />
      <EntranceMarker x={3} y={50} side="w" />
      <EntranceMarker x={97} y={50} side="e" />

      {/* Escalators */}
      <EscalatorSymbol x={36} y={48} label="ESC-A" />
      <EscalatorSymbol x={59} y={48} label="ESC-B" />

      {/* Elevator */}
      <ElevatorSymbol x={48} y={48} />

      {/* Restrooms */}
      <RestroomGroup x={70} y={9} />
      <RestroomGroup x={70} y={85} />

      {/* Fire stairs */}
      <FireStair x={5} y={28} />
      <FireStair x={90.5} y={28} />
      <FireStair x={5} y={67} />
      <FireStair x={90.5} y={67} />

      {/* Service rooms */}
      <ServiceRoom x={5} y={44} label="BOH" />
      <ServiceRoom x={90} y={44} label="BOH" />
      <ServiceRoom x={5} y={55} label="MEP" />
      <ServiceRoom x={90} y={55} label="MEP" />

      {/* Info desk */}
      <rect x={46} y={22} width={8} height={3} rx={0.4} fill="#EFF6FF" stroke="#3B82F6" strokeWidth={0.3} />
      <text x={50} y={24} textAnchor="middle" className="select-none fill-[#3B82F6]" style={{ fontSize: '1.5px', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>
        INFO
      </text>

      {/* Seating nodes */}
      <g opacity={0.6}>
        <circle cx={30} cy={50} r={1.2} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={0.2} />
        <circle cx={70} cy={50} r={1.2} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={0.2} />
        <circle cx={50} cy={30} r={1.2} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={0.2} />
        <circle cx={50} cy={70} r={1.2} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={0.2} />
      </g>

      {/* Store labels */}
      {storeUnits.map((unit) => (
        <text
          key={`label-${unit.id}`}
          x={unit.cx}
          y={unit.cy}
          textAnchor="middle"
          dominantBaseline="central"
          className="select-none pointer-events-none fill-[#475569]"
          style={{ fontSize: '1.5px', fontFamily: 'system-ui, sans-serif' }}
        >
          {unit.id}
        </text>
      ))}

      {/* Zone labels */}
      <text x={13} y={22} textAnchor="middle" className="select-none fill-[#94A3B8]" style={{ fontSize: '1.4px', fontFamily: 'system-ui, sans-serif' }}>
        NW ANCHOR
      </text>
      <text x={87} y={22} textAnchor="middle" className="select-none fill-[#94A3B8]" style={{ fontSize: '1.4px', fontFamily: 'system-ui, sans-serif' }}>
        NE ANCHOR
      </text>
      <text x={13} y={80} textAnchor="middle" className="select-none fill-[#94A3B8]" style={{ fontSize: '1.4px', fontFamily: 'system-ui, sans-serif' }}>
        SW ANCHOR
      </text>
      <text x={87} y={80} textAnchor="middle" className="select-none fill-[#94A3B8]" style={{ fontSize: '1.4px', fontFamily: 'system-ui, sans-serif' }}>
        SE ANCHOR
      </text>
      <text x={50} y={12} textAnchor="middle" className="select-none fill-[#94A3B8]" style={{ fontSize: '1.4px', fontFamily: 'system-ui, sans-serif' }}>
        NORTH RETAIL FRONTAGE
      </text>
      <text x={50} y={90} textAnchor="middle" className="select-none fill-[#94A3B8]" style={{ fontSize: '1.4px', fontFamily: 'system-ui, sans-serif' }}>
        SOUTH RETAIL FRONTAGE
      </text>

      {/* Scale / north indicator */}
      <g>
        <line x1={86} y1={6} x2={97} y2={6} stroke="#64748B" strokeWidth={0.3} />
        <line x1={86} y1={5.5} x2={86} y2={6.5} stroke="#64748B" strokeWidth={0.3} />
        <line x1={97} y1={5.5} x2={97} y2={6.5} stroke="#64748B" strokeWidth={0.3} />
        <text x={91.5} y={5} textAnchor="middle" className="select-none fill-[#64748B]" style={{ fontSize: '1.3px', fontFamily: 'system-ui, sans-serif' }}>
          ~10m
        </text>
      </g>
      {/* North arrow */}
      <g>
        <polygon points="7,92 7.8,94 6.2,94" fill="#64748B" />
        <line x1={7} y1={94} x2={7} y2={97} stroke="#64748B" strokeWidth={0.25} />
        <text x={7} y={98} textAnchor="middle" className="select-none fill-[#64748B]" style={{ fontSize: '1.3px', fontFamily: 'system-ui, sans-serif' }}>
          N
        </text>
      </g>
    </g>
  );
}
