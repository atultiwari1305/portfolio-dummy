const NODES = [
  { x: 40, y: 48, w: 110, h: 64, title: "Client A", sub: 'emit("msg")', accent: false },
  { x: 350, y: 48, w: 150, h: 64, title: "WebSocket", sub: "Socket.io gateway", accent: true },
  { x: 700, y: 48, w: 140, h: 64, title: "App Server", sub: "Node · Express", accent: false },
  { x: 350, y: 118, w: 150, h: 60, title: "Redis", sub: "pub/sub · cache", accent: true },
  { x: 560, y: 240, w: 140, h: 58, title: "MongoDB", sub: "chat history", accent: false },
  { x: 40, y: 200, w: 160, h: 74, title: "Other Clients", sub: "subscribers", accent: false },
];

const PATHS = [
  { id: "p1", d: "M150,80 H350", dur: "2.2s" },
  { id: "p2", d: "M500,80 H700", dur: "2.2s", begin: "-1.1s" },
  { id: "p3", d: "M770,115 V195 H425 V150", dur: "2.6s" },
  { id: "p4", d: "M770,115 V270 H630", dur: "2.6s", begin: "-1.3s" },
  { id: "p5", d: "M350,235 H200 V108", dur: "2s" },
];

export function ArchitectureDiagram() {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 940 340"
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full min-w-[580px]"
      >
        {PATHS.map((p) => (
          <path
            key={p.id}
            id={p.id}
            d={p.d}
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth={1.3}
            strokeDasharray="4 6"
          />
        ))}

        {NODES.map((n) => (
          <g key={n.title}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={12}
              fill="var(--bg-2)"
              stroke={n.accent ? "var(--accent)" : "var(--border-strong)"}
              strokeWidth={1.4}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + 30}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontWeight={600}
              fontSize={13}
              fill="var(--text)"
            >
              {n.title}
            </text>
            <text
              x={n.x + n.w / 2}
              y={n.y + 48}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={9}
              fill="var(--text-dim)"
            >
              {n.sub}
            </text>
          </g>
        ))}

        {PATHS.map((p) => (
          <circle key={`pk-${p.id}`} r={4.5} fill="var(--accent)">
            <animateMotion
              dur={p.dur}
              begin={p.begin ?? "0s"}
              repeatCount="indefinite"
            >
              <mpath href={`#${p.id}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>
    </div>
  );
}
