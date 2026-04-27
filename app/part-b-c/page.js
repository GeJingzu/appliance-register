'use client';
import { useState } from 'react';

export default function RegisterPage() {
  // added user states
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  
  // existing appliance states
  const [eircode, setEircode] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serial, setSerial] = useState('');
  const [buyDate, setBuyDate] = useState('');
  const [warnDate, setWarnDate] = useState('');
  
  const [info, setInfo] = useState(''); 
  const [err, setErr] = useState('');  

  async function doSubmit(e) {
    e.preventDefault();
    setErr(''); 
    setInfo('Processing...');

    // send ALL data including user info
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, email, eircode, type, brand, model, serial, buyDate, warnDate }),
    });

    const data = await response.json();

    if (response.ok) {
      setInfo("Done! " + data.message);
    } else {
      setErr("Failed: " + data.error);
      setInfo('');
    }
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>Appliance Registration Form</h2>
      <form onSubmit={doSubmit}>
        {/* User Info */}
        <div>First Name: <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} /></div><br/>
        <div>Email: <input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div><br/>
        
        {/* Appliance Info */}
        <div>Eircode: <input type="text" value={eircode} onChange={e => setEircode(e.target.value)} /></div><br/>
        <div>Type: <input type="text" value={type} onChange={e => setType(e.target.value)} /></div><br/>
        <div>Brand: <input type="text" value={brand} onChange={e => setBrand(e.target.value)} /></div><br/>
        <div>Model: <input type="text" value={model} onChange={e => setModel(e.target.value)} /></div><br/>
        <div>Serial: <input type="text" required value={serial} onChange={e => setSerial(e.target.value)} /></div><br/>
        <div>Purchase Date: <input type="date" value={buyDate} onChange={e => setBuyDate(e.target.value)} /></div><br/>
        <div>Warranty Date: <input type="date" value={warnDate} onChange={e => setWarnDate(e.target.value)} /></div><br/>

        <button type="submit">Submit Data</button>
      </form>

      {info && <p style={{ color: 'blue' }}>{info}</p>}
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </div>
  );
}