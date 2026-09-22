import { useState } from 'react'
import { Phone, Shield, Calendar, Briefcase, X, Clock, Award } from 'lucide-react'
import { crew, statusColors, formatDate, crewColors } from '../data/mock'
import { useToast } from '../hooks/useToast'

export default function Team() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { toast } = useToast()
  const selected = crew.find(c => c.id === selectedId)

  return (
    <div>
      <div className="page-header">
        <h1>Team</h1>
      </div>

      <div className="grid grid-3 gap-4">
        {crew.map((member, i) => (
          <div key={member.id} className="card" style={{ cursor: 'pointer' }} onClick={() => setSelectedId(member.id)}>
            <div className="card-body" style={{ textAlign: 'center', padding: 24 }}>
              <div className="avatar" style={{
                width: 64, height: 64, fontSize: 22, margin: '0 auto 12px',
                background: crewColors[i % crewColors.length],
              }}>
                {member.avatar}
              </div>
              <h3 className="font-bold" style={{ fontSize: 16 }}>{member.name}</h3>
              <div className="text-sm text-muted" style={{ textTransform: 'capitalize', marginBottom: 8 }}>{member.role}</div>
              <span className={`badge ${statusColors[member.status]}`}>{member.status.replace('_', ' ')}</span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                <div>
                  <div className="text-xs text-muted">Today</div>
                  <div className="font-semibold">{member.jobsToday} jobs</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Certs</div>
                  <div className="font-semibold">{member.certifications.length}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team member detail drawer */}
      {selected && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedId(null)} />
          <div className="drawer">
            <div className="drawer-header">
              <div className="flex items-center gap-3">
                <div className="avatar" style={{
                  width: 48, height: 48, fontSize: 18,
                  background: crewColors[crew.indexOf(selected) % crewColors.length],
                }}>
                  {selected.avatar}
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700 }}>{selected.name}</h2>
                  <div className="text-sm text-muted" style={{ textTransform: 'capitalize' }}>{selected.role}</div>
                </div>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setSelectedId(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="drawer-body">
              <div className="flex flex-col gap-4">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div className="text-xs text-muted">Status</div>
                    <span className={`badge ${statusColors[selected.status]}`}>{selected.status.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Phone</div>
                    <div className="flex items-center gap-2"><Phone size={12} /> {selected.phone}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Hire Date</div>
                    <div className="flex items-center gap-2"><Calendar size={12} /> {formatDate(selected.hireDate)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Jobs Today</div>
                    <div className="flex items-center gap-2"><Briefcase size={12} /> {selected.jobsToday}</div>
                  </div>
                </div>

                {selected.currentJob && (
                  <div style={{
                    padding: 12, background: 'var(--orange-100)', borderRadius: 8,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <Clock size={16} style={{ color: 'var(--orange-500)' }} />
                    <span className="text-sm font-semibold">Currently on job: {selected.currentJob}</span>
                  </div>
                )}

                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Certifications</div>
                  <div className="flex flex-col gap-2">
                    {selected.certifications.map(cert => (
                      <div key={cert} className="flex items-center gap-3" style={{
                        padding: '8px 12px', background: 'var(--green-50)', borderRadius: 6,
                      }}>
                        <Award size={14} style={{ color: 'var(--green-600)' }} />
                        <span className="text-sm font-semibold">{cert}</span>
                        <span className="badge badge-green" style={{ marginLeft: 'auto', fontSize: 10 }}>Active</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability mock */}
                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>This Week</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                      <div key={day} style={{
                        textAlign: 'center', padding: '8px 4px', borderRadius: 6,
                        background: i < 5 ? 'var(--green-50)' : 'var(--gray-50)',
                        border: `1px solid ${i < 5 ? 'var(--green-200)' : 'var(--gray-200)'}`,
                      }}>
                        <div className="text-xs text-muted">{day}</div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: i < 5 ? 'var(--green-700)' : 'var(--gray-400)' }}>
                          {i < 5 ? 'Avail' : 'Off'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Internal notes */}
                <div>
                  <div className="text-xs text-muted" style={{ textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Internal Notes</div>
                  <textarea className="input" rows={3} placeholder="Add internal notes about this team member..."
                    defaultValue={selected.name === 'Kai Nakamura' ? 'Strong lead. Reliable. Looking to get CDL-A next year.' : ''} />
                  <button className="btn btn-sm btn-secondary mt-2" onClick={() => toast('Note saved (demo)')}>Save Note</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
