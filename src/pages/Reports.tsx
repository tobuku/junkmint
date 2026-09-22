import { useEffect, useRef } from 'react'
import { TrendingUp, DollarSign, Truck, Recycle, Users, BarChart3, Target, Briefcase } from 'lucide-react'
import { formatCurrency } from '../data/mock'
import gsap from 'gsap'

// Mock report data
const monthlyRevenue = [
  { month: 'Apr', value: 6200 },
  { month: 'May', value: 8100 },
  { month: 'Jun', value: 9400 },
  { month: 'Jul', value: 11200 },
  { month: 'Aug', value: 10800 },
  { month: 'Sep', value: 12450 },
]

const jobsByType = [
  { type: 'Residential Cleanout', count: 18, revenue: 6300 },
  { type: 'Construction Debris', count: 8, revenue: 5600 },
  { type: 'Appliance Removal', count: 12, revenue: 2400 },
  { type: 'Yard Waste', count: 6, revenue: 1800 },
  { type: 'Estate Cleanout', count: 2, revenue: 3200 },
  { type: 'Commercial Recurring', count: 8, revenue: 3150 },
]

const disposalBreakdown = [
  { dest: 'Landfill', pct: 33, tons: 12.4, color: 'var(--gray-500)' },
  { dest: 'Recycling', pct: 28, tons: 10.5, color: 'var(--blue-500)' },
  { dest: 'Donation', pct: 24, tons: 9.0, color: 'var(--green-500)' },
  { dest: 'E-Waste Certified', pct: 8, tons: 3.0, color: 'var(--yellow-500)' },
  { dest: 'Customer Kept', pct: 7, tons: 2.6, color: 'var(--orange-500)' },
]

const leadSources = [
  { source: 'Google', leads: 22, booked: 14, rate: 64 },
  { source: 'Referral', leads: 15, booked: 12, rate: 80 },
  { source: 'Phone', leads: 18, booked: 10, rate: 56 },
  { source: 'Yelp', leads: 8, booked: 4, rate: 50 },
  { source: 'Text', leads: 12, booked: 8, rate: 67 },
  { source: 'Web', leads: 6, booked: 3, rate: 50 },
]

export default function Reports() {
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barsRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const bars = barsRef.current.querySelectorAll('.bar-fill')
    gsap.fromTo(bars, { scaleY: 0 }, {
      scaleY: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      transformOrigin: 'bottom',
    })
  }, [])

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value))

  return (
    <div>
      <div className="page-header">
        <h1>Reports</h1>
        <div className="page-header-actions">
          <select className="select" style={{ width: 'auto' }}>
            <option>This Month</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-4 gap-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <span className="stat-label">Monthly Revenue</span>
            <DollarSign size={18} style={{ color: 'var(--green-500)' }} />
          </div>
          <div className="stat-value">{formatCurrency(12450)}</div>
          <div className="stat-change up"><TrendingUp size={12} /> +15% vs Aug</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <span className="stat-label">Total Jobs</span>
            <Briefcase size={18} style={{ color: 'var(--blue-500)' }} />
          </div>
          <div className="stat-value">54</div>
          <div className="stat-change up"><TrendingUp size={12} /> +8 vs Aug</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <span className="stat-label">Avg Job Value</span>
            <Target size={18} style={{ color: 'var(--orange-500)' }} />
          </div>
          <div className="stat-value">{formatCurrency(415)}</div>
          <div className="text-xs text-muted mt-2">Target: $450</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <span className="stat-label">Diversion Rate</span>
            <Recycle size={18} style={{ color: 'var(--green-500)' }} />
          </div>
          <div className="stat-value text-green">67%</div>
          <div className="text-xs text-muted mt-2">37.5 tons diverted</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Left column */}
        <div className="flex flex-col gap-4">

          {/* Revenue chart */}
          <div className="card">
            <div className="card-header">
              <h3>Revenue Trend</h3>
              <span className="text-sm text-muted">Last 6 months</span>
            </div>
            <div className="card-body" ref={barsRef}>
              <div style={{
                display: 'flex', alignItems: 'flex-end', gap: 12, height: 200, padding: '0 8px',
              }}>
                {monthlyRevenue.map(m => (
                  <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="text-xs font-semibold mb-2">{formatCurrency(m.value)}</div>
                    <div style={{
                      width: '100%', position: 'relative', height: 160,
                      display: 'flex', alignItems: 'flex-end',
                    }}>
                      <div className="bar-fill" style={{
                        width: '100%',
                        height: `${(m.value / maxRevenue) * 100}%`,
                        background: m.month === 'Sep' ? 'var(--green-500)' : 'var(--green-200)',
                        borderRadius: '4px 4px 0 0',
                      }} />
                    </div>
                    <div className="text-xs text-muted" style={{ marginTop: 4 }}>{m.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs by type */}
          <div className="card">
            <div className="card-header">
              <h3>Jobs by Type</h3>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Jobs</th>
                    <th>Revenue</th>
                    <th>Avg Value</th>
                  </tr>
                </thead>
                <tbody>
                  {jobsByType.map(row => (
                    <tr key={row.type}>
                      <td className="font-semibold">{row.type}</td>
                      <td>{row.count}</td>
                      <td className="font-semibold">{formatCurrency(row.revenue)}</td>
                      <td className="text-muted">{formatCurrency(Math.round(row.revenue / row.count))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lead conversion */}
          <div className="card">
            <div className="card-header">
              <h3>Lead Source Performance</h3>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Leads</th>
                    <th>Booked</th>
                    <th>Conversion</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {leadSources.map(row => (
                    <tr key={row.source}>
                      <td className="font-semibold">{row.source}</td>
                      <td>{row.leads}</td>
                      <td>{row.booked}</td>
                      <td className="font-semibold">{row.rate}%</td>
                      <td style={{ width: 120 }}>
                        <div className="progress-bar" style={{ height: 6 }}>
                          <div className="progress-bar-fill" style={{
                            width: `${row.rate}%`,
                            background: row.rate >= 70 ? 'var(--green-500)' : row.rate >= 50 ? 'var(--yellow-500)' : 'var(--red-500)',
                          }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Disposal breakdown */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <Recycle size={16} style={{ color: 'var(--green-500)' }} />
                <h3>Disposal Breakdown</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="flex flex-col gap-3">
                {disposalBreakdown.map(d => (
                  <div key={d.dest}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
                        <span className="text-sm font-semibold">{d.dest}</span>
                      </div>
                      <span className="text-sm text-muted">{d.tons} tons ({d.pct}%)</span>
                    </div>
                    <div className="progress-bar" style={{ height: 6 }}>
                      <div className="progress-bar-fill" style={{ width: `${d.pct}%`, background: d.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 16, padding: 12, background: 'var(--green-50)', borderRadius: 8, textAlign: 'center',
              }}>
                <div className="text-xs text-muted">Total Diverted from Landfill</div>
                <div className="font-bold text-green" style={{ fontSize: 24 }}>67%</div>
                <div className="text-xs text-muted">25.1 tons out of 37.5 total</div>
              </div>
            </div>
          </div>

          {/* Crew performance */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <h3>Crew Performance</h3>
              </div>
            </div>
            <div className="card-body">
              {[
                { name: 'Kai Nakamura', jobs: 22, revenue: 8400, onTime: 95 },
                { name: 'Braddah Joe', jobs: 18, revenue: 6200, onTime: 91 },
                { name: 'Manu Silva', jobs: 14, revenue: 5800, onTime: 88 },
              ].map(member => (
                <div key={member.name} style={{
                  padding: '12px 0', borderBottom: '1px solid var(--gray-50)',
                }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{member.name}</span>
                    <span className="text-sm text-muted">{member.jobs} jobs</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                    <div>
                      <span className="text-muted">Revenue: </span>
                      <span className="font-semibold">{formatCurrency(member.revenue)}</span>
                    </div>
                    <div>
                      <span className="text-muted">On-time: </span>
                      <span className="font-semibold">{member.onTime}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job costing summary */}
          <div className="card">
            <div className="card-header">
              <h3>Job Profitability</h3>
            </div>
            <div className="card-body">
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Revenue', value: '$12,450', color: 'var(--black)' },
                  { label: 'Labor', value: '-$4,200', color: 'var(--red-500)' },
                  { label: 'Dump Fees', value: '-$1,850', color: 'var(--red-500)' },
                  { label: 'Fuel', value: '-$680', color: 'var(--red-500)' },
                  { label: 'CC Processing', value: '-$362', color: 'var(--red-500)' },
                  { label: 'Supplies', value: '-$145', color: 'var(--red-500)' },
                ].map(line => (
                  <div key={line.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted">{line.label}</span>
                    <span className="font-semibold" style={{ color: line.color }}>{line.value}</span>
                  </div>
                ))}
                <div style={{
                  borderTop: '2px solid var(--gray-200)', paddingTop: 8,
                  display: 'flex', justifyContent: 'space-between',
                }}>
                  <span className="font-bold">Gross Profit</span>
                  <span className="font-bold text-green" style={{ fontSize: 18 }}>$5,213</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Margin</span>
                  <span className="font-semibold text-green">41.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .app-content > div > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
