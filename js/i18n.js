/* ============================================================
   Language switcher — English · Русский · Azərbaycan
   Translates text nodes in place (SVG icons & layout untouched),
   keyed by the English source text. Choice persists in localStorage.
   Other scripts: window.I18N.t('English string') → localized string.
   ============================================================ */
(function () {
  const SUP = ['en', 'ru', 'az'];
  const KEY = 'doctor_lang';
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const SKIP = new Set(['SCRIPT','STYLE','NOSCRIPT','SVG','PATH','CIRCLE','RECT','LINE','POLYGON','POLYLINE','DEFS','LINEARGRADIENT','STOP','G']);

  const DICT = {
    ru: {
      "About":"Обо мне","Services":"Услуги","Resources":"Материалы","FAQ":"Вопросы","Contact":"Контакты",
      "Call":"Позвонить","Book a visit":"Записаться","Accepting new patients":"Идёт запись новых пациентов",
      "A calmer path through":"Спокойный путь в вопросах","urology":"урологии",
      "Private, discreet, evidence-based care for":"Частная, деликатная и доказательная помощь —",
      "urinary and men’s health":"урология и мужское здоровье",
      "— with the time to listen, explain, and get it right. In-person in Baku or by secure video.":"— с временем, чтобы выслушать, объяснить и всё сделать правильно. Очно в Баку или по защищённому видео.",
      "Book an appointment":"Записаться на приём","WhatsApp":"WhatsApp",
      "Years in practice":"Лет практики","Patients cared for":"Пациентов приняли","Average rating":"Средняя оценка",
      "Board-certified":"Сертифицированный врач",
      "Azerbaijan Medical Association":"Медицинская ассоциация Азербайджана","European Board Certified":"Европейская сертификация",
      "Continuing Medical Education":"Непрерывное мед. образование","Patient Privacy Charter":"Хартия конфиденциальности",
      "About the specialist":"О специалисте","Expert care, delivered with patience and discretion.":"Экспертная помощь — с терпением и деликатностью.",
      "Dr. [Name] is a board-certified":"Dr. [Name] — сертифицированный","urologist":"уролог","Urologist":"Уролог","health.":"здоровье.",
      "with [18]+ years caring for patients across Baku and internationally. Care here is unhurried by design: full consultations, clear explanations, and a treatment plan you actually understand.":"с опытом [18]+ лет, принимающий пациентов в Баку и за рубежом. Здесь приём неспешный по принципу: полная консультация, понятные объяснения и план лечения, который вам действительно ясен.",
      "Every visit is private and confidential. You will never be rushed, and you will always know what is happening and why.":"Каждый визит — приватный и конфиденциальный. Вас никогда не будут торопить, и вы всегда будете понимать, что происходит и почему.",
      "Education":"Образование","Medical degree & specialist residency, [University]. European fellowship in [sub-specialty].":"Диплом врача и ординатура, [University]. Европейская стажировка по [sub-specialty].",
      "Certification":"Сертификация",". Member of national & European specialist societies.":". Член национальных и европейских профессиональных обществ.",
      "Evidence-based, guideline-driven treatment":"Лечение по доказательным клиническим рекомендациям",
      "Same specialist at every visit — real continuity":"Один и тот же врач на каждом визите — настоящая преемственность",
      "Discreet, judgment-free environment":"Деликатная атмосфера без осуждения",
      "Focused on your":"Сфокусировано на вашем","urological":"урологическом","health":"здоровье",
      "Clear consultations, modern diagnostics, and treatment plans tailored to you. Available in person and by secure video.":"Понятные консультации, современная диагностика и план лечения под вас. Очно и по защищённому видео.",
      "Consultation & diagnosis":"Консультация и диагностика",
      "A thorough first visit: history, examination, and a clear next step. Bring your questions — there’s time for them.":"Тщательный первый визит: анамнез, осмотр и понятный следующий шаг. Приходите с вопросами — время на них есть.",
      "40 min · in-person":"40 мин · очно","Online video consultation":"Онлайн видеоконсультация",
      "Discuss results, follow up, or get a second opinion from home — private, secure, and on your schedule.":"Обсудить результаты, наблюдение или второе мнение из дома — приватно, безопасно и в удобное время.",
      "30 min · online":"30 мин · онлайн","Screening & check-ups":"Скрининг и чек-апы",
      "Preventive screening and routine review — catch issues early and stay ahead of your":"Профилактический скрининг и плановый осмотр — выявить проблемы рано и сохранить ваше",
      "45 min · in-person":"45 мин · очно","Treatment & procedures":"Лечение и процедуры",
      "Modern, minimally-invasive options where appropriate — explained fully so you can decide with confidence.":"Современные малоинвазивные методы, где это уместно — с полным объяснением, чтобы вы решали уверенно.",
      "From ₼ 150":"от ₼ 150","by plan":"по плану","Results review":"Разбор результатов",
      "Already have test results? Bring them in and get a clear, plain-language explanation and plan.":"Уже есть результаты анализов? Принесите их и получите понятное объяснение и план.",
      "25 min · either":"25 мин · любой формат","Second opinion":"Второе мнение",
      "Facing a diagnosis or decision? A careful, independent review to give you certainty before you proceed.":"Стоите перед диагнозом или решением? Внимательный независимый разбор, чтобы дать уверенность перед следующим шагом.",
      "40 min · either":"40 мин · любой формат",
      "Request":"Заявка","Book online or by WhatsApp — we confirm a time that suits you.":"Запишитесь онлайн или в WhatsApp — подтвердим удобное вам время.",
      "Consult":"Консультация","A full, unhurried consultation — in person or by secure video.":"Полная, неспешная консультация — очно или по защищённому видео.",
      "Plan":"План","A clear diagnosis and a treatment plan you understand and agree with.":"Понятный диагноз и план лечения, с которым вы согласны.",
      "Follow-up":"Наблюдение","Continuity of care with the same specialist, every step of the way.":"Непрерывное наблюдение у одного и того же врача на каждом этапе.",
      "Articles & resources":"Статьи и материалы","Trusted information, plainly explained":"Достоверная информация простыми словами",
      "Helpful, responsible guidance written by Dr. [Name]. Educational only — never a substitute for a personal consultation.":"Полезные и ответственные материалы от Dr. [Name]. Только для информации — не заменяют личную консультацию.",
      "Guide":"Гид","When should you see a specialist?":"Когда стоит обратиться к специалисту?",
      "Five signs worth a professional opinion — and why earlier is almost always easier.":"Пять признаков, при которых стоит спросить специалиста — и почему раньше почти всегда проще.",
      "Read article":"Читать статью","Patient guide":"Памятка пациенту","Preparing for your first visit":"Подготовка к первому визиту",
      "What to bring, what to expect, and how to make the most of your consultation.":"Что взять, чего ожидать и как извлечь максимум из консультации.",
      "Coming soon":"Скоро","Explainer":"Разбор","Understanding your test results":"Как понимать результаты анализов",
      "A plain-language look at common":"Простыми словами о распространённых","tests and what the numbers mean.":"анализах и о том, что значат цифры.",
      "Patient experiences":"Отзывы пациентов","Care people come back to":"Помощь, к которой возвращаются",
      "Shared with permission and anonymised to protect privacy.":"Опубликовано с разрешения и анонимно ради конфиденциальности.",
      "“For the first time I didn’t feel rushed. Everything was explained calmly and I left knowing exactly what came next.”":"«Впервые меня не торопили. Всё спокойно объяснили, и я ушёл, точно зная следующий шаг.»",
      "Patient · Baku":"Пациент · Баку",
      "“Discreet, professional, genuinely kind. The online follow-up saved me a trip and was just as thorough.”":"«Деликатно, профессионально, по-настоящему по-доброму. Онлайн-наблюдение сэкономило поездку и было таким же тщательным.»",
      "Patient · online":"Пациент · онлайн",
      "“I came for a second opinion and finally got clear answers. I’d recommend Dr. [Name] without hesitation.”":"«Пришёл за вторым мнением и наконец получил ясные ответы. Рекомендую Dr. [Name] без колебаний.»",
      "Common questions":"Частые вопросы","Good to know before your visit":"Полезно знать перед визитом",
      "Is my visit confidential?":"Мой визит конфиденциален?",
      "Completely. Your information stays strictly between you and Dr. [Name]. The practice follows a clear patient-privacy charter, and sensitive topics are handled with discretion at every step.":"Полностью. Ваша информация остаётся строго между вами и Dr. [Name]. Практика следует чёткой хартии конфиденциальности, а деликатные темы обсуждаются с тактом на каждом шаге.",
      "Do you offer online consultations?":"Есть ли онлайн-консультации?",
      "Yes. Secure video consultations are available for follow-ups, result reviews, and second opinions. You’ll receive a private link after booking — no special software required.":"Да. Защищённые видеоконсультации доступны для наблюдения, разбора результатов и второго мнения. После записи вы получите приватную ссылку — без специальных программ.",
      "What should I bring to my first visit?":"Что взять на первый визит?",
      "Any recent test results, a list of current medications, and your questions. If you don’t have results yet, that’s fine — we’ll arrange what’s needed.":"Свежие результаты анализов, список текущих лекарств и ваши вопросы. Если результатов пока нет — ничего страшного, мы назначим нужное.",
      "Do you work with insurance?":"Работаете ли вы со страховкой?",
      "We can provide detailed invoices and documentation for reimbursement with most private insurers. Please bring your policy details and we’ll help where we can.":"Мы выдаём подробные счета и документы для возмещения у большинства частных страховых. Возьмите данные полиса — поможем, чем сможем.",
      "How do I book or reschedule?":"Как записаться или перенести визит?",
      "Use the booking form below or message us on WhatsApp — it’s the fastest way. To reschedule, just reply to your confirmation and we’ll find a new time.":"Заполните форму ниже или напишите в WhatsApp — это быстрее всего. Чтобы перенести, ответьте на подтверждение, и мы найдём новое время.",
      "Request an appointment":"Запрос на приём",
      "Tell us a little and we’ll confirm by WhatsApp. Prefer to talk? Call or message us directly.":"Расскажите немного о себе — подтвердим в WhatsApp. Удобнее голосом? Позвоните или напишите нам.",
      "Call the clinic":"Позвонить в клинику","Email":"Эл. почта","Clinic":"Клиника","Book via WhatsApp":"Записаться через WhatsApp",
      "Full name":"Имя и фамилия","Phone":"Телефон","(optional)":"(необязательно)","Service":"Услуга","Choose a service":"Выберите услугу",
      "Screening & check-up":"Скрининг и чек-ап","Other":"Другое","Preferred date":"Желаемая дата","Preferred time":"Желаемое время",
      "Any time":"Любое время","Morning":"Утро","Afternoon":"День","Evening":"Вечер","Message":"Сообщение",
      "Send request via WhatsApp":"Отправить запрос в WhatsApp",
      "Your details are only used to arrange your appointment. Private & confidential.":"Ваши данные используются только для записи на приём. Приватно и конфиденциально.",
      "Request ready to send":"Запрос готов к отправке",
      "WhatsApp should have opened with your details. If not, use a button below — we’ll confirm shortly.":"WhatsApp должен был открыться с вашими данными. Если нет — воспользуйтесь кнопкой ниже, мы скоро подтвердим.",
      "Send by email instead":"Отправить по эл. почте","New request":"Новый запрос",
      "Contact & hours":"Контакты и часы","Visit the clinic":"Как нас найти","Address":"Адрес",
      "Hours":"Часы работы","Mon – Fri: 09:00 – 18:00":"Пн – Пт: 09:00 – 18:00","Sat: 10:00 – 14:00 · Sun: closed":"Сб: 10:00 – 14:00 · Вс: выходной",
      "Phone & WhatsApp":"Телефон и WhatsApp","Email & social":"Почта и соцсети",
      "Private, discreet, evidence-based":"Частная, деликатная, доказательная","care in Baku — in person and online. Accepting new patients.":"помощь в Баку — очно и онлайн. Идёт запись новых пациентов.",
      "Explore":"Навигация","© 2024 Dr. [Name]. All rights reserved.":"© 2024 Dr. [Name]. Все права защищены.",
      "This website is for general information and does not provide medical advice or guarantee outcomes. Always consult a qualified professional about your individual situation.":"Этот сайт носит общий информационный характер, не является медицинской консультацией и не гарантирует результатов. По вашей ситуации всегда консультируйтесь со специалистом.",
      "By Dr. [Name],":"Автор: Dr. [Name],","· 4 min read":"· 4 мин чтения",
      "Most people wait longer than they should before seeing a specialist — often because symptoms feel minor, awkward to discuss, or “probably nothing.” The truth is that early questions are easier to answer, and an early visit is usually shorter, simpler, and more reassuring than a late one.":"Большинство откладывают визит к специалисту дольше, чем стоит — потому что симптомы кажутся мелкими, неловкими для разговора или «наверное, ерунда». На деле ранние вопросы решаются проще, а ранний визит обычно короче, легче и спокойнее позднего.",
      "Five signs worth a professional opinion":"Пять признаков, при которых стоит спросить специалиста",
      "A symptom that has lasted more than two weeks, or keeps returning.":"Симптом, который длится больше двух недель или возвращается.",
      "Anything that interrupts your sleep, work, or daily routine.":"Всё, что мешает сну, работе или привычному распорядку.",
      "A change you’ve noticed but can’t explain — even a small one.":"Любое замеченное изменение, которое вы не можете объяснить — даже небольшое.",
      "A result from a test or check-up that you don’t fully understand.":"Результат анализа или осмотра, который вам не до конца понятен.",
      "Worry itself. Peace of mind is a perfectly good reason to come in.":"Само беспокойство. Спокойствие — вполне веская причина прийти.",
      "If something doesn’t feel right, you don’t need to be certain it’s serious to ask. A consultation exists precisely to answer that question — calmly and privately.":"Если что-то ощущается не так, не нужно быть уверенным, что это серьёзно, чтобы спросить. Консультация и существует, чтобы ответить на этот вопрос — спокойно и приватно.",
      "What an early visit looks like":"Как проходит ранний визит",
      "A first consultation is a conversation. We talk through your history, examine where needed, and — if any tests make sense — explain exactly why. You leave with a clear understanding and a plan, not a pile of jargon.":"Первая консультация — это разговор. Мы обсуждаем вашу историю, осматриваем при необходимости и — если нужны анализы — объясняем зачем. Вы уходите с ясным пониманием и планом, а не с грудой терминов.",
      "There’s no judgment here, and no rush. Whether it turns out to be nothing or something worth treating, you’ll know where you stand.":"Здесь нет осуждения и спешки. Окажется ли это пустяком или чем-то, что стоит лечить — вы будете точно знать, как обстоят дела.",
      "This article is general information and not a substitute for personal medical advice. Please book a consultation to discuss your individual situation.":"Эта статья носит общий характер и не заменяет личную консультацию. Запишитесь на приём, чтобы обсудить вашу ситуацию.",
      // validation (used by app.js)
      "Please enter your name":"Пожалуйста, введите имя","Enter a valid phone number":"Введите корректный номер телефона",
      "Enter a valid email":"Введите корректный e-mail","Please choose a service":"Пожалуйста, выберите услугу","Choose a date":"Выберите дату",
    },
    az: {
      "About":"Haqqında","Services":"Xidmətlər","Resources":"Resurslar","FAQ":"Suallar","Contact":"Əlaqə",
      "Call":"Zəng et","Book a visit":"Qəbula yazıl","Accepting new patients":"Yeni pasiyentlər qəbul olunur",
      "A calmer path through":"Sakit yanaşma:","urology":"urologiya",
      "Private, discreet, evidence-based care for":"Özəl, ehtiyatlı və sübuta əsaslanan yardım —",
      "urinary and men’s health":"sidik yolları və kişi sağlamlığı",
      "— with the time to listen, explain, and get it right. In-person in Baku or by secure video.":"— dinləmək, izah etmək və düzgün etmək üçün vaxt ayıraraq. Bakıda klinikada və ya təhlükəsiz video ilə.",
      "Book an appointment":"Qəbula yazıl","WhatsApp":"WhatsApp",
      "Years in practice":"İl təcrübə","Patients cared for":"Qəbul olunan pasiyent","Average rating":"Orta reytinq",
      "Board-certified":"Sertifikatlı həkim",
      "Azerbaijan Medical Association":"Azərbaycan Tibb Assosiasiyası","European Board Certified":"Avropa sertifikatı",
      "Continuing Medical Education":"Fasiləsiz tibbi təhsil","Patient Privacy Charter":"Məxfilik xartiyası",
      "About the specialist":"Mütəxəssis haqqında","Expert care, delivered with patience and discretion.":"Səbr və ehtiyatla təqdim olunan ekspert yardımı.",
      "Dr. [Name] is a board-certified":"Dr. [Name] sertifikatlı","urologist":"uroloq","Urologist":"Uroloq","health.":"sağlamlığınızı qoruyun.",
      "with [18]+ years caring for patients across Baku and internationally. Care here is unhurried by design: full consultations, clear explanations, and a treatment plan you actually understand.":"[18]+ illik təcrübə ilə Bakıda və beynəlxalq səviyyədə pasiyentlərə baxır. Burada qəbul qəsdən tələsik deyil: tam konsultasiya, aydın izah və həqiqətən başa düşdüyünüz müalicə planı.",
      "Every visit is private and confidential. You will never be rushed, and you will always know what is happening and why.":"Hər qəbul özəl və məxfidir. Sizi heç vaxt tələsdirməyəcəklər və nə baş verdiyini, niyə olduğunu həmişə biləcəksiniz.",
      "Education":"Təhsil","Medical degree & specialist residency, [University]. European fellowship in [sub-specialty].":"Həkim diplomu və ixtisas rezidenturası, [University]. [sub-specialty] üzrə Avropa təcrübəsi.",
      "Certification":"Sertifikat",". Member of national & European specialist societies.":". Milli və Avropa ixtisas cəmiyyətlərinin üzvü.",
      "Evidence-based, guideline-driven treatment":"Sübuta və klinik təlimatlara əsaslanan müalicə",
      "Same specialist at every visit — real continuity":"Hər qəbulda eyni həkim — əsl davamlılıq",
      "Discreet, judgment-free environment":"Ehtiyatlı, mühakiməsiz mühit",
      "Focused on your":"Diqqət sizin","urological":"uroloji","health":"sağlamlığınıza",
      "Clear consultations, modern diagnostics, and treatment plans tailored to you. Available in person and by secure video.":"Aydın konsultasiyalar, müasir diaqnostika və sizə uyğun müalicə planı. Klinikada və təhlükəsiz video ilə mümkündür.",
      "Consultation & diagnosis":"Konsultasiya və diaqnoz",
      "A thorough first visit: history, examination, and a clear next step. Bring your questions — there’s time for them.":"Hərtərəfli ilk qəbul: anamnez, müayinə və aydın növbəti addım. Suallarınızı gətirin — onlar üçün vaxt var.",
      "40 min · in-person":"40 dəq · klinikada","Online video consultation":"Onlayn video konsultasiya",
      "Discuss results, follow up, or get a second opinion from home — private, secure, and on your schedule.":"Nəticələri müzakirə edin, nəzarəti davam etdirin və ya evdən ikinci rəy alın — özəl, təhlükəsiz və sizə uyğun vaxtda.",
      "30 min · online":"30 dəq · onlayn","Screening & check-ups":"Skrininq və müayinələr",
      "Preventive screening and routine review — catch issues early and stay ahead of your":"Profilaktik skrininq və müntəzəm baxış — problemləri erkən aşkarlayın və",
      "45 min · in-person":"45 dəq · klinikada","Treatment & procedures":"Müalicə və prosedurlar",
      "Modern, minimally-invasive options where appropriate — explained fully so you can decide with confidence.":"Uyğun olduqda müasir, minimal invaziv üsullar — tam izahla, inamla qərar verə biləsiniz deyə.",
      "From ₼ 150":"₼ 150-dən","by plan":"plana görə","Results review":"Nəticələrin təhlili",
      "Already have test results? Bring them in and get a clear, plain-language explanation and plan.":"Artıq analiz nəticələriniz var? Onları gətirin və aydın, sadə dildə izah və plan alın.",
      "25 min · either":"25 dəq · hər format","Second opinion":"İkinci rəy",
      "Facing a diagnosis or decision? A careful, independent review to give you certainty before you proceed.":"Diaqnoz və ya qərar qarşısındasınız? Növbəti addımdan əvvəl sizə əminlik verən diqqətli, müstəqil baxış.",
      "40 min · either":"40 dəq · hər format",
      "Request":"Müraciət","Book online or by WhatsApp — we confirm a time that suits you.":"Onlayn və ya WhatsApp ilə yazılın — sizə uyğun vaxtı təsdiqləyirik.",
      "Consult":"Konsultasiya","A full, unhurried consultation — in person or by secure video.":"Tam, tələsik olmayan konsultasiya — klinikada və ya təhlükəsiz video ilə.",
      "Plan":"Plan","A clear diagnosis and a treatment plan you understand and agree with.":"Aydın diaqnoz və razı olduğunuz, başa düşdüyünüz müalicə planı.",
      "Follow-up":"Nəzarət","Continuity of care with the same specialist, every step of the way.":"Hər mərhələdə eyni həkimlə davamlı qayğı.",
      "Articles & resources":"Məqalələr və resurslar","Trusted information, plainly explained":"Etibarlı məlumat, sadə dildə",
      "Helpful, responsible guidance written by Dr. [Name]. Educational only — never a substitute for a personal consultation.":"Dr. [Name] tərəfindən yazılmış faydalı və məsuliyyətli materiallar. Yalnız məlumat üçündür — şəxsi konsultasiyanı əvəz etmir.",
      "Guide":"Bələdçi","When should you see a specialist?":"Mütəxəssisə nə vaxt müraciət etməli?",
      "Five signs worth a professional opinion — and why earlier is almost always easier.":"Peşəkar rəy almağa dəyən beş əlamət — və niyə tez müraciət demək olar ki, həmişə daha asandır.",
      "Read article":"Məqaləni oxu","Patient guide":"Pasiyent bələdçisi","Preparing for your first visit":"İlk qəbula hazırlıq",
      "What to bring, what to expect, and how to make the most of your consultation.":"Nə gətirmək, nə gözləmək və konsultasiyadan necə maksimum yararlanmaq.",
      "Coming soon":"Tezliklə","Explainer":"İzah","Understanding your test results":"Analiz nəticələrini başa düşmək",
      "A plain-language look at common":"Geniş yayılmış","tests and what the numbers mean.":"analizlərə və rəqəmlərin mənasına sadə dildə baxış.",
      "Patient experiences":"Pasiyent rəyləri","Care people come back to":"Geri qayıdılan qayğı",
      "Shared with permission and anonymised to protect privacy.":"İcazə ilə və məxfilik üçün anonim paylaşılıb.",
      "“For the first time I didn’t feel rushed. Everything was explained calmly and I left knowing exactly what came next.”":"«İlk dəfə tələsdirilmədim. Hər şey sakitcə izah olundu və növbəti addımı dəqiq bilərək çıxdım.»",
      "Patient · Baku":"Pasiyent · Bakı",
      "“Discreet, professional, genuinely kind. The online follow-up saved me a trip and was just as thorough.”":"«Ehtiyatlı, peşəkar, həqiqətən mehriban. Onlayn nəzarət bir səfərə qənaət etdi və eyni dərəcədə hərtərəfli idi.»",
      "Patient · online":"Pasiyent · onlayn",
      "“I came for a second opinion and finally got clear answers. I’d recommend Dr. [Name] without hesitation.”":"«İkinci rəy üçün gəldim və nəhayət aydın cavablar aldım. Dr. [Name]-i tərəddüdsüz tövsiyə edərəm.»",
      "Common questions":"Tez-tez verilən suallar","Good to know before your visit":"Qəbuldan əvvəl bilmək faydalıdır",
      "Is my visit confidential?":"Qəbulum məxfidir?",
      "Completely. Your information stays strictly between you and Dr. [Name]. The practice follows a clear patient-privacy charter, and sensitive topics are handled with discretion at every step.":"Tamamilə. Məlumatınız yalnız sizinlə Dr. [Name] arasında qalır. Praktika aydın məxfilik xartiyasına əməl edir və həssas mövzular hər addımda ehtiyatla aparılır.",
      "Do you offer online consultations?":"Onlayn konsultasiya var?",
      "Yes. Secure video consultations are available for follow-ups, result reviews, and second opinions. You’ll receive a private link after booking — no special software required.":"Bəli. Nəzarət, nəticələrin təhlili və ikinci rəy üçün təhlükəsiz video konsultasiyalar mümkündür. Qeydiyyatdan sonra özəl link alacaqsınız — xüsusi proqram lazım deyil.",
      "What should I bring to my first visit?":"İlk qəbula nə gətirməliyəm?",
      "Any recent test results, a list of current medications, and your questions. If you don’t have results yet, that’s fine — we’ll arrange what’s needed.":"Son analiz nəticələri, cari dərmanların siyahısı və suallarınız. Hələ nəticələriniz yoxdursa, problem deyil — lazım olanı təşkil edərik.",
      "Do you work with insurance?":"Sığorta ilə işləyirsiniz?",
      "We can provide detailed invoices and documentation for reimbursement with most private insurers. Please bring your policy details and we’ll help where we can.":"Əksər özəl sığortalar üçün ödənişin qaytarılması məqsədilə ətraflı qaimə və sənədlər təqdim edə bilərik. Zəhmət olmasa polis məlumatlarını gətirin, bacardığımızca kömək edərik.",
      "How do I book or reschedule?":"Necə yazılmaq və ya vaxtı dəyişmək olar?",
      "Use the booking form below or message us on WhatsApp — it’s the fastest way. To reschedule, just reply to your confirmation and we’ll find a new time.":"Aşağıdakı formadan istifadə edin və ya WhatsApp-da yazın — bu, ən sürətli yoldur. Vaxtı dəyişmək üçün təsdiq mesajına cavab yazın, yeni vaxt taparıq.",
      "Request an appointment":"Qəbula müraciət",
      "Tell us a little and we’ll confirm by WhatsApp. Prefer to talk? Call or message us directly.":"Özünüz haqqında qısaca yazın — WhatsApp ilə təsdiqləyəcəyik. Danışmaq istəyirsiniz? Birbaşa zəng edin və ya yazın.",
      "Call the clinic":"Klinikaya zəng et","Email":"E-poçt","Clinic":"Klinika","Book via WhatsApp":"WhatsApp ilə yazıl",
      "Full name":"Ad və soyad","Phone":"Telefon","(optional)":"(istəyə bağlı)","Service":"Xidmət","Choose a service":"Xidmət seçin",
      "Screening & check-up":"Skrininq və müayinə","Other":"Digər","Preferred date":"İstədiyiniz tarix","Preferred time":"İstədiyiniz vaxt",
      "Any time":"İstənilən vaxt","Morning":"Səhər","Afternoon":"Günorta","Evening":"Axşam","Message":"Mesaj",
      "Send request via WhatsApp":"WhatsApp ilə göndər",
      "Your details are only used to arrange your appointment. Private & confidential.":"Məlumatlarınız yalnız qəbulu təşkil etmək üçün istifadə olunur. Özəl və məxfi.",
      "Request ready to send":"Müraciət göndərilməyə hazırdır",
      "WhatsApp should have opened with your details. If not, use a button below — we’ll confirm shortly.":"WhatsApp məlumatlarınızla açılmalı idi. Açılmadısa, aşağıdakı düymədən istifadə edin — tezliklə təsdiqləyəcəyik.",
      "Send by email instead":"E-poçtla göndər","New request":"Yeni müraciət",
      "Contact & hours":"Əlaqə və iş saatları","Visit the clinic":"Bizi tapın","Address":"Ünvan",
      "Hours":"İş saatları","Mon – Fri: 09:00 – 18:00":"B.e – Cümə: 09:00 – 18:00","Sat: 10:00 – 14:00 · Sun: closed":"Şənbə: 10:00 – 14:00 · Bazar: bağlı",
      "Phone & WhatsApp":"Telefon və WhatsApp","Email & social":"E-poçt və sosial şəbəkə",
      "Private, discreet, evidence-based":"Özəl, ehtiyatlı, sübuta əsaslanan","care in Baku — in person and online. Accepting new patients.":"yardım Bakıda — klinikada və onlayn. Yeni pasiyentlər qəbul olunur.",
      "Explore":"Keçidlər","© 2024 Dr. [Name]. All rights reserved.":"© 2024 Dr. [Name]. Bütün hüquqlar qorunur.",
      "This website is for general information and does not provide medical advice or guarantee outcomes. Always consult a qualified professional about your individual situation.":"Bu sayt ümumi məlumat xarakteri daşıyır, tibbi məsləhət vermir və nəticələrə zəmanət vermir. Öz vəziyyətinizlə bağlı həmişə ixtisaslı mütəxəssisə müraciət edin.",
      "By Dr. [Name],":"Müəllif: Dr. [Name],","· 4 min read":"· 4 dəq oxu",
      "Most people wait longer than they should before seeing a specialist — often because symptoms feel minor, awkward to discuss, or “probably nothing.” The truth is that early questions are easier to answer, and an early visit is usually shorter, simpler, and more reassuring than a late one.":"Çox adam mütəxəssisə müraciəti lazım olduğundan gec edir — çünki əlamətlər kiçik, danışmağa rahatsız və ya «yəqin heç nə»dir. Əslində erkən suallara cavab vermək asandır, erkən qəbul isə adətən gecdən daha qısa, sadə və rahatladıcı olur.",
      "Five signs worth a professional opinion":"Peşəkar rəyə dəyən beş əlamət",
      "A symptom that has lasted more than two weeks, or keeps returning.":"İki həftədən çox davam edən və ya təkrarlanan əlamət.",
      "Anything that interrupts your sleep, work, or daily routine.":"Yuxunuza, işinizə və ya gündəlik rejiminizə mane olan hər şey.",
      "A change you’ve noticed but can’t explain — even a small one.":"Fərq etdiyiniz, lakin izah edə bilmədiyiniz dəyişiklik — kiçik olsa belə.",
      "A result from a test or check-up that you don’t fully understand.":"Tam başa düşmədiyiniz analiz və ya müayinə nəticəsi.",
      "Worry itself. Peace of mind is a perfectly good reason to come in.":"Narahatlığın özü. Rahatlıq gəlmək üçün tamamilə yaxşı səbəbdir.",
      "If something doesn’t feel right, you don’t need to be certain it’s serious to ask. A consultation exists precisely to answer that question — calmly and privately.":"Nəsə düz hiss olunmursa, soruşmaq üçün onun ciddi olduğuna əmin olmaq lazım deyil. Konsultasiya məhz bu suala cavab vermək üçündür — sakit və özəl şəkildə.",
      "What an early visit looks like":"Erkən qəbul necə keçir",
      "A first consultation is a conversation. We talk through your history, examine where needed, and — if any tests make sense — explain exactly why. You leave with a clear understanding and a plan, not a pile of jargon.":"İlk konsultasiya bir söhbətdir. Tarixçənizi danışırıq, lazım olduqda müayinə edirik və — analiz məntiqlidirsə — niyə olduğunu dəqiq izah edirik. Bir yığın termin yox, aydın anlayış və planla çıxırsınız.",
      "There’s no judgment here, and no rush. Whether it turns out to be nothing or something worth treating, you’ll know where you stand.":"Burada mühakimə və tələskənlik yoxdur. İstər heç nə çıxsın, istər müalicəyə dəyən bir şey — vəziyyətinizi dəqiq biləcəksiniz.",
      "This article is general information and not a substitute for personal medical advice. Please book a consultation to discuss your individual situation.":"Bu məqalə ümumi məlumatdır və şəxsi tibbi məsləhəti əvəz etmir. Vəziyyətinizi müzakirə etmək üçün konsultasiyaya yazılın.",
      "Please enter your name":"Zəhmət olmasa adınızı daxil edin","Enter a valid phone number":"Düzgün telefon nömrəsi daxil edin",
      "Enter a valid email":"Düzgün e-poçt daxil edin","Please choose a service":"Zəhmət olmasa xidmət seçin","Choose a date":"Tarix seçin",
    }
  };

  let nodes = null; const orig = new WeakMap();
  let phEls = null;

  function ok(node) {
    let p = node.parentNode;
    while (p && p.nodeType === 1) {
      if (SKIP.has(p.tagName)) return false;
      const c = p.classList;
      if (c && (c.contains('langs') || c.contains('lng'))) return false;
      if (p.hasAttribute && p.hasAttribute('data-count')) return false;
      p = p.parentNode;
    }
    return true;
  }
  function collect() {
    nodes = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (!/[A-Za-zА-Яа-яƏəÇçĞğİıÖöŞşÜü]/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        return ok(n) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    let n; while ((n = w.nextNode())) { nodes.push(n); if (!orig.has(n)) orig.set(n, n.nodeValue); }
    phEls = Array.from(document.querySelectorAll('[placeholder]'));
    phEls.forEach(e => { if (!e.dataset.phOrig) e.dataset.phOrig = e.getAttribute('placeholder'); });
  }
  function cur() { const l = localStorage.getItem(KEY); return SUP.includes(l) ? l : 'en'; }
  function apply(lang) {
    if (!SUP.includes(lang)) lang = 'en';
    localStorage.setItem(KEY, lang); document.documentElement.lang = lang;
    if (!nodes) collect();
    const map = lang === 'en' ? null : DICT[lang];
    nodes.forEach(n => {
      const o = orig.get(n);
      if (lang === 'en') { if (n.nodeValue !== o) n.nodeValue = o; return; }
      const tr = map[norm(o)];
      if (tr != null) { const lead = (o.match(/^\s+/) || [''])[0], tail = (o.match(/\s+$/) || [''])[0]; n.nodeValue = lead + tr + tail; }
      else if (n.nodeValue !== o) n.nodeValue = o;
    });
    phEls.forEach(e => { const o = e.dataset.phOrig; e.setAttribute('placeholder', lang === 'en' ? o : (map[norm(o)] || o)); });
    document.querySelectorAll('.lng').forEach(b => { const on = b.dataset.lang === lang; b.classList.toggle('active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    window.__LANG = lang;
  }
  function t(en) { const l = window.__LANG || cur(); return l === 'en' ? en : ((DICT[l] && DICT[l][norm(en)]) || en); }
  window.I18N = { apply, t, cur };
  function init() { apply(cur()); document.querySelectorAll('.lng').forEach(b => b.addEventListener('click', () => apply(b.dataset.lang))); }
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
