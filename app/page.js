'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTools()
  }, [])

  async function loadTools() {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('status', 'approved')
      .limit(20)
    
    if (data) {
      setTools(data)
    }
    setLoading(false)
  }

  return (
    <main style={{ 
      padding: '40px 20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* 头部 */}
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#1a1a1a' }}>
          🤖 AI工具导航站
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          发现、对比、使用优质AI工具
        </p>
      </header>

      {/* 工具列表 */}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>加载中...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {tools.map((tool) => (
            <div 
              key={tool.id}
              style={{
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '20px',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => window.open(tool.website_url, '_blank')}
            >
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem' }}>
                {tool.name}
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '12px' }}>
                {tool.description}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {tool.categories?.map((cat, i) => (
                  <span 
                    key={i}
                    style={{
                      background: '#f0f0f0',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      color: '#666'
                    }}
                  >
                    {cat}
                  </span>
                ))}
                <span style={{
                  background: tool.pricing_model === 'free' ? '#dcfce7' : 
                             tool.pricing_model === 'freemium' ? '#fef3c7' : '#fce7f3',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  color: '#666'
                }}>
                  {tool.pricing_model === 'free' ? '免费' : 
                   tool.pricing_model === 'freemium' ? '免费+付费' : '付费'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tools.length === 0 && !loading && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          暂无工具数据
        </p>
      )}
    </main>
  )
}
