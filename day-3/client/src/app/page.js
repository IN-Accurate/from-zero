'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [errorGetSub, setErrorGetSub] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribedEmails, setSubscribedEmails] = useState([]);
  const [subscribedEmailsCount, setSubscribedEmailsCount] = useState(0);
  useEffect(() => {
    fetch('http://localhost:5000/api/subscribers')
      .then((res) => res.json())
      .then((data) => {
        setSubscribedEmails(data.data);
        setSubscribedEmailsCount(data.count);
      })
      .catch(() => setErrorGetSub('Failed to load subscribers'));
  }, []);

  const APIrequestToServer = async () => {
    setError('');
    setErrorGetSub('');
    setResponse('');

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/input', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: input }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setError(data.message);
        return;
      }

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      setResponse(data.data.email);
      setInput('');
    } catch (err) {
      setError('Failed to submit email');
      return;
    } finally {
      setLoading(false);
    }
    try {
      const getRes = await fetch('http://localhost:5000/api/subscribers');
      const subsData = await getRes.json();

      if (!getRes.ok) {
        setErrorGetSub('Failed to load subscribers');
        return;
      }

      setSubscribedEmails(subsData.data);
      setSubscribedEmailsCount(subsData.count);
    } catch {
      setErrorGetSub('Failed to load subscribers');
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">FROM ZERO - Day 3</h1>
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
      {errorGetSub && <p className="text-red-600 mt-2">{errorGetSub}</p>}
      {subscribedEmailsCount > 0 ? (
        <div className="mt-2">
          <h2>Current Subscribers</h2>
          <ul className="list-none p-0 m-0">
            {subscribedEmails.map((subscriber) => (
              <li key={subscriber}>{subscriber}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-2">
          <h2>Currently 0 subs</h2>
        </div>
      )}
    </main>
  );
}
