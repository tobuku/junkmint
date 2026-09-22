import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Clock, Users, Truck } from 'lucide-react'
import { jobs, crew, statusColors } from '../data/mock'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const weekDates = ['Sep 21', 'Sep 22', 'Sep 23', 'Sep 24', 'Sep 25', 'Sep 26']
const hours = ['7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM']

// Map jobs to schedule positions
const scheduleJobs = [
  { ...jobs[0], col: 2, startRow: 3, spanRows: 2, color: 'var(--green-500)' }, // JOB-001 Tue 9AM
  { ...jobs[1], col: 2, startRow: 5, spanRows: 3, color: 'var(--orange-500)' }, // JOB-002 Tue 11:30AM
  { ...jobs[2], col: 4, startRow: 1, spanRows: 4, color: 'var(--blue-500)' },  // JOB-003 Thu 8AM
  // Past jobs shown dimmed
  { ...jobs[3], col: 1, startRow: 1, spanRows: 3, color: 'var(--gray-300)' },  // JOB-004 Mon (completed)
]

export default function Schedule() {
  const [view, setView] = useState<'week' | 'day'>('week')

  return (
    <div>
      <div className="page-header">
        <h1>Schedule</h1>
        <div className="page-header-actions">
          <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 8, padding: 2 }}>
            <button className={`btn btn-sm ${view === 'day' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setView('day')}>Day</button>
            <button className={`btn btn-sm ${view === 'week' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setView('week')}>Week</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-icon btn-sm"><ChevronLeft size={16} /></button>
            <span className="font-semibold">Sep 21 - 26, 2026</span>
            <button className="btn btn-ghost btn-icon btn-sm"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Crew availability bar */}
      <div className="card" style={{ marginBottom: 16, padding: '12px 20px' }}>
        <div className="flex items-center gap-4" style={{ overflowX: 'auto' }}>
          <span className="text-sm font-semibold text-muted" style={{ flexShrink: 0 }}>Crew:</span>
          {crew.map(member => (
            <div key={member.id} className="flex items-center gap-2" style={{ flexShrink: 0 }}>
              <div className="avatar" style={{
                width: 28, height: 28, fontSize: 11,
                background: member.status === 'on_job' ? 'var(--orange-500)' :
                  member.status === 'available' ? 'var(--green-500)' : 'var(--gray-400)',
              }}>
                {member.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold">{member.name.split(' ')[0]}</div>
                <div className="text-xs text-muted">{member.status.replace('_', ' ')}</div>
              </div>
            </div>
          ))}
          <div style={{ flexShrink: 0, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Truck size={16} style={{ color: 'var(--gray-400)' }} />
            <div>
              <div className="text-xs text-muted">Truck 1</div>
              <div className="text-sm font-semibold">Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Week grid */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px repeat(6, 1fr)',
            minWidth: 800,
          }}>
            {/* Header row */}
            <div style={{ padding: '12px 8px', borderBottom: '1px solid var(--gray-200)', background: 'var(--gray-50)' }} />
            {weekDays.map((day, i) => (
              <div key={day} style={{
                padding: '12px 8px', borderBottom: '1px solid var(--gray-200)',
                borderLeft: '1px solid var(--gray-100)', textAlign: 'center',
                background: i === 1 ? 'var(--green-50)' : 'var(--gray-50)',
              }}>
                <div className="text-xs text-muted">{day}</div>
                <div className="font-semibold" style={{
                  color: i === 1 ? 'var(--green-600)' : 'var(--black)',
                }}>{weekDates[i]}</div>
              </div>
            ))}

            {/* Time rows */}
            {hours.map((hour, rowIdx) => (
              <>
                <div key={`time-${rowIdx}`} style={{
                  padding: '8px', fontSize: 11, color: 'var(--gray-400)',
                  borderBottom: '1px solid var(--gray-50)', display: 'flex', alignItems: 'flex-start',
                  justifyContent: 'center', minHeight: 60,
                }}>
                  {hour}
                </div>
                {weekDays.map((_, colIdx) => (
                  <div key={`cell-${rowIdx}-${colIdx}`} style={{
                    borderLeft: '1px solid var(--gray-100)',
                    borderBottom: '1px solid var(--gray-50)',
                    minHeight: 60, padding: 2, position: 'relative',
                    background: colIdx === 1 ? 'rgba(34,197,94,0.02)' : 'transparent',
                  }}>
                    {/* Render job blocks */}
                    {scheduleJobs
                      .filter(j => j.col === colIdx + 1 && j.startRow === rowIdx + 1)
                      .map(job => (
                        <div key={job.id} style={{
                          background: job.color,
                          color: 'white',
                          borderRadius: 6,
                          padding: '6px 8px',
                          fontSize: 12,
                          height: `${job.spanRows * 60 - 4}px`,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          opacity: job.status === 'completed' ? 0.5 : 1,
                        }}>
                          <div className="font-semibold" style={{ fontSize: 11 }}>{job.customerName}</div>
                          <div style={{ opacity: 0.9, fontSize: 10, marginTop: 2 }}>
                            {job.scheduledTime}
                          </div>
                          <div style={{ opacity: 0.8, fontSize: 10 }} className="flex items-center gap-2">
                            <MapPin size={10} /> {job.city}
                          </div>
                          {job.status !== 'completed' && (
                            <div style={{ opacity: 0.8, fontSize: 10 }} className="flex items-center gap-2">
                              <Users size={10} /> {job.assignedCrew.length} crew
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Dump run indicator */}
      <div className="card" style={{ marginTop: 16, padding: '12px 20px' }}>
        <div className="flex items-center gap-3">
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: 'var(--red-500)',
          }} />
          <span className="text-sm">
            <span className="font-semibold">Estimated dump run</span> after JOB-002 completion (~2:00 PM) - PVT Land, Waipahu
          </span>
          <span className="text-xs text-muted" style={{ marginLeft: 'auto' }}>
            <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> ~45 min round trip
          </span>
        </div>
      </div>
    </div>
  )
}
