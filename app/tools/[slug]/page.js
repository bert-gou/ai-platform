'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import BottomNav from '../../../components/BottomNav'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function ToolPage({ params }) {
  const [tool, setTool] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadTool() }, [])

  async function loadTool() {
    const { data } = await supabase.from('tools').select('*').eq('slug', params.slug).eq('status', 'approved').single()
    if (data) setTool(data)
    setLoading(false)
  }

  if (loading) return <div style={{ minHeight: '100vh', background: '#0a0e27', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>加载中...</div>
  if (!tool) notFound()

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e27', color: '#fff', paddingBottom: '80px' }}>
      <header style={{ background: 'rgba(10, 14, 39, 0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(99, 102, 241, 0.2)', padding: '20px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ fontSize: '1.5rem', color: '#818cf8', textDecoration: 'none' }}>← 返回</a>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>{tool.name}</h1>
        </div>
      </header>
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', padding: '40px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{tool.name}</h1>
            <div style={{ padding: '8px 16px', background: tool.pricing_model === 'free' ? 'rgba(16, 185, 129, 0.2)' : tool.pricing_model === 'freemium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(236, 72, 153, 0.2)', border: `1px solid ${tool.pricing_model === 'free' ? 'rgba(16, 185, 129, 0.4)' : tool.pricing_model === 'freemium' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(236, 72, 153, 0.4)'}`, borderRadius: '10px', fontSize: '0.9rem', color: tool.pricing_model === 'free' ? '#34d399' : tool.pricing_model === 'freemium' ? '#fbbf24' : '#f472b6', fontWeight: '600' }}>
              {tool.pricing_model === 'free' ? '🆓 免费' : tool.pricing_model === 'freemium' ? '💎 免费+付费' : '💰 付费'}
            </div>
          </div>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8, marginBottom: '30px' }}>{tool.description}</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {tool.categories?.map((cat, i) => (
              <span key={i} style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', fontSize: '0.875rem', color: '#818cf8', fontWeight: '500' }}>{cat}</span>
            ))}
          </div>
          <a href={tool.website_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '16px 32px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)', transition: 'all 0.3s' }}>访问官网 →</a>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
