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
    const { data } = await supabase
      .from('tools')
      .select('*')
      .eq('status', 'approved')
      .limit(50)
    
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
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* 动态背景 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 70%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* 网格背景 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* 导航栏 */}
        <nav style={{
          background: 'rgba(10, 14, 39, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
          padding: '20px 0',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
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
                  Discover AI Tools
                </p>
              </div>
            </div>
            
            <a
              href="/admin"
              style={{
                padding: '10px 20px',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '10px',
                color: '#818cf8',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(99, 102, 241, 0.2)'
                e.target.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(99, 102, 241, 0.1)'
                e.target.style.boxShadow = 'none'
              }}
            >
              🔧 管理后台
            </a>
          </div>
        </nav>

        {/* Hero 区域 */}
        <section style={{
          padding: '80px 40px 60px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, transparent 100%)'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '20px',
              fontSize: '0.875rem',
              color: '#818cf8',
              marginBottom: '24px',
              fontWeight: '500'
            }}>
              ✨ 发现最强大的AI工具
            </div>
            
            <h2 style={{
              fontSize: '3rem',
              fontWeight: '800',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #fff 0%, #c7d2fe 50%, #a5b4fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2
            }}>
              探索AI工具的无限可能
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#94a3b8',
              marginBottom: '40px',
              lineHeight: 1.7
            }}>
              精选全球顶级AI工具，助你提升工作效率，激发创新潜能
            </p>

            {/* 搜索框 */}
            <div style={{
              maxWidth: '600px',
              margin: '0 auto 30px',
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="搜索AI工具、分类、描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '16px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                  e.target.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)'
                  e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              />
              <div style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b',
                fontSize: '0.875rem',
                pointerEvents: 'none'
              }}>
                ⌘K
              </div>
            </div>

            {/* 分类标签 */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {categories.map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '10px 20px',
                    background: selectedCategory === cat
                      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                      : 'rgba(15, 23, 42, 0.6)',
                    border: selectedCategory === cat
                      ? '1px solid rgba(99, 102, 241, 0.5)'
                      : '1px solid rgba(99, 102, 241, 0.1)',
                    borderRadius: '12px',
                    color: selectedCategory === cat ? '#fff' : '#94a3b8',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.3s',
                    fontWeight: selectedCategory === cat ? '600' : '400',
                    fontSize: '0.875rem',
                    backdropFilter: 'blur(10px)',
                    animationDelay: `${index * 50}ms`
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) {
                      e.target.style.background = 'rgba(99, 102, 241, 0.15)'
                      e.target.style.borderColor = 'rgba(99, 102, 241, 0.3)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) {
                      e.target.style.background = 'rgba(15, 23, 42, 0.6)'
                      e.target.style.borderColor = 'rgba(99, 102, 241, 0.1)'
                    }
                  }}
                >
                  {cat === 'all' ? ' 全部' : cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 工具网格 */}
        <section style={{
          padding: '40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {loading ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    borderRadius: '16px',
                    padding: '24px',
                    height: '200px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                />
              ))}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              {filteredTools.map((tool, index) => (
                <div
                  key={tool.id}
                  onClick={() => window.open(tool.website_url, '_blank')}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    borderRadius: '16px',
                    padding: '28px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: `fadeInUp 0.5s ease-out ${index * 50}ms both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 60px rgba(99, 102, 241, 0.2)'
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.1)'
                  }}
                >
                  {/* 悬停光效 */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s'
                  }} />

                  <div style={{ marginBottom: '16px' }}>
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
                      lineHeight: 1.6,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {tool.description}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '16px'
                  }}>
                    {tool.categories?.slice(0, 3).map((cat, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(99, 102, 241, 0.1)',
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          color: '#818cf8',
                          fontWeight: '500',
                          textTransform: 'capitalize'
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      padding: '6px 12px',
                      background: tool.pricing_model === 'free'
                        ? 'rgba(16, 185, 129, 0.1)'
                        : tool.pricing_model === 'freemium'
                        ? 'rgba(245, 158, 11, 0.1)'
                        : 'rgba(236, 72, 153, 0.1)',
                      border: `1px solid ${
                        tool.pricing_model === 'free'
                          ? 'rgba(16, 185, 129, 0.3)'
                          : tool.pricing_model === 'freemium'
                          ? 'rgba(245, 158, 11, 0.3)'
                          : 'rgba(236, 72, 153, 0.3)'
                      }`,
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      color: tool.pricing_model === 'free'
                        ? '#34d399'
                        : tool.pricing_model === 'freemium'
                        ? '#fbbf24'
                        : '#f472b6',
                      fontWeight: '600'
                    }}>
                      {tool.pricing_model === 'free' ? '🆓 Free' :
                       tool.pricing_model === 'freemium' ? '💎 Freemium' : '💰 Paid'}
                    </span>

                    <span style={{
                      color: '#64748b',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      访问 →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredTools.length === 0 && !loading && (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: '#64748b'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍</div>
              <p style={{ fontSize: '1.125rem' }}>未找到相关工具</p>
              <p style={{ fontSize: '0.875rem', marginTop: '8px' }}>试试其他关键词或分类</p>
            </div>
          )}
        </section>

        {/* 页脚 */}
        <footer style={{
          borderTop: '1px solid rgba(99, 102, 241, 0.1)',
          padding: '40px',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.875rem',
          marginTop: '60px'
        }}>
          <p>© 2024 AI工具导航站 · Powered by AI</p>
        </footer>
      </div>

      {/* CSS 动画 */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}
