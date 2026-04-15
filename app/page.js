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
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    loadTools()
  }, [])

  async function loadTools() {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('status', 'approved')
      .limit(50)
    
    if (data) {
      setTools(data)
    }
    setLoading(false)
  }

  // 获取所有分类
  const categories = ['all', ...new Set(tools.flatMap(t => t.categories || []))]

  // 过滤工具
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tool.categories?.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 背景动画效果 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* 头部 */}
        <header style={{
          padding: '60px 20px 40px',
          textAlign: 'center',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            🤖 AI工具导航站
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            发现、对比、使用优质AI工具
          </p>
          
          {/* 管理入口 */}
          <a
            href="/admin"
            style={{
              display: 'inline-block',
              marginTop: '20px',
              padding: '8px 16px',
              background: 'rgba(96, 165, 250, 0.1)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              borderRadius: '8px',
              color: '#60a5fa',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            🔧 后台管理
          </a>
        </header>

        {/* 搜索和筛选 */}
        <div style={{
          padding: '30px 20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <input
            type="text"
            placeholder="🔍 搜索AI工具..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 20px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '12px',
              color: '#f1f5f9',
              fontSize: '1rem',
              marginBottom: '20px',
              outline: 'none',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(96, 165, 250, 0.5)'
              e.target.style.boxShadow = '0 0 20px rgba(96, 165, 250, 0.2)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'
              e.target.style.boxShadow = 'none'
            }}
          />

          {/* 分类筛选 */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  background: selectedCategory === cat 
                    ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                    : 'rgba(30, 41, 59, 0.8)',
                  border: selectedCategory === cat ? '1px solid rgba(96, 165, 250, 0.5)' : '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '20px',
                  color: selectedCategory === cat ? '#fff' : '#94a3b8',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s'
                }}
              >
                {cat === 'all' ? '全部' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 工具列表 */}
        <div style={{
          padding: '20px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>加载中...</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => window.open(tool.website_url, '_blank')}
                  style={{
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                    borderRadius: '16px',
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 60px rgba(96, 165, 250, 0.2)'
                    e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)'
                  }}
                >
                  <h3 style={{
                    margin: '0 0 10px 0',
                    fontSize: '1.3rem',
                    color: '#f1f5f9',
                    fontWeight: '600'
                  }}>
                    {tool.name}
                  </h3>
                  <p style={{
                    color: '#94a3b8',
                    fontSize: '0.9rem',
                    marginBottom: '16px',
                    lineHeight: '1.6'
                  }}>
                    {tool.description}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {tool.categories?.map((cat, i) => (
                      <span
                        key={i}
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          color: '#60a5fa',
                          textTransform: 'capitalize'
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    background: tool.pricing_model === 'free' 
                      ? 'rgba(16, 185, 129, 0.2)'
                      : tool.pricing_model === 'freemium'
                      ? 'rgba(245, 158, 11, 0.2)'
                      : 'rgba(236, 72, 153, 0.2)',
                    border: `1px solid ${
                      tool.pricing_model === 'free'
                        ? 'rgba(16, 185, 129, 0.4)'
                        : tool.pricing_model === 'freemium'
                        ? 'rgba(245, 158, 11, 0.4)'
                        : 'rgba(236, 72, 153, 0.4)'
                    }`,
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    color: tool.pricing_model === 'free'
                      ? '#34d399'
                      : tool.pricing_model === 'freemium'
                      ? '#fbbf24'
                      : '#f472b6',
                    fontWeight: '500'
                  }}>
                    {tool.pricing_model === 'free' ? '🆓 免费' :
                     tool.pricing_model === 'freemium' ? '💎 免费+付费' : '💰 付费'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredTools.length === 0 && !loading && (
            <p style={{ textAlign: 'center', color: '#94a3b8', padding: '60px', fontSize: '1.1rem' }}>
              没有找到相关工具
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
