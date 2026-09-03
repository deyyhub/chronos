/**
 * Chronos — Personal Availability & Booking Engine (Production v8 Final)
 * - 100% Wiped Legacy Demo Data (No Alex Rivera, Maria, David)
 * - Fixed Multilingual Switcher (EN, IT, RO, SL across months, pills, & headers)
 * - Mobile Phone Layout Fix (Strict Overflow & Responsive Day Cells)
 */

(function () {
  'use strict';

  // Clear legacy cached storage from older versions
  const LEGACY_KEYS = [
    'chronos_users_v4', 'chronos_appointments_v4', 'chronos_current_user_v4', 'chronos_friends_v4',
    'chronos_users_prod_v5', 'chronos_appointments_prod_v5', 'chronos_current_user_prod_v5', 'chronos_friends_prod_v5',
    'chronos_users_prod_v6', 'chronos_appointments_prod_v6', 'chronos_current_user_prod_v6', 'chronos_friends_prod_v6',
    'chronos_users_prod_v7', 'chronos_appointments_prod_v7', 'chronos_current_user_prod_v7', 'chronos_friends_prod_v7'
  ];
  LEGACY_KEYS.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });

  const STORAGE_KEY_USERS = 'chronos_users_v8_clean';
  const STORAGE_KEY_APPOINTMENTS = 'chronos_appointments_v8_clean';
  const STORAGE_KEY_CURRENT_USER = 'chronos_current_user_v8_clean';
  const STORAGE_KEY_FRIENDS = 'chronos_friends_v8_clean';
  const STORAGE_KEY_LANG = 'chronos_language_v8_clean';

  // 100% Complete Translation Dictionaries
  const I18N = {
    en: {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      navCalendar: 'Calendar',
      navInbox: 'Inbox',
      navFriends: 'Friends',
      share: 'Share',
      editProfile: 'Edit Profile',
      bannerSubtitle: 'Select any available day to request an appointment slot.',
      today: 'Today',
      statusFree: 'Free',
      statusPending: 'Pending',
      statusAccepted: 'Accepted',
      legendHint: 'Tap day to book or view notes',
      sun: 'Sun', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat',
      inboxTitle: 'Appointment Inbox',
      inboxSubtitle: 'Review incoming booking requests to accept or decline.',
      filterPending: 'Pending', filterAccepted: 'Accepted', filterDeclined: 'Declined', filterAll: 'All',
      friendsTitle: 'Saved Friends & Directory',
      friendsSubtitle: 'Search handles with live suggestions.',
      addFriendBtn: 'Add New Friend',
      bookingTitle: 'Request Appointment',
      selectedDate: 'Selected Date',
      fullDayLabel: 'Full Day Occupied / Event',
      startTime: 'Start Time (HH:MM)',
      endTime: 'End Time (HH:MM)',
      allDay: 'All Day',
      noteLabel: 'Appointment Note / Purpose',
      nameLabel: 'Your Name / Identifier',
      sendRequestBtn: 'Send Booking Request',
      saveFriend: 'Save Friend',
      eventDetails: 'Event Details',
      participant: 'Participant / Requester',
      noteDescription: 'Note / Description',
      statusLabel: 'Status',
      editProfileTitle: 'Edit Your Profile',
      editProfileSubtitle: 'Set your real name, nickname, or handle.',
      displayNameLabel: 'Your Display Name / Nickname',
      usernameLabel: 'Username Handle',
      bioLabel: 'Profile Bio',
      saveChanges: 'Save Changes',
      accountManagerTitle: 'Account & PFP Manager',
      accountManagerSubtitle: 'Switch active user or register new account.',
      registeredAccounts: 'Registered Accounts',
      orRegister: 'Or Register Account',
      pfpOptionLabel: 'Avatar PFP Option',
      registerBtn: 'Register & Switch Account',
      addFriendModalTitle: 'Save Friend Calendar',
      addFriendModalSubtitle: 'Type handle to search live user suggestions.',
      searchHandleLabel: 'Search Handle or Name',
      saveToListBtn: 'Save to Friends List',
      privacyPublic: 'Details: Public',
      privacyPrivate: 'Details: Private',
      hostView: 'Host View',
      guestView: 'Guest View',
      noRequestsFound: 'No requests found',
      noRequestsSubtitle: 'There are no appointment requests for this filter.',
      noFriendsFound: 'No saved friends yet',
      noFriendsSubtitle: 'Use the search bar above to type a handle or name and save friends.',
      searchPlaceholder: 'Search name or handle...',
      calendarTitleSuffix: "'s Calendar"
    },
    it: {
      months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
      navCalendar: 'Calendario',
      navInbox: 'In arrivo',
      navFriends: 'Amici',
      share: 'Condividi',
      editProfile: 'Modifica profilo',
      bannerSubtitle: 'Seleziona un giorno disponibile per richiedere un appuntamento.',
      today: 'Oggi',
      statusFree: 'Libero',
      statusPending: 'In attesa',
      statusAccepted: 'Accettato',
      legendHint: 'Tocca un giorno per prenotare o vedere le note',
      sun: 'Dom', mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Gio', fri: 'Ven', sat: 'Sab',
      inboxTitle: 'Richieste ricevute',
      inboxSubtitle: 'Esamina le richieste di prenotazione per accettarle o rifiutarle.',
      filterPending: 'In attesa', filterAccepted: 'Accettati', filterDeclined: 'Rifiutati', filterAll: 'Tutti',
      friendsTitle: 'Amici salvati e rubrica',
      friendsSubtitle: 'Cerca username con suggerimenti in tempo reale.',
      addFriendBtn: 'Aggiungi amico',
      bookingTitle: 'Richiedi appuntamento',
      selectedDate: 'Data selezionata',
      fullDayLabel: 'Tutto il giorno occupato',
      startTime: 'Ora inizio (HH:MM)',
      endTime: 'Ora fine (HH:MM)',
      allDay: 'Tutto il giorno',
      noteLabel: 'Nota / Motivo appuntamento',
      nameLabel: 'Il tuo nome / Username',
      sendRequestBtn: 'Invia richiesta',
      saveFriend: 'Salva amico',
      eventDetails: 'Dettagli evento',
      participant: 'Partecipante / Richiedente',
      noteDescription: 'Nota / Descrizione',
      statusLabel: 'Stato',
      editProfileTitle: 'Modifica il tuo profilo',
      editProfileSubtitle: 'Imposta il tuo nome reale, nickname o handle.',
      displayNameLabel: 'Il tuo nome / Nickname',
      usernameLabel: 'Handle Username',
      bioLabel: 'Bio del profilo',
      saveChanges: 'Salva modifiche',
      accountManagerTitle: 'Gestione account e PFP',
      accountManagerSubtitle: 'Cambia utente attivo o registra un nuovo account.',
      registeredAccounts: 'Account registrati',
      orRegister: 'O registra account',
      pfpOptionLabel: 'Opzione Avatar PFP',
      registerBtn: 'Registra e cambia account',
      addFriendModalTitle: 'Salva calendario amico',
      addFriendModalSubtitle: 'Digita handle per cercare suggerimenti live.',
      searchHandleLabel: 'Cerca handle o nome',
      saveToListBtn: 'Salva nella lista amici',
      privacyPublic: 'Dettagli: Pubblici',
      privacyPrivate: 'Dettagli: Privati',
      hostView: 'Vista Host',
      guestView: 'Vista Ospite',
      noRequestsFound: 'Nessuna richiesta trovata',
      noRequestsSubtitle: 'Non ci sono richieste di appuntamento per questo filtro.',
      noFriendsFound: 'Nessun amico salvato',
      noFriendsSubtitle: 'Usa la barra di ricerca sopra per cercare un nome e salvare amici.',
      searchPlaceholder: 'Cerca nome o username...',
      calendarTitleSuffix: ' - Calendario'
    },
    ro: {
      months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
      navCalendar: 'Calendar',
      navInbox: 'Mesaje primite',
      navFriends: 'Prieteni',
      share: 'Distribuie',
      editProfile: 'Editează profilul',
      bannerSubtitle: 'Selectează o zi disponibilă pentru a solicita o programare.',
      today: 'Astăzi',
      statusFree: 'Disponibil',
      statusPending: 'În așteptare',
      statusAccepted: 'Acceptat',
      legendHint: 'Apasă pe o zi pentru a rezerva sau a vedea notele',
      sun: 'Dum', mon: 'Lun', tue: 'Mar', wed: 'Mie', thu: 'Joi', fri: 'Vin', sat: 'Sâm',
      inboxTitle: 'Solicitări primite',
      inboxSubtitle: 'Examinează solicitările de programare pentru a le accepta sau refuza.',
      filterPending: 'În așteptare', filterAccepted: 'Acceptate', filterDeclined: 'Refuzate', filterAll: 'Toate',
      friendsTitle: 'Prieteni salvați',
      friendsSubtitle: 'Caută utilizatori cu sugestii în timp real.',
      addFriendBtn: 'Adaugă prieten',
      bookingTitle: 'Solicită o programare',
      selectedDate: 'Data selectată',
      fullDayLabel: 'Ocupat toată ziua',
      startTime: 'Ora de început (HH:MM)',
      endTime: 'Ora de sfârșit (HH:MM)',
      allDay: 'Toată ziua',
      noteLabel: 'Notă / Motivul programării',
      nameLabel: 'Numele tău / Utilizator',
      sendRequestBtn: 'Trimite solicitarea',
      saveFriend: 'Salvează prieten',
      eventDetails: 'Detalii eveniment',
      participant: 'Participant / Solicitant',
      noteDescription: 'Notă / Descriere',
      statusLabel: 'Status',
      editProfileTitle: 'Editează-ți profilul',
      editProfileSubtitle: 'Setează-ți numele real, pseudonimul sau utilizatorul.',
      displayNameLabel: 'Numele afișat / Pseudonim',
      usernameLabel: 'Nume utilizator (Handle)',
      bioLabel: 'Descriere profil',
      saveChanges: 'Salvează modificările',
      accountManagerTitle: 'Administrare conturi și PFP',
      accountManagerSubtitle: 'Schimbă utilizatorul activ sau înregistrează un cont nou.',
      registeredAccounts: 'Conturi înregistrate',
      orRegister: 'Sau înregistrează cont',
      pfpOptionLabel: 'Opțiune Avatar PFP',
      registerBtn: 'Înregistrează și schimbă contul',
      addFriendModalTitle: 'Salvează calendarul prietenului',
      addFriendModalSubtitle: 'Tastează utilizatorul pentru căutare live.',
      searchHandleLabel: 'Caută utilizator sau nume',
      saveToListBtn: 'Salvează în lista de prieteni',
      privacyPublic: 'Detalii: Publice',
      privacyPrivate: 'Detalii: Private',
      hostView: 'Vedere Gazdă',
      guestView: 'Vedere Oaspete',
      noRequestsFound: 'Nu s-au găsit solicitări',
      noRequestsSubtitle: 'Nu există solicitări de programare pentru acest filtru.',
      noFriendsFound: 'Niciun prieten salvat încă',
      noFriendsSubtitle: 'Folosește bara de căutare de mai sus pentru a căuta și salva prieteni.',
      searchPlaceholder: 'Caută nume sau utilizator...',
      calendarTitleSuffix: ' - Calendar'
    },
    sl: {
      months: ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'],
      navCalendar: 'Koledar',
      navInbox: 'Prejeto',
      navFriends: 'Prijatelji',
      share: 'Deli',
      editProfile: 'Uredi profil',
      bannerSubtitle: 'Izberite prost dan in zaprosite za termin.',
      today: 'Danes',
      statusFree: 'Prosto',
      statusPending: 'Na čakanju',
      statusAccepted: 'Sprejeto',
      legendHint: 'Tapnite na dan za rezervacijo ali ogled opomb',
      sun: 'Ned', mon: 'Pon', tue: 'Tor', wed: 'Sre', thu: 'Čet', fri: 'Pet', sat: 'Sob',
      inboxTitle: 'Prejeta zaprosila',
      inboxSubtitle: 'Preglejte zaprosila za termine in jih sprejmite ali zavrnite.',
      filterPending: 'Na čakanju', filterAccepted: 'Sprejeto', filterDeclined: 'Zavrnjeno', filterAll: 'Vse',
      friendsTitle: 'Shranjeni prijatelji',
      friendsSubtitle: 'Iščite uporabnike z predlogi v realnem času.',
      addFriendBtn: 'Dodaj prijatelja',
      bookingTitle: 'Zaprosi za termin',
      selectedDate: 'Izbran datum',
      fullDayLabel: 'Zasedeno cel dan',
      startTime: 'Začetni čas (HH:MM)',
      endTime: 'Končni čas (HH:MM)',
      allDay: 'Cel dan',
      noteLabel: 'Opomba / Namen termina',
      nameLabel: 'Vaše ime / Uporabniško ime',
      sendRequestBtn: 'Pošlji zaprosilo',
      saveFriend: 'Shrani prijatelja',
      eventDetails: 'Podrobnosti dogodka',
      participant: 'Udeleženec / Vlagatelj',
      noteDescription: 'Opomba / Opis',
      statusLabel: 'Status',
      editProfileTitle: 'Uredite svoj profil',
      editProfileSubtitle: 'Nastavite pravo ime, vzdevek ali uporabniško ime.',
      displayNameLabel: 'Prikazano ime / Vzdevek',
      usernameLabel: 'Uporabniško ime (Handle)',
      bioLabel: 'Opis profila',
      saveChanges: 'Shrani spremembe',
      accountManagerTitle: 'Upravitelj računov in PFP',
      accountManagerSubtitle: 'Preklopite aktivnega uporabnika ali registrirajte nov račun.',
      registeredAccounts: 'Registrirani računi',
      orRegister: 'Ali registrirajte račun',
      pfpOptionLabel: 'Možnost Avatar PFP',
      registerBtn: 'Registriraj in preklopi račun',
      addFriendModalTitle: 'Shrani koledar prijatelja',
      addFriendModalSubtitle: 'Vtipkajte uporabniško ime za iskanje v živo.',
      searchHandleLabel: 'Išči uporabniško ime ali ime',
      saveToListBtn: 'Shrani na seznam prijateljev',
      privacyPublic: 'Podrobnosti: Javno',
      privacyPrivate: 'Podrobnosti: Zasebno',
      hostView: 'Pogled Gostitelja',
      guestView: 'Pogled Gosta',
      noRequestsFound: 'Ni najdenih zaprosil',
      noRequestsSubtitle: 'Za ta filter ni zaprosil za termine.',
      noFriendsFound: 'Še ni shranjenih prijateljev',
      noFriendsSubtitle: 'Uporabite iskalno vrstico zgoraj za iskanje in shranjevanje prijateljev.',
      searchPlaceholder: 'Išči ime ali uporabniško ime...',
      calendarTitleSuffix: ' - Koledar'
    }
  };

  // Pristine seed state with 1 default user (No demo accounts like Alex Rivera)
  const DEFAULT_USERS = [
    {
      username: 'me',
      name: 'My Calendar',
      bio: 'Select any available day to request an appointment slot.',
      color: 'from-blue-600 to-indigo-600',
      privacyShowDetails: true,
      pfpType: 'initials',
      pfpUrl: ''
    }
  ];

  const DEFAULT_APPOINTMENTS = [];

  function getOffsetDateStr(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const dy = String(d.getDate()).padStart(2, '0');
    return `${yr}-${mo}-${dy}`;
  }

  // --- STATE ---
  let currentLang = loadFromStorage(STORAGE_KEY_LANG, 'en');
  let users = loadFromStorage(STORAGE_KEY_USERS, DEFAULT_USERS);
  let appointments = loadFromStorage(STORAGE_KEY_APPOINTMENTS, DEFAULT_APPOINTMENTS);
  let currentUsername = loadFromStorage(STORAGE_KEY_CURRENT_USER, 'me');
  let friendsMap = loadFromStorage(STORAGE_KEY_FRIENDS, { me: [] });

  let viewingUsername = getUrlParameter('user') || currentUsername;
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let selectedDateForBooking = null;
  let currentActiveTab = 'calendar';
  let inboxFilter = 'pending';

  saveToStorage(STORAGE_KEY_USERS, users);
  saveToStorage(STORAGE_KEY_APPOINTMENTS, appointments);
  saveToStorage(STORAGE_KEY_CURRENT_USER, currentUsername);
  saveToStorage(STORAGE_KEY_FRIENDS, friendsMap);
  saveToStorage(STORAGE_KEY_LANG, currentLang);

  // --- DOM ELEMENTS ---
  const brandLink = document.getElementById('brandLink');
  const languageSelect = document.getElementById('languageSelect');

  const navCalendar = document.getElementById('navCalendar');
  const navInbox = document.getElementById('navInbox');
  const navFriends = document.getElementById('navFriends');
  const inboxBadgeCount = document.getElementById('inboxBadgeCount');
  
  const mobileNavCalendar = document.getElementById('mobileNavCalendar');
  const mobileNavInbox = document.getElementById('mobileNavInbox');
  const mobileNavFriends = document.getElementById('mobileNavFriends');
  const mobileInboxBadge = document.getElementById('mobileInboxBadge');

  const shareBtn = document.getElementById('shareBtn');
  const userAccountBtn = document.getElementById('userAccountBtn');
  const userAvatarContainer = document.getElementById('userAvatarContainer');
  const userAvatarInitials = document.getElementById('userAvatarInitials');
  const userNameDisplay = document.getElementById('userNameDisplay');

  const bannerAvatarContainer = document.getElementById('bannerAvatarContainer');
  const bannerAvatarInitials = document.getElementById('bannerAvatarInitials');
  const bannerAvatarImg = document.getElementById('bannerAvatarImg');
  const bannerName = document.getElementById('bannerName');
  const bannerHandle = document.getElementById('bannerHandle');
  const bannerBio = document.getElementById('bannerBio');
  const editProfileBtn = document.getElementById('editProfileBtn');
  
  const privacyToggleBtn = document.getElementById('privacyToggleBtn');
  const privacyIcon = document.getElementById('privacyIcon');
  const privacyText = document.getElementById('privacyText');

  const viewModeIndicator = document.getElementById('viewModeIndicator');
  const viewModeText = document.getElementById('viewModeText');
  const addFriendBtn = document.getElementById('addFriendBtn');

  // Views
  const viewCalendar = document.getElementById('viewCalendar');
  const viewInbox = document.getElementById('viewInbox');
  const viewFriends = document.getElementById('viewFriends');

  // Calendar Controls
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');
  const todayBtn = document.getElementById('todayBtn');
  const currentMonthYearLabel = document.getElementById('currentMonthYearLabel');
  const yearSelect = document.getElementById('yearSelect');
  const calendarGrid = document.getElementById('calendarGrid');

  // Live Search Elements
  const liveUserSearchInput = document.getElementById('liveUserSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const autocompleteDropdown = document.getElementById('autocompleteDropdown');

  // Booking Modal
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModalBtn = document.getElementById('closeBookingModalBtn');
  const modalHostName = document.getElementById('modalHostName');
  const bookingTargetDateStr = document.getElementById('bookingTargetDateStr');
  const bookingForm = document.getElementById('bookingForm');
  const fullDayCheckbox = document.getElementById('fullDayCheckbox');
  const startTimeInput = document.getElementById('startTimeInput');
  const endTimeInput = document.getElementById('endTimeInput');
  const durationBadge = document.getElementById('durationBadge');
  const bookingNote = document.getElementById('bookingNote');
  const requesterNameInput = document.getElementById('requesterNameInput');

  // Note Inspect Modal
  const noteInspectModal = document.getElementById('noteInspectModal');
  const closeNoteInspectBtn = document.getElementById('closeNoteInspectBtn');
  const inspectDateTitle = document.getElementById('inspectDateTitle');
  const inspectTimeBadge = document.getElementById('inspectTimeBadge');
  const inspectRequesterName = document.getElementById('inspectRequesterName');
  const inspectNoteText = document.getElementById('inspectNoteText');
  const inspectStatusPill = document.getElementById('inspectStatusPill');

  // Edit Profile Modal
  const editProfileModal = document.getElementById('editProfileModal');
  const closeEditProfileModalBtn = document.getElementById('closeEditProfileModalBtn');
  const editProfileForm = document.getElementById('editProfileForm');
  const editDisplayNameInput = document.getElementById('editDisplayNameInput');
  const editUsernameInput = document.getElementById('editUsernameInput');
  const editBioInput = document.getElementById('editBioInput');

  // Auth & Account Switcher Modal
  const authModal = document.getElementById('authModal');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const registeredUsersList = document.getElementById('registeredUsersList');
  const createAccountForm = document.getElementById('createAccountForm');
  const newUsername = document.getElementById('newUsername');
  const newDisplayName = document.getElementById('newDisplayName');
  const pfpTypeSelect = document.getElementById('pfpTypeSelect');
  const pfpUrlInput = document.getElementById('pfpUrlInput');

  // Friends Modal
  const addFriendModal = document.getElementById('addFriendModal');
  const openAddFriendModalBtn = document.getElementById('openAddFriendModalBtn');
  const closeAddFriendModalBtn = document.getElementById('closeAddFriendModalBtn');
  const addFriendForm = document.getElementById('addFriendForm');
  const friendUsernameInput = document.getElementById('friendUsernameInput');
  const modalAutocompleteDropdown = document.getElementById('modalAutocompleteDropdown');
  const friendsGrid = document.getElementById('friendsGrid');

  // Inbox Filters
  const inboxListContainer = document.getElementById('inboxListContainer');
  const filterPending = document.getElementById('filterPending');
  const filterAccepted = document.getElementById('filterAccepted');
  const filterRejected = document.getElementById('filterRejected');
  const filterAll = document.getElementById('filterAll');

  const toastContainer = document.getElementById('toastContainer');

  // --- BOOT ---
  function init() {
    languageSelect.value = currentLang;
    applyLanguageTranslations();
    setupYearSelect();
    setupEventListeners();
    updateUserDisplays();
    renderActiveView();
    refreshIcons();
  }

  // --- MULTILINGUAL i18n ENGINE ---
  function applyLanguageTranslations() {
    const dict = I18N[currentLang] || I18N.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    if (liveUserSearchInput) {
      liveUserSearchInput.placeholder = dict.searchPlaceholder;
    }

    updateUserDisplays();
    renderActiveView();
  }

  function renderActiveView() {
    if (currentActiveTab === 'calendar') renderCalendar();
    else if (currentActiveTab === 'inbox') renderInbox();
    else if (currentActiveTab === 'friends') renderFriends();
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    languageSelect.addEventListener('change', (e) => {
      currentLang = e.target.value;
      saveToStorage(STORAGE_KEY_LANG, currentLang);
      applyLanguageTranslations();
      showToast(`Language set to ${currentLang.toUpperCase()}`, 'success');
    });

    navCalendar.addEventListener('click', () => switchTab('calendar'));
    navInbox.addEventListener('click', () => switchTab('inbox'));
    navFriends.addEventListener('click', () => switchTab('friends'));

    mobileNavCalendar.addEventListener('click', () => switchTab('calendar'));
    mobileNavInbox.addEventListener('click', () => switchTab('inbox'));
    mobileNavFriends.addEventListener('click', () => switchTab('friends'));

    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      viewingUsername = currentUsername;
      switchTab('calendar');
      updateUserDisplays();
      renderCalendar();
    });

    prevMonthBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      yearSelect.value = currentYear;
      renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      yearSelect.value = currentYear;
      renderCalendar();
    });

    todayBtn.addEventListener('click', () => {
      const now = new Date();
      currentMonth = now.getMonth();
      currentYear = now.getFullYear();
      yearSelect.value = currentYear;
      renderCalendar();
    });

    yearSelect.addEventListener('change', (e) => {
      currentYear = parseInt(e.target.value, 10);
      renderCalendar();
    });

    shareBtn.addEventListener('click', copyShareLink);
    privacyToggleBtn.addEventListener('click', toggleHostPrivacy);

    editProfileBtn.addEventListener('click', openEditProfileModal);
    closeEditProfileModalBtn.addEventListener('click', closeEditProfileModal);
    editProfileForm.addEventListener('submit', handleSaveProfileEdit);

    userAccountBtn.addEventListener('click', openAuthModal);
    closeAuthModalBtn.addEventListener('click', closeAuthModal);
    createAccountForm.addEventListener('submit', handleCreateAccount);

    pfpTypeSelect.addEventListener('change', () => {
      if (pfpTypeSelect.value === 'url') pfpUrlInput.classList.remove('hidden');
      else pfpUrlInput.classList.add('hidden');
    });

    closeBookingModalBtn.addEventListener('click', closeBookingModal);
    bookingForm.addEventListener('submit', handleBookingSubmit);
    fullDayCheckbox.addEventListener('change', handleFullDayToggle);

    startTimeInput.addEventListener('input', calculateDuration);
    endTimeInput.addEventListener('input', calculateDuration);

    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const isAllDay = e.currentTarget.getAttribute('data-all-day');
        if (isAllDay) {
          fullDayCheckbox.checked = true;
          handleFullDayToggle();
        } else {
          fullDayCheckbox.checked = false;
          handleFullDayToggle();
          const start = e.currentTarget.getAttribute('data-start');
          const end = e.currentTarget.getAttribute('data-end');
          if (start && end) {
            startTimeInput.value = start;
            endTimeInput.value = end;
            calculateDuration();
          }
        }
      });
    });

    closeNoteInspectBtn.addEventListener('click', closeNoteInspectModal);

    openAddFriendModalBtn.addEventListener('click', openAddFriendModal);
    closeAddFriendModalBtn.addEventListener('click', closeAddFriendModal);
    addFriendForm.addEventListener('submit', handleAddFriend);
    addFriendBtn.addEventListener('click', () => addFriendToCurrentUser(viewingUsername));

    liveUserSearchInput.addEventListener('input', handleLiveUserSearch);
    clearSearchBtn.addEventListener('click', () => {
      liveUserSearchInput.value = '';
      clearSearchBtn.classList.add('hidden');
      autocompleteDropdown.classList.add('hidden');
    });

    friendUsernameInput.addEventListener('input', handleModalUserSearch);

    document.addEventListener('click', (e) => {
      if (!liveUserSearchInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
        autocompleteDropdown.classList.add('hidden');
      }
      if (!friendUsernameInput.contains(e.target) && !modalAutocompleteDropdown.contains(e.target)) {
        modalAutocompleteDropdown.classList.add('hidden');
      }
    });

    filterPending.addEventListener('click', () => setInboxFilter('pending'));
    filterAccepted.addEventListener('click', () => setInboxFilter('accepted'));
    filterRejected.addEventListener('click', () => setInboxFilter('rejected'));
    filterAll.addEventListener('click', () => setInboxFilter('all'));
  }

  // --- AUTOCOMPLETE SEARCH ENGINE ---
  function handleLiveUserSearch() {
    const q = liveUserSearchInput.value.trim().toLowerCase();

    if (!q) {
      clearSearchBtn.classList.add('hidden');
      autocompleteDropdown.classList.add('hidden');
      return;
    }

    clearSearchBtn.classList.remove('hidden');

    const matches = users.filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.username.toLowerCase().includes(q)
    );

    renderAutocompleteResults(matches, autocompleteDropdown, false);
  }

  function handleModalUserSearch() {
    const q = friendUsernameInput.value.trim().toLowerCase();
    if (!q) {
      modalAutocompleteDropdown.classList.add('hidden');
      return;
    }
    const matches = users.filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.username.toLowerCase().includes(q)
    );
    renderAutocompleteResults(matches, modalAutocompleteDropdown, true);
  }

  function renderAutocompleteResults(matches, dropdownContainer, isModal) {
    dropdownContainer.innerHTML = '';
    const dict = I18N[currentLang] || I18N.en;

    if (matches.length === 0) {
      dropdownContainer.innerHTML = `
        <div class="p-3 text-xs text-apple-graySub text-center">
          No user found.
        </div>`;
      dropdownContainer.classList.remove('hidden');
      return;
    }

    matches.forEach(userObj => {
      const item = document.createElement('div');
      item.className = 'p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-between space-x-3 transition border border-white/5';

      const isFriend = (friendsMap[currentUsername] || []).includes(userObj.username);

      item.innerHTML = `
        <div class="flex items-center space-x-3 min-w-0">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr ${userObj.color || 'from-indigo-600 to-purple-600'} text-white flex items-center justify-center font-bold text-xs shadow-md overflow-hidden flex-shrink-0">
            ${userObj.pfpType === 'url' && userObj.pfpUrl ? `<img src="${escapeHtml(userObj.pfpUrl)}" class="w-full h-full object-cover">` : getInitials(userObj.name)}
          </div>
          <div class="min-w-0">
            <div class="text-xs font-bold text-white truncate">${escapeHtml(userObj.name)}</div>
            <div class="text-[10px] text-apple-graySub font-mono">@${escapeHtml(userObj.username)}</div>
          </div>
        </div>

        <div class="flex items-center space-x-1.5 flex-shrink-0">
          <button class="view-cal-btn px-2.5 py-1 rounded-lg bg-apple-accent/20 hover:bg-apple-accent/30 text-apple-accent text-[11px] font-semibold transition">
            ${dict.navCalendar}
          </button>
          ${!isFriend && userObj.username !== currentUsername ? `
            <button class="add-friend-quick-btn px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition">
              + ${dict.addFriendBtn}
            </button>
          ` : ''}
        </div>
      `;

      item.querySelector('.view-cal-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        viewingUsername = userObj.username;
        switchTab('calendar');
        updateUserDisplays();
        renderCalendar();
        dropdownContainer.classList.add('hidden');
        if (isModal) closeAddFriendModal();
      });

      const addBtn = item.querySelector('.add-friend-quick-btn');
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          addFriendToCurrentUser(userObj.username);
          dropdownContainer.classList.add('hidden');
          if (isModal) closeAddFriendModal();
        });
      }

      dropdownContainer.appendChild(item);
    });

    dropdownContainer.classList.remove('hidden');
    refreshIcons();
  }

  // --- HELPERS ---
  function loadFromStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveToStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `pointer-events-auto px-4 py-3 rounded-2xl border text-xs font-medium backdrop-blur-xl shadow-2xl flex items-center space-x-2.5 transition-all duration-300 transform translate-y-2 opacity-0 bg-apple-cardDark border-apple-borderDark text-white`;
    
    let iconName = 'info';
    let iconColor = 'text-apple-accent';
    if (type === 'success') {
      iconName = 'check-circle-2';
      iconColor = 'text-apple-green';
    } else if (type === 'error') {
      iconName = 'alert-circle';
      iconColor = 'text-apple-red';
    }

    toast.innerHTML = `<i data-lucide="${iconName}" class="w-4 h-4 ${iconColor}"></i><span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);
    refreshIcons();

    setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 10);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
  }

  function getUser(username) {
    return users.find(u => u.username.toLowerCase() === username.toLowerCase()) || {
      username: username,
      name: username,
      bio: 'Chronos User',
      color: 'from-blue-600 to-indigo-600',
      privacyShowDetails: true,
      pfpType: 'initials',
      pfpUrl: ''
    };
  }

  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }

  function renderUserAvatarElement(userObj, container, initialsEl, imgEl) {
    if (userObj.pfpType === 'url' && userObj.pfpUrl) {
      if (imgEl) {
        imgEl.src = userObj.pfpUrl;
        imgEl.classList.remove('hidden');
      }
      if (initialsEl) initialsEl.classList.add('hidden');
    } else {
      if (imgEl) imgEl.classList.add('hidden');
      if (initialsEl) {
        initialsEl.textContent = getInitials(userObj.name);
        initialsEl.classList.remove('hidden');
      }
    }
  }

  function setupYearSelect() {
    yearSelect.innerHTML = '';
    for (let y = currentYear - 2; y <= currentYear + 5; y++) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      if (y === currentYear) opt.selected = true;
      yearSelect.appendChild(opt);
    }
  }

  // --- NAVIGATION ---
  function switchTab(tab) {
    currentActiveTab = tab;

    [navCalendar, navInbox, navFriends].forEach(t => t.classList.remove('active', 'bg-white/10', 'text-white'));
    [navCalendar, navInbox, navFriends].forEach(t => t.classList.add('text-zinc-400'));

    [mobileNavCalendar, mobileNavInbox, mobileNavFriends].forEach(t => {
      t.classList.remove('text-apple-accent');
      t.classList.add('text-zinc-400');
    });

    viewCalendar.classList.add('hidden');
    viewInbox.classList.add('hidden');
    viewFriends.classList.add('hidden');

    if (tab === 'calendar') {
      navCalendar.classList.add('active', 'bg-white/10', 'text-white');
      navCalendar.classList.remove('text-zinc-400');
      mobileNavCalendar.classList.add('text-apple-accent');
      mobileNavCalendar.classList.remove('text-zinc-400');
      viewCalendar.classList.remove('hidden');
      renderCalendar();
    } else if (tab === 'inbox') {
      navInbox.classList.add('active', 'bg-white/10', 'text-white');
      navInbox.classList.remove('text-zinc-400');
      mobileNavInbox.classList.add('text-apple-accent');
      mobileNavInbox.classList.remove('text-zinc-400');
      viewInbox.classList.remove('hidden');
      renderInbox();
    } else if (tab === 'friends') {
      navFriends.classList.add('active', 'bg-white/10', 'text-white');
      navFriends.classList.remove('text-zinc-400');
      mobileNavFriends.classList.add('text-apple-accent');
      mobileNavFriends.classList.remove('text-zinc-400');
      viewFriends.classList.remove('hidden');
      renderFriends();
    }
    refreshIcons();
  }

  // --- EDIT PROFILE MODAL ---
  function openEditProfileModal() {
    const curUser = getUser(currentUsername);
    editDisplayNameInput.value = curUser.name;
    editUsernameInput.value = curUser.username;
    editBioInput.value = curUser.bio || '';

    editProfileModal.classList.remove('hidden');
    setTimeout(() => editProfileModal.classList.add('modal-open'), 10);
    refreshIcons();
  }

  function closeEditProfileModal() {
    editProfileModal.classList.remove('modal-open');
    setTimeout(() => editProfileModal.classList.add('hidden'), 300);
  }

  function handleSaveProfileEdit(e) {
    e.preventDefault();
    const newName = editDisplayNameInput.value.trim();
    const newHandle = editUsernameInput.value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    const newBio = editBioInput.value.trim();

    if (!newName || !newHandle) {
      showToast('Please provide a valid name and handle.', 'error');
      return;
    }

    const curUser = getUser(currentUsername);
    const oldUsername = curUser.username;

    curUser.name = newName;
    curUser.bio = newBio;

    if (newHandle !== oldUsername) {
      curUser.username = newHandle;
      currentUsername = newHandle;
      viewingUsername = newHandle;
      saveToStorage(STORAGE_KEY_CURRENT_USER, currentUsername);
    }

    saveToStorage(STORAGE_KEY_USERS, users);

    closeEditProfileModal();
    updateUserDisplays();
    renderCalendar();
    showToast(`Profile set to "${newName}" (@${newHandle})`, 'success');
  }

  // --- USER DISPLAY & PRIVACY TOGGLE ---
  function updateUserDisplays() {
    const curUser = getUser(currentUsername);
    const viewUser = getUser(viewingUsername);
    const dict = I18N[currentLang] || I18N.en;

    renderUserAvatarElement(curUser, userAvatarContainer, userAvatarInitials, null);
    userNameDisplay.textContent = curUser.name || `@${curUser.username}`;

    renderUserAvatarElement(viewUser, bannerAvatarContainer, bannerAvatarInitials, bannerAvatarImg);
    bannerName.textContent = `${viewUser.name}${dict.calendarTitleSuffix}`;
    bannerHandle.textContent = `@${viewUser.username}`;
    bannerBio.textContent = viewUser.bio || dict.bannerSubtitle;

    const isSelf = currentUsername.toLowerCase() === viewingUsername.toLowerCase();
    
    if (isSelf) {
      editProfileBtn.classList.remove('hidden');
      privacyToggleBtn.classList.remove('hidden');
      const showDetails = curUser.privacyShowDetails !== false;
      privacyText.textContent = showDetails ? dict.privacyPublic : dict.privacyPrivate;
      privacyIcon.setAttribute('data-lucide', showDetails ? 'eye' : 'eye-off');
      
      viewModeIndicator.className = 'px-3 py-1.5 rounded-full text-[11px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center space-x-1.5';
      viewModeText.textContent = dict.hostView;
      addFriendBtn.classList.add('hidden');
    } else {
      editProfileBtn.classList.add('hidden');
      privacyToggleBtn.classList.add('hidden');
      
      viewModeIndicator.className = 'px-3 py-1.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center space-x-1.5';
      viewModeText.textContent = `${dict.guestView} (${viewUser.name})`;

      const userFriends = friendsMap[currentUsername] || [];
      if (userFriends.includes(viewingUsername)) {
        addFriendBtn.classList.add('hidden');
      } else {
        addFriendBtn.classList.remove('hidden');
      }
    }

    updateInboxBadgeCount();
    refreshIcons();
  }

  function toggleHostPrivacy() {
    const curUser = getUser(currentUsername);
    const dict = I18N[currentLang] || I18N.en;
    curUser.privacyShowDetails = !curUser.privacyShowDetails;
    saveToStorage(STORAGE_KEY_USERS, users);
    updateUserDisplays();
    renderCalendar();
    showToast(curUser.privacyShowDetails ? dict.privacyPublic : dict.privacyPrivate, 'info');
  }

  function updateInboxBadgeCount() {
    const hostPending = appointments.filter(a => a.hostUsername.toLowerCase() === currentUsername.toLowerCase() && a.status === 'pending');
    if (hostPending.length > 0) {
      inboxBadgeCount.textContent = hostPending.length;
      inboxBadgeCount.classList.remove('hidden');
      mobileInboxBadge.classList.remove('hidden');
    } else {
      inboxBadgeCount.classList.add('hidden');
      mobileInboxBadge.classList.add('hidden');
    }
  }

  // --- CALENDAR RENDERER ---
  function renderCalendar() {
    const dict = I18N[currentLang] || I18N.en;
    const monthName = dict.months ? dict.months[currentMonth] : 'Month';
    currentMonthYearLabel.textContent = `${monthName} ${currentYear}`;

    calendarGrid.innerHTML = '';

    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    const todayStr = getOffsetDateStr(0);

    const viewUser = getUser(viewingUsername);
    const isSelf = currentUsername.toLowerCase() === viewingUsername.toLowerCase();

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const dayCell = document.createElement('div');
      dayCell.className = 'p-1.5 sm:p-3 min-h-[52px] sm:min-h-[90px] rounded-2xl bg-white/[0.02] border border-white/5 opacity-35 cursor-not-allowed flex flex-col justify-between overflow-hidden';
      dayCell.innerHTML = `<span class="text-[10px] sm:text-xs font-medium text-zinc-500">${dayNum}</span>`;
      calendarGrid.appendChild(dayCell);
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const monthStr = String(currentMonth + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateKey = `${currentYear}-${monthStr}-${dayStr}`;

      const isToday = dateKey === todayStr;

      const dayAppointments = appointments.filter(a => a.hostUsername.toLowerCase() === viewingUsername.toLowerCase() && a.dateStr === dateKey);

      const hasAccepted = dayAppointments.some(a => a.status === 'accepted');
      const hasPending = dayAppointments.some(a => a.status === 'pending');

      const dayCell = document.createElement('div');
      dayCell.className = `day-card p-1.5 sm:p-3 min-h-[52px] sm:min-h-[90px] rounded-2xl border backdrop-blur-md cursor-pointer flex flex-col justify-between relative group overflow-hidden ${
        isToday ? 'bg-blue-600/15 border-blue-500/40' : 'bg-black/40 border-white/10 hover:bg-white/10'
      }`;

      let statusPillHtml = '';

      if (hasAccepted) {
        const acceptedApt = dayAppointments.find(a => a.status === 'accepted');
        const timeLabel = acceptedApt.isFullDay ? dict.allDay : `${acceptedApt.startTime}-${acceptedApt.endTime}`;

        statusPillHtml = `
          <div class="mt-0.5 flex items-center space-x-1 px-1 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] sm:text-[10px] truncate max-w-full" title="Tap to inspect">
            <span class="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></span>
            <span class="truncate font-medium">${timeLabel}</span>
          </div>`;
      } else if (hasPending) {
        const pendingApt = dayAppointments.find(a => a.status === 'pending');
        statusPillHtml = `
          <div class="mt-0.5 flex items-center space-x-1 px-1 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[9px] sm:text-[10px] truncate max-w-full">
            <span class="w-1.5 h-1.5 rounded-full bg-apple-accent animate-pulse flex-shrink-0"></span>
            <span class="truncate font-medium">${dict.statusPending}</span>
          </div>`;
      } else {
        statusPillHtml = `
          <div class="mt-0.5 flex items-center space-x-1 px-1 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] sm:text-[10px] opacity-80 truncate max-w-full">
            <span class="w-1.5 h-1.5 rounded-full bg-apple-green flex-shrink-0"></span>
            <span class="truncate font-medium">${dict.statusFree}</span>
          </div>`;
      }

      dayCell.innerHTML = `
        <div class="flex items-center justify-between min-w-0">
          <span class="text-[11px] sm:text-xs font-bold ${isToday ? 'text-apple-accent' : 'text-white'}">${d}</span>
          ${isToday ? `<span class="text-[7px] sm:text-[9px] font-bold px-1 rounded bg-apple-accent text-white uppercase">${dict.today}</span>` : ''}
        </div>
        ${statusPillHtml}
      `;

      dayCell.addEventListener('click', () => {
        if (hasAccepted || hasPending) {
          const targetApt = dayAppointments.find(a => a.status === 'accepted') || dayAppointments.find(a => a.status === 'pending');
          openNoteInspectModal(targetApt, dateKey);
        } else {
          openBookingModal(dateKey);
        }
      });

      calendarGrid.appendChild(dayCell);
    }

    // Next month padding
    const totalFilledCells = firstDayIndex + daysInMonth;
    const totalGridTarget = totalFilledCells > 35 ? 42 : 35;
    const nextMonthPadding = totalGridTarget - totalFilledCells;

    for (let n = 1; n <= nextMonthPadding; n++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'p-1.5 sm:p-3 min-h-[52px] sm:min-h-[90px] rounded-2xl bg-white/[0.02] border border-white/5 opacity-35 cursor-not-allowed flex flex-col justify-between overflow-hidden';
      dayCell.innerHTML = `<span class="text-[10px] sm:text-xs font-medium text-zinc-500">${n}</span>`;
      calendarGrid.appendChild(dayCell);
    }
  }

  // --- FULL DAY TOGGLE ---
  function handleFullDayToggle() {
    const dict = I18N[currentLang] || I18N.en;
    if (fullDayCheckbox.checked) {
      startTimeInput.value = '00:00';
      endTimeInput.value = '23:59';
      startTimeInput.disabled = true;
      endTimeInput.disabled = true;
      durationBadge.textContent = dict.allDay;
      durationBadge.className = 'text-[10px] text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20';
    } else {
      startTimeInput.disabled = false;
      endTimeInput.disabled = false;
      calculateDuration();
    }
  }

  // --- BOOKING MODAL ---
  function openBookingModal(dateKey) {
    selectedDateForBooking = dateKey;
    const viewUser = getUser(viewingUsername);

    modalHostName.textContent = viewUser.name || `@${viewUser.username}`;
    
    const parts = dateKey.split('-');
    const dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    bookingTargetDateStr.textContent = dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

    const curUser = getUser(currentUsername);
    requesterNameInput.value = curUser.name || `@${curUser.username}`;
    bookingNote.value = '';

    fullDayCheckbox.checked = false;
    handleFullDayToggle();

    bookingModal.classList.remove('hidden');
    setTimeout(() => bookingModal.classList.add('modal-open'), 10);
    refreshIcons();
  }

  function closeBookingModal() {
    bookingModal.classList.remove('modal-open');
    setTimeout(() => bookingModal.classList.add('hidden'), 300);
  }

  function calculateDuration() {
    if (fullDayCheckbox.checked) return;

    const startStr = startTimeInput.value.trim();
    const endStr = endTimeInput.value.trim();

    function parseToMinutes(t) {
      if (t.includes(':')) {
        const p = t.split(':');
        return (parseInt(p[0], 10) || 0) * 60 + (parseInt(p[1], 10) || 0);
      }
      const num = parseFloat(t);
      return !isNaN(num) ? Math.round(num * 60) : 0;
    }

    const startMin = parseToMinutes(startStr);
    const endMin = parseToMinutes(endStr);
    const diff = endMin - startMin;

    if (diff > 0) {
      const hrs = Math.floor(diff / 60);
      const mins = diff % 60;
      let durText = '';
      if (hrs > 0) durText += `${hrs}h `;
      if (mins > 0) durText += `${mins}m`;
      durationBadge.textContent = durText.trim() || `${diff}m`;
      durationBadge.className = 'text-[10px] text-apple-accent font-mono bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20';
    } else {
      durationBadge.textContent = 'Invalid duration';
      durationBadge.className = 'text-[10px] text-apple-red font-mono bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20';
    }
  }

  function handleBookingSubmit(e) {
    e.preventDefault();

    if (!selectedDateForBooking) return;

    const isFullDay = fullDayCheckbox.checked;
    const start = isFullDay ? '00:00' : startTimeInput.value.trim();
    const end = isFullDay ? '23:59' : endTimeInput.value.trim();
    const note = bookingNote.value.trim();
    const requesterName = requesterNameInput.value.trim();

    if (!note || !requesterName) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    const newAppointment = {
      id: 'apt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      hostUsername: viewingUsername,
      requesterUsername: currentUsername,
      requesterName: requesterName,
      dateStr: selectedDateForBooking,
      startTime: start,
      endTime: end,
      isFullDay: isFullDay,
      note: note,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    appointments.push(newAppointment);
    saveToStorage(STORAGE_KEY_APPOINTMENTS, appointments);

    closeBookingModal();
    renderCalendar();
    updateInboxBadgeCount();
    showToast(`Booking request sent!`, 'success');
  }

  // --- NOTE INSPECTOR ---
  function openNoteInspectModal(apt, dateKey) {
    const viewUser = getUser(viewingUsername);
    const isSelf = currentUsername.toLowerCase() === viewingUsername.toLowerCase();
    const showDetails = isSelf || (viewUser.privacyShowDetails !== false);
    const dict = I18N[currentLang] || I18N.en;

    inspectDateTitle.textContent = `${dict.eventDetails} — ${dateKey}`;
    inspectTimeBadge.textContent = apt.isFullDay ? dict.allDay : `${apt.startTime} – ${apt.endTime}`;
    
    if (showDetails) {
      inspectRequesterName.textContent = apt.requesterName || `@${apt.requesterUsername}`;
      inspectNoteText.textContent = apt.note || 'No note attached.';
    } else {
      inspectRequesterName.textContent = 'Private';
      inspectNoteText.textContent = 'Host has set event details to Private (Marked as Busy).';
    }

    inspectStatusPill.textContent = apt.status === 'accepted' ? dict.statusAccepted : dict.statusPending;
    inspectStatusPill.className = apt.status === 'accepted'
      ? 'px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30'
      : 'px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30';

    noteInspectModal.classList.remove('hidden');
    setTimeout(() => noteInspectModal.classList.add('modal-open'), 10);
    refreshIcons();
  }

  function closeNoteInspectModal() {
    noteInspectModal.classList.remove('modal-open');
    setTimeout(() => noteInspectModal.classList.add('hidden'), 300);
  }

  // --- HOST INBOX RENDERER ---
  function setInboxFilter(filter) {
    inboxFilter = filter;
    [filterPending, filterAccepted, filterRejected, filterAll].forEach(btn => {
      btn.className = 'px-3 py-1 rounded-xl text-zinc-400 hover:text-white font-medium flex-1 sm:flex-none text-center';
    });

    if (filter === 'pending') filterPending.className = 'px-3 py-1 rounded-xl bg-white/15 text-white font-medium flex-1 sm:flex-none text-center';
    if (filter === 'accepted') filterAccepted.className = 'px-3 py-1 rounded-xl bg-white/15 text-white font-medium flex-1 sm:flex-none text-center';
    if (filter === 'rejected') filterRejected.className = 'px-3 py-1 rounded-xl bg-white/15 text-white font-medium flex-1 sm:flex-none text-center';
    if (filter === 'all') filterAll.className = 'px-3 py-1 rounded-xl bg-white/15 text-white font-medium flex-1 sm:flex-none text-center';

    renderInbox();
  }

  function renderInbox() {
    inboxListContainer.innerHTML = '';
    const dict = I18N[currentLang] || I18N.en;

    let hostAppointments = appointments.filter(a => a.hostUsername.toLowerCase() === currentUsername.toLowerCase());

    if (inboxFilter !== 'all') {
      hostAppointments = hostAppointments.filter(a => a.status === inboxFilter);
    }

    hostAppointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (hostAppointments.length === 0) {
      inboxListContainer.innerHTML = `
        <div class="p-8 sm:p-12 text-center bg-apple-cardDark rounded-3xl border border-apple-borderDark backdrop-blur-2xl">
          <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-500 mb-3">
            <i data-lucide="inbox" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-white">${dict.noRequestsFound}</h3>
          <p class="text-xs text-apple-graySub mt-1">${dict.noRequestsSubtitle}</p>
        </div>`;
      refreshIcons();
      return;
    }

    hostAppointments.forEach(apt => {
      const card = document.createElement('div');
      card.className = 'p-4 sm:p-5 rounded-3xl bg-apple-cardDark border border-apple-borderDark backdrop-blur-2xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition hover:border-white/20';

      let statusBadge = '';
      if (apt.status === 'pending') {
        statusBadge = `<span class="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold">${dict.statusPending}</span>`;
      } else if (apt.status === 'accepted') {
        statusBadge = `<span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">${dict.statusAccepted}</span>`;
      } else if (apt.status === 'rejected') {
        statusBadge = `<span class="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-semibold">${dict.filterDeclined}</span>`;
      }

      const timeDisplay = apt.isFullDay ? dict.allDay : `${apt.startTime} – ${apt.endTime}`;

      card.innerHTML = `
        <div class="flex items-start space-x-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/10 flex-shrink-0">
            ${getInitials(apt.requesterName)}
          </div>
          <div class="space-y-1">
            <div class="flex items-center space-x-2 flex-wrap gap-y-1">
              <h4 class="text-xs sm:text-sm font-bold text-white">${escapeHtml(apt.requesterName)}</h4>
              ${statusBadge}
            </div>
            <div class="flex items-center space-x-3 text-xs text-apple-graySub font-mono">
              <span class="flex items-center space-x-1">
                <i data-lucide="calendar" class="w-3.5 h-3.5 text-apple-accent"></i>
                <span>${apt.dateStr}</span>
              </span>
              <span class="flex items-center space-x-1">
                <i data-lucide="clock" class="w-3.5 h-3.5 text-purple-400"></i>
                <span>${timeDisplay}</span>
              </span>
            </div>
            <p class="text-xs text-zinc-300 bg-white/5 p-2.5 rounded-xl border border-white/10 mt-2">
              "${escapeHtml(apt.note)}"
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
          ${apt.status === 'pending' ? `
            <button class="accept-btn px-4 py-2 rounded-xl bg-apple-green/20 hover:bg-apple-green/30 text-emerald-300 border border-apple-green/40 text-xs font-semibold flex items-center space-x-1.5 transition active:scale-95" data-id="${apt.id}">
              <i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>
              <span>Accept</span>
            </button>
            <button class="decline-btn px-4 py-2 rounded-xl bg-apple-red/20 hover:bg-apple-red/30 text-red-300 border border-apple-red/40 text-xs font-semibold flex items-center space-x-1.5 transition active:scale-95" data-id="${apt.id}">
              <i data-lucide="x" class="w-4 h-4 text-red-400"></i>
              <span>Decline</span>
            </button>
          ` : `
            <button class="delete-btn p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition" data-id="${apt.id}">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          `}
        </div>
      `;

      inboxListContainer.appendChild(card);
    });

    inboxListContainer.querySelectorAll('.accept-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        updateAppointmentStatus(e.currentTarget.getAttribute('data-id'), 'accepted');
      });
    });

    inboxListContainer.querySelectorAll('.decline-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        updateAppointmentStatus(e.currentTarget.getAttribute('data-id'), 'rejected');
      });
    });

    inboxListContainer.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        deleteAppointment(e.currentTarget.getAttribute('data-id'));
      });
    });

    refreshIcons();
  }

  function updateAppointmentStatus(id, status) {
    const target = appointments.find(a => a.id === id);
    if (target) {
      target.status = status;
      saveToStorage(STORAGE_KEY_APPOINTMENTS, appointments);
      renderInbox();
      renderCalendar();
      updateInboxBadgeCount();
      showToast(`Appointment ${status === 'accepted' ? 'accepted' : 'declined'}.`, status === 'accepted' ? 'success' : 'info');
    }
  }

  function deleteAppointment(id) {
    appointments = appointments.filter(a => a.id !== id);
    saveToStorage(STORAGE_KEY_APPOINTMENTS, appointments);
    renderInbox();
    renderCalendar();
    updateInboxBadgeCount();
    showToast('Record removed.', 'info');
  }

  // --- FRIENDS MANAGER ---
  function renderFriends() {
    friendsGrid.innerHTML = '';
    const dict = I18N[currentLang] || I18N.en;
    const userFriends = friendsMap[currentUsername] || [];

    if (userFriends.length === 0) {
      friendsGrid.innerHTML = `
        <div class="col-span-full p-8 sm:p-12 text-center bg-apple-cardDark rounded-3xl border border-apple-borderDark backdrop-blur-2xl">
          <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-500 mb-3">
            <i data-lucide="users" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-semibold text-white">${dict.noFriendsFound}</h3>
          <p class="text-xs text-apple-graySub mt-1">${dict.noFriendsSubtitle}</p>
        </div>`;
      refreshIcons();
      return;
    }

    userFriends.forEach(fHandle => {
      const friendObj = getUser(fHandle);
      const card = document.createElement('div');
      card.className = 'p-4 rounded-3xl bg-apple-cardDark border border-apple-borderDark backdrop-blur-2xl shadow-lg flex items-center justify-between space-x-3 transition hover:border-white/20';

      card.innerHTML = `
        <div class="flex items-center space-x-3 min-w-0">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr ${friendObj.color || 'from-indigo-600 to-purple-600'} text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/10 flex-shrink-0 overflow-hidden">
            ${friendObj.pfpType === 'url' && friendObj.pfpUrl ? `<img src="${escapeHtml(friendObj.pfpUrl)}" class="w-full h-full object-cover">` : getInitials(friendObj.name)}
          </div>
          <div class="min-w-0">
            <h4 class="text-xs sm:text-sm font-bold text-white truncate">${escapeHtml(friendObj.name)}</h4>
            <p class="text-[11px] text-apple-graySub font-mono">@${escapeHtml(friendObj.username)}</p>
          </div>
        </div>

        <div class="flex items-center space-x-1.5">
          <button class="view-friend-cal-btn px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition flex items-center space-x-1" data-username="${friendObj.username}">
            <i data-lucide="calendar" class="w-3.5 h-3.5 text-apple-accent"></i>
            <span>${dict.navCalendar}</span>
          </button>
          <button class="remove-friend-btn p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 transition" data-username="${friendObj.username}">
            <i data-lucide="user-x" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;

      friendsGrid.appendChild(card);
    });

    friendsGrid.querySelectorAll('.view-friend-cal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        viewingUsername = e.currentTarget.getAttribute('data-username');
        switchTab('calendar');
        updateUserDisplays();
        renderCalendar();
      });
    });

    friendsGrid.querySelectorAll('.remove-friend-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        removeFriendFromCurrentUser(e.currentTarget.getAttribute('data-username'));
      });
    });

    refreshIcons();
  }

  function addFriendToCurrentUser(username) {
    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername) return;

    if (cleanUsername === currentUsername.toLowerCase()) {
      showToast('You cannot add yourself as a friend.', 'error');
      return;
    }

    if (!friendsMap[currentUsername]) friendsMap[currentUsername] = [];

    if (friendsMap[currentUsername].includes(cleanUsername)) {
      showToast(`@${cleanUsername} is already in your friends list.`, 'info');
      return;
    }

    friendsMap[currentUsername].push(cleanUsername);
    saveToStorage(STORAGE_KEY_FRIENDS, friendsMap);

    updateUserDisplays();
    renderFriends();
    showToast(`Added @${cleanUsername}!`, 'success');
  }

  function removeFriendFromCurrentUser(username) {
    if (friendsMap[currentUsername]) {
      friendsMap[currentUsername] = friendsMap[currentUsername].filter(u => u.toLowerCase() !== username.toLowerCase());
      saveToStorage(STORAGE_KEY_FRIENDS, friendsMap);
      renderFriends();
      updateUserDisplays();
      showToast(`Removed @${username}.`, 'info');
    }
  }

  // --- FRIENDS MODAL ---
  function openAddFriendModal() {
    addFriendModal.classList.remove('hidden');
    setTimeout(() => addFriendModal.classList.add('modal-open'), 10);
    refreshIcons();
  }

  function closeAddFriendModal() {
    addFriendModal.classList.remove('modal-open');
    setTimeout(() => addFriendModal.classList.add('hidden'), 300);
  }

  function handleAddFriend(e) {
    e.preventDefault();
    const handle = friendUsernameInput.value.trim();
    if (handle) {
      addFriendToCurrentUser(handle);
      friendUsernameInput.value = '';
      closeAddFriendModal();
    }
  }

  // --- AUTH & ACCOUNT SWITCHER ---
  function openAuthModal() {
    renderRegisteredUsersList();
    authModal.classList.remove('hidden');
    setTimeout(() => authModal.classList.add('modal-open'), 10);
    refreshIcons();
  }

  function closeAuthModal() {
    authModal.classList.remove('modal-open');
    setTimeout(() => authModal.classList.add('hidden'), 300);
  }

  function renderRegisteredUsersList() {
    registeredUsersList.innerHTML = '';
    users.forEach(u => {
      const isCurrent = u.username.toLowerCase() === currentUsername.toLowerCase();
      const item = document.createElement('div');
      item.className = `p-2.5 sm:p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
        isCurrent ? 'bg-purple-600/20 border-purple-500/40 text-white' : 'bg-black/40 border-white/10 hover:bg-white/10 text-zinc-300'
      }`;

      item.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr ${u.color || 'from-blue-600 to-indigo-600'} text-white flex items-center justify-center font-bold text-xs overflow-hidden">
            ${u.pfpType === 'url' && u.pfpUrl ? `<img src="${escapeHtml(u.pfpUrl)}" class="w-full h-full object-cover">` : getInitials(u.name)}
          </div>
          <div>
            <div class="text-xs font-bold text-white">${escapeHtml(u.name)}</div>
            <div class="text-[10px] text-apple-graySub font-mono">@${escapeHtml(u.username)}</div>
          </div>
        </div>
        ${isCurrent ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500 text-white">Active</span>' : ''}
      `;

      item.addEventListener('click', () => {
        currentUsername = u.username;
        viewingUsername = u.username;
        saveToStorage(STORAGE_KEY_CURRENT_USER, currentUsername);
        closeAuthModal();
        updateUserDisplays();
        renderCalendar();
        showToast(`Switched profile to ${u.name}`, 'success');
      });

      registeredUsersList.appendChild(item);
    });
  }

  function handleCreateAccount(e) {
    e.preventDefault();
    const handle = newUsername.value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    const name = newDisplayName.value.trim();
    const pfpType = pfpTypeSelect.value;
    const pfpUrl = pfpUrlInput.value.trim();

    if (!handle || !name) {
      showToast('Please enter a valid handle and display name.', 'error');
      return;
    }

    let targetUser = users.find(u => u.username.toLowerCase() === handle);

    if (targetUser) {
      targetUser.name = name;
      targetUser.pfpType = pfpType;
      targetUser.pfpUrl = pfpUrl;
      currentUsername = handle;
    } else {
      const colors = ['from-blue-600 to-indigo-600', 'from-purple-600 to-pink-600', 'from-emerald-600 to-teal-600', 'from-orange-500 to-amber-600'];
      const newUser = {
        username: handle,
        name: name,
        bio: 'Open for appointments.',
        color: colors[Math.floor(Math.random() * colors.length)],
        privacyShowDetails: true,
        pfpType: pfpType,
        pfpUrl: pfpUrl
      };
      users.push(newUser);
      currentUsername = handle;
    }

    saveToStorage(STORAGE_KEY_USERS, users);
    viewingUsername = currentUsername;
    saveToStorage(STORAGE_KEY_CURRENT_USER, currentUsername);

    newUsername.value = '';
    newDisplayName.value = '';
    pfpUrlInput.value = '';

    closeAuthModal();
    updateUserDisplays();
    renderCalendar();
    showToast(`Account registered: ${name} (@${currentUsername})`, 'success');
  }

  // --- SHARE LINK ---
  function copyShareLink() {
    const url = new URL(window.location.href);
    url.searchParams.set('user', viewingUsername);

    navigator.clipboard.writeText(url.toString()).then(() => {
      showToast(`Shareable calendar link copied!`, 'success');
    }).catch(() => {
      showToast(`Calendar link: ${url.toString()}`, 'info');
    });
  }

  document.addEventListener('DOMContentLoaded', init);

})();
