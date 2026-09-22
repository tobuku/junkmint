import { useState } from 'react'
import { Search, X, MapPin, Phone, Mail, Tag, DollarSign, Briefcase, Plus } from 'lucide-react'
import { clients, formatCurrency, formatDate, jobs, invoices, quotes, statusColors } from '../data/mock'

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tags.some(t => t.includes(searchTerm.toLowerCase()))
  )

  const selected = clients.find(c => c.id === selectedId)
  const clientJobs = selected ? jobs.filter(j => j.customerName === selected.name) : []
  const clientInvoices = selected ? invoices.filter(i => i.customerName === selected.name) : []
  const clientQuotes = selected ? quotes.filter(q => q.customerName === selected.name) : []

  return (
    <div>
      <div className="page-header">
        <h1>Clients</h1>
        <div className="page-header-actions">
          <button className="btn btn-primary"><Plus size={16} /> Add Client</button>
        </div>
      </div>

      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
          <input className="input" placeholder="Search clients..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 34 }} />
        </div>
        <select className="select" style={{ width: 'auto' }}>
          <option>All Tags</option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Recurring</option>
          <option>Repeat</option>
        </select>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Location</th>
                <th>Jobs</th>
                <th>Revenue</th>
                <th>Last Job</th>
                <th>Tags</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(client => (
                <tr key={client.id} onClick={() => setSelectedId(client.id)}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar" style={{
                        background: client.tags.includes('commercial') ? 'var(--blue-500)' : 'var(--green-600)',
                      }}>
                        {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-semibold">{client.name}</div>
                        <div className="text-xs text-muted">{client.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>{client.city}</td>
                  <td className="font-semibold">{client.totalJobs}</td>
                  <td className="font-semibold">{client.totalRevenue > 0 ? formatCurrency(client.totalRevenue) : '-'}</td>
                  <td className="text-muted">{client.lastJobDate ? formatDate(client.lastJobDate) : '-'}</td>
                  <td>
                    <div className="flex gap-2">
                      {client.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="badge badge-gray" style={{ fontSize: 11 }}>{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="text-muted">{client.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client detail drawer */}
      {selected && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedId(null)} />
          <div className="drawer" style={{ width: 520 }}>
            <div className="drawer-header">
              <div className="flex items-center gap-3">
                <div className="avatar" style={{
                  background: selected.tags.includes('commercial') ? 'var(--blue-500)' : 'var(--green-600)',
                  width: 44, height: 44, fontSize: 16,
                }}>
                  {selected.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700 }}>{selected.name}</h2>
                  <div className="flex gap-2 mt-2">
                    {selected.tags.map(tag => (
                      <span key={tag} className="badge badge-gray" style={{ fontSize: 11 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setSelectedId(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="drawer-body">
              <div className="flex flex-col gap-4">
                {/* Contact */}
                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Contact</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} style={{ color: 'var(--gray-400)' }} /> {selected.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} style={{ color: 'var(--gray-400)' }} /> {selected.email}
                    </div>
                    {selected.addresses.map((addr, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <MapPin size={14} style={{ color: 'var(--green-500)' }} /> {addr}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <div className="stat-card" style={{ padding: 12 }}>
                    <div className="text-xs text-muted">Jobs</div>
                    <div className="font-bold" style={{ fontSize: 20 }}>{selected.totalJobs}</div>
                  </div>
                  <div className="stat-card" style={{ padding: 12 }}>
                    <div className="text-xs text-muted">Revenue</div>
                    <div className="font-bold" style={{ fontSize: 20 }}>{selected.totalRevenue > 0 ? formatCurrency(selected.totalRevenue) : '-'}</div>
                  </div>
                  <div className="stat-card" style={{ padding: 12 }}>
                    <div className="text-xs text-muted">Source</div>
                    <div className="font-bold" style={{ fontSize: 16 }}>{selected.source}</div>
                  </div>
                </div>

                {/* Job history */}
                {clientJobs.length > 0 && (
                  <div>
                    <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Job History</div>
                    {clientJobs.map(job => (
                      <div key={job.id} style={{
                        padding: '10px 12px', borderBottom: '1px solid var(--gray-50)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      }}>
                        <div>
                          <div className="text-sm font-semibold">{job.id} - {job.volumeQuoted}</div>
                          <div className="text-xs text-muted">{formatDate(job.scheduledDate)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{formatCurrency(job.priceFinal || job.priceQuoted)}</span>
                          <span className={`badge ${statusColors[job.status]}`} style={{ fontSize: 11 }}>{job.status.replace('_', ' ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Invoice history */}
                {clientInvoices.length > 0 && (
                  <div>
                    <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Invoices</div>
                    {clientInvoices.map(inv => (
                      <div key={inv.id} style={{
                        padding: '10px 12px', borderBottom: '1px solid var(--gray-50)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      }}>
                        <div>
                          <div className="text-sm font-semibold">{inv.id}</div>
                          <div className="text-xs text-muted">{formatDate(inv.issuedAt)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{formatCurrency(inv.amount)}</span>
                          <span className={`badge ${statusColors[inv.status]}`} style={{ fontSize: 11 }}>{inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selected.notes && (
                  <div>
                    <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Notes</div>
                    <p className="text-sm">{selected.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
