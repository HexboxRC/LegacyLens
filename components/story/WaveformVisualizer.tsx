"use client";

interface WaveformVisualizerProps {
  active: boolean;
}

export default function WaveformVisualizer({ active }: WaveformVisualizerProps) {
  if (!active) return null;

  return (
    <div className="flex items-center justify-center gap-1 h-12" aria-hidden="true">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          className="wave-bar w-1.5 rounded-full bg-warm-400"
          style={{
            height: `${20 + Math.random() * 20}px`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
