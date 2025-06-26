import React from 'react';
import './PaymentDrawer.css';

const PaymentDrawer = ({ open, onClose, hotel }) => {
  if (!open) return null;

  // Loading state: hotel is undefined (fetch in progress)
  if (hotel === undefined) {
    return (
      <div className="drawer-backdrop" onClick={onClose}>
        <div className="drawer" onClick={e => e.stopPropagation()}>
          <button className="drawer-close" onClick={onClose}>&times;</button>
          <div className="drawer-content">
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <div className="spinner" style={{margin: '0 auto', width: 40, height: 40, border: '4px solid #2563eb', borderTop: '4px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
              <p>Loading hotel details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state: hotel is null or missing fields
  if (!hotel || !hotel.name || !hotel.location || !hotel.pricePerDay) {
    return (
      <div className="drawer-backdrop" onClick={onClose}>
        <div className="drawer" onClick={e => e.stopPropagation()}>
          <button className="drawer-close" onClick={onClose}>&times;</button>
          <div className="drawer-content">
            <p style={{color: 'red'}}>Hotel details are missing or could not be loaded.</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate GST and total
  const price = hotel.pricePerDay;
  const gst = +(price * 0.18).toFixed(2);
  const total = +(price + gst).toFixed(2);

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <button className="drawer-close" onClick={onClose}>&times;</button>
        <h2 className="drawer-title">Payment for {hotel.name}</h2>
        <div className="drawer-content">
          <p><strong>Hotel Name:</strong> {hotel.name}</p>
          <p><strong>Location:</strong> {hotel.location}</p>
          <p><strong>Price per night:</strong> ₹{price}</p>
          <p><strong>GST (18%):</strong> ₹{gst}</p>
          <p><strong>Total Price:</strong> ₹{total}</p>
          {/* Payment form or integration goes here */}
          <button className="pay-btn">Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDrawer; 