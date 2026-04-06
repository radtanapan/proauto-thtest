import { KPICard } from '@/components/KPICard';
import { TrendingUp, Calendar, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { yearlySalesData, monthlyYOYData } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

export default function ReportsPage() {
  const currentYearSales = yearlySalesData[yearlySalesData.length - 1].sales;
  const previousYearSales = yearlySalesData[yearlySalesData.length - 2].sales;
  const yoyGrowth = ((currentYearSales - previousYearSales) / previousYearSales) * 100;
  
  const currentMonthData = monthlyYOYData[monthlyYOYData.length - 1];
  const lastMonthData = monthlyYOYData[monthlyYOYData.length - 2];
  const momGrowth = ((currentMonthData.current - lastMonthData.current) / lastMonthData.current) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">รายงานยอดขาย</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>ปี 2024 - 2026</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard 
          icon={BarChart3} 
          label="ยอดขายปีนี้ (2026)" 
          value={`฿${currentYearSales.toLocaleString()}`} 
          change={yoyGrowth}
          changeLabel="เทียบกับปีก่อน (YOY)"
        />
        <KPICard 
          icon={TrendingUp} 
          label="ยอดขายปีก่อน (2025)" 
          value={`฿${previousYearSales.toLocaleString()}`} 
        />
        <KPICard 
          icon={BarChart3} 
          label="ยอดขายเดือนนี้" 
          value={`฿${currentMonthData.current.toLocaleString()}`}
          change={momGrowth}
          changeLabel="เทียบกับเดือนที่แล้ว"
        />
        <KPICard 
          icon={TrendingUp} 
          label="ยอดขายเฉลี่ย/เดือน" 
          value={`฿${Math.round(currentYearSales / 12).toLocaleString()}`}
        />
      </div>

      {/* YOY Comparison Chart */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-4 text-base font-semibold text-card-foreground flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          เปรียบเทียบยอดขายรายปี (YOY)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearlySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }} 
              stroke="hsl(215, 10%, 52%)" 
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickFormatter={(v) => `฿${(v / 1000000).toFixed(1)}M`}
              stroke="hsl(215, 10%, 52%)" 
            />
            <Tooltip 
              formatter={(value: number) => [`฿${value.toLocaleString()}`, 'ยอดขาย']}
              labelFormatter={(label) => `ปี ${label}`}
            />
            <Bar 
              dataKey="sales" 
              fill="hsl(211, 66%, 32%)" 
              radius={[4, 4, 0, 0]}
              name="ยอดขาย"
            />
          </BarChart>
        </ResponsiveContainer>
        
        {/* YOY Growth Summary */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {yearlySalesData.slice(1).map((year, index) => {
            const prevYear = yearlySalesData[index];
            const growth = ((year.sales - prevYear.sales) / prevYear.sales) * 100;
            const isPositive = growth >= 0;
            
            return (
              <div key={year.year} className="rounded-lg bg-secondary/50 p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  ปี {prevYear.year} → {year.year}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{growth.toFixed(1)}%
                  </span>
                  {isPositive ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly YOY Trend */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-4 text-base font-semibold text-card-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          เปรียบเทียบยอดขายรายเดือน (YOY 2025 vs 2026)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyYOYData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }} 
              stroke="hsl(215, 10%, 52%)" 
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickFormatter={(v) => `฿${(v / 1000).toFixed(0)}k`}
              stroke="hsl(215, 10%, 52%)" 
            />
            <Tooltip 
              formatter={(value: number, name: string) => [`฿${value.toLocaleString()}`, name]}
              labelFormatter={(label) => `เดือน ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="previous" 
              stroke="hsl(215, 20%, 65%)" 
              strokeWidth={2} 
              dot={false}
              name="ปี 2025"
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="hsl(211, 66%, 32%)" 
              strokeWidth={3} 
              dot={{ r: 4 }}
              name="ปี 2026"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* YOY by Month Table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="text-base font-semibold text-card-foreground">ตารางเปรียบเทียบยอดขาย YOY รายเดือน</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground bg-secondary/50">
                <th className="px-5 py-3 font-medium">เดือน</th>
                <th className="px-5 py-3 font-medium text-right">ยอดขาย 2025</th>
                <th className="px-5 py-3 font-medium text-right">ยอดขาย 2026</th>
                <th className="px-5 py-3 font-medium text-right">ความเปลี่ยนแปลง</th>
                <th className="px-5 py-3 font-medium text-right">% การเติบโต</th>
              </tr>
            </thead>
            <tbody>
              {monthlyYOYData.map((row) => {
                const diff = row.current - row.previous;
                const percentChange = ((diff / row.previous) * 100);
                const isPositive = diff >= 0;
                
                return (
                  <tr key={row.month} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{row.month}</td>
                    <td className="px-5 py-3 text-right text-muted-foreground">
                      ฿{row.previous.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-foreground">
                      ฿{row.current.toLocaleString()}
                    </td>
                    <td className={`px-5 py-3 text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{diff.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                        isPositive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(percentChange).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
              {/* Summary Row */}
              <tr className="border-t-2 border-border bg-secondary/50 font-semibold">
                <td className="px-5 py-3 text-foreground">รวม</td>
                <td className="px-5 py-3 text-right text-muted-foreground">
                  ฿{monthlyYOYData.reduce((sum, row) => sum + row.previous, 0).toLocaleString()}
                </td>
                <td className="px-5 py-3 text-right text-foreground">
                  ฿{monthlyYOYData.reduce((sum, row) => sum + row.current, 0).toLocaleString()}
                </td>
                <td className={`px-5 py-3 text-right ${yoyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {yoyGrowth >= 0 ? '+' : ''}{(currentYearSales - previousYearSales).toLocaleString()}
                </td>
                <td className="px-5 py-3 text-right">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                    yoyGrowth >= 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {yoyGrowth >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(yoyGrowth).toFixed(1)}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
