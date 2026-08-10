document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const roomSelect = document.getElementById('roomSelect');

  const navBookBtn = document.getElementById('navBookBtn');
  const heroBookBtn = document.getElementById('heroBookBtn');
  const roomBookBtns = document.querySelectorAll('.book-room-btn');

  // Open Modal
  const openModal = (roomType = '') => {
    if (roomType && roomSelect) {
      roomSelect.value = roomType;
    }
    modal.style.display = 'flex';
  };

  // Close Modal
  const closeModal = () => {
    modal.style.display = 'none';
  };

  // Button Listeners
  if (navBookBtn) navBookBtn.addEventListener('click', () => openModal());
  if (heroBookBtn) heroBookBtn.addEventListener('click', () => openModal());

  roomBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedRoom = e.target.getAttribute('data-room');
      openModal(selectedRoom);
    });
  });

  // Close Button Listener
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Close when clicking outside of modal box
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  // Handle Form Submission - Multi-Channel Delivery
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 1. Extract Form Data
      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const room = roomSelect.value;
      const date = document.getElementById('checkIn').value;

      // 2. Format Message Text
      const formattedMessage = 
`🏨 *New Room Booking Request - Winta Hotel*

👤 *Guest Name:* ${name}
📞 *Phone Number:* ${phone}
🛏️ *Room Type:* ${room}
📅 *Check-in Date:* ${date}

*Sent from Winta Hotel Website*`;

      // 3. Define Communication Targets
      const whatsappPhone = "251927921702"; // International format without +
      const hotelEmail = "rtesfaye482@gmail.com";

      // Channel URLs
      const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(formattedMessage)}`;
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(formattedMessage)}`;
      const mailtoUrl = `mailto:${hotelEmail}?subject=${encodeURIComponent(`New Booking: ${name} - ${room}`)}&body=${encodeURIComponent(formattedMessage)}`;

      // 4. Send Email in Background via Web3Forms (Free API endpoint)
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '2da4071b-5680-41fd-9e1a-cd2b2619f0be',
          to_email: hotelEmail,
          subject: `New Booking Inquiry from ${name}`,
          from_name: 'Winta Hotel Booking Bot',
          name: name,
          phone: phone,
          room: room,
          check_in_date: date,
          message: formattedMessage
        })
      }).catch(err => console.log('Background email sent fallback to mailto'));

      // 5. Instantly launch WhatsApp with the booking message pre-filled
      window.open(whatsappUrl, '_blank');

      // 6. Reset Form and Close Modal
      bookingForm.reset();
      closeModal();
    });
  }
});
