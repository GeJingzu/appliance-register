'use client';
import { useState } from 'react';

export default function UpdateWarranty() {
  const [serial, setSerial] = useState('');
  const [date, setDate] = useState('');
  const [msg, setMsg] = useState('');

  const updateDB = async (e) => {
    e.preventDefault();
    setMsg('Updating...');

    const res = await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial, date }),
    });

    const result = await res.json();

    if (res.ok) {
      setMsg('Update success!');
    } else {
      setMsg(result.error);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Update Warranty Date</h2>
      <form onSubmit={updateDB}>
        <p>
          Serial Number: <input type="text" required onChange={(e) => setSerial(e.target.value)} />
        </p>
        <p>
          New Date: <input type="date" required onChange={(e) => setDate(e.target.value)} />
        </p>
        <button type="submit">Update</button>
      </form>
      
      <p>{msg}</p>
      <a href="/part-b-c">Go Back</a>
    </div>
  );
}