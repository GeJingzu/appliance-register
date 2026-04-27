'use client';

import { useState } from 'react';

export default function PartA() {
  // form data variables
  const [movie, setMovie] = useState('');
  const [time, setTime] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  function handleBooking(e) {
    e.preventDefault(); 

    // make sure everything is filled
    if (!movie || !time || !mobile) {
      alert("Error: Please fill in all fields!");
      return;
    }

    // show user their booking info
    const confirmText = `Success! Booked ${movie} at ${time}. Confirmation sent to: ${mobile}`;
    setMessage(confirmText);
  }

  return (
    <div style={{ margin: '30px' }}>
      <h2>Cinema Ticket Booking</h2>
      
      <form onSubmit={handleBooking}>
        <p>
          <label>Choose Movie: </label>
          <select value={movie} onChange={(e) => setMovie(e.target.value)}>
            <option value="">--Select--</option>
            <option value="Star Wars">Star Wars</option>
            <option value="The Avengers">The Avengers</option>
            <option value="Spider-Man">Spider-Man</option>
          </select>
        </p>

        <p>
          <label>Time Slot: </label>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">--Select--</option>
            <option value="12:00">12:00</option>
            <option value="15:00">15:00</option>
            <option value="18:00">18:00</option>
          </select>
        </p>

        <p>
          <label>Phone: </label>
          <input 
            type="text" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
          />
        </p>

        <button type="submit" id="btn-book">Confirm Booking</button>
      </form>

      {/* output area */}
      {message && (
        <p style={{ color: 'darkgreen', marginTop: '15px' }}>
          {message}
        </p>
      )}
    </div>
  );
}