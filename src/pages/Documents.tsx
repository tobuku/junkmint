import { useState } from 'react'
import { FileText, Upload, Search, Shield, File, Receipt, Image, PenTool, Clock } from 'lucide-react'
import { documents, statusColors, formatDate } from '../data/mock'
import { useToast } from '../hooks/useToast'

const typeIcons: Record<string, typeof FileText> = {
  waiver: PenTool,
  contract: FileText,
  permit: Shield,
  certificate: Shield,
  photo: Image,
  receipt: Receipt,
}

export default function Documents() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const filtered = documents
    .filter(d => filter === 'all' || d.type === filter)
    .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <div className="page-header">
        <h1>Documents</h1>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => toast('Upload document (demo)')}>
            <Upload size={16} /> Upload
          </button>
        </div>
      </div>

      <div className="tabs">
        {['all', 'certificate', 'waiver', 'contract', 'receipt'].map(tab => (
          <button key={tab} className={`tab ${filter === tab ? 'active' : ''}`} onClick={() => setFilter(tab)}>
            {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1) + 's'}
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
          <input className="input" placeholder="Search documents..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} style={{ paddingLeft: 34 }} />
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Linked To</th>
                <th>Status</th>
                <th>Size</th>
                <th>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(doc => {
                const Icon = typeIcons[doc.type] || File
                return (
                  <tr key={doc.id} onClick={() => toast(`Opening ${doc.name} (demo)`)}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div style={{
                          width: 32, height: 32, borderRadius: 6, display: 'flex',
                          alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)',
                        }}>
                          <Icon size={16} style={{ color: 'var(--gray-500)' }} />
                        </div>
                        <span className="font-semibold">{doc.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-gray" style={{ textTransform: 'capitalize' }}>{doc.type}</span></td>
                    <td className="text-muted">{doc.clientName || doc.jobId || 'Company'}</td>
                    <td><span className={`badge ${statusColors[doc.status]}`}>{doc.status}</span></td>
                    <td className="text-muted">{doc.size}</td>
                    <td className="text-muted">{formatDate(doc.uploadedAt)}</td>
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
