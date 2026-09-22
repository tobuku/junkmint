import { useState } from 'react'
import { Plus, X, DollarSign, Send, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { invoices, statusColors, formatCurrency, formatDate } from '../data/mock'
import { useToast } from '../hooks/useToast'

export default function Invoices() {
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { toast } = useToast()

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter)
  const selected = invoices.find(i => i.id === selectedId)

  const totals = {
    all: invoices.reduce((s, i) => s + i.amount, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0),
    outstanding: invoices.filter(i => ['sent', 'due', 'overdue'].includes(i.status)).reduce((s, i) => s + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0),
  }

  return (
    <div>
      <div className="page-header">
        <h1>Invoices</h1>
        <div className="page-header-actions">
          <button className="btn btn-primary"><Plus size={16} /> New Invoice</button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-4 gap-4" style={{ marginBottom: 24 }}>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setFilter('all')}>
          <div className="stat-label">Total Invoiced</div>
          <div className="stat-value">{formatCurrency(totals.all)}</div>
          <div className="text-xs text-muted mt-2">{invoices.length} invoices</div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setFilter('paid')}>
          <div className="stat-label">Collected</div>
          <div className="stat-value text-green">{formatCurrency(totals.paid)}</div>
          <div className="text-xs text-muted mt-2">{invoices.filter(i => i.status === 'paid').length} paid</div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setFilter('sent')}>
          <div className="stat-label">Outstanding</div>
          <div className="stat-value">{formatCurrency(totals.outstanding)}</div>
          <div className="text-xs text-muted mt-2">{invoices.filter(i => ['sent', 'due', 'overdue'].includes(i.status)).length} open</div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer', borderLeft: totals.overdue > 0 ? '4px solid var(--red-500)' : 'none' }}
          onClick={() => setFilter('overdue')}>
          <div className="stat-label">Overdue</div>
          <div className="stat-value text-red">{formatCurrency(totals.overdue)}</div>
          <div className="text-xs text-red mt-2">{invoices.filter(i => i.status === 'overdue').length} past due</div>
        </div>
      </div>

      <div className="tabs">
        {['all', 'draft', 'sent', 'due', 'overdue', 'paid'].map(tab => (
          <button key={tab} className={`tab ${filter === tab ? 'active' : ''}`} onClick={() => setFilter(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Issued</th>
                <th>Due</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id} onClick={() => setSelectedId(inv.id)}>
                  <td className="font-semibold">{inv.id}</td>
                  <td>
                    <div className="font-semibold">{inv.customerName}</div>
                    <div className="text-xs text-muted truncate" style={{ maxWidth: 200 }}>{inv.address}</div>
                  </td>
                  <td className="font-semibold">{formatCurrency(inv.amount)}</td>
                  <td>
                    <span className={`badge ${statusColors[inv.status]}`}>
                      {inv.status === 'overdue' && <AlertTriangle size={11} style={{ marginRight: 4 }} />}
                      {inv.status}
                    </span>
                  </td>
                  <td className="text-muted">{formatDate(inv.issuedAt)}</td>
                  <td className="text-muted">{formatDate(inv.dueDate)}</td>
                  <td className="text-muted">{inv.paidAt ? formatDate(inv.paidAt) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice detail drawer */}
      {selected && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedId(null)} />
          <div className="drawer">
            <div className="drawer-header">
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>{selected.id}</h2>
                <span className={`badge ${statusColors[selected.status]}`} style={{ marginTop: 4 }}>
                  {selected.status}
                </span>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setSelectedId(null)}>
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
                    <div className="text-xs text-muted">Address</div>
                    <div>{selected.address}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Issued</div>
                    <div>{formatDate(selected.issuedAt)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Due Date</div>
                    <div style={{ color: selected.status === 'overdue' ? 'var(--red-500)' : 'inherit', fontWeight: selected.status === 'overdue' ? 700 : 400 }}>
                      {formatDate(selected.dueDate)}
                    </div>
                  </div>
                </div>

                {/* Line items */}
                <div className="card" style={{ border: '1px solid var(--gray-100)', padding: 0 }}>
                  {selected.items.map((item, i) => (
                    <div key={i} style={{
                      padding: '12px 16px', display: 'flex', justifyContent: 'space-between',
                      borderBottom: i < selected.items.length - 1 ? '1px solid var(--gray-100)' : 'none',
                    }}>
                      <span>{item.description}</span>
                      <span className="font-semibold">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                  <div style={{
                    padding: '12px 16px', display: 'flex', justifyContent: 'space-between',
                    fontWeight: 700, fontSize: 18, background: 'var(--gray-50)', borderTop: '2px solid var(--gray-200)',
                  }}>
                    <span>Total</span>
                    <span>{formatCurrency(selected.amount)}</span>
                  </div>
                </div>

                {selected.paidAt && (
                  <div style={{
                    padding: 12, background: 'var(--green-50)', borderRadius: 8,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <CheckCircle size={16} style={{ color: 'var(--green-600)' }} />
                    <span className="text-sm">
                      Paid on {formatDate(selected.paidAt)} via {selected.paymentMethod}
                    </span>
                  </div>
                )}

                {selected.status === 'overdue' && (
                  <div style={{
                    padding: 12, background: 'var(--red-100)', borderRadius: 8,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <AlertTriangle size={16} style={{ color: 'var(--red-500)' }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--red-500)' }}>
                      This invoice is past due
                    </span>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.status !== 'paid' && (
                  <>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => { toast('Payment recorded (demo)'); setSelectedId(null) }}>
                      <DollarSign size={16} /> Record Payment (Demo)
                    </button>
                    <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => toast('Reminder sent (demo)')}>
                      <Send size={16} /> Send Reminder
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
