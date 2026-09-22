import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Inbox, FileText, Briefcase, DollarSign, TrendingUp,
  AlertTriangle, Truck, Recycle, Clock, ArrowRight,
  CheckCircle, Info, Plus
} from 'lucide-react'
import { dashboardStats, recentActivity, jobs, requests, quotes, crew, invoices, formatCurrency, statusColors } from '../data/mock'
import gsap from 'gsap'

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!containerRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const cards = containerRef.current.querySelectorAll('.dash-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    )
  }, [])

  const todayJobs = jobs.filter(j => j.scheduledDate === '2026-09-22')
  const activeJob = jobs.find(j => j.status === 'in_progress')
  const newRequests = requests.filter(r => r.status === 'new')
  const pendingQuotes = quotes.filter(q => ['sent', 'viewed'].includes(q.status))
  const overdueInvoices = invoices.filter(i => i.status === 'overdue')

  return (
    <div ref={containerRef}>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="text-sm text-muted" style={{ marginTop: 2 }}>Monday, September 22, 2026</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => navigate('/requests')}>
            <Plus size={16} /> New Request
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-4 gap-4" style={{ marginBottom: 24 }}>
        <div className="stat-card dash-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/jobs')}>
          <div className="flex items-center justify-between mb-2">
            <span className="stat-label">Today's Jobs</span>
            <Briefcase size={18} style={{ color: 'var(--green-500)' }} />
          </div>
          <div className="stat-value">{dashboardStats.todayJobs}</div>
          <div className="stat-change up">
            <TrendingUp size={12} /> 2 scheduled, 1 in progress
          </div>
        </div>

        <div className="stat-card dash-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/reports')}>
          <div className="flex items-center justify-between mb-2">
            <span className="stat-label">This Week</span>
            <DollarSign size={18} style={{ color: 'var(--green-500)' }} />
          </div>
          <div className="stat-value">{formatCurrency(dashboardStats.weekRevenue)}</div>
          <div className="stat-change up">
            <TrendingUp size={12} /> +12% vs last week
          </div>
        </div>

        <div className="stat-card dash-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/requests')}>
          <div className="flex items-center justify-between mb-2">
            <span className="stat-label">Open Requests</span>
            <Inbox size={18} style={{ color: 'var(--blue-500)' }} />
          </div>
          <div className="stat-value">{dashboardStats.openRequests}</div>
          <div className="stat-change" style={{ color: 'var(--blue-500)' }}>
            <Clock size={12} /> 2 need follow-up today
          </div>
        </div>

        <div className="stat-card dash-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/invoices')}>
          <div className="flex items-center justify-between mb-2">
            <span className="stat-label">Overdue</span>
            <AlertTriangle size={18} style={{ color: 'var(--red-500)' }} />
          </div>
          <div className="stat-value text-red">{formatCurrency(dashboardStats.overdueAmount)}</div>
          <div className="stat-change down">
            {dashboardStats.overdueInvoices} invoices past due
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        {/* Left column */}
        <div className="flex flex-col gap-4">

          {/* Active job */}
          {activeJob && (
            <div className="card dash-card" style={{ borderLeft: '4px solid var(--green-500)' }}>
              <div className="card-header">
                <div className="flex items-center gap-3">
                  <Truck size={18} style={{ color: 'var(--green-500)' }} />
                  <h3>Active Job</h3>
                  <span className={`badge ${statusColors[activeJob.status]}`}>In Progress</span>
                </div>
                <button className="btn btn-sm btn-secondary" onClick={() => navigate('/jobs')}>
                  View <ArrowRight size={14} />
                </button>
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div className="text-sm text-muted">Customer</div>
                    <div className="font-semibold">{activeJob.customerName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted">Address</div>
                    <div>{activeJob.address}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted">Crew</div>
                    <div>{activeJob.assignedCrew.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted">Volume</div>
                    <div>{activeJob.volumeActual || activeJob.volumeQuoted}
                      {activeJob.changeOrders.length > 0 && (
                        <span className="badge badge-orange" style={{ marginLeft: 8, fontSize: 11 }}>
                          +{activeJob.changeOrders.length} change order
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {/* Checklist progress */}
                <div style={{ marginTop: 16 }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted">Progress</span>
                    <span className="text-sm font-semibold">
                      {activeJob.checklist.filter(c => c.done).length}/{activeJob.checklist.length}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{
                      width: `${(activeJob.checklist.filter(c => c.done).length / activeJob.checklist.length) * 100}%`
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Today's schedule */}
          <div className="card dash-card">
            <div className="card-header">
              <h3>Today's Schedule</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => navigate('/schedule')}>
                Full Schedule <ArrowRight size={14} />
              </button>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Customer</th>
                    <th>Location</th>
                    <th>Crew</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayJobs.map(job => (
                    <tr key={job.id} onClick={() => navigate('/jobs')}>
                      <td className="font-semibold">{job.scheduledTime}</td>
                      <td>{job.customerName}</td>
                      <td className="text-muted">{job.city}</td>
                      <td>
                        <div className="flex gap-2">
                          {job.assignedCrew.map((name, i) => (
                            <div key={i} className="avatar" style={{
                              background: ['#16a34a', '#2563eb', '#d97706'][i],
                              width: 28, height: 28, fontSize: 11,
                            }}>
                              {name.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td><span className={`badge ${statusColors[job.status]}`}>{job.status.replace('_', ' ')}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending quotes */}
          <div className="card dash-card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <h3>Quotes Needing Follow-Up</h3>
                <span className="badge badge-orange">{pendingQuotes.length}</span>
              </div>
              <button className="btn btn-sm btn-secondary" onClick={() => navigate('/quotes')}>
                All Quotes <ArrowRight size={14} />
              </button>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Quote</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingQuotes.map(q => (
                    <tr key={q.id} onClick={() => navigate('/quotes')}>
                      <td className="font-semibold">{q.id}</td>
                      <td>{q.customerName}</td>
                      <td>{formatCurrency(q.total)}</td>
                      <td><span className={`badge ${statusColors[q.status]}`}>{q.status}</span></td>
                      <td className="text-muted">{q.sentAt ? new Date(q.sentAt).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Crew status */}
          <div className="card dash-card">
            <div className="card-header">
              <h3>Crew Status</h3>
            </div>
            <div className="card-body" style={{ padding: '12px 20px' }}>
              {crew.map(member => (
                <div key={member.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0', borderBottom: '1px solid var(--gray-50)',
                }}>
                  <div className="avatar" style={{
                    background: member.status === 'on_job' ? 'var(--orange-500)' :
                      member.status === 'available' ? 'var(--green-500)' : 'var(--gray-400)',
                  }}>
                    {member.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="font-semibold" style={{ fontSize: 13 }}>{member.name}</div>
                    <div className="text-xs text-muted">{member.role}</div>
                  </div>
                  <span className={`badge ${statusColors[member.status]}`}>
                    {member.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Truck capacity */}
          <div className="card dash-card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <Truck size={16} />
                <h3>Truck Load</h3>
              </div>
            </div>
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%',
                border: '8px solid var(--gray-100)',
                borderTopColor: 'var(--green-500)',
                borderRightColor: 'var(--green-500)',
                borderBottomColor: 'var(--green-500)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
                transform: 'rotate(0deg)',
              }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800 }}>72%</div>
                  <div className="text-xs text-muted">capacity</div>
                </div>
              </div>
              <p className="text-sm text-muted">Estimated after today's scheduled jobs</p>
              <p className="text-xs" style={{ color: 'var(--green-600)', marginTop: 4 }}>
                Room for 1 more 1/4 truck pickup
              </p>
            </div>
          </div>

          {/* Overdue invoices */}
          {overdueInvoices.length > 0 && (
            <div className="card dash-card" style={{ borderLeft: '4px solid var(--red-500)' }}>
              <div className="card-header">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} style={{ color: 'var(--red-500)' }} />
                  <h3>Overdue Invoices</h3>
                </div>
              </div>
              <div className="card-body" style={{ padding: '8px 20px' }}>
                {overdueInvoices.map(inv => (
                  <div key={inv.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 0', borderBottom: '1px solid var(--gray-50)',
                    cursor: 'pointer',
                  }} onClick={() => navigate('/invoices')}>
                    <div>
                      <div className="font-semibold" style={{ fontSize: 13 }}>{inv.customerName}</div>
                      <div className="text-xs text-muted">Due {inv.dueDate}</div>
                    </div>
                    <span className="font-bold text-red">{formatCurrency(inv.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent activity */}
          <div className="card dash-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="card-body" style={{ padding: '8px 20px', maxHeight: 360, overflowY: 'auto' }}>
              {recentActivity.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, padding: '8px 0',
                  borderBottom: '1px solid var(--gray-50)',
                  fontSize: 13,
                }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    {item.type === 'success' ? <CheckCircle size={14} style={{ color: 'var(--green-500)' }} /> :
                      item.type === 'new' ? <Plus size={14} style={{ color: 'var(--blue-500)' }} /> :
                        <Info size={14} style={{ color: 'var(--gray-400)' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div>{item.text}</div>
                    <div className="text-xs text-muted">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="card dash-card">
            <div className="card-header">
              <h3>Performance</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div className="text-xs text-muted">Avg Job Value</div>
                  <div className="font-bold">{formatCurrency(dashboardStats.avgJobValue)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Completion Rate</div>
                  <div className="font-bold">{dashboardStats.completionRate}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted flex items-center gap-2">
                    <Recycle size={12} /> Diversion Rate
                  </div>
                  <div className="font-bold text-green">{dashboardStats.diversionRate}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Month Revenue</div>
                  <div className="font-bold">{formatCurrency(dashboardStats.monthRevenue)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .app-content > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
