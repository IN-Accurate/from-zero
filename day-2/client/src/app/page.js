'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const APIrequestToServer = async () => {
    setError('');
    setResponse('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      setError('Please enter a valid email address');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: input }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Uh oh...Something went wrong!');
        return;
      }
      setResponse(data.data.email);
      setInput('');
    } catch (error) {
      setError('Server Not Reachable!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">FROM ZERO - Day 2</h1>
      <input
        type="email"
        placeholder="Enter the email for subscribing"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={APIrequestToServer}
        disabled={loading}
        className="bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {response && (
        <p className="text-green-600 mt-2">
          Subscribed: <strong>{response}</strong>
        </p>
      )}
    </main>
  );
}
