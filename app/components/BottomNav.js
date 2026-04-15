'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: '首页', icon: '🏠' },
    { href: '/categories', label: '分类', icon: '📂' },
    { href: '/submit', label: '提交', icon: '➕' },
    { href: '/about', label: '关于', icon: 'ℹ️' },
  ]

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(10, 14, 39, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(99, 102, 241, 0.2)',
      padding: '12px 0',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: isActive ? '#818cf8' : '#64748b',
              transition: 'all 0.3s',
              padding: '8px 16px',
              borderRadius: '12px'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: isActive ? '600' : '400' 
            }}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
