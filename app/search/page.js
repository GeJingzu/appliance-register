'use client';
import { useState } from 'react';

export default function SearchAppliance() {
  const [serial, setSerial] = useState('');
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState('');

  // handle form submit
  const searchDB = async (e) => {
    e.preventDefault();
    setMsg('');
    setData(null);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serial }),
      });

      const result = await res.json();

      if (res.ok) {
        setData(result.appliance);
      } else {
        setMsg(result.error);
      }
    } catch (err) {
      setMsg('Something went wrong.');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Search Inventory</h2>
      
      <form onSubmit={searchDB}>
        <label>Serial Number: </label>
        <input 
          type="text" 
          required 
          value={serial} 
          onChange={(e) => setSerial(e.target.value)} 
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Search</button>
      </form>

      {/* show error message */}
      {msg && <p style={{ color: 'red' }}>{msg}</p>}

      {/* show appliance data if found */}
      {data && (
        <div style={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
          <h3>Appliance Details</h3>
          <p>Owner: {data.FirstName} ({data.Email})</p>
          <hr/>
          <p>Brand: {data.Brand}</p>
          <p>Model: {data.ModelNumber}</p>
          <p>Serial: {data.SerialNumber}</p>
        </div>
      )}
      
      <br />
      <a href="/part-b-c">Go Back</a>
    </div>
  );
}