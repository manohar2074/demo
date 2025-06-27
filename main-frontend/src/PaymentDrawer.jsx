import React, { useState, useEffect } from 'react';
import './PaymentDrawer.css';

const PaymentDrawer = ({ open, onClose, hotel }) => {
  const [displayHotel, setDisplayHotel] = useState(null);

  // Debug logs
  console.log('PaymentDrawer open:', open);
  console.log('Hotel data received:', hotel);

  // When drawer opens or hotel changes, set hotel details
  useEffect(() => {
    if (open && hotel) {
      setDisplayHotel(hotel);
    }
  }, [open, hotel]);

  if (!open) return null;

  function handleProceedToPay() {
    if (!displayHotel) {
      console.error('No hotel data available');
      return;
    }
    
    // Here you can implement the actual payment logic
    // For now, we'll just show a success message
    alert(`Payment initiated for ${displayHotel.name}! This is where you would integrate with a payment gateway.`);
  }

  // Calculate GST and total
  const price = displayHotel && displayHotel.pricePerDay;
  const gst = price ? +(price * 0.18).toFixed(2) : 0;
  const total = price ? +(price + gst).toFixed(2) : 0;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <button className="drawer-close" onClick={onClose}>&times;</button>
        <h2 className="drawer-title">Booking Hotel Details</h2>
        <div className="drawer-content">
          {displayHotel && displayHotel.name && displayHotel.location && displayHotel.pricePerDay ? (
            <div style={{marginBottom: '2rem'}}>
              <p><strong>Hotel Name:</strong> {displayHotel.name}</p>
              <p><strong>Location:</strong> {displayHotel.location}</p>
              <p><strong>Rating:</strong> {displayHotel.rating} ⭐</p>
              <p><strong>Price per night:</strong> ₹{price}</p>
              <p><strong>GST (18%):</strong> ₹{gst}</p>
              <p><strong>Total Price:</strong> ₹{total}</p>
            </div>
          ) : (
            <p style={{color: 'red'}}>Hotel details are missing or could not be loaded.</p>
          )}
          <button className="pay-btn" onClick={handleProceedToPay} disabled={!displayHotel}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDrawer; 