const i18n = {
  pl: {
    hero_tagline:         'Aplikacja do konfiguracji oraz prowadzenia treningów siłowych, prosta i szybka.',
    settings_heading:     'Konfiguracja planów treningowych',
    settings_tile_title:  'Settings UI',
    settings_tile_desc:   'Twórz plany, konfiguruj ćwiczenia i generuj ciąg konfiguracyjny do aplikacji.',

    // ── Wsparcie ──
    support_heading:      'Wsparcie',
    support_tile_title:   'Wesprzyj aplikację',
    support_tile_desc:    'Wybierz sposób wsparcia — Suppi/Patronite lub Ko-fi.',
    unlock_lead:          'Jeśli aplikacja Ci się podoba i działa poprawnie na Twoim urządzeniu, możesz odblokować pełną wersję, stawiając mi kawę.',
    unlock_send:          'Po wsparciu wyślij wiadomość via Ko-fi / Suppi z:',
    unlock_email:         'swoim adresem e-mail,',
    unlock_devid:         'ID urządzenia.',
    unlock_where:         'ID urządzenia znajdziesz tutaj:',
    unlock_path_val:      'Gym Workout Timer → Settings → Unlock App → Your Device ID: (10 cyfr)',
    unlock_code:          'Po otrzymaniu wiadomości wyślę Ci 5-cyfrowy kod odblokowujący.',
    unlock_enter:         'Wpisz go w aplikacji Gym Workout Timer tutaj:',
    unlock_contact:       'W razie problemów proszę o kontakt:',

    // ── Notatka o wersji próbnej ──
    card_trial:      'Aplikacja ma dostęp do wszystkich funkcji, ale w wersji próbnej działa w trybie 15-minutowego treningu. Jeśli Ci się spodoba, możesz odblokować pełną wersję — zobacz jak wspomóc projekt.',
    card_trial_link: 'zobacz jak wspomóc projekt',

    // ── Zalety ──
    zalety_heading: 'Zalety',
    adv1_title: 'Żadnych dodatkowych aplikacji',
    adv1_desc:  'Działa bez żadnych zewnętrznych aplikacji na iOS ani Android — potrzebujesz tylko zegarka Garmin i przeglądarki.',
    adv2_title: 'Szybka konfiguracja',
    adv2_desc:  'Plany tworzysz w przeglądarce przez Settings UI — bez instalacji czegokolwiek.',
    adv2_btn:   'Otwórz Settings UI →',
    adv3_title: 'Najważniejsze dane podczas treningu w jednym miejscu',
    wd1: 'Strefy tętna',
    wd2: 'Nr ćwiczenia / nr obwodu',
    wd3: 'Czas przerwy / czas pracy',
    wd4: 'Aktualne ćwiczenie / następne ćwiczenie',
    wd5: 'Czas całego treningu',
    wd6: 'Zegar',
    adv4_title: 'Plan treningowy jako aktywna lista',
    adv4_desc:  'Ćwiczenia wyświetlane kolejno — zawsze wiesz co teraz i co dalej.',
    adv5_title: 'Wykres HR',
    adv5_desc:  'Podgląd tętna w formie wykresu — zarówno w trakcie treningu, jak i po jego zakończeniu.',

    // ── Konfiguracja ──
    config_heading: 'Konfiguracja',
    cfg1: 'Tworzenie i odtwarzanie planów treningowych',
    cfg2: 'Możliwość dodawania własnych ćwiczeń',
    cfg3: 'Ponad 800 ćwiczeń do wyboru z wbudowanej biblioteki',
    cfg4: 'Każde ćwiczenie w planie ma niezależną konfigurację — czas pracy, przerwy, ilość serii i liczbę powtórzeń',
    cfg5: 'Czas pracy z limitem sekund lub bez limitu',
    cfg6: 'Obsługa treningów obwodowych (circuit training)',

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

    c_s3_title:   'Ustaw parametry ćwiczenia',
    c_s3_simple:  'Ustaw liczbę serii, liczbę powtórzeń (lub MAX — ćwiczysz do upadku bez odliczania), czas przerwy między seriami oraz czas pracy (0 = bez limitu czasu). Każde ćwiczenie w planie konfigurujesz niezależnie.',
    c_s3_confirm: 'Gdy parametry są gotowe, kliknij „Add to Plan".',

    c_s4_title: 'Edytuj i zmieniaj kolejność',
    c_s4_desc:  'Kliknij dowolne ćwiczenie na liście — otworzy się okno edycji. Możesz zmienić parametry, przesunąć ćwiczenie w górę lub w dół, albo je usunąć.',

    c_s5_title: 'Loop training (opcjonalnie)',
    c_s5_desc:  'Zaznacz „Loop training" i podaj liczbę powtórzeń (2–20), jeśli zegarek ma automatycznie powtórzyć cały plan kilka razy z rzędu.',

    c_s6_title: 'Dodaj plan do listy',
    c_s6_desc:  'Kliknij „Add Plan to List" — plan trafia do Listy Planów, a edytor czysty czeka na kolejny trening. Powtórz kroki 1–6 dla każdego planu.',

    c_s7_title: 'Ważna informacja o nazwach planów',
    c_s7_desc:  'Jeśli dodasz plan o takiej samej nazwie co istniejący, zostanie on nadpisany na zegarku. Dobrą praktyką jest zapisanie sobie wygenerowanego ciągu konfiguracyjnego gdzieś w notatniku — dzięki temu będziesz mieć kopię zapasową i będziesz mógł łatwo edytować plany w przyszłości.',

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
    import_heading: 'Wczytywanie wcześniej przygotowanego planu z wyrażenia tekstowego',
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
    req3: 'Przeglądarka internetowa (do Settings UI)',
    cta_btn:   'Otwórz Settings UI',
    contact:   'Kontakt',
    copyright: '© 2026 MonkiAppps. Wszelkie prawa zastrzeżone.',
  },

  en: {
    hero_tagline:         'A simple and fast app for configuring and running strength workouts.',
    settings_heading:     'Workout Plan Configuration',
    settings_tile_title:  'Settings UI',
    settings_tile_desc:   'Build plans, configure exercises, and generate a config string for the app.',

    // ── Support ──
    support_heading:      'Support',
    support_tile_title:   'Support the app',
    support_tile_desc:    'Choose a way to support — Suppi/Patronite or Ko-fi.',
    unlock_lead:          'If you enjoy the app and it works well on your device, you can unlock the full version by buying me a coffee.',
    unlock_send:          'After supporting, send a message via Ko-fi / Suppi with:',
    unlock_email:         'your email address,',
    unlock_devid:         'device ID.',
    unlock_where:         'You can find the device ID here:',
    unlock_path_val:      'Gym Workout Timer → Settings → Unlock App → Your Device ID: (10 digits)',
    unlock_code:          'After receiving your message, I will send you a 5-digit unlock code.',
    unlock_enter:         'Enter it in the Gym Workout Timer app here:',
    unlock_contact:       'If you have any issues, please contact me:',

    // ── Trial version note ──
    card_trial:      'The app has access to all features, but in the trial version it works with a limit to 15-minute workouts. If you like it, you can unlock the full version — see how to support the project.',
    card_trial_link: 'see how to support the project',

    // ── Benefits ──
    zalety_heading: 'Benefits',
    adv1_title: 'No additional apps needed',
    adv1_desc:  'Works without any external apps on iOS or Android — all you need is a Garmin watch and a browser.',
    adv2_title: 'Quick setup',
    adv2_desc:  'Build plans in your browser via the Settings UI — nothing to install.',
    adv2_btn:   'Open Settings UI →',
    adv3_title: 'The most useful training data in one place',
    wd1: 'HR zones',
    wd2: 'Exercise no. / circuit no.',
    wd3: 'Rest time / work time',
    wd4: 'Current exercise / next exercise',
    wd5: 'Total training time',
    wd6: 'Clock',
    adv4_title: 'Workout plan as an active list',
    adv4_desc:  'Exercises displayed one by one — you always know what\'s now and what\'s next.',
    adv5_title: 'HR chart',
    adv5_desc:  'Heart rate chart available both during the workout and after it ends.',

    // ── Features ──
    config_heading: 'Features',
    cfg1: 'Create and play back workout plans',
    cfg2: 'Add your own custom exercises',
    cfg3: 'Choose from over 800 exercises in the built-in library',
    cfg4: 'Every exercise in a plan has its own independent settings — work time, rest, number of sets, and reps',
    cfg5: 'Work time can be set with a second limit or unlimited',
    cfg6: 'Circuit training support',

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

    c_s3_title:   'Set exercise parameters',
    c_s3_simple:  'Set the number of sets, reps (or MAX — train until failure with no countdown), rest time between sets, and work time (0 = no time limit). Every exercise in the plan is configured independently.',
    c_s3_confirm: 'When the parameters are ready, click "Add to Plan".',

    c_s4_title: 'Edit and reorder',
    c_s4_desc:  'Click any exercise in the list — an edit modal opens. You can change parameters, move the exercise up or down, or remove it.',

    c_s5_title: 'Loop training (optional)',
    c_s5_desc:  'Check "Loop training" and set the number of repeats (2–20) if you want the watch to automatically repeat the entire plan multiple times.',

    c_s6_title: 'Add plan to list',
    c_s6_desc:  'Click "Add Plan to List" — the plan moves to the Plan List and the editor resets for the next plan. Repeat steps 1–6 for each workout.',

    c_s7_title: 'Important note about plan names',
    c_s7_desc:  'If you add a plan with the same name as an existing one, it will overwrite the existing plan on your watch. It\'s good practice to save the generated config string somewhere in your notes — this way you\'ll have a backup and can easily edit plans in the future.',

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
    import_heading: 'Loading a previously prepared plan from a text expression',
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
    req3: 'A web browser (for the Settings UI)',
    cta_btn:   'Open Settings UI',
    contact:   'Contact',
    copyright: '© 2026 MonkiAppps. All rights reserved.',
  },

  de: {
    hero_tagline:         'Eine einfache und schnelle App zur Konfiguration und Durchführung von Krafttrainings.',
    settings_heading:     'Trainingsplan-Konfiguration',
    settings_tile_title:  'Settings UI',
    settings_tile_desc:   'Pläne erstellen, Übungen konfigurieren und einen Konfigurations-String generieren.',

    // ── Unterstützung ──
    support_heading:      'Unterstützung',
    support_tile_title:   'App unterstützen',
    support_tile_desc:    'Wähle eine Unterstützungsart — Suppi/Patronite oder Ko-fi.',
    unlock_lead:          'Wenn dir die App gefällt und auf deinem Gerät gut funktioniert, kannst du die Vollversion freischalten, indem du mir einen Kaffee spendierst.',
    unlock_send:          'Sende nach der Unterstützung eine Nachricht über Ko-fi / Suppi mit:',
    unlock_email:         'deiner E-Mail-Adresse,',
    unlock_devid:         'Geräte-ID.',
    unlock_where:         'Die Geräte-ID findest du hier:',
    unlock_path_val:      'Gym Workout Timer → Settings → Unlock App → Your Device ID: (10 Ziffern)',
    unlock_code:          'Nach Erhalt deiner Nachricht sende ich dir einen 5-stelligen Freischaltcode.',
    unlock_enter:         'Gib ihn in der Gym Workout Timer App hier ein:',
    unlock_contact:       'Bei Problemen kontaktiere mich bitte:',

    // ── Testversions-Hinweis ──
    card_trial:      'Die App hat Zugriff auf alle Funktionen, aber in der Testversion funktioniert sie mit einer Beschränkung auf 15-minütige Trainings. Wenn sie dir gefällt, kannst du die Vollversion freischalten — siehe, wie du das Projekt unterstützen kannst.',
    card_trial_link: 'siehe, wie du das Projekt unterstützen kannst',

    // ── Vorteile ──
    zalety_heading: 'Vorteile',
    adv1_title: 'Keine zusätzlichen Apps nötig',
    adv1_desc:  'Funktioniert ohne externe Apps auf iOS oder Android — du brauchst nur eine Garmin-Uhr und einen Browser.',
    adv2_title: 'Schnelle Konfiguration',
    adv2_desc:  'Pläne werden im Browser über das Settings UI erstellt — keine Installation nötig.',
    adv2_btn:   'Settings UI öffnen →',
    adv3_title: 'Die wichtigsten Trainingsdaten auf einen Blick',
    wd1: 'HR-Zonen',
    wd2: 'Übungsnr. / Zirkelnr.',
    wd3: 'Pausenzeit / Arbeitszeit',
    wd4: 'Aktuelle Übung / nächste Übung',
    wd5: 'Gesamte Trainingszeit',
    wd6: 'Uhrzeit',
    adv4_title: 'Trainingsplan als aktive Liste',
    adv4_desc:  'Übungen werden nacheinander angezeigt — du weißt immer, was jetzt und was als nächstes kommt.',
    adv5_title: 'HR-Diagramm',
    adv5_desc:  'Herzfrequenzdiagramm — sowohl während des Trainings als auch danach abrufbar.',

    // ── Funktionen ──
    config_heading: 'Funktionen',
    cfg1: 'Trainingspläne erstellen und abspielen',
    cfg2: 'Eigene Übungen hinzufügen',
    cfg3: 'Über 800 Übungen aus der eingebauten Bibliothek wählen',
    cfg4: 'Jede Übung im Plan hat eigene Einstellungen — Arbeitszeit, Pause, Satzanzahl und Wiederholungen',
    cfg5: 'Arbeitszeit mit Sekundenlimit oder ohne Limit',
    cfg6: 'Zirkeltraining unterstützt',

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

    c_s3_title:   'Parameter der Übung einstellen',
    c_s3_simple:  'Satzanzahl, Wiederholungen (oder MAX — Training bis zum Versagen ohne Countdown), Pausenzeit und Arbeitszeit (0 = kein Zeitlimit) einstellen. Jede Übung im Plan wird unabhängig konfiguriert.',
    c_s3_confirm: 'Wenn die Parameter bereit sind, auf „Add to Plan" klicken.',

    c_s4_title: 'Bearbeiten und Reihenfolge ändern',
    c_s4_desc:  'Klicke auf eine Übung in der Liste — ein Bearbeitungsfenster öffnet sich. Parameter ändern, Übung nach oben/unten verschieben oder löschen.',

    c_s5_title: 'Loop training (optional)',
    c_s5_desc:  '„Loop training" aktivieren und Anzahl (2–20) eingeben, wenn die Uhr den gesamten Plan mehrmals wiederholen soll.',

    c_s6_title: 'Plan zur Liste hinzufügen',
    c_s6_desc:  '„Add Plan to List" klicken — der Plan wird zur Planliste hinzugefügt und der Editor wartet auf den nächsten Plan. Schritte 1–6 für jeden Plan wiederholen.',

    c_s7_title: 'Wichtiger Hinweis zu Plannamen',
    c_s7_desc:  'Wenn du einen Plan mit demselben Namen wie ein vorhandener hinzufügst, wird der existierende Plan auf der Uhr überschrieben. Es ist empfehlenswert, den generierten Konfigurationsstring irgendwo in deinen Notizen zu speichern — so hast du eine Sicherung und kannst Pläne in Zukunft leicht bearbeiten.',

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
    import_heading: 'Einen zuvor vorbereiteten Plan aus einem Textausdruck laden',
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
    req3: 'Webbrowser (für das Settings UI)',
    cta_btn:   'Settings UI öffnen',
    contact:   'Kontakt',
    copyright: '© 2026 MonkiAppps. Alle Rechte vorbehalten.',
  },

  es: {
    hero_tagline:         'Una app sencilla y rápida para configurar y realizar entrenamientos de fuerza.',
    settings_heading:     'Configuración de planes de entrenamiento',
    settings_tile_title:  'Settings UI',
    settings_tile_desc:   'Crea planes, configura ejercicios y genera la cadena de configuración para la app.',

    // ── Soporte ──
    support_heading:      'Soporte',
    support_tile_title:   'Apoya la app',
    support_tile_desc:    'Elige una forma de apoyar — Suppi/Patronite o Ko-fi.',
    unlock_lead:          'Si te gusta la app y funciona correctamente en tu dispositivo, puedes desbloquear la versión completa invitándome a un café.',
    unlock_send:          'Después de apoyar, envía un mensaje por Ko-fi / Suppi con:',
    unlock_email:         'tu dirección de correo electrónico,',
    unlock_devid:         'ID del dispositivo.',
    unlock_where:         'El ID del dispositivo lo encuentras aquí:',
    unlock_path_val:      'Gym Workout Timer → Settings → Unlock App → Your Device ID: (10 dígitos)',
    unlock_code:          'Después de recibir tu mensaje, te enviaré un código de desbloqueo de 5 dígitos.',
    unlock_enter:         'Ingrésalo en la app Gym Workout Timer aquí:',
    unlock_contact:       'Si tienes algún problema, por favor contáctame:',

    // ── Nota de versión de prueba ──
    card_trial:      'La app tiene acceso a todas las características, pero en la versión de prueba funciona con un límite de entrenamientos de 15 minutos. Si te gusta, puedes desbloquear la versión completa — ve cómo apoyar el proyecto.',
    card_trial_link: 've cómo apoyar el proyecto',

    // ── Ventajas ──
    zalety_heading: 'Ventajas',
    adv1_title: 'No se necesitan apps adicionales',
    adv1_desc:  'Funciona sin ninguna app externa en iOS ni Android — solo necesitas un reloj Garmin y un navegador.',
    adv2_title: 'Configuración rápida',
    adv2_desc:  'Crea planes en el navegador con el Settings UI — sin instalar nada.',
    adv2_btn:   'Abrir Settings UI →',
    adv3_title: 'Los datos más útiles durante el entrenamiento en un solo lugar',
    wd1: 'Zonas HR',
    wd2: 'N.º ejercicio / n.º circuito',
    wd3: 'Tiempo de descanso / tiempo de trabajo',
    wd4: 'Ejercicio actual / siguiente ejercicio',
    wd5: 'Tiempo total del entrenamiento',
    wd6: 'Reloj',
    adv4_title: 'Plan de entrenamiento como lista activa',
    adv4_desc:  'Los ejercicios se muestran uno a uno — siempre sabes qué hay ahora y qué viene después.',
    adv5_title: 'Gráfico HR',
    adv5_desc:  'Gráfico de frecuencia cardíaca disponible tanto durante el entrenamiento como al finalizarlo.',

    // ── Características ──
    config_heading: 'Características',
    cfg1: 'Crear y reproducir planes de entrenamiento',
    cfg2: 'Añadir ejercicios personalizados',
    cfg3: 'Más de 800 ejercicios en la biblioteca integrada',
    cfg4: 'Cada ejercicio tiene su propia configuración independiente — tiempo de trabajo, descanso, número de series y repeticiones',
    cfg5: 'Tiempo de trabajo con límite de segundos o sin límite',
    cfg6: 'Compatible con entrenamiento en circuito',

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

    c_s3_title:   'Configura los parámetros del ejercicio',
    c_s3_simple:  'Establece el número de series, repeticiones (o MAX — entrenas hasta el fallo sin cuenta regresiva), tiempo de descanso entre series y tiempo de trabajo (0 = sin límite). Cada ejercicio del plan se configura de forma independiente.',
    c_s3_confirm: 'Cuando los parámetros estén listos, haz clic en "Add to Plan".',

    c_s4_title: 'Editar y reordenar',
    c_s4_desc:  'Haz clic en cualquier ejercicio de la lista — se abre un modal de edición. Puedes cambiar parámetros, mover el ejercicio arriba o abajo, o eliminarlo.',

    c_s5_title: 'Loop training (opcional)',
    c_s5_desc:  'Marca "Loop training" e indica el número de repeticiones (2–20) si quieres que el reloj repita el plan completo varias veces seguidas.',

    c_s6_title: 'Añadir plan a la lista',
    c_s6_desc:  'Haz clic en "Add Plan to List" — el plan se guarda en la Lista de Planes y el editor se reinicia para el siguiente entrenamiento. Repite los pasos 1–6 para cada plan.',

    c_s7_title: 'Nota importante sobre nombres de planes',
    c_s7_desc:  'Si añades un plan con el mismo nombre que uno existente, sobrescribirá el plan existente en tu reloj. Es buena práctica guardar la cadena de configuración generada en algún lugar de tus notas — así tendrás una copia de seguridad y podrás editar planes fácilmente en el futuro.',

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
    import_heading: 'Cargar un plan previamente preparado desde una expresión de texto',
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
