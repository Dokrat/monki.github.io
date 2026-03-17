const i18n = {
  pl: {
    tagline:   'Simple apps. Serious results.',
    gwt_desc:  'Twórz plany treningowe używane przez aplikację Gym Workout Timer w Garmin Connect IQ.',
    contact:   'Kontakt',
    copyright: '© 2026 MonkiAppps. Wszelkie prawa zastrzeżone.',
  },
  en: {
    tagline:   'Simple apps. Serious results.',
    gwt_desc:  'Build workout plans used by the Gym Workout Timer app on Garmin Connect IQ.',
    contact:   'Contact',
    copyright: '© 2026 MonkiAppps. All rights reserved.',
  },
  de: {
    tagline:   'Einfache Apps. Ernste Ergebnisse.',
    gwt_desc:  'Erstelle Trainingspläne für die Gym Workout Timer App auf Garmin Connect IQ.',
    contact:   'Kontakt',
    copyright: '© 2026 MonkiAppps. Alle Rechte vorbehalten.',
  },
  es: {
    tagline:   'Apps simples. Resultados serios.',
    gwt_desc:  'Crea planes de entrenamiento para la app Gym Workout Timer en Garmin Connect IQ.',
    contact:   'Contacto',
    copyright: '© 2026 MonkiAppps. Todos los derechos reservados.',
  },
};

function applyLang(lang) {
  const dict = i18n[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
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

// Restore saved language or fall back to browser preference
const saved = localStorage.getItem('lang');
const browser = navigator.language?.slice(0, 2);
applyLang(saved || (i18n[browser] ? browser : 'pl'));
