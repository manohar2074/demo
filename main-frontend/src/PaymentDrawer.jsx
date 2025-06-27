import React, { useState, useEffect } from 'react';
import './PaymentDrawer.css';

const PaymentDrawer = ({ open, onClose, hotel }) => {
  const [fetching, setFetching] = useState(false);
  const [fetchedHotel, setFetchedHotel] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  // Debug logs
  console.log('PaymentDrawer open:', open);
  console.log('Initial hotel:', hotel);
  console.log('Fetched hotel:', fetchedHotel);
  console.log('Fetching:', fetching, 'FetchError:', fetchError);

  // Helper to check if hotel object is complete
  function isCompleteHotel(h) {
    return h && h.name && h.location && h.pricePerDay;
  }

  // When drawer opens or hotel changes, set or fetch hotel details
  useEffect(() => {
    if (open) {
      setFetchedHotel(null);
      setFetchError(null);
      setFetching(false);
      if (isCompleteHotel(hotel)) {
        setFetchedHotel(hotel);
      } else if (hotel && hotel.id) {
        setFetching(true);
        fetch(`http://localhost:8080/api/hotels/${hotel.id}`)
          .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          })
          .then(data => {
            if (!isCompleteHotel(data)) {
              setFetchError('Hotel data is incomplete or not found.');
            } else {
              setFetchedHotel(data);
            }
            setFetching(false);
          })
          .catch(err => {
            setFetchError(err.message);
            setFetching(false);
          });
      }
    }
  }, [open, hotel]);

  if (!open) return null;

  const displayHotel = fetchedHotel;

  function handleProceedToPay() {
    if (!hotel || !hotel.id) {
      setFetchError('Hotel ID is missing.');
      return;
    }
    // Only fetch if not already fetched
    if (!isCompleteHotel(displayHotel)) {
      setFetching(true);
      setFetchError(null);
      fetch(`http://localhost:8080/api/hotels/${hotel.id}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          if (!isCompleteHotel(data)) {
            setFetchError('Hotel data is incomplete or not found.');
          } else {
            setFetchedHotel(data);
          }
          setFetching(false);
        })
        .catch(err => {
          setFetchError(err.message);
          setFetching(false);
        });
    }
    // else: already fetched, do nothing
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
          {fetching && (
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <div className="spinner" style={{margin: '0 auto', width: 40, height: 40, border: '4px solid #2563eb', borderTop: '4px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
              <p>Fetching latest hotel details...</p>
            </div>
          )}
          {fetchError && (
            <p style={{color: 'red', marginBottom: '1rem'}}>Error fetching hotel details: {fetchError}</p>
          )}
          {displayHotel && displayHotel.name && displayHotel.location && displayHotel.pricePerDay ? (
            <div style={{marginBottom: '2rem'}}>
              <p><strong>Hotel Name:</strong> {displayHotel.name}</p>
              <p><strong>Location:</strong> {displayHotel.location}</p>
              <p><strong>Price per night:</strong> ₹{price}</p>
              <p><strong>GST (18%):</strong> ₹{gst}</p>
              <p><strong>Total Price:</strong> ₹{total}</p>
            </div>
          ) : (
            <p style={{color: 'red'}}>Hotel details are missing or could not be loaded.</p>
          )}
          <button className="pay-btn" onClick={handleProceedToPay} disabled={fetching}>Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDrawer; 