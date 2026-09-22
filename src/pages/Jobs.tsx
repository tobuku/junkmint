import { useState } from 'react'
import { X, MapPin, Phone, Camera, CheckSquare, Square, Clock, DollarSign, AlertTriangle, Truck, ArrowRight, Plus, FileText } from 'lucide-react'
import { jobs, statusColors, formatCurrency, formatDate } from '../data/mock'
import { useToast } from '../hooks/useToast'

export default function Jobs() {
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { toast } = useToast()

  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter)
  const selected = jobs.find(j => j.id === selectedId)

  const statusCounts = {
    all: jobs.length,
    scheduled: jobs.filter(j => j.status === 'scheduled').length,
    in_progress: jobs.filter(j => j.status === 'in_progress').length,
    completed: jobs.filter(j => j.status === 'completed').length,
  }

  const lifecycleSteps = [
    { label: 'Quoted', key: 'quoted' },
    { label: 'Scheduled', key: 'scheduled' },
    { label: 'En Route', key: 'en_route' },
    { label: 'In Progress', key: 'in_progress' },
    { label: 'Completed', key: 'completed' },
  ]

  function getStepStatus(job: typeof jobs[0], step: string) {
    const order = ['quoted', 'scheduled', 'en_route', 'in_progress', 'completed']
    const jobIdx = order.indexOf(job.status === 'cancelled' ? 'quoted' : job.status)
    const stepIdx = order.indexOf(step)
    if (stepIdx < jobIdx) return 'completed'
    if (stepIdx === jobIdx) return 'active'
    return 'pending'
  }

  return (
    <div>
      <div className="page-header">
        <h1>Jobs</h1>
      </div>

      <div className="tabs">
        {Object.entries(statusCounts).map(([key, count]) => (
          <button key={key} className={`tab ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>
            {key === 'all' ? 'All' : key === 'in_progress' ? 'In Progress' : key.charAt(0).toUpperCase() + key.slice(1)}
            <span style={{
              marginLeft: 6, fontSize: 11, padding: '1px 6px', borderRadius: 10,
              background: filter === key ? 'var(--green-100)' : 'var(--gray-100)',
              color: filter === key ? 'var(--green-700)' : 'var(--gray-500)',
            }}>{count}</span>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Job</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Date</th>
                <th>Crew</th>
                <th>Volume</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(job => (
                <tr key={job.id} onClick={() => setSelectedId(job.id)}>
                  <td className="font-semibold">{job.id}</td>
                  <td>
                    <div className="font-semibold">{job.customerName}</div>
                    <div className="text-xs text-muted">{job.phone}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} style={{ color: 'var(--gray-400)' }} />
                      {job.city}
                    </div>
                  </td>
                  <td>
                    <div>{formatDate(job.scheduledDate)}</div>
                    <div className="text-xs text-muted">{job.scheduledTime}</div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {job.assignedCrew.map((name, i) => (
                        <div key={i} className="avatar" style={{
                          background: ['#16a34a', '#2563eb', '#d97706'][i % 3],
                          width: 26, height: 26, fontSize: 10,
                        }}>
                          {name.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>{job.volumeActual || job.volumeQuoted}</td>
                  <td className="font-semibold">{formatCurrency(job.priceFinal || job.priceQuoted)}</td>
                  <td><span className={`badge ${statusColors[job.status]}`}>{job.status.replace('_', ' ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job detail drawer */}
      {selected && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedId(null)} />
          <div className="drawer" style={{ width: 560 }}>
            <div className="drawer-header">
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>{selected.id}</h2>
                <span className={`badge ${statusColors[selected.status]}`} style={{ marginTop: 4 }}>
                  {selected.status.replace('_', ' ')}
                </span>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setSelectedId(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="drawer-body">
              {/* Lifecycle timeline */}
              <div style={{ marginBottom: 24 }}>
                <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Job Lifecycle</div>
                <div style={{ display: 'flex', gap: 0 }}>
                  {lifecycleSteps.map((step, i) => {
                    const s = getStepStatus(selected, step.key)
                    return (
                      <div key={step.key} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: '50%',
                          background: s === 'completed' ? 'var(--green-500)' :
                            s === 'active' ? 'var(--green-500)' : 'var(--gray-200)',
                          margin: '0 auto 4px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontSize: 12,
                          boxShadow: s === 'active' ? '0 0 0 4px var(--green-100)' : 'none',
                        }}>
                          {s === 'completed' ? '✓' : i + 1}
                        </div>
                        <div style={{
                          fontSize: 10, fontWeight: 600,
                          color: s === 'pending' ? 'var(--gray-400)' : 'var(--black)',
                        }}>{step.label}</div>
                        {i < lifecycleSteps.length - 1 && (
                          <div style={{
                            position: 'absolute', top: 12, left: '60%', right: '-40%',
                            height: 2,
                            background: s === 'completed' ? 'var(--green-500)' : 'var(--gray-200)',
                          }} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div className="text-xs text-muted">Customer</div>
                    <div className="font-semibold">{selected.customerName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Phone</div>
                    <div className="flex items-center gap-2">
                      <Phone size={12} /> {selected.phone}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Address</div>
                    <div className="flex items-center gap-2">
                      <MapPin size={12} style={{ color: 'var(--green-500)' }} />
                      {selected.address}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Scheduled</div>
                    <div>{formatDate(selected.scheduledDate)} at {selected.scheduledTime}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Crew</div>
                    <div className="flex gap-2 mt-2">
                      {selected.assignedCrew.map((name, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="avatar" style={{
                            background: ['#16a34a', '#2563eb', '#d97706'][i % 3],
                            width: 24, height: 24, fontSize: 10,
                          }}>
                            {name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Duration</div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} /> {selected.estimatedDuration}
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Pricing</div>
                  <div className="card" style={{ border: '1px solid var(--gray-100)', padding: 0 }}>
                    <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-50)' }}>
                      <span>Quoted ({selected.volumeQuoted})</span>
                      <span className="font-semibold">{formatCurrency(selected.priceQuoted)}</span>
                    </div>
                    {selected.changeOrders.map((co, i) => (
                      <div key={i} style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-50)', background: 'var(--orange-100)' }}>
                        <span className="flex items-center gap-2">
                          <AlertTriangle size={12} style={{ color: 'var(--orange-500)' }} />
                          {co.description}
                        </span>
                        <span className="font-semibold">+{formatCurrency(co.amount)}</span>
                      </div>
                    ))}
                    {selected.dumpFee && (
                      <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-50)' }}>
                        <span className="text-muted">Dump fee</span>
                        <span className="text-muted">-{formatCurrency(selected.dumpFee)}</span>
                      </div>
                    )}
                    <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, background: 'var(--gray-50)' }}>
                      <span>Total</span>
                      <span>{formatCurrency(
                        (selected.priceFinal || selected.priceQuoted) +
                        selected.changeOrders.reduce((sum, co) => sum + co.amount, 0)
                      )}</span>
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
                    Field Checklist ({selected.checklist.filter(c => c.done).length}/{selected.checklist.length})
                  </div>
                  <div className="flex flex-col gap-2">
                    {selected.checklist.map((item, i) => (
                      <div key={i} className="flex items-center gap-3" style={{
                        padding: '8px 12px', background: item.done ? 'var(--green-50)' : 'var(--white)',
                        borderRadius: 6, border: '1px solid var(--gray-100)',
                        opacity: item.done ? 0.7 : 1, cursor: 'pointer',
                      }} onClick={() => toast(`Checklist item toggled (demo)`)}>
                        {item.done ? <CheckSquare size={16} style={{ color: 'var(--green-500)' }} /> :
                          <Square size={16} style={{ color: 'var(--gray-300)' }} />}
                        <span className="text-sm" style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
                          {item.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Photos</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <div className="text-xs font-semibold mb-2">Before ({selected.beforePhotos})</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                        {Array.from({ length: Math.max(selected.beforePhotos, 1) }).map((_, i) => (
                          <div key={i} style={{
                            aspectRatio: '1', background: selected.beforePhotos > 0 ? 'var(--gray-200)' : 'var(--gray-50)',
                            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: selected.beforePhotos === 0 ? '2px dashed var(--gray-200)' : 'none',
                          }}>
                            <Camera size={16} style={{ color: 'var(--gray-400)' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-2">After ({selected.afterPhotos})</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                        {Array.from({ length: Math.max(selected.afterPhotos, 1) }).map((_, i) => (
                          <div key={i} style={{
                            aspectRatio: '1', background: selected.afterPhotos > 0 ? 'var(--gray-200)' : 'var(--gray-50)',
                            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: selected.afterPhotos === 0 ? '2px dashed var(--gray-200)' : 'none',
                          }}>
                            <Camera size={16} style={{ color: 'var(--gray-400)' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {selected.notes && (
                  <div>
                    <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Notes</div>
                    <p className="text-sm">{selected.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.status === 'in_progress' && (
                  <>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => { toast('Job marked complete (demo)'); setSelectedId(null) }}>
                      <CheckSquare size={16} /> Complete Job
                    </button>
                    <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => toast('Change order sent to customer (demo)')}>
                      <Plus size={16} /> Add Change Order
                    </button>
                  </>
                )}
                {selected.status === 'completed' && (
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => { toast('Invoice created (demo)'); setSelectedId(null) }}>
                    <FileText size={16} /> Create Invoice
                  </button>
                )}
                {selected.status === 'scheduled' && (
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => toast('Marked en route (demo)')}>
                    <Truck size={16} /> Mark En Route
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
