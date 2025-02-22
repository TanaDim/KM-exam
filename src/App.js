import React, { useState } from 'react';

// Component สำหรับหน้า Login
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ในที่นี้ตรวจสอบง่าย ๆ ว่าฟิลด์ไม่ว่าง
    if (username && password) {
      onLogin();
    } else {
      alert('กรุณากรอก Username และ Password');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <h2>ล็อคอิน</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <button type="submit" style={{ marginTop: '15px' }}>Login</button>
    </form>
  );
}

// Component สำหรับหน้า Exercise (แบบฝึกหัด)
function ExercisePage() {
  // ตัวอย่างคลังข้อสอบปรนัย (ในที่นี้ให้ใส่จริงๆ ควรมีมากกว่า 50 ข้อ)
  const questionPool = [
    {
      id: 1,
      question: '2 + 2 เท่ากับเท่าไร?',
      options: ['3', '4', '5', '6'],
      answer: 1,
    },
    {
      id: 2,
      question: 'เมืองหลวงของประเทศไทยคือที่ไหน?',
      options: ['เชียงใหม่', 'ภูเก็ต', 'กรุงเทพมหานคร', 'พัทยา'],
      answer: 2,
    },
    {
      id: 3,
      question: 'สีของท้องฟ้าในวันที่ไม่มีเมฆคือสีอะไร?',
      options: ['แดง', 'เขียว', 'ฟ้า', 'ดำ'],
      answer: 2,
    },
    // ... เพิ่มข้อสอบให้ครบ 50+ ข้อจริง ๆ
  ];

  // ฟังก์ชันสุ่มเลือกข้อสอบปรนัยจำนวน 10 ข้อ
  const randomizeQuestions = (questions, num) => {
    const copy = [...questions];
    const selected = [];
    const max = Math.min(num, copy.length);
    for (let i = 0; i < max; i++) {
      const index = Math.floor(Math.random() * copy.length);
      selected.push(copy[index]);
      copy.splice(index, 1);
    }
    return selected;
  };

  const selectedQuestions = randomizeQuestions(questionPool, 10);

  return (
    <div style={{ margin: '20px' }}>
      <h2>แบบฝึกหัด</h2>
      <div>
        <h3>ข้อสอบปรนัย (Multiple Choice)</h3>
        {selectedQuestions.map((q, idx) => (
          <div key={q.id} style={{ marginBottom: '15px' }}>
            <p>{idx + 1}. {q.question}</p>
            {q.options.map((option, i) => (
              <label key={i} style={{ display: 'block' }}>
                <input type="radio" name={`question-${q.id}`} value={i} />
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '30px' }}>
        <h3>ข้อสอบอัตนัย (Essay)</h3>
        <p>กรุณาอธิบายแนวคิดหรือเหตุผลที่เกี่ยวข้องกับหัวข้อที่กำหนด (ข้อสอบอัตนัยนี้คงที่)</p>
        <textarea rows="4" cols="50" placeholder="พิมพ์คำตอบของคุณที่นี่"></textarea>
      </div>
      <button style={{ marginTop: '20px' }}>ส่งคำตอบ</button>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? (
        <ExercisePage />
      ) : (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
