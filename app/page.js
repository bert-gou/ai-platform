export const metadata = {
  title: 'AI工具导航站',
  description: '发现、对比、使用优质AI工具'
}

export default function Home() {
  return (
    <main style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🤖 AI工具导航站</h1>
      <p style={{ color: '#666', fontSize: '1.1rem' }}>正在连接数据库... 部署成功后将显示工具列表</p>
    </main>
  )
}