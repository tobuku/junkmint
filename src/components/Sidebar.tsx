import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Inbox, FileText, Calendar, Briefcase,
  Users, Receipt, Package, UserCog, FolderOpen, BarChart3,
  Truck, ChevronLeft, Menu
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/requests', icon: Inbox, label: 'Requests' },
  { to: '/quotes', icon: FileText, label: 'Quotes' },
  { to: '/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/jobs', icon: Briefcase, label: 'Jobs' },
  { to: '/clients', icon: Users, label: 'Clients' },
  { to: '/invoices', icon: Receipt, label: 'Invoices' },
  { to: '/inventory', icon: Package, label: 'Inventory' },
  { to: '/team', icon: UserCog, label: 'Team' },
  { to: '/documents', icon: FolderOpen, label: 'Documents' },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        style={{
          display: 'none',
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 80,
          background: 'var(--black)',
          color: 'var(--white)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          padding: '10px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <Menu size={20} />
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 69
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        style={{
          width: collapsed ? 64 : 240,
          minHeight: '100vh',
          background: 'var(--black)',
          color: 'var(--white)',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 70,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s ease, transform 0.2s ease',
          overflowX: 'hidden',
        }}
        className={mobileOpen ? 'sidebar-mobile-open' : ''}
      >
        {/* Logo */}
        <div style={{
          padding: collapsed ? '20px 12px' : '20px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid var(--gray-800)',
          minHeight: 64,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--green-500)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Truck size={18} color="white" />
          </div>
          {!collapsed && (
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>
              Junk<span style={{ color: 'var(--green-400)' }}>Mint</span>
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              color: 'var(--gray-400)', padding: 4, cursor: 'pointer',
              display: collapsed ? 'none' : 'flex',
            }}
            className="hide-mobile"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(item.to))
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: collapsed ? '10px 12px' : '10px 12px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--white)' : 'var(--gray-400)',
                  background: isActive ? 'var(--gray-800)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}
              >
                <item.icon size={18} style={{
                  color: isActive ? 'var(--green-400)' : 'var(--gray-500)',
                  flexShrink: 0,
                }} />
                {!collapsed && item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--gray-800)',
            fontSize: 12,
            color: 'var(--gray-500)',
          }}>
            <div style={{ fontWeight: 600, color: 'var(--gray-300)', marginBottom: 2 }}>Opala Kuleana LLC</div>
            <div>Oahu, Hawaii</div>
          </div>
        )}
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          aside {
            transform: translateX(-100%);
            width: 240px !important;
          }
          aside.sidebar-mobile-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
