document.addEventListener('DOMContentLoaded', () => {
  // 1. Translation Dictionary
  const translations = {
    en: {
      navHome: "Home",
      navAmenities: "Amenities",
      navRooms: "Rooms",
      navContact: "Contact",
      bookNow: "Book Now",
      heroTitle: "Welcome to Winta Hotel",
      heroSubtitle: "Comfort, Hospitality, and Convenience in the Heart of Harar, Ethiopia",
      checkAvailability: "Check Availability",
      amenitiesTitle: "Hotel Amenities",
      parkingTitle: "Free Secure Parking",
      parkingDesc: "Gated inside parking steps from the main road for your complete peace of mind.",
      diningTitle: "On-site Restaurant & Bakery",
      diningDesc: "Enjoy fresh continental breakfast, local dishes, and fresh bakery items daily.",
      wifiTitle: "Free High-Speed Wi-Fi",
      wifiDesc: "Stay connected with complimentary high-speed internet throughout the property.",
      deskTitle: "24/7 Front Desk",
      deskDesc: "Welcoming owner Daniel and staff are on hand to ensure you feel right at home.",
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
      heroTitle: "እንኳን ወደ ዊንታ ሆቴል በደህና መጡ",
      heroSubtitle: "በሐረር ከተማ እምብርት ውስጥ ሙሉ ምቾት፣ እንግዳ ተቀባይነት እና ታማኝ አገልግሎት",
      checkAvailability: "ክፍሎችን ይመልከቱ",
      amenitiesTitle: "የሆቴሉ አገልግሎቶች",
      parkingTitle: "ነፃ አስተማማኝ ማቆሚያ",
      parkingDesc: "ከዋናው መንገድ አቅራቢያ የሚገኝ አስተማማኝ የውስጥ መኪና ማቆሚያ።",
      diningTitle: "ምግብ ቤት እና ዳቦ ቤት",
      diningDesc: "ትኩስ ቁርስ፣ ባህላዊና ዘመናዊ ምግቦች እንዲሁም የተለያየ የዳቦ ምርቶች።",
      wifiTitle: "ነፃ ፈጣን ኢንተርኔት",
      wifiDesc: "በሆቴሉ ግቢ ውስጥ በየትኛውም ቦታ የሚሰራ ከፍተኛ የኢንተርኔት አገልግሎት።",
      deskTitle: "የ24 ሰዓት አስተናጋጅ",
      deskDesc: "ባለቤቱ አቶ ዳንኤል እና ሰራተኞቻቸው ሁሌም እርስዎን ለማስተናገድ ዝግጁ ናቸው።",
      successTitle: "የክፍል ማስያዣ ጥያቄዎ ተላክዋል!",
      successDesc: "ዊንታ ሆቴልን ስለመረጡ እናመሰግናለን! የክፍል ማስያዣ ጥያቄዎ ደርሶናል፣ በቅርብ ጊዜ እናነጋግርዎታለን።",
      successBtn: "እሺ"
    }
  };

  // 2. Language Toggle Setup
  let currentLang = localStorage.getItem('winta_lang') || 'en';
  const langToggleBtn = document.getElementById('langToggleBtn');

  const applyLanguage = (lang) => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    if (langToggleBtn) {
      langToggleBtn.textContent = lang === 'en' ? 'አማርኛ' : 'English';
    }

    localStorage.setItem('winta_lang', lang);
  };

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'am' : 'en';
      applyLanguage(currentLang);
    });
  }

  applyLanguage(currentLang);

  // 3. Modal Elements & Event Listeners (Fixes "Book Now" buttons)
  const modal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const roomSelect = document.getElementById('roomSelect');
  const navBookBtn = document.getElementById('navBookBtn');
  const heroBookBtn = document.getElementById('heroBookBtn');
  const roomBookBtns = document.querySelectorAll('.book-room-btn');

  const openModal = (roomType = '') => {
    if (roomType && roomSelect) {
      roomSelect.value = roomType;
    }
    if (modal) modal.style.display = 'flex';
  };

  const closeModal = () => {
    if (modal) modal.style.display = 'none';
  };

  // Attach click events to all booking buttons
  if (navBookBtn) navBookBtn.addEventListener('click', () => openModal());
  if (heroBookBtn) heroBookBtn.addEventListener('click', () => openModal());

  roomBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedRoom = e.target.getAttribute('data-room');
      openModal(selectedRoom);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // 4. Success Alert Modal Logic
  const successModal = document.getElementById('successModal');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  const showSuccessAlert = () => {
    if (successModal) successModal.style.display = 'flex';
  };

  const closeSuccessAlert = () => {
    if (successModal) successModal.style.display = 'none';
  };

  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeSuccessAlert);

  // 5. Booking Form Submission Handling
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const room = roomSelect ? roomSelect.value : '';
      const date = document.getElementById('checkIn').value;

      const formattedMessage = 
`🏨 *New Room Booking Request - Winta Hotel*

👤 *Guest Name:* ${name}
📞 *Phone Number:* ${phone}
🛏️ *Room Type:* ${room}
📅 *Check-in Date:* ${date}

*Sent from Winta Hotel Website*`;

      // Telegram Bot Delivery
      const encodedToken = "ODc1MTcyNzkyMTpBQUdzajV2ZHhWVWRYUDU3Z1dSSFA3bVUyNnJETFdfWDFPVQ=="; // Paste your encoded token here
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
      }).catch(err => console.error('Telegram Error:', err));

      // Web3Forms Email Delivery
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '2da4071b-5680-41fd-9e1a-cd2b2619f0be', // Paste your Web3Forms access key here
          to_email: 'rtesfaye482@gmail.com',
          subject: `New Booking Inquiry from ${name}`,
          from_name: 'Winta Hotel Booking Bot',
          name: name,
          phone: phone,
          room: room,
          check_in_date: date,
          message: formattedMessage
        })
      }).catch(err => console.error('Web3Forms Error:', err));

      // Reset form, close booking modal, and show success pop-up alert
      bookingForm.reset();
      closeModal();
      showSuccessAlert();
    });
  }
});
