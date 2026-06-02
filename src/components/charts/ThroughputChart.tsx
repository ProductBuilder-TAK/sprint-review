import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts'
import { CHART_COLORS } from '@/config.js'

interface ThroughputChartProps {
  labels: string[]
  values: number[]
  benchmark?: number
  onBarClick?: (index: number) => void
  excludedIndices?: number[]
}

export function ThroughputChart({ labels, values, benchmark, onBarClick, excludedIndices = [] }: ThroughputChartProps) {
  const data = labels.map((label, i) => ({
    label,
    value: values[i] || 0,
    excluded: excludedIndices.includes(i),
  }))

  const lastIdx = data.length - 1

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.line} vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: CHART_COLORS.ink3 }}
          axisLine={{ stroke: CHART_COLORS.line }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: CHART_COLORS.ink3 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: CHART_COLORS.paper,
            border: `1px solid ${CHART_COLORS.line}`,
            borderRadius: 6,
            fontSize: 12,
          }}
        />
        {benchmark && (
          <ReferenceLine
            y={benchmark}
            stroke={CHART_COLORS.ink3}
            strokeDasharray="4 4"
            label={{ value: `Méd. ${benchmark}`, position: 'right', fontSize: 10, fill: CHART_COLORS.ink3 }}
          />
        )}
        <Bar
          dataKey="value"
          radius={[3, 3, 0, 0]}
          cursor={onBarClick ? 'pointer' : undefined}
          onClick={(_, index) => onBarClick?.(index)}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.excluded ? CHART_COLORS.line : CHART_COLORS.sage}
              opacity={index === lastIdx ? 1 : 0.55}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
