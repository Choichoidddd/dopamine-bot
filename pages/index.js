import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setScript(data.script || '에러 발생');
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>도파민 숏폼 스크립트 봇</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="주제를 입력하세요"
        style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}
      />
      <button onClick={generateScript} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? '생성 중...' : '스크립트 생성'}
      </button>
      <pre style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>{script}</pre>
    </main>
  );
}
