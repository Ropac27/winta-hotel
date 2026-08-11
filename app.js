document.addEventListener('DOMContentLoaded', () => {
  // 1. Translation Dictionary (Include Success Message Keys)
  const translations = {
    en: {
      navHome: "Home",
      navAmenities: "Amenities",
      navRooms: "Rooms",
      navContact: "Contact",
      bookNow: "Book Now",
      successTitle: "Booking Request Sent!",
      successDesc: "Thank you for choosing Winta Hotel. We have received your booking request and will contact you shortly.",
      successBtn: "OK"
    },
    am: {
      navHome: "መነሻ",
      navAmenities: "አገልግሎቶች",
      navRooms: "ክፍሎች",
      navContact: "አድራሻ",
      bookNow: "ይመዝገቡ",
      successTitle: "የክፍል ማስያዣ ጥያቄዎ ተላክዋል!",
      successDesc: "ዊንታ ሆቴልን ስለመረጡ እናመሰግናለን! የክፍል ማስያዣ ጥያቄዎ ደርሶናል፣ በቅርብ ጊዜ እናነጋግርዎታለን።",
      successBtn: "እሺ"
    }
  };

  let currentLang = localStorage.getItem('winta_lang') || 'en';

  const applyLanguage = (lang) => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
  };

  applyLanguage(currentLang);

  // Success Modal Elements
  const successModal = document.getElementById('successModal');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  const showSuccessAlert = () => {
    if (successModal) {
      successModal.style.display = 'flex';
    }
  };

  const closeSuccessAlert = () => {
    if (successModal) {
      successModal.style.display = 'none';
    }
  };

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeSuccessAlert);
  }

  // Handle Form Submission
  const bookingForm = document.getElementById('bookingForm');
  const roomSelect = document.getElementById('roomSelect');
  const modal = document.getElementById('bookingModal');

  const closeModal = () => {
    if (modal) modal.style.display = 'none';
  };

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const room = roomSelect.value;
      const date = document.getElementById('checkIn').value;

      const formattedMessage = 
`🏨 *New Room Booking Request - Winta Hotel*

👤 *Guest Name:* ${name}
📞 *Phone Number:* ${phone}
🛏️ *Room Type:* ${room}
📅 *Check-in Date:* ${date}

*Sent from Winta Hotel Website*`;

      // 1. Send Telegram Notification
      const encodedToken = "ODc1MTcyNzkyMTpBQUdzajV2ZHhWVWRYUDU3Z1dSSFA3bVUyNnJETFdfWDFPVQ=="; // Insert Base64 token
      const botToken = atob(encodedToken);
      const chatId = "313806060";

      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: formattedMessage,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.error('Telegram error:', err));

      // 2. Send Background Email via Web3Forms
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
      }).catch(err => console.error('Web3Forms error:', err));

      // 3. Reset form, close booking modal, and display success alert
      bookingForm.reset();
      closeModal();
      showSuccessAlert();
    });
  }
});
