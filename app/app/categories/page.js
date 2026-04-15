'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function CategoriesPage() {
  const [categories, setCategories] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { data } = await supabase
      .from('tools')
      .select('categories, name, slug')
      .eq('status', 'approved')
    
    const catMap = {}
    data?.forEach(tool => {
      tool.categories?.forEach(cat => {
        if (!catMap[cat]) catMap[cat] = []
        catMap[cat].push(tool)
      })
    })
    
    setCategories(catMap)
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0e27',
      color: '#fff',
      paddingBottom: '80px'
    }}>
      <header style={{
        background: 'rgba(10, 14, 39, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          margin: 0,
          background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          分类浏览
        </h1>
      </header>

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>加载中...</p>
        ) : (
          Object.entries(categories).map(([cat, tools]) => (
            <div key={cat} style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#818cf8',
                textTransform: 'capitalize'
              }}>
                {cat}
                <span style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  marginLeft: '10px'
                }}>
                  ({tools.length})
                </span>
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(99, 102, 241, 0.15)',
                      borderRadius: '12px',
                      padding: '20px',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s'
                    }}
                  >
                    <h3 style={{
                      margin: '0 0 8px 0',
                      fontSize: '1.1rem',
                      fontWeight: '600'
                    }}>
                      {tool.name}
                    </h3>
                    <p style={{
                      color: '#94a3b8',
                      fontSize: '0.875rem',
                      margin: 0
                    }}>
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  )
}
