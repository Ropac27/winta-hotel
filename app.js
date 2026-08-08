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

  // Handle Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fullName').value;
      const room = roomSelect.value;

      alert(`Thank you ${name}! Your booking request for ${room} has been received. Winta Hotel will contact you shortly.`);
      bookingForm.reset();
      closeModal();
    });
  }
});