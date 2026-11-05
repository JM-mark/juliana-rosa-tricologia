import type { Visual } from "@/content/services";
import { BrowSketch } from "@/components/BrowSketch";

/** Folículo em traço fino (ilustração estática) para hero de serviço. */
export function FollicleArt({ className = "" }: { className?: string }) {
  const xs = [90, 150, 210, 270, 330, 390];
  return (
    <svg viewBox="0 0 480 300" className={className} role="img" aria-label="Fios nascendo a partir dos folículos no couro cabeludo">
      <path d="M0 150 H480" stroke="#1f3a2b" strokeOpacity="0.4" strokeWidth="1.5" />
      <path d="M0 176 H480" stroke="#1f3a2b" strokeOpacity="0.15" strokeDasharray="2 7" />
      {xs.map((x, i) => {
        const h = 70 + ((i * 37) % 60);
        const lean = (i % 2 ? 1 : -1) * (8 + i * 3);
        return (
          <g key={x} fill="none" strokeLinecap="round">
            <path d={`M${x} 150 L${x} 205 C${x} 222 ${x - 9} 230 ${x - 9} 244 C${x - 9} 260 ${x + 9} 260 ${x + 9} 244 C${x + 9} 230 ${x} 222 ${x} 205`} stroke="#a8472f" strokeWidth="1.6" />
            <path d={`M${x} 150 C${x + lean * 0.2} ${150 - h * 0.4} ${x + lean} ${150 - h * 0.75} ${x + lean * 1.3} ${150 - h}`} stroke="#1f3a2b" strokeWidth="2" />
          </g>
        );
      })}
    </svg>
  );
}

/** Raios de luz do laser sobre a pele, em traço fino. */
export function LaserArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 300" className={className} role="img" aria-label="Ilustração de feixe de luz sobre a pele">
      <g fill="none" stroke="#1f3a2b" strokeLinecap="round">
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx="240" cy="190" r={28 + i * 30} strokeOpacity={0.55 - i * 0.09} strokeWidth="1.3" />
        ))}
        {[-60, -30, 0, 30, 60].map((a) => (
          <path key={a} d={`M240 190 L${240 + Math.sin((a * Math.PI) / 180) * 170} ${190 - Math.cos((a * Math.PI) / 180) * 170}`} strokeOpacity="0.28" strokeDasharray="1 8" />
        ))}
      </g>
      <circle cx="240" cy="190" r="6" fill="#e38e72" />
    </svg>
  );
}

export function ServiceArt({ visual, className = "" }: { visual: Visual; className?: string }) {
  if (visual === "follicle") return <FollicleArt className={className} />;
  if (visual === "laser") return <LaserArt className={className} />;
  return <BrowSketch className={className} />;
}
