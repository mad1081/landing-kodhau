interface CircularProgressProps {
  percent: number
  size?: number
  strokeWidth?: number
}

export function CircularProgress({ percent, size = 64, strokeWidth = 3 }: CircularProgressProps) {
  const circumference = 2 * Math.PI * 16 // 100.53

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      style={{ flexShrink: 0 }}
    >
      {/* Track */}
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke="#d5e3fd"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke="#005338"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - percent / 100)}
        transform="rotate(-90 18 18)"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      {/* Center label */}
      <text
        x="18"
        y="18"
        dominantBaseline="middle"
        textAnchor="middle"
        style={{
          fontSize: '7px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fill: '#005338',
        }}
      >
        {percent}%
      </text>
    </svg>
  )
}
