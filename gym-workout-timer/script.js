const i18n = {
  pl: {
    hero_tagline:         'Aplikacja na zegarki Garmin do prowadzenia treningów siłowych.',
    settings_heading:     'Konfiguracja planów treningowych',
    settings_tile_title:  'Settings UI',
    settings_tile_desc:   'Twórz plany, konfiguruj ćwiczenia i generuj ciąg konfiguracyjny do aplikacji.',

    about_heading: 'O aplikacji',
    about_p1: 'Gym Workout Timer to aplikacja na zegarki Garmin z platformą Connect IQ, która prowadzi Cię krok po kroku przez trening siłowy na siłowni.',
    about_p2: 'Wyświetla nazwę ćwiczenia, numer aktualnej serii i automatycznie odlicza czas odpoczynku między seriami — tak abyś mógł skupić się wyłącznie na treningu.',
    about_p3: 'Plany treningowe konfigurujesz za pomocą Settings UI w przeglądarce, a następnie wgrywasz je do aplikacji przez Garmin Connect Mobile.',

    // ── Tworzenie planu ──
    create_heading: 'Tworzenie planu treningowego',
    create_intro:   'Plan to zestaw ćwiczeń wykonywanych kolejno. Możesz stworzyć wiele planów (np. Push, Pull, Nogi) i zapisać je wszystkie w jednym ciągu konfiguracyjnym.',

    c_s1_title: 'Nadaj nazwę planowi',
    c_s1_desc:  'Wpisz nazwę w polu Plan Name (np. „Push Day", „Nogi"). Maksymalnie 30 znaków.',

    c_s2_title:          'Dodaj ćwiczenia',
    c_s2_desc:           'Kliknij „+ Add Exercise" — otworzy się okno wyboru ćwiczenia z dwoma trybami:',
    c_s2_lib_badge:      'Z biblioteki',
    c_s2_lib_desc:       'Szukaj po nazwie lub filtruj po grupie mięśniowej i sprzęcie. Kliknij ćwiczenie, by wybrać je i przejść do ustawiania parametrów.',
    c_s2_custom_badge:   'Własne',
    c_s2_custom_desc:    'Zakładka Custom — wpisz dowolną nazwę ćwiczenia i kliknij Add.',

    c_s3_title:    'Ustaw parametry ćwiczenia',
    c_s3_desc:     'Po wybraniu ćwiczenia pojawia się panel z czterema parametrami:',
    c_p_sets_label: 'Serie',
    c_p_sets_desc:  'Ile razy wykonać ćwiczenie podczas treningu.',
    c_p_reps_label: 'Powtórzenia',
    c_p_reps_desc:  'Liczba powtórzeń w serii. Zaznacz MAX — zegarek nie odlicza, ćwiczysz do upadku.',
    c_p_rest_label: 'Odpoczynek',
    c_p_rest_desc:  'Czas przerwy (w sekundach) odliczany automatycznie po każdej serii.',
    c_p_work_label: 'Czas pracy',
    c_p_work_desc:  'Dla ćwiczeń na czas (plank, hollow hold). 0 = brak limitu czasu pracy.',
    c_s3_confirm:  'Gdy parametry są gotowe, kliknij „Add to Plan".',

    c_s4_title: 'Edytuj i zmieniaj kolejność',
    c_s4_desc:  'Kliknij dowolne ćwiczenie na liście — otworzy się okno edycji. Możesz zmienić parametry, przesunąć ćwiczenie w górę lub w dół, albo je usunąć.',

    c_s5_title: 'Loop training (opcjonalnie)',
    c_s5_desc:  'Zaznacz „Loop training" i podaj liczbę powtórzeń (2–20), jeśli zegarek ma automatycznie powtórzyć cały plan kilka razy z rzędu.',

    c_s6_title: 'Dodaj plan do listy',
    c_s6_desc:  'Kliknij „Add Plan to List" — plan trafia do Listy Planów, a edytor czysty czeka na kolejny trening. Powtórz kroki 1–6 dla każdego planu.',

    // ── Lista planów ──
    list_heading: 'Lista planów',
    list_intro:   'Wszystkie gotowe treningi zbierają się na Liście Planów. Co możesz tam zrobić:',
    list_f1_title: 'Edytuj plan',
    list_f1_desc:  'Kliknij nazwę planu → wczyta się z powrotem do edytora. Wprowadź zmiany i kliknij „Add Plan to List" ponownie.',
    list_f2_title: 'Usuń plan',
    list_f2_desc:  'Kliknij ✕ przy planie, by usunąć go z listy.',
    list_f3_title: 'Generuj ciąg konfiguracyjny',
    list_f3_desc:  'Kliknij „Generate Config String" — wszystkie plany z listy zostaną spakowane w jeden ciąg gotowy do wklejenia w Garmin Connect Mobile.',
    list_f4_title: 'Historia generowań',
    list_f4_desc:  'Ostatnie 10 wygenerowanych ciągów jest zapisywane automatycznie. Możesz je skopiować lub wczytać w dowolnym momencie.',

    // ── Wczytywanie z ciągu ──
    import_heading: 'Wczytywanie planu z ciągu',
    import_intro:   'Masz gotowy ciąg konfiguracyjny z poprzedniej sesji lub od innej osoby? Załadujesz go bez ręcznego wpisywania ćwiczeń.',
    imp_s1_title: 'Wklej ciąg w pole na górze',
    imp_s1_desc:  'W sekcji „Load plan from string" wklej skopiowany ciąg konfiguracyjny.',
    imp_s2_title: 'Kliknij „Load & Edit"',
    imp_s2_desc:  'Plan wczytuje się do edytora — zobaczysz nazwę, listę ćwiczeń i parametry. Możesz swobodnie edytować wszystko przed zapisem.',
    imp_s3_title: 'Dodaj do listy i generuj',
    imp_s3_desc:  'Po ewentualnych zmianach kliknij „Add Plan to List", a następnie „Generate Config String", by uzyskać gotowy ciąg do wklejenia w zegarek.',

    // ── Wgrywanie na zegarek ──
    watch_heading: 'Wgrywanie planów na zegarek',
    w_s1_title: 'Skopiuj ciąg konfiguracyjny',
    w_s1_desc:  'Po kliknięciu „Generate Config String" pojawi się ciąg tekstowy. Kliknij „Copy to clipboard".',
    w_s2_title: 'Wklej w Garmin Connect Mobile',
    w_s2_desc:  'W aplikacji Garmin Connect Mobile przejdź do: Moje Urządzenie → Aplikacje → GymWorkoutTimer → Ustawienia. Wklej tekst w pole „Plan Configuration" i zapisz.',
    w_s3_title: 'Zsynchronizuj zegarek i trenuj',
    w_s3_desc:  'Zsynchronizuj zegarek z Garmin Connect. Plany pojawią się na ekranie SELECT PLAN — wybierz trening, naciśnij Start i daj się poprowadzić.',

    req_heading: 'Wymagania',
    req1: 'Zegarek Garmin z obsługą Connect IQ',
    req2: 'Aplikacja Garmin Connect Mobile (iOS lub Android)',
    req3: 'Przeglądarka internetowa (do Settings UI)',
    cta_btn:   'Otwórz Settings UI',
    contact:   'Kontakt',
    copyright: '© 2026 MonkiAppps. Wszelkie prawa zastrzeżone.',
  },

  en: {
    hero_tagline:         'A Garmin watch app for guided strength training.',
    settings_heading:     'Workout Plan Configuration',
    settings_tile_title:  'Settings UI',
    settings_tile_desc:   'Build plans, configure exercises, and generate a config string for the app.',

    about_heading: 'About the App',
    about_p1: 'Gym Workout Timer is a Garmin Connect IQ app that guides you step by step through your strength training session at the gym.',
    about_p2: 'It displays the exercise name, current set number, and automatically counts down rest time between sets — so you can stay fully focused on training.',
    about_p3: 'Workout plans are configured using the Settings UI in your browser, then loaded into the app via Garmin Connect Mobile.',

    // ── Creating a plan ──
    create_heading: 'Creating a Workout Plan',
    create_intro:   'A plan is a sequence of exercises performed one after another. You can create multiple plans (e.g. Push, Pull, Legs) and store them all in a single config string.',

    c_s1_title: 'Give the plan a name',
    c_s1_desc:  'Type a name in the Plan Name field (e.g. "Push Day", "Legs"). Maximum 30 characters.',

    c_s2_title:          'Add exercises',
    c_s2_desc:           'Click "+ Add Exercise" — a modal opens with two modes:',
    c_s2_lib_badge:      'From library',
    c_s2_lib_desc:       'Search by name or filter by muscle group and equipment. Click an exercise to select it and open the parameters panel.',
    c_s2_custom_badge:   'Custom',
    c_s2_custom_desc:    'Switch to the Custom tab, type any exercise name, and click Add.',

    c_s3_title:    'Set exercise parameters',
    c_s3_desc:     'After selecting an exercise, a panel appears with four parameters:',
    c_p_sets_label: 'Sets',
    c_p_sets_desc:  'How many times to perform the exercise during the workout.',
    c_p_reps_label: 'Reps',
    c_p_reps_desc:  'Number of reps per set. Check MAX — the watch won\'t count, you go until failure.',
    c_p_rest_label: 'Rest',
    c_p_rest_desc:  'Rest time in seconds, counted down automatically after each set.',
    c_p_work_label: 'Work time',
    c_p_work_desc:  'For timed exercises (plank, hollow hold). 0 = no time limit.',
    c_s3_confirm:  'When the parameters are ready, click "Add to Plan".',

    c_s4_title: 'Edit and reorder',
    c_s4_desc:  'Click any exercise in the list — an edit modal opens. You can change parameters, move the exercise up or down, or remove it.',

    c_s5_title: 'Loop training (optional)',
    c_s5_desc:  'Check "Loop training" and set the number of repeats (2–20) if you want the watch to automatically repeat the entire plan multiple times.',

    c_s6_title: 'Add plan to list',
    c_s6_desc:  'Click "Add Plan to List" — the plan moves to the Plan List and the editor resets for the next plan. Repeat steps 1–6 for each workout.',

    // ── Plan list ──
    list_heading: 'Plan List',
    list_intro:   'All finished workouts collect in the Plan List. What you can do there:',
    list_f1_title: 'Edit a plan',
    list_f1_desc:  'Click the plan name → it loads back into the editor. Make changes and click "Add Plan to List" again.',
    list_f2_title: 'Delete a plan',
    list_f2_desc:  'Click ✕ next to a plan to remove it from the list.',
    list_f3_title: 'Generate config string',
    list_f3_desc:  'Click "Generate Config String" — all plans in the list are packed into one string ready to paste into Garmin Connect Mobile.',
    list_f4_title: 'Generation history',
    list_f4_desc:  'The last 10 generated strings are saved automatically. You can copy or reload any of them at any time.',

    // ── Import from string ──
    import_heading: 'Loading a Plan from a String',
    import_intro:   'Have a config string from a previous session or from someone else? Load it without typing exercises manually.',
    imp_s1_title: 'Paste the string at the top',
    imp_s1_desc:  'In the "Load plan from string" section, paste your copied config string.',
    imp_s2_title: 'Click "Load & Edit"',
    imp_s2_desc:  'The plan loads into the editor — you\'ll see the name, exercise list, and parameters. Edit anything before saving.',
    imp_s3_title: 'Add to list and generate',
    imp_s3_desc:  'After any changes click "Add Plan to List", then "Generate Config String" to get a fresh string to paste into your watch.',

    // ── Watch sync ──
    watch_heading: 'Uploading Plans to Your Watch',
    w_s1_title: 'Copy the config string',
    w_s1_desc:  'After clicking "Generate Config String" the output appears. Click "Copy to clipboard".',
    w_s2_title: 'Paste into Garmin Connect Mobile',
    w_s2_desc:  'In the Garmin Connect Mobile app go to: My Device → Apps → GymWorkoutTimer → Settings. Paste the text into the "Plan Configuration" field and save.',
    w_s3_title: 'Sync your watch and train',
    w_s3_desc:  'Sync the watch with Garmin Connect. Plans appear on the SELECT PLAN screen — pick a workout, press Start, and let the app guide you.',

    req_heading: 'Requirements',
    req1: 'Garmin watch with Connect IQ support',
    req2: 'Garmin Connect Mobile app (iOS or Android)',
    req3: 'A web browser (for the Settings UI)',
    cta_btn:   'Open Settings UI',
    contact:   'Contact',
    copyright: '© 2026 MonkiAppps. All rights reserved.',
  },

  de: {
    hero_tagline:         'Eine Garmin-Uhren-App für geführtes Krafttraining.',
    settings_heading:     'Trainingsplan-Konfiguration',
    settings_tile_title:  'Settings UI',
    settings_tile_desc:   'Pläne erstellen, Übungen konfigurieren und einen Konfigurations-String generieren.',

    about_heading: 'Über die App',
    about_p1: 'Gym Workout Timer ist eine Garmin Connect IQ App, die dich Schritt für Schritt durch dein Krafttraining im Fitnessstudio führt.',
    about_p2: 'Sie zeigt den Übungsnamen, die aktuelle Satznummer und zählt die Pausenzeit automatisch herunter — damit du dich voll auf das Training konzentrieren kannst.',
    about_p3: 'Trainingspläne werden über das Settings UI im Browser konfiguriert und dann per Garmin Connect Mobile in die App geladen.',

    // ── Plan erstellen ──
    create_heading: 'Trainingsplan erstellen',
    create_intro:   'Ein Plan ist eine Folge von Übungen, die nacheinander ausgeführt werden. Du kannst mehrere Pläne (z.B. Push, Pull, Beine) erstellen und alle in einem einzigen Config-String speichern.',

    c_s1_title: 'Plan benennen',
    c_s1_desc:  'Gib einen Namen im Feld Plan Name ein (z.B. „Push Day", „Beine"). Maximal 30 Zeichen.',

    c_s2_title:          'Übungen hinzufügen',
    c_s2_desc:           'Klicke auf „+ Add Exercise" — ein Fenster öffnet sich mit zwei Modi:',
    c_s2_lib_badge:      'Aus Bibliothek',
    c_s2_lib_desc:       'Nach Name suchen oder nach Muskelgruppe und Equipment filtern. Übung anklicken, um sie auszuwählen und das Parameter-Panel zu öffnen.',
    c_s2_custom_badge:   'Eigene',
    c_s2_custom_desc:    'Tab Custom — beliebigen Übungsnamen eingeben und Add klicken.',

    c_s3_title:    'Parameter der Übung einstellen',
    c_s3_desc:     'Nach der Auswahl erscheint ein Panel mit vier Parametern:',
    c_p_sets_label: 'Sätze',
    c_p_sets_desc:  'Wie oft die Übung beim Training ausgeführt wird.',
    c_p_reps_label: 'Wiederholungen',
    c_p_reps_desc:  'Wiederholungen pro Satz. MAX aktivieren — die Uhr zählt nicht, du trainierst bis zum Versagen.',
    c_p_rest_label: 'Pause',
    c_p_rest_desc:  'Pausenzeit in Sekunden, die nach jedem Satz automatisch heruntergezählt wird.',
    c_p_work_label: 'Arbeitszeit',
    c_p_work_desc:  'Für zeitbasierte Übungen (Plank, Hollow Hold). 0 = kein Zeitlimit.',
    c_s3_confirm:  'Wenn die Parameter bereit sind, auf „Add to Plan" klicken.',

    c_s4_title: 'Bearbeiten und Reihenfolge ändern',
    c_s4_desc:  'Klicke auf eine Übung in der Liste — ein Bearbeitungsfenster öffnet sich. Parameter ändern, Übung nach oben/unten verschieben oder löschen.',

    c_s5_title: 'Loop training (optional)',
    c_s5_desc:  '„Loop training" aktivieren und Anzahl (2–20) eingeben, wenn die Uhr den gesamten Plan mehrmals wiederholen soll.',

    c_s6_title: 'Plan zur Liste hinzufügen',
    c_s6_desc:  '„Add Plan to List" klicken — der Plan wird zur Planliste hinzugefügt und der Editor wartet auf den nächsten Plan. Schritte 1–6 für jeden Plan wiederholen.',

    // ── Planliste ──
    list_heading: 'Planliste',
    list_intro:   'Alle fertigen Pläne sammeln sich in der Planliste. Was du dort tun kannst:',
    list_f1_title: 'Plan bearbeiten',
    list_f1_desc:  'Plannamen klicken → wird wieder in den Editor geladen. Änderungen vornehmen und erneut „Add Plan to List" klicken.',
    list_f2_title: 'Plan löschen',
    list_f2_desc:  '✕ neben dem Plan klicken, um ihn aus der Liste zu entfernen.',
    list_f3_title: 'Config-String generieren',
    list_f3_desc:  '„Generate Config String" klicken — alle Pläne der Liste werden in einen String gepackt, der in Garmin Connect Mobile eingefügt werden kann.',
    list_f4_title: 'Generierungsverlauf',
    list_f4_desc:  'Die letzten 10 generierten Strings werden automatisch gespeichert. Jederzeit kopieren oder neu laden.',

    // ── Import ──
    import_heading: 'Plan aus String laden',
    import_intro:   'Du hast einen fertigen Config-String aus einer früheren Sitzung oder von jemand anderem? Lade ihn ohne manuelle Eingabe der Übungen.',
    imp_s1_title: 'String oben einfügen',
    imp_s1_desc:  'Im Abschnitt „Load plan from string" den kopierten Config-String einfügen.',
    imp_s2_title: '„Load & Edit" klicken',
    imp_s2_desc:  'Der Plan wird in den Editor geladen — Name, Übungsliste und Parameter sind sichtbar. Alles kann vor dem Speichern bearbeitet werden.',
    imp_s3_title: 'Zur Liste hinzufügen und generieren',
    imp_s3_desc:  'Nach den Änderungen „Add Plan to List" klicken, dann „Generate Config String" für den fertigen String.',

    // ── Uhr ──
    watch_heading: 'Pläne auf die Uhr laden',
    w_s1_title: 'Config-String kopieren',
    w_s1_desc:  'Nach dem Klicken auf „Generate Config String" erscheint der Output. „Copy to clipboard" klicken.',
    w_s2_title: 'In Garmin Connect Mobile einfügen',
    w_s2_desc:  'In der Garmin Connect Mobile App: Mein Gerät → Apps → GymWorkoutTimer → Einstellungen. Text in „Plan Configuration" einfügen und speichern.',
    w_s3_title: 'Uhr synchronisieren und trainieren',
    w_s3_desc:  'Uhr mit Garmin Connect synchronisieren. Pläne erscheinen im SELECT PLAN Bildschirm — Training auswählen, Start drücken und von der App führen lassen.',

    req_heading: 'Voraussetzungen',
    req1: 'Garmin-Uhr mit Connect IQ Unterstützung',
    req2: 'Garmin Connect Mobile App (iOS oder Android)',
    req3: 'Webbrowser (für das Settings UI)',
    cta_btn:   'Settings UI öffnen',
    contact:   'Kontakt',
    copyright: '© 2026 MonkiAppps. Alle Rechte vorbehalten.',
  },

  es: {
    hero_tagline:         'Una app para relojes Garmin para entrenamientos de fuerza guiados.',
    settings_heading:     'Configuración de planes de entrenamiento',
    settings_tile_title:  'Settings UI',
    settings_tile_desc:   'Crea planes, configura ejercicios y genera la cadena de configuración para la app.',

    about_heading: 'Sobre la App',
    about_p1: 'Gym Workout Timer es una app de Garmin Connect IQ que te guía paso a paso durante tu entrenamiento de fuerza en el gimnasio.',
    about_p2: 'Muestra el nombre del ejercicio, el número de serie actual y cuenta regresiva el tiempo de descanso automáticamente — para que puedas enfocarte completamente en entrenar.',
    about_p3: 'Los planes de entrenamiento se configuran con el Settings UI en el navegador y se cargan en la app a través de Garmin Connect Mobile.',

    // ── Crear plan ──
    create_heading: 'Crear un plan de entrenamiento',
    create_intro:   'Un plan es una secuencia de ejercicios realizados uno tras otro. Puedes crear varios planes (p.ej. Push, Pull, Piernas) y guardarlos todos en una sola cadena de configuración.',

    c_s1_title: 'Dale un nombre al plan',
    c_s1_desc:  'Escribe un nombre en el campo Plan Name (p.ej. "Push Day", "Piernas"). Máximo 30 caracteres.',

    c_s2_title:          'Añade ejercicios',
    c_s2_desc:           'Haz clic en "+ Add Exercise" — se abre una ventana con dos modos:',
    c_s2_lib_badge:      'De la biblioteca',
    c_s2_lib_desc:       'Busca por nombre o filtra por grupo muscular y equipamiento. Haz clic en un ejercicio para seleccionarlo y abrir el panel de parámetros.',
    c_s2_custom_badge:   'Personalizado',
    c_s2_custom_desc:    'Pestaña Custom — escribe cualquier nombre de ejercicio y haz clic en Add.',

    c_s3_title:    'Configura los parámetros del ejercicio',
    c_s3_desc:     'Tras seleccionar un ejercicio aparece un panel con cuatro parámetros:',
    c_p_sets_label: 'Series',
    c_p_sets_desc:  'Cuántas veces realizar el ejercicio durante el entrenamiento.',
    c_p_reps_label: 'Repeticiones',
    c_p_reps_desc:  'Número de reps por serie. Marca MAX — el reloj no cuenta, entrenas hasta el fallo.',
    c_p_rest_label: 'Descanso',
    c_p_rest_desc:  'Tiempo de descanso en segundos, contado regresivamente automáticamente tras cada serie.',
    c_p_work_label: 'Tiempo de trabajo',
    c_p_work_desc:  'Para ejercicios cronometrados (plancha, hollow hold). 0 = sin límite de tiempo.',
    c_s3_confirm:  'Cuando los parámetros estén listos, haz clic en "Add to Plan".',

    c_s4_title: 'Editar y reordenar',
    c_s4_desc:  'Haz clic en cualquier ejercicio de la lista — se abre un modal de edición. Puedes cambiar parámetros, mover el ejercicio arriba o abajo, o eliminarlo.',

    c_s5_title: 'Loop training (opcional)',
    c_s5_desc:  'Marca "Loop training" e indica el número de repeticiones (2–20) si quieres que el reloj repita el plan completo varias veces seguidas.',

    c_s6_title: 'Añadir plan a la lista',
    c_s6_desc:  'Haz clic en "Add Plan to List" — el plan se guarda en la Lista de Planes y el editor se reinicia para el siguiente entrenamiento. Repite los pasos 1–6 para cada plan.',

    // ── Lista de planes ──
    list_heading: 'Lista de planes',
    list_intro:   'Todos los entrenamientos terminados se acumulan en la Lista de Planes. Lo que puedes hacer allí:',
    list_f1_title: 'Editar un plan',
    list_f1_desc:  'Haz clic en el nombre del plan → se carga de vuelta en el editor. Realiza cambios y vuelve a hacer clic en "Add Plan to List".',
    list_f2_title: 'Eliminar un plan',
    list_f2_desc:  'Haz clic en ✕ junto al plan para eliminarlo de la lista.',
    list_f3_title: 'Generar cadena de configuración',
    list_f3_desc:  'Haz clic en "Generate Config String" — todos los planes de la lista se empaquetan en una cadena lista para pegar en Garmin Connect Mobile.',
    list_f4_title: 'Historial de generaciones',
    list_f4_desc:  'Las últimas 10 cadenas generadas se guardan automáticamente. Puedes copiarlas o recargarlas en cualquier momento.',

    // ── Importar ──
    import_heading: 'Cargar un plan desde una cadena',
    import_intro:   '¿Tienes una cadena de configuración de una sesión anterior o de otra persona? Cárgala sin introducir ejercicios manualmente.',
    imp_s1_title: 'Pega la cadena arriba',
    imp_s1_desc:  'En la sección "Load plan from string" pega la cadena de configuración copiada.',
    imp_s2_title: 'Haz clic en "Load & Edit"',
    imp_s2_desc:  'El plan se carga en el editor — verás el nombre, la lista de ejercicios y los parámetros. Puedes editar todo antes de guardar.',
    imp_s3_title: 'Añadir a la lista y generar',
    imp_s3_desc:  'Tras los cambios haz clic en "Add Plan to List" y luego en "Generate Config String" para obtener la cadena lista para el reloj.',

    // ── Reloj ──
    watch_heading: 'Cargar planes en el reloj',
    w_s1_title: 'Copia la cadena de configuración',
    w_s1_desc:  'Tras hacer clic en "Generate Config String" aparece el resultado. Haz clic en "Copy to clipboard".',
    w_s2_title: 'Pega en Garmin Connect Mobile',
    w_s2_desc:  'En la app Garmin Connect Mobile ve a: Mi Dispositivo → Apps → GymWorkoutTimer → Ajustes. Pega el texto en "Plan Configuration" y guarda.',
    w_s3_title: 'Sincroniza el reloj y entrena',
    w_s3_desc:  'Sincroniza el reloj con Garmin Connect. Los planes aparecen en la pantalla SELECT PLAN — elige un entrenamiento, pulsa Start y deja que la app te guíe.',

    req_heading: 'Requisitos',
    req1: 'Reloj Garmin con soporte Connect IQ',
    req2: 'App Garmin Connect Mobile (iOS o Android)',
    req3: 'Navegador web (para el Settings UI)',
    cta_btn:   'Abrir Settings UI',
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

const saved = localStorage.getItem('lang');
const browser = navigator.language?.slice(0, 2);
applyLang(saved || (i18n[browser] ? browser : 'pl'));
