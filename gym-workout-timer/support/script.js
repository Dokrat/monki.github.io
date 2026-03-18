const i18n = {
  pl: {
    sp_title:      'Wesprzyj Gym Workout Timer',
    sp_desc:       'Jeśli aplikacja Ci się podoba, możesz wesprzeć jej rozwój przez jedną z poniższych platform.',
    sp_info_1:     'W wiadomości wpisz adres e-mail oraz ID urządzenia.',
    sp_info_2:     'Ustawienia → System → O systemie → ID urz. (10 cyfr)',
    sp_info_3:     'W razie problemów: monki.appps@gmail.com',
    sp_choose:     'Wybierz platformę',
    sp_suppi_desc: 'Wspomóż rozwój aplikacji poprzez subskrypcję lub jednorazową wpłatę.',
    sp_kofi_desc:  'Jednorazowe wsparcie dla rozwoju projektu.',
    contact:       'Kontakt',
    copyright:     '© 2026 MonkiAppps. Wszelkie prawa zastrzeżone.',
  },

  en: {
    sp_title:      'Support Gym Workout Timer',
    sp_desc:       'If you enjoy the app, you can support its development through one of the platforms below.',
    sp_info_1:     'Include your email address and device ID in the message.',
    sp_info_2:     'Settings → System → About → Device ID (10 digits)',
    sp_info_3:     'If you have issues: monki.appps@gmail.com',
    sp_choose:     'Choose a platform',
    sp_suppi_desc: 'Support the app development through a subscription or one-time payment.',
    sp_kofi_desc:  'One-time support for project development.',
    contact:       'Contact',
    copyright:     '© 2026 MonkiAppps. All rights reserved.',
  },

  de: {
    sp_title:      'Gym Workout Timer unterstützen',
    sp_desc:       'Wenn dir die App gefällt, kannst du ihre Entwicklung über eine der folgenden Plattformen unterstützen.',
    sp_info_1:     'Gib in der Nachricht deine E-Mail-Adresse und Geräte-ID an.',
    sp_info_2:     'Einstellungen → System → Über → Geräte-ID (10 Ziffern)',
    sp_info_3:     'Bei Problemen: monki.appps@gmail.com',
    sp_choose:     'Plattform wählen',
    sp_suppi_desc: 'Unterstütze die App-Entwicklung durch ein Abo oder eine Einmalzahlung.',
    sp_kofi_desc:  'Einmalige Unterstützung für die Projektentwicklung.',
    contact:       'Kontakt',
    copyright:     '© 2026 MonkiAppps. Alle Rechte vorbehalten.',
  },

  es: {
    sp_title:      'Apoya Gym Workout Timer',
    sp_desc:       'Si te gusta la app, puedes apoyar su desarrollo a través de una de las plataformas siguientes.',
    sp_info_1:     'Incluye tu dirección de correo e ID del dispositivo en el mensaje.',
    sp_info_2:     'Ajustes → Sistema → Acerca de → ID disp. (10 dígitos)',
    sp_info_3:     'Si tienes problemas: monki.appps@gmail.com',
    sp_choose:     'Elige una plataforma',
    sp_suppi_desc: 'Apoya el desarrollo de la app con una suscripción o pago único.',
    sp_kofi_desc:  'Apoyo único para el desarrollo del proyecto.',
    contact:       'Contacto',
    copyright:     '© 2026 MonkiAppps. Todos los derechos reservados.',
  },
};

function applyLang(lang) {
  const dict = i18n[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) {
      // preserve inner <a> links
      const link = el.querySelector('a');
      if (link) {
        el.childNodes.forEach(n => { if (n.nodeType === 3) n.remove(); });
        el.insertBefore(document.createTextNode(dict[key].replace(/monki\.appps@gmail\.com/, '')), link);
      } else {
        el.textContent = dict[key];
      }
    }
  });

  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

const saved = localStorage.getItem('lang');
const browser = navigator.language?.slice(0, 2);
applyLang(saved || (i18n[browser] ? browser : 'pl'));
