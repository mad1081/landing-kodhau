interface CircularProgressProps {
  percent: number
  size?: number
  strokeWidth?: number
}

export function CircularProgress({ percent, size = 36, strokeWidth = 3 }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
      />
      {/* Fill */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={percent === 100 ? '#22c55e' : '#6366f1'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-500"
      />
      {/* Label — counter-rotate so text is upright */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="rotate-90"
        style={{
          transform: `rotate(90deg)`,
          transformOrigin: '50% 50%',
          fontSize: size < 40 ? '9px' : '11px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fill: percent === 100 ? '#22c55e' : '#6366f1',
        }}
      >
        {percent}%
      </text>
    </svg>
  )
}
