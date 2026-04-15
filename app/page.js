'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'

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
    const { data } = await supabase
      .from('tools')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
    
    if (data) setTools(data)
    setLoading(false)
  }

  const categories = ['all', ...new Set(tools.flatMap(t => t.categories || []))]

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tool.categories?.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0e27',
      color: '#fff',
      paddingBottom: '80px'
    }}>
      {/* 顶部导航 */}
      <header style={{
        background: 'rgba(10, 14, 39, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '20px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '45px',
              height: '45px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)'
            }}>
              🤖
            </div>
            <div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                AI工具导航
              </h1>
              <p style={{
                fontSize: '0.75rem',
                color: '#94a3b8',
                margin: '2px 0 0 0'
              }}>
                AI Tools Directory
              </p>
            </div>
          </div>
          
          <Link
            href="/admin"
            style={{
              padding: '10px 20px',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '10px',
              color: '#818cf8',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            🔧 管理
          </Link>
        </div>
      </header>

      {/* Hero 区域 */}
      <section style={{
        padding: '60px 20px 40px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%)'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #fff 0%, #c7d2fe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          发现强大的AI工具
        </h2>
        <p style={{
          color: '#94a3b8',
          fontSize: '1.1rem',
          marginBottom: '30px'
        }}>
          精选全球顶级AI工具，提升你的工作效率
        </p>

        {/* 搜索框 */}
        <div style={{
          maxWidth: '600px',
          margin: '0 auto 30px',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="搜索AI工具..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '14px',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(99, 102, 241, 0.6)'
              e.target.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.2)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(99, 102, 241, 0.3)'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        {/* 分类标签 */}
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                background: selectedCategory === cat
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'rgba(15, 23, 42, 0.8)',
                border: selectedCategory === cat
                  ? '1px solid rgba(99, 102, 241, 0.5)'
                  : '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '10px',
                color: selectedCategory === cat ? '#fff' : '#94a3b8',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.3s',
                fontWeight: selectedCategory === cat ? '600' : '400',
                fontSize: '0.875rem'
              }}
            >
              {cat === 'all' ? '全部' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* 工具网格 */}
      <section style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>加载中...</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  borderRadius: '16px',
                  padding: '24px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.15)'
                }}
              >
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#f1f5f9'
                }}>
                  {tool.name}
                </h3>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  marginBottom: '16px',
                  lineHeight: 1.6
                }}>
                  {tool.description}
                </p>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {tool.categories?.slice(0, 3).map((cat, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 10px',
                        background: 'rgba(99, 102, 241, 0.15)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        color: '#818cf8'
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
                    ? 'rgba(16, 185, 129, 0.15)'
                    : tool.pricing_model === 'freemium'
                    ? 'rgba(245, 158, 11, 0.15)'
                    : 'rgba(236, 72, 153, 0.15)',
                  border: `1px solid ${
                    tool.pricing_model === 'free'
                      ? 'rgba(16, 185, 129, 0.3)'
                      : tool.pricing_model === 'freemium'
                      ? 'rgba(245, 158, 11, 0.3)'
                      : 'rgba(236, 72, 153, 0.3)'
                  }`,
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: tool.pricing_model === 'free'
                    ? '#34d399'
                    : tool.pricing_model === 'freemium'
                    ? '#fbbf24'
                    : '#f472b6',
                  fontWeight: '600'
                }}>
                  {tool.pricing_model === 'free' ? '🆓 免费' :
                   tool.pricing_model === 'freemium' ? '💎 免费+付费' : '💰 付费'}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 底部导航 */}
      <BottomNav />
    </div>
  )
}
