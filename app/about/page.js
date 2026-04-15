import BottomNav from '../../components/BottomNav'

export default function AboutPage() {
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
          关于本站
        </h1>
      </header>

      <main style={{
        padding: '40px 20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AI工具导航站
          </h2>
          
          <p style={{
            color: '#94a3b8',
            lineHeight: 1.8,
            marginBottom: '20px'
          }}>
            本站致力于收集和整理全球最优秀的AI工具，帮助用户发现和使用这些工具，提升工作效率和生活质量。
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📦</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>100+</div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>AI工具</div>
            </div>
            
            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👥</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>1000+</div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>活跃用户</div>
            </div>
            
            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}></div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>50+</div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>分类标签</div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
