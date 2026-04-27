'use client';
import { useState } from 'react';

export default function DeleteAppliance() {
  const [serial, setSerial] = useState('');
  const [msg, setMsg] = useState('');

  const deleteRecord = async (e) => {
    e.preventDefault();
    setMsg('Deleting...');

    const res = await fetch('/api/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial }),
    });

    const result = await res.json();

    if (res.ok) {
      setMsg('Deleted successfully!');
    } else {
      setMsg(result.error);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Delete Appliance</h2>
      <form onSubmit={deleteRecord}>
        <p>
          Serial Number: <input type="text" required onChange={(e) => setSerial(e.target.value)} />
        </p>
        <button type="submit" style={{ color: 'red' }}>Delete</button>
      </form>
      
      <p>{msg}</p>
      <a href="/part-b-c">Go Back</a>
    </div>
  );
}