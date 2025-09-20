import React from 'react';

export interface ChartData {
    date: string; // e.g., 'L', 'M', 'X'
    exercises: number;
    photos: number;
}

interface ActivityChartProps {
    data: ChartData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.exercises, d.photos)), 5); // Minimum height for 5 items
    const chartHeight = 150;
    const barWidth = 12;
    const barGap = 20;
    const chartWidth = data.length * (barWidth * 2 + barGap);

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg">
            <h3 className="font-bold text-lg text-slate-700 mb-4">Actividad Semanal</h3>
            <div className="flex justify-center items-center mb-4 space-x-4 text-sm">
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-sm mr-2"></span>
                    <span>Ejercicios</span>
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-cyan-300 rounded-sm mr-2"></span>
                    <span>Fotos</span>
                </div>
            </div>
            <div className="flex justify-center overflow-x-auto">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`} style={{minWidth: `${chartWidth}px`}} height={chartHeight + 20}>
                    {data.map((day, index) => {
                        const x = index * (barWidth * 2 + barGap);
                        const exerciseBarHeight = (day.exercises / maxValue) * chartHeight;
                        const photoBarHeight = (day.photos / maxValue) * chartHeight;

                        return (
                            <g key={index}>
                                {/* Exercise Bar */}
                                <rect
                                    x={x}
                                    y={chartHeight - exerciseBarHeight}
                                    width={barWidth}
                                    height={exerciseBarHeight}
                                    fill="currentColor"
                                    className="text-blue-400"
                                    rx="2"
                                />
                                {/* Photo Bar */}
                                <rect
                                    x={x + barWidth}
                                    y={chartHeight - photoBarHeight}
                                    width={barWidth}
                                    height={photoBarHeight}
                                    fill="currentColor"
                                    className="text-cyan-300"
                                    rx="2"
                                />
                                {/* Label */}
                                <text
                                    x={x + barWidth}
                                    y={chartHeight + 15}
                                    textAnchor="middle"
                                    className="text-xs fill-current text-slate-500 font-sans"
                                >
                                    {day.date}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export default ActivityChart;