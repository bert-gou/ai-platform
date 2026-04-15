'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import BottomNav from '@/components/BottomNav'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website_url: '',
    categories: '',
    pricing_model: 'free'
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    
    const categories = formData.categories.split(',').map(s => s.trim()).filter(Boolean)
    
    await supabase.from('tools').insert([{
      ...formData,
      categories,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      status: 'pending'
    }])
    
    setSubmitting(false)
    setSuccess(true)
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
          提交工具
        </h1>
      </header>

      <main style={{
        padding: '40px 20px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {success ? (
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
            <h2 style={{ marginBottom: '10px' }}>提交成功！</h2>
            <p style={{ color: '#94a3b8' }}>
              我们的团队会尽快审核您的提交
            </p>
            <button
              onClick={() => setSuccess(false)}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '10px',
                color: '#34d399',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              继续提交
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '20px',
            padding: '40px'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#f1f5f9'
              }}>
                工具名称 *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(10, 14, 39, 0.8)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#f1f5f9'
              }}>
                描述 *
              </label>
              <textarea
                required
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(10, 14, 39, 0.8)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#f1f5f9'
              }}>
                官网链接 *
              </label>
              <input
                type="url"
                required
                value={formData.website_url}
                onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(10, 14, 39, 0.8)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#f1f5f9'
              }}>
                分类（用逗号分隔）
              </label>
              <input
                type="text"
                placeholder="例如：写作, 生产力, AI"
                value={formData.categories}
                onChange={(e) => setFormData({...formData, categories: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(10, 14, 39, 0.8)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#f1f5f9'
              }}>
                价格模式
              </label>
              <select
                value={formData.pricing_model}
                onChange={(e) => setFormData({...formData, pricing_model: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(10, 14, 39, 0.8)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              >
                <option value="free">免费</option>
                <option value="freemium">免费+付费</option>
                <option value="paid">付费</option>
                <option value="contact">联系询价</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
              }}
            >
              {submitting ? '提交中...' : '提交工具'}
            </button>
          </form>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
