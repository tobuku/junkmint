import { useState } from 'react'
import { Plus, X, Send, Eye, CheckCircle, ArrowRight, Sparkles, Camera, DollarSign } from 'lucide-react'
import { quotes, statusColors, formatCurrency, formatDate } from '../data/mock'
import { useToast } from '../hooks/useToast'

const volumeTiers = [
  { label: '1/8 truck', price: 150 },
  { label: '1/4 truck', price: 250 },
  { label: '3/8 truck', price: 325 },
  { label: '1/2 truck', price: 400 },
  { label: '5/8 truck', price: 475 },
  { label: '3/4 truck', price: 550 },
  { label: '7/8 truck', price: 625 },
  { label: 'Full truck', price: 700 },
]

export default function Quotes() {
  const [filter, setFilter] = useState('all')
  const [drawerOpen, setDrawerOpen] = useState<string | null>(null)
  const [builderOpen, setBuilderOpen] = useState(false)
  const { toast } = useToast()

  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.status === filter)
  const selected = quotes.find(q => q.id === drawerOpen)

  return (
    <div>
      <div className="page-header">
        <h1>Quotes</h1>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => setBuilderOpen(true)}>
            <Plus size={16} /> New Quote
          </button>
        </div>
      </div>

      <div className="tabs">
        {['all', 'draft', 'sent', 'viewed', 'approved', 'declined'].map(tab => (
          <button key={tab} className={`tab ${filter === tab ? 'active' : ''}`} onClick={() => setFilter(tab)}>
            {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span style={{
              marginLeft: 6, fontSize: 11, padding: '1px 6px', borderRadius: 10,
              background: filter === tab ? 'var(--green-100)' : 'var(--gray-100)',
              color: filter === tab ? 'var(--green-700)' : 'var(--gray-500)',
            }}>
              {tab === 'all' ? quotes.length : quotes.filter(q => q.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Quote</th>
                <th>Customer</th>
                <th>Volume</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Sent</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => (
                <tr key={q.id} onClick={() => setDrawerOpen(q.id)}>
                  <td className="font-semibold">{q.id}</td>
                  <td>
                    <div className="font-semibold">{q.customerName}</div>
                    <div className="text-xs text-muted">{q.address}</div>
                  </td>
                  <td>{q.volumeEstimate}</td>
                  <td className="font-semibold">{formatCurrency(q.total)}</td>
                  <td><span className={`badge ${statusColors[q.status]}`}>{q.status}</span></td>
                  <td className="text-muted">{q.sentAt ? formatDate(q.sentAt) : '-'}</td>
                  <td className="text-muted">{formatDate(q.expiresAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote detail drawer */}
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div className="text-xs text-muted">Customer</div>
                    <div className="font-semibold">{selected.customerName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Phone</div>
                    <div>{selected.phone}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Address</div>
                    <div>{selected.address}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Volume</div>
                    <div>{selected.volumeEstimate}</div>
                  </div>
                </div>

                {/* Line items */}
                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Line Items</div>
                  <div className="card" style={{ border: '1px solid var(--gray-100)' }}>
                    {selected.items.map((item, i) => (
                      <div key={item.id} style={{
                        padding: '12px 16px',
                        borderBottom: i < selected.items.length - 1 ? '1px solid var(--gray-100)' : 'none',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      }}>
                        <div>
                          <div className="font-semibold" style={{ fontSize: 13 }}>{item.description}</div>
                          <div className="text-xs text-muted">{item.volume}</div>
                        </div>
                        <div className="font-semibold">{formatCurrency(item.price)}</div>
                      </div>
                    ))}
                    <div style={{
                      padding: '12px 16px', background: 'var(--gray-50)',
                      display: 'flex', justifyContent: 'space-between',
                      fontWeight: 700, fontSize: 16, borderTop: '2px solid var(--gray-200)',
                    }}>
                      <span>Total</span>
                      <span>{formatCurrency(selected.total)}</span>
                    </div>
                  </div>
                </div>

                {selected.notes && (
                  <div>
                    <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Notes</div>
                    <p className="text-sm">{selected.notes}</p>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div className="text-xs text-muted">Created</div>
                    <div>{formatDate(selected.createdAt)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Expires</div>
                    <div>{formatDate(selected.expiresAt)}</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.status === 'draft' && (
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => { toast('Quote sent to customer (demo)'); setDrawerOpen(null) }}>
                    <Send size={16} /> Send Quote
                  </button>
                )}
                {selected.status === 'approved' && (
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => { toast('Job created from approved quote (demo)'); setDrawerOpen(null) }}>
                    <ArrowRight size={16} /> Convert to Job
                  </button>
                )}
                {['sent', 'viewed'].includes(selected.status) && (
                  <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => toast('Follow-up sent (demo)')}>
                    <Send size={16} /> Send Follow-Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Quote builder modal */}
      {builderOpen && (
        <div className="modal-overlay" onClick={() => setBuilderOpen(false)}>
          <div className="modal" style={{ maxWidth: 720 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Build Quote</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setBuilderOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="flex flex-col gap-4">
                {/* AI assistant hint */}
                <div style={{
                  padding: 12, background: 'var(--green-50)', borderRadius: 8,
                  border: '1px solid var(--green-200)', display: 'flex', gap: 10,
                }}>
                  <Sparkles size={18} style={{ color: 'var(--green-600)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--green-700)' }}>AI Quote Assistant</div>
                    <div className="text-xs text-muted">Upload customer photos and AI will estimate volume and suggest pricing. (Simulated in demo)</div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Customer</label>
                  <select className="select">
                    <option>Select customer or create new...</option>
                    <option>Sarah Kealoha - REQ-001</option>
                    <option>Derek Watanabe - REQ-006</option>
                    <option>James Nalu - REQ-004</option>
                  </select>
                </div>

                {/* Photo upload */}
                <div className="input-group">
                  <label>Customer Photos</label>
                  <div style={{
                    border: '2px dashed var(--gray-200)', borderRadius: 8,
                    padding: 20, textAlign: 'center', color: 'var(--gray-400)', cursor: 'pointer',
                  }}>
                    <Camera size={24} style={{ margin: '0 auto 8px' }} />
                    <div className="text-sm">Drop photos or click to upload</div>
                  </div>
                </div>

                {/* Volume picker */}
                <div className="input-group">
                  <label>Volume Estimate</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {volumeTiers.map(tier => (
                      <button key={tier.label} className="btn btn-secondary btn-sm" style={{
                        flexDirection: 'column', padding: '10px 8px', height: 'auto',
                      }}>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{tier.label}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-600)' }}>
                          {formatCurrency(tier.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-group">
                  <label>Additional Items / Surcharges</label>
                  <input className="input" placeholder="e.g., Appliance disconnect, stairs, long carry" />
                </div>

                <div className="input-group">
                  <label>Notes</label>
                  <textarea className="input" rows={2} placeholder="Internal notes about this quote" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setBuilderOpen(false)}>Cancel</button>
              <button className="btn btn-secondary" onClick={() => {
                toast('Quote saved as draft (demo)')
                setBuilderOpen(false)
              }}>
                <Eye size={14} /> Save Draft
              </button>
              <button className="btn btn-primary" onClick={() => {
                toast('Quote sent to customer (demo)')
                setBuilderOpen(false)
              }}>
                <Send size={14} /> Send Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
