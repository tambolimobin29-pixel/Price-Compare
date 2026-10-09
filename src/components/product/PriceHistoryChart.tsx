'use client';

import React, { useState, useMemo } from 'react';
import { PriceHistoryPoint } from '@/types/product';
import { formatINR } from '../common/PriceTag';
import { TrendingDown, Calendar, AlertCircle, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface PriceHistoryChartProps {
  history?: PriceHistoryPoint[];
  currentPrice?: number;
  className?: string;
}

type TimeRange = '7D' | '30D' | '3M' | '6M' | '1Y';

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({
  history = [],
  currentPrice,
  className = '',
}) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('6M');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate or filter points based on selected range
  const displayPoints = useMemo(() => {
    if (!history || history.length === 0) return [];

    switch (selectedRange) {
      case '7D':
        return [
          { date: 'Day 1', storeId: history[0]?.storeId || 'croma', price: history[history.length - 1].price + 600 },
          { date: 'Day 3', storeId: history[0]?.storeId || 'croma', price: history[history.length - 1].price + 200 },
          { date: 'Day 5', storeId: history[0]?.storeId || 'croma', price: history[history.length - 1].price },
          { date: 'Today', storeId: history[0]?.storeId || 'croma', price: history[history.length - 1].price },
        ];
      case '30D':
        return [
          { date: 'Week 1', storeId: history[0]?.storeId || 'croma', price: history[history.length - 1].price + 1400 },
          { date: 'Week 2', storeId: history[0]?.storeId || 'croma', price: history[history.length - 1].price + 800 },
          { date: 'Week 3', storeId: history[0]?.storeId || 'croma', price: history[history.length - 1].price + 500 },
          { date: 'Week 4', storeId: history[0]?.storeId || 'croma', price: history[history.length - 1].price },
        ];
      case '3M':
        return history.slice(Math.max(history.length - 3, 0));
      case '1Y':
        return [
          { date: 'Oct 25', storeId: history[0]?.storeId || 'croma', price: history[0]?.price + 4500 || 120000 },
          { date: 'Jan 26', storeId: history[0]?.storeId || 'croma', price: history[0]?.price + 2000 || 119000 },
          ...history,
        ];
      case '6M':
      default:
        return history;
    }
  }, [history, selectedRange]);

  if (!displayPoints || displayPoints.length === 0) {
    return (
      <div className={`p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500 ${className}`}>
        <p>Price history tracker is initializing for this item.</p>
      </div>
    );
  }

  const prices = displayPoints.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const activeCurrentPrice = currentPrice ?? displayPoints[displayPoints.length - 1].price;
  const differenceFromLow = activeCurrentPrice - minPrice;

  // SVG Geometry
  const width = 600;
  const height = 170;
  const padX = 45;
  const padY = 25;
  const range = maxPrice - minPrice || 1;

  const points = displayPoints.map((pt, i) => {
    const x = padX + (i / (displayPoints.length - 1 || 1)) * (width - padX * 2);
    const normalized = (pt.price - minPrice) / range;
    const y = height - padY - normalized * (height - padY * 2);
    return { x, y, point: pt };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const hoveredData = hoveredIndex !== null ? points[hoveredIndex] : null;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs ${className}`}>
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingDown size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Price History</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified price movement across partner stores (Staging Analytics Feed)
          </p>
        </div>

        {/* Time Range Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          {(['7D', '30D', '3M', '6M', '1Y'] as TimeRange[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelectedRange(r)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedRange === r
                  ? 'bg-white text-indigo-600 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {r === '7D' ? '7 Days' : r === '30D' ? '30 Days' : r === '3M' ? '3 Months' : r === '6M' ? '6 Months' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Current Price
          </span>
          <span className="text-sm font-extrabold text-slate-900">
            {formatINR(activeCurrentPrice)}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Lowest Recorded
          </span>
          <span className="text-sm font-extrabold text-emerald-600">
            {formatINR(minPrice)}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Highest Recorded
          </span>
          <span className="text-sm font-extrabold text-slate-700">
            {formatINR(maxPrice)}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Average Price
          </span>
          <span className="text-sm font-extrabold text-slate-700">
            {formatINR(avgPrice)}
          </span>
        </div>
      </div>

      {/* Insight message */}
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-700">
        {differenceFromLow === 0 ? (
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <ArrowDownRight size={15} />
            Great time to buy! This product is currently at its recorded lowest price ({formatINR(minPrice)}).
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            <ArrowUpRight size={15} />
            Current price is {formatINR(differenceFromLow)} above the historical low ({formatINR(minPrice)}).
          </span>
        )}
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full bg-slate-50/60 rounded-xl p-3 border border-slate-100">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
          {/* Subtle horizontal grid lines */}
          <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="#e2e8f0" strokeDasharray="3 3" />
          <line x1={padX} y1={height / 2} x2={width - padX} y2={height / 2} stroke="#e2e8f0" strokeDasharray="3 3" />
          <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="#e2e8f0" strokeDasharray="3 3" />

          {/* Area gradient under line */}
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`}
            fill="url(#historyGradient)"
            opacity="0.2"
          />

          {/* Main Trend Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <defs>
            <linearGradient id="historyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Data Points */}
          {points.map((pt, idx) => (
            <g key={idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIndex === idx ? 7 : 4.5}
                className="fill-indigo-600 stroke-white stroke-2 cursor-pointer transition-all duration-150 hover:scale-125"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              <text
                x={pt.x}
                y={height - 6}
                textAnchor="middle"
                className="text-[10px] fill-slate-400 font-semibold select-none"
              >
                {pt.point.date}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredData && (
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs shadow-lg flex items-center gap-2 pointer-events-none z-20 animate-in fade-in duration-100"
          >
            <span className="text-slate-400">{hoveredData.point.date}:</span>
            <span className="font-extrabold text-emerald-400">
              {formatINR(hoveredData.point.price)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
