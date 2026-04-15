'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AdminPage() {
  const router = useRouter()
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTool, setEditingTool] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    website_url: '',
    categories: [],
    pricing_model: 'free',
    status: 'approved'
  })

  useEffect(() => {
    loadTools()
  }, [])

  async function loadTools() {
    const { data } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setTools(data)
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (editingTool) {
      await supabase
        .from('tools')
        .update(formData)
        .eq('id', editingTool.id)
    } else {
      await supabase
        .from('tools')
        .insert([{ ...formData, id: crypto.randomUUID() }])
    }
    
    setShowForm(false)
    setEditingTool(null)
    setFormData({
      name: '',
      slug: '',
      description: '',
      website_url: '',
      categories: [],
      pricing_model: 'free',
      status: 'approved'
    })
    loadTools()
  }

  async function deleteTool(id) {
    if (confirm('确定要删除这个工具吗？')) {
      await supabase.from('tools').delete().eq('id', id)
      loadTools()
    }
  }

  function editTool(tool) {
    setEditingTool(tool)
    setFormData(tool)
    setShowForm(true)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', color: '#1a1a1a' }}>🔧 后台管理</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => router.push('/')}
              style={{
                padding: '10px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              返回首页
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                padding: '10px 20px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {showForm ? '取消' : '+ 添加工具'}
            </button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{
            background: '#f9fafb',
            padding: '30px',
            borderRadius: '12px',
            marginBottom: '30px'
          }}>
            <h2 style={{ marginBottom: '20px' }}>{editingTool ? '编辑工具' : '添加新工具'}</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>名称</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Slug（URL标识）</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>描述</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>官网链接</label>
              <input
                type="url"
                value={formData.website_url}
                onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>分类（用逗号分隔）</label>
              <input
                type="text"
                value={formData.categories?.join(', ') || ''}
                onChange={(e) => setFormData({...formData, categories: e.target.value.split(',').map(s => s.trim())})}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>价格模式</label>
              <select
                value={formData.pricing_model}
                onChange={(e) => setFormData({...formData, pricing_model: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              >
                <option value="free">免费</option>
                <option value="freemium">免费+付费</option>
                <option value="paid">付费</option>
                <option value="contact">联系询价</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                padding: '12px 24px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              {editingTool ? '更新' : '创建'}
            </button>
          </form>
        )}

        {loading ? (
          <p>加载中...</p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {tools.map((tool) => (
              <div
                key={tool.id}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{tool.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>{tool.description}</p>
                  <p style={{ fontSize: '0.8rem', color: '#999' }}>{tool.website_url}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => editTool(tool)}
                    style={{
                      padding: '8px 16px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => deleteTool(tool.id)}
                    style={{
                      padding: '8px 16px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
