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
  // Handle Form Submission - Multi-Channel Delivery (WhatsApp, Web3Forms Email & Telegram Bot)
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

    // 3. Telegram Bot Credentials
    const botToken = "8751727921:AAFQtKdlOVHrjPiC51xTaHyuvZRgifm5A-w";
    const chatId = "313806060";

    // 4. Send Instant Notification to Your Telegram Account
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedMessage,
        parse_mode: 'Markdown'
      })
    })
    .then(res => res.json())
    .then(data => console.log('Telegram Bot Notification Sent:', data))
    .catch(err => console.error('Telegram Error:', err));

    // 5. Send Background Email via Web3Forms
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: '2da4071b-5680-41fd-9e1a-cd2b2619f0be', 
        to_email: 'rtesfaye482@gmail.com',
        subject: `New Booking Inquiry from ${name}`,
        from_name: 'Winta Hotel Booking Bot',
        name: name,
        phone: phone,
        room: room,
        check_in_date: date,
        message: formattedMessage
      })
    })
    .then(res => res.json())
    .then(data => console.log('Web3Forms Email Sent:', data))
    .catch(err => console.error('Web3Forms Error:', err));

    // 7. Clear Form & Close Modal
    bookingForm.reset();
    closeModal();
  });
}
});
