import { useState } from 'react'
import { Plus, Filter, Search, Phone, MessageSquare, Globe, Star, MapPin, Camera, ArrowRight, X, Clock } from 'lucide-react'
import { requests, statusColors, formatDate } from '../data/mock'
import { useToast } from '../hooks/useToast'

const sourceIcons: Record<string, typeof Phone> = {
  phone: Phone, text: MessageSquare, web: Globe, google: Globe, yelp: Star, referral: Star,
}

export default function Requests() {
  const [filter, setFilter] = useState('all')
  const [drawerOpen, setDrawerOpen] = useState<string | null>(null)
  const [newRequestOpen, setNewRequestOpen] = useState(false)
  const { toast } = useToast()

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)
  const selected = requests.find(r => r.id === drawerOpen)

  const statusCounts = {
    all: requests.length,
    new: requests.filter(r => r.status === 'new').length,
    contacted: requests.filter(r => r.status === 'contacted').length,
    quoted: requests.filter(r => r.status === 'quoted').length,
    booked: requests.filter(r => r.status === 'booked').length,
    lost: requests.filter(r => r.status === 'lost').length,
  }

  return (
    <div>
      <div className="page-header">
        <h1>Requests</h1>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => setNewRequestOpen(true)}>
            <Plus size={16} /> New Request
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {Object.entries(statusCounts).map(([key, count]) => (
          <button key={key} className={`tab ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>
            {key === 'all' ? 'All' : key.charAt(0).toUpperCase() + key.slice(1)}
            <span style={{
              marginLeft: 6, fontSize: 11, background: filter === key ? 'var(--green-100)' : 'var(--gray-100)',
              color: filter === key ? 'var(--green-700)' : 'var(--gray-500)',
              padding: '1px 6px', borderRadius: 10,
            }}>{count}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Source</th>
                <th>Location</th>
                <th>Urgency</th>
                <th>Photos</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(req => {
                const SourceIcon = sourceIcons[req.source] || Globe
                return (
                  <tr key={req.id} onClick={() => setDrawerOpen(req.id)}>
                    <td className="font-semibold">{req.id}</td>
                    <td>
                      <div className="font-semibold">{req.customerName}</div>
                      <div className="text-xs text-muted">{req.phone}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <SourceIcon size={14} style={{ color: 'var(--gray-400)' }} />
                        <span style={{ textTransform: 'capitalize' }}>{req.source}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} style={{ color: 'var(--gray-400)' }} />
                        {req.city}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${req.urgency === 'high' || req.urgency === 'emergency' ? 'badge-red' : req.urgency === 'normal' ? 'badge-gray' : 'badge-gray'}`}>
                        {req.urgency}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Camera size={14} style={{ color: 'var(--gray-400)' }} />
                        {req.photos}
                      </div>
                    </td>
                    <td><span className={`badge ${statusColors[req.status]}`}>{req.status}</span></td>
                    <td className="text-muted">{formatDate(req.createdAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request detail drawer */}
      {selected && (
        <>
          <div className="drawer-overlay" onClick={() => setDrawerOpen(null)} />
          <div className="drawer">
            <div className="drawer-header">
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>{selected.id}</h2>
                <span className={`badge ${statusColors[selected.status]}`} style={{ marginTop: 4 }}>
                  {selected.status}
                </span>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setDrawerOpen(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="drawer-body">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Customer</div>
                  <div className="font-semibold" style={{ fontSize: 16 }}>{selected.customerName}</div>
                  <div className="text-sm text-muted mt-2">{selected.phone}</div>
                  <div className="text-sm text-muted">{selected.email}</div>
                </div>

                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Service Location</div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} style={{ color: 'var(--green-500)' }} />
                    <span>{selected.address}, {selected.city}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Description</div>
                  <p style={{ lineHeight: 1.6 }}>{selected.description}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div className="text-xs text-muted">Source</div>
                    <div style={{ textTransform: 'capitalize' }}>{selected.source}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Urgency</div>
                    <span className={`badge ${selected.urgency === 'high' ? 'badge-red' : 'badge-gray'}`}>
                      {selected.urgency}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Photos</div>
                    <div className="flex items-center gap-2">
                      <Camera size={14} /> {selected.photos} attached
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Created</div>
                    <div>{formatDate(selected.createdAt)}</div>
                  </div>
                </div>

                {/* Photo placeholder */}
                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Photos</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {Array.from({ length: Math.min(selected.photos, 6) }).map((_, i) => (
                      <div key={i} style={{
                        aspectRatio: '1', background: 'var(--gray-100)', borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--gray-400)',
                      }}>
                        <Camera size={20} />
                      </div>
                    ))}
                  </div>
                </div>

                {selected.notes && (
                  <div>
                    <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Notes</div>
                    <p className="text-sm">{selected.notes}</p>
                  </div>
                )}

                {selected.followUpDate && (
                  <div style={{
                    padding: 12, background: 'var(--yellow-100)', borderRadius: 8,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <Clock size={16} style={{ color: 'var(--yellow-500)' }} />
                    <span className="text-sm font-semibold">Follow-up scheduled: {selected.followUpDate}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => { toast('Quote created from request (demo)'); setDrawerOpen(null) }}>
                  <ArrowRight size={16} /> Create Quote
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <button className="btn btn-secondary" onClick={() => toast('Follow-up scheduled (demo)')}>
                    <Clock size={14} /> Schedule Follow-Up
                  </button>
                  <button className="btn btn-secondary" onClick={() => toast('Customer contacted (demo)')}>
                    <Phone size={14} /> Call Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* New request modal */}
      {newRequestOpen && (
        <div className="modal-overlay" onClick={() => setNewRequestOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Request</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setNewRequestOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="flex flex-col gap-3">
                <div className="input-group">
                  <label>Customer Name</label>
                  <input className="input" placeholder="Full name" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="input-group">
                    <label>Phone</label>
                    <input className="input" placeholder="(808) 555-0000" />
                  </div>
                  <div className="input-group">
                    <label>Email</label>
                    <input className="input" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="input-group">
                  <label>Service Address</label>
                  <input className="input" placeholder="Street address" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="input-group">
                    <label>Source</label>
                    <select className="select">
                      <option>Phone</option>
                      <option>Text</option>
                      <option>Web</option>
                      <option>Google</option>
                      <option>Yelp</option>
                      <option>Referral</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Urgency</label>
                    <select className="select">
                      <option>Normal</option>
                      <option>Low</option>
                      <option>High</option>
                      <option>Emergency</option>
                    </select>
                  </div>
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <textarea className="input" rows={3} placeholder="What needs to be removed?" />
                </div>
                <div className="input-group">
                  <label>Photos</label>
                  <div style={{
                    border: '2px dashed var(--gray-200)', borderRadius: 8,
                    padding: 24, textAlign: 'center', color: 'var(--gray-400)',
                    cursor: 'pointer',
                  }}>
                    <Camera size={24} style={{ margin: '0 auto 8px' }} />
                    <div className="text-sm">Drop photos here or click to upload</div>
                    <div className="text-xs text-muted mt-2">Demo only - no actual upload</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setNewRequestOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                toast('Request created (demo)')
                setNewRequestOpen(false)
              }}>Create Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
