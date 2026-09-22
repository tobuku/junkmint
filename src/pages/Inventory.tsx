import { useState } from 'react'
import { AlertTriangle, Package, Plus, Search } from 'lucide-react'
import { inventory, formatCurrency } from '../data/mock'
import { useToast } from '../hooks/useToast'

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const filtered = inventory.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const lowStock = inventory.filter(i => i.quantity <= i.reorderLevel)

  return (
    <div>
      <div className="page-header">
        <h1>Inventory</h1>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => toast('Add item (demo)')}><Plus size={16} /> Add Item</button>
        </div>
      </div>

      {lowStock.length > 0 && (
        <div style={{
          padding: '12px 16px', background: 'var(--yellow-100)', borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          border: '1px solid var(--yellow-500)',
        }}>
          <AlertTriangle size={18} style={{ color: 'var(--yellow-500)' }} />
          <span className="font-semibold text-sm">
            {lowStock.length} item{lowStock.length > 1 ? 's' : ''} below reorder level:
          </span>
          <span className="text-sm">{lowStock.map(i => i.name).join(', ')}</span>
        </div>
      )}

      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
          <input className="input" placeholder="Search inventory..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} style={{ paddingLeft: 34 }} />
        </div>
        <select className="select" style={{ width: 'auto' }}>
          <option>All Categories</option>
          <option>PPE</option>
          <option>Supplies</option>
          <option>Equipment</option>
          <option>Loading</option>
          <option>Protection</option>
          <option>Cleanup</option>
        </select>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Reorder Level</th>
                <th>Status</th>
                <th>Unit Cost</th>
                <th>Last Restocked</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const isLow = item.quantity <= item.reorderLevel
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div style={{
                          width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: isLow ? 'var(--red-100)' : 'var(--green-50)',
                        }}>
                          <Package size={16} style={{ color: isLow ? 'var(--red-500)' : 'var(--green-600)' }} />
                        </div>
                        <span className="font-semibold">{item.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-gray">{item.category}</span></td>
                    <td>
                      <span className={`font-semibold ${isLow ? 'text-red' : ''}`}>
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="text-muted">{item.reorderLevel} {item.unit}</td>
                    <td>
                      {isLow ? (
                        <span className="badge badge-red">
                          <AlertTriangle size={11} style={{ marginRight: 4 }} /> Low Stock
                        </span>
                      ) : (
                        <span className="badge badge-green">In Stock</span>
                      )}
                    </td>
                    <td>{formatCurrency(item.costPerUnit)}</td>
                    <td className="text-muted">{item.lastRestocked}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
