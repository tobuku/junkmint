import { Search, Bell, User } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header style={{
      height: 64,
      borderBottom: '1px solid var(--gray-100)',
      background: 'var(--white)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Search */}
      <div style={{
        flex: 1,
        maxWidth: 480,
        position: 'relative',
      }}>
        <Search size={16} style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--gray-400)',
        }} />
        <input
          type="text"
          placeholder="Search requests, jobs, clients..."
          className="input"
          style={{ paddingLeft: 36, background: 'var(--gray-50)', border: '1px solid var(--gray-100)' }}
          onFocus={() => setSearchOpen(true)}
          onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
        />
        {searchOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: 'var(--white)', border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-md)', marginTop: 4,
            boxShadow: 'var(--shadow-lg)', padding: 8,
          }}>
            <div style={{ padding: '8px 12px', fontSize: 12, color: 'var(--gray-400)', fontWeight: 600 }}>
              RECENT
            </div>
            {['Sarah Kealoha - REQ-001', 'Mike Tanaka - JOB-001', 'Pacific Property Mgmt'].map((item, i) => (
              <div key={i} style={{
                padding: '8px 12px', borderRadius: 6, cursor: 'pointer',
                fontSize: 14,
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-50)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Notifications */}
        <button className="btn-ghost btn-icon" style={{ position: 'relative' }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute', top: 4, right: 4,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--red-500)',
          }} />
        </button>

        {/* User */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '4px 8px', borderRadius: 8, cursor: 'pointer',
        }}>
          <div className="avatar" style={{ background: 'var(--green-600)', width: 32, height: 32, fontSize: 13 }}>
            OK
          </div>
          <span className="hide-mobile" style={{ fontSize: 13, fontWeight: 500 }}>Opala Kuleana</span>
        </div>
      </div>
    </header>
  )
}
