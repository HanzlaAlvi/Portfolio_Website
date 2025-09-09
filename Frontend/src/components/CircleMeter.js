import React from "react";

const CircleMeter = ({
  percentage = 0,
  size = 135,
  strokeWidth = 12,
  gradientId = "gradient",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent"
    }}>
      <svg width={size} height={size}>
        {/* Gradient definition */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a259c1" />
            <stop offset="100%" stopColor="#5f5bfc" />
          </linearGradient>
        </defs>
        {/* Track (background ring, dark to blend) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#181818"
          strokeWidth={strokeWidth}
        />
        {/* Progress (gradient ring) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.6s",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
        {/* Percentage Text */}
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          dy=".3em"
          fontSize={size * 0.26}
          fontWeight="bold"
          fill="#fff"
          style={{
            fontFamily: "inherit",
            filter: "drop-shadow(0 0 3px #000)",
            pointerEvents: "none",
            userSelect: "none"
          }}
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default CircleMeter;