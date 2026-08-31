/* app.js — логика портфолио Марии Мишиной
   Подключается в index.html: <script src="app.js" defer>
   Этап 1 i18n: полный словарь EN для контента + переключатель RU/EN.
   Атрибуты data-i18n в разметке добавляются на этапах 2–3.
*/
(function(){
'use strict';
const root = document.documentElement;
const store = {
  get(k){ try{ return localStorage.getItem(k); }catch(_){ return null; } },
  set(k,v){ try{ localStorage.setItem(k,v); }catch(_){} }
};

/* ---------- ТЕМЫ ---------- */
const themeBtn = document.getElementById('themeBtn');
function setTheme(t){ root.setAttribute('data-theme', t); store.set('theme', t); }
themeBtn.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
setTheme(store.get('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

/* ---------- i18n ----------
   Словарь: интерфейс (UI) + контент. RU — источник, EN — перевод.
   Термины: Customer Requests, GP, Key scenario; GAS «Законотворчество» — транслит.
*/
const I18N = {
  ru: {
    /* UI */
    navProfile:'Профиль', navExp:'Опыт', navCases:'Кейсы', navContacts:'Контакты',
    heroBtnExp:'Опыт работы', heroBtnCases:'Смотреть кейсы',
    secProfile:'Профиль', secExperience:'Опыт работы', secCases:'Кейсы', secContacts:'Контакты',
    secProfileIntro:'Профессиональный профиль', secSkills:'Ключевые компетенции',
    secTools:'Инструменты', secEducation:'Образование',
    secContext:'Контекст', secSolution:'Решение',
    secEvidence:'Доказательства', secOutcomes:'Итоги',
    tlContext:'Контекст', tlInput:'Мой вклад', tlResults:'Результаты',
    backToCases:'Все кейсы', linkOpenCase:'Открыть кейс',
    aTheme:'Переключить тему', aLang:'Язык интерфейса',
    /* HERO */
    heroTop1:'ПОРТФОЛИО · 2026', heroTop2:'ПРОДУКТОВЫЙ ДИЗАЙН', heroTop3:'МОСКВА · GMT+3',
    heroSince:'продукт с 2016',
         heroName1:'Мария', heroName2:'Мишина',
    uMin:'мин', uHour:'ч', uMonth:'мес.',
    /* ОПЫТ — счётчик и подписи записей */
    expCounter:'интерфейсы с 2008 · продукт с 2016',
    /* ГлавНИВЦ */
         gnvName:'ГлавНИВЦ',
    otkName:'Банк «ФК Открытие»',
    conName:'IT-компании-подрядчики',
    gnvRole:'Product Designer · Консалтинг',
    gnvContext:'ФГУП «ГлавНИВЦ» УДП РФ — единый центр экспертизы и ИТ-интегратор для подведомственных структур (санатории, управление персоналом, аналитика). Компания работает в закрытом высокозащищённом контуре, где ПО создаётся под уникальные задачи ведомств, а не на массовый рынок. Дизайн-функция как класс отсутствовала.',
    gnvInput:'С нуля построила полную дизайн-библиотеку в Pixso (166 токенов, 2069 компонентов). Спроектировала MVP и прототипы на React для МИС. Провела редизайн внутренней CRM, соблюдая строгие требования к безопасности и соответствию регуляторике.',
    gnvResults:'Разработанная на основе сценариев CRM «КПИ» дизайн-система стала фундаментом универсального конструктора приложений ГлавНИВЦ. Она обеспечивает единый UX-стандарт для любых будущих CRM и внутренних систем, исключая необходимость повторной разработки интерфейсов. Проект завершён досрочно: на текущем этапе компания не готова к полноценным продуктовым процессам, однако заложенная система позволяет перейти на новый движок без двойной работы и масштабировать дизайн на всю линейку будущих решений.',
    gnvLink1:'Кейс: Редизайн CRM «КПИ»', gnvLink2:'Кейс: МИС «Альтера»',
    /* Сбер */
         sberName:'Сбер',
    sberRole:'Продуктовый дизайнер (Старший)',
    sberContext:'Продукт «Обращения» для трёх платформ Сбера: SmartCare (линия поддержки), СБОЛ.про (рабочее место сотрудников офисов) и мобильное приложение для клиентов. В экосистеме с миллионной аудиторией требовалось улучшить качество обработки запросов, снизить нагрузку на экспертов и ускорить решение проблем пользователей.',
    sberInput:'Спроектировала логику работы с обращениями, адаптируя интерфейс под уникальный контекст каждой платформы: многовкладочность и быстрый доступ к классификаторам — для операторов SmartCare, упрощённое рабочее пространство без лишних сущностей — для СБОЛ.про, и наглядный раздел регистрации и отслеживания статуса — для клиентов в мобильном приложении. Внедрила сервис автоматического возврата средств, повышающий лояльность клиентов и снижающий нагрузку на операторов. Запустила AI-ассистента для поддержки принятия решений сотрудниками SmartCare, интегрировав его в непосредственные рабочие сценарии (рекомендации по классификации и следующие шаги). Оптимизировала процессы первого обращения, чтобы минимизировать эскалации внутренним экспертам (first contact resolution).',
    sberResults:'Срок ввода в должность новых операторов SmartCare сократился почти вдвое за счёт упрощения логики и снижения когнитивной нагрузки. Ошибки классификации обращений снизились на 13% благодаря рекомендациям AI-ассистента. Количество обращений, требующих эскалации, уменьшилось на 20% за счёт урегулирования вопросов при первом контакте с поддержкой.',
    sberLink1:'Кейс: СБОЛ.про Обращения', sberLink2:'Кейс: SmartCare',
    /* Открытие — этап 1 */
    otk1Role:'Senior Product Designer',
    otk1Context:'Проектирование MVP и первых версий Бизнес-портала ДБО для стартапов и микро-бизнеса. Проведение фокус-групп и UX-исследований для поиска ниши и валидации концепций.',
    otk1Input:'Построение дизайн-функции с нуля: создание первых экранов и логики. Проведение исследований, защита решений перед разработкой.',
    otk1Results:'Запуск первых модулей. Продукт начинает расти и выходит из тени по сравнению с конкурентами.',
    /* Открытие — этап 2 */
    otk2Role:'Lead Product Designer · Design Team Lead',
    otk2Context:'Масштабирование Бизнес-портала в полноценную платформу для МСБ. Миграция пользователей с устаревшей системы BSS.',
    otk2Input:'Внедрила единую дизайн-систему на основе Atomic Design. Выстроила процессы UX-исследований и ревью (включая глубокие интервью по миграции подписей и экспертную оценку SWIFT GPI). Руководство командой (рост с 3 до 12 человек).',
    otk2Results:'Редизайн для 50 000+ пользователей. Сокращение времени ключевых операций на 40%. Единая дизайн-система для 15+ продуктов. Успешная миграция с BSS. Вхождение в Топ-10 интернет-банков по версии Markswebb.',
    otkLink:'Кейс: Бизнес-портал',
    /* Подрядчики */
    conRole:'UX/UI Designer · разработка и внедрение информационных систем',
    conContext:'Цифровое агентство, полный цикл проектирования: e-commerce, порталы, мобильные приложения.',
    conInput:'Вела проекты от исследования до разработки. Интервью, CJM, wireframes, прототипы.',
    conResults:'20+ запущенных проектов. Среди них: ГАС «Законотворчество» (Правительство РФ), ЦОДД Москвы, АРМ для энергорынка (ЕНЭС России).',
    /* ПРОФИЛЬ */
    profileText:'Продуктовый дизайнер с более чем 9-летним опытом создания сложных B2B и B2G продуктов. Специализируюсь на высокорегулируемых средах (финтех, госсектор, enterprise), где критически важно найти баланс между требованиями законодательства, техническими ограничениями и потребностями пользователей. Бэкграунд в психологии позволяет исследовать поведение пользователей и проектировать стратегию взаимодействия, а не просто рисовать экраны.',
    edu1:'Графический дизайн и визуальные коммуникации', edu2:'Психология, бакалавр',
    profileCounter:'интерфейсы с 2008 · продукт с 2016',
    /* КЕЙСЫ — общее */
    casesCounter:'всего: 5',
    /* КПИ */
    kpiCardTitle:'Редизайн CRM «КПИ»', kpiCardLbl:'элементов дизайн-системы · тактика и стратегия за 2 месяца',
    kpiMeta:'govtech · дизайн-система · 2026',
    kpiSub:'Платформа управления персоналом · Product Designer / Дизайн-лид · [ май — июнь 2026 ]',
    kpiM1:'элементов дизайн-системы', kpiM2:'экранов передано в разработку', kpiM3:'снижение энтропии продукта',
    kpiContext:'Компания — государственный интегратор и центр компетенций для высшего эшелона власти (УДП РФ). Продукт — внутренняя CRM для управления персоналом и МИС, работающая на устаревшем фреймворке Bootstrap с 200+ разрозненными экранами и отсутствием единой логики. Требовалось улучшить UX «здесь и сейчас» и заложить основу для миграции на новый технологический стек.',
    kpiSolution:'Работа выстроена по двум параллельным трекам — быстрый результат для пользователей и системная база для будущего движка. Тактика: полная инвентаризация экранов, затем «скин» — перекраска текущего Bootstrap-интерфейса по новым токенам: лучше визуальное восприятие и ниже когнитивная нагрузка. Стратегия: полноценная дизайн-система по принципу «Токены → Атомы → Молекулы → Организмы», не зависящая от ограничений старого кода.',
    kpiTrack1:'Тактика · быстрый результат', kpiTrack1Text:'Полная инвентаризация всех существующих экранов, затем «скин» — перекраска текущего Bootstrap-интерфейса по новым токенам. В кратчайшие сроки: лучше визуальное восприятие и ниже когнитивная нагрузка на пользователей.',
    kpiTrack2:'Стратегия · будущее', kpiTrack2Text:'Параллельно спроектирована полноценная дизайн-система по принципу «Токены → Атомы → Молекулы → Организмы». Она не зависит от ограничений старого кода и будет работать на новом движке.',
    kpiEvidence:'Создана фундаментальная система, которая перевела продукт из состояния «хаоса» в структурированные компоненты. 166 дизайн-токенов (цвета, шрифты, отступы). 99 стилей (типографика, тени, скругления, сетки). 2069 элементов библиотеки (~80 компонентов × все состояния). 20 экранов и модальных окон передано фронтенду.',
    kpiStat1:'дизайн-токенов: цвета, шрифты, отступы', kpiStat2:'стилей: типографика, тени, скругления, сетки',
    kpiStat3:'элементов библиотеки: ~80 компонентов × все состояния', kpiStat4:'экранов и модальных окон передано фронтенду',
    kpiCap1:'Два горизонта: тактика и стратегия', kpiCap2:'Методология: от хаоса к атомам',
    kpiCap3:'Настройка приложения', kpiCap4:'Ролевая модель',
    kpiCap5:'Навигация и оверлеи — все состояния', kpiCap6:'Кнопки и группы кнопок',
    kpiCap7:'Датапикер', kpiCap8:'Типографика: заголовки и текст',
    kpiLbl1:'Страницы · тактический скин', kpiLbl2:'Компоненты · дизайн-система',
    kpiOutcomes:'Переход от 200+ разрозненных артефактов к 70+ системным элементам: энтропия продукта снизилась в 4–5 раз. Каждый компонент получил полную спецификацию и готов к передаче в разработку.',
    kpiFinalLbl:'артефактов → системных компонентов',
    kpiValueLbl:'Ценность для бизнеса',
    kpiValue1:'Без шока для пользователей — тактический скин даёт постепенное улучшение вместо резкой смены интерфейса',
    kpiValue2:'Экономия ресурсов — компоненты спроектированы под новый движок: при миграции не придётся перерисовывать всё с нуля',
    kpiValue3:'Валидация на живом продукте — скин на текущем Bootstrap стал полигоном для проверки компонентов дизайн-системы в условиях живой вёрстки',
    kpiNext:'Следующий кейс: МИС «Альтера»',
    kpiPrev:'Предыдущий кейс: Бизнес-портал',
    /* Альтера */
    altCardTitle:'МИС «Альтера» для санаториев', altCardLbl:'MVP-модуль врача · живой интерактивный прототип',
    altMeta:'healthtech · MVP · 2026',
    altSub:'Модуль врача-терапевта · Product Designer / UX-Research / UI Architect · [ июнь — авг 2026 ]',
    altM1:'MVP-модуль врача — с нуля, без доступа к живой системе', altM2:'скриншотов легаси — единственный источник', altM3:'пациентов в день у терапевта — эргономика под нагрузку',
    altContext:'Компания (в структуре ГлавНИВЦ) владела устаревшей МИС «Практика.Санаторий» на legacy-стеках. Бизнес-заказчик хотел новый современный модуль для врачей, но поставил жёсткие рамки: нет доступа к живой системе — только 10 статичных скриншотов, и нет возможности пообщаться с реальными врачами-пользователями. Основная задача — создать эргономичный, минималистичный интерфейс для самой популярной роли, терапевта (работает с 13–17 пациентами в день), минимизировав когнитивную нагрузку и время на ввод данных.',
    altSolution:'Работа выстроена в 4 этапа — способность принимать решения в условиях неопределённости.',
    altStage1:'Этап 01 · Глубокий анализ ограничений', altStage1Text:'Изучила 10 скриншотов легаси и выделила ключевые сценарии: приём, назначение процедур, контроль исполнения, контроль платности.',
    altStage2:'Этап 02 · Сбор данных без доступа к живой системе', altStage2Text:'Запустила опросные листы в Яндекс.Формах по клиентам, чтобы верифицировать болевые точки; заложила архитектуру под будущие роли — процедурная сестра, палатная сестра, врач-специалист, администратор.',
    altStage3:'Этап 03 · Отстаивание UX-подхода перед разработкой', altStage3Text:'Вместо использования готового Blazor-SDK «как есть» (это привело бы к возврату к устаревшему интерфейсу) — обоснование на основе законов Хика и Миллера. Предложила архитектуру «Костяк + Кожа»: SDK отвечает за логику, а кастомная дизайн-система (CSS-переменные и wrapper-компоненты) управляет компоновкой и эргономикой. Это не сломало текущую разработку и избавило от двойной работы в будущем.',
    altStage4:'Этап 04 · Формирование фундамента', altStage4Text:'Создала краткий брендбук (медицинский минимализм), дизайн-библиотеку стилей и спецификации UI-компонентов под заявленный стек (Blazor/Tailwind).',
    altCapFlow:'Навигация и логика модуля: 4 уровня и контекстные меню',
    altEvidence:'Разработан и запущен полнофункциональный интерактивный прототип основного сценария врача: дашборд, реестр, карточка пациента, расписание.',
    altConceptLbl:'Концепция', altConceptText:'От природных материалов к цифровому интерфейсу: исследование тактильности, прозрачности и спокойствия для медицинского продукта.',
    altCapMood:'Мудборд · направление «медицинский минимализм»',
    altUikitLbl:'Живой UI-Kit', altUikitCap:'Живой UI-Kit с переключателем тем доступен на прототипе · сначала откроется форма логина',
    altUikitLink:'Открыть прототип',
    altCapPatient:'Карточка пациента · история посещений',
    altScreensLbl:'Экраны прототипа',
    altSpecLbl:'Техническая спецификация для Frontend',
    altSpec1:'Описание кастомных компонентов (wrapper-компоненты над SDK)',
    altSpec2:'Поведение таб-бара в рабочем месте врача',
    altSpec3:'Расписание: «красная линия времени» — маркер текущего момента',
    altSpec4:'Контекстные меню и сценарии модальных окон',
    altOutcomes:'Создан полностью готовый к передаче в разработку MVP-модуль терапевта — включая спецификации для Blazor. Наследие проекта шире одного модуля.',
    altFinalLbl:'с нуля — до готового к разработке MVP, без доступа к живой системе и пользователям',
    altLegacyLbl:'Ценность и наследие',
    altLegacy1:'Продукт — MVP-модуль терапевта, готовый к передаче в разработку (включая спецификации для Blazor)',
    altLegacy2:'Стратегия — масштабируемая архитектура: новые роли (сёстры, администраторы) добавляются без переписывания системы',
    altLegacy3:'Ценность для бизнеса — подход «Костяк + Кожа» минимизировал риски и стоимость разработки, подготовил платформу к плавному переходу на новый движок — без шока для пользователей',
    altLegacy4:'Методология — UX-исследования в условиях ограниченного доступа (опросы + анализ скриншотов) с защитой интересов конечного пользователя перед лицом технических ограничений',
    altNext:'Следующий кейс: СБОЛ.про',
    altPrev:'Предыдущий кейс: Редизайн CRM «КПИ»',
    altFootnote:'Полные технические спецификации и стратегическое обоснование для разработки (Blazor, UI-паттерны) доступны по запросу.',
    /* СБОЛ.про */
    sbCardTitle:'СБОЛ.про · Обращения', sbCardLbl:'эскалаций · AI-ассистент',
    sbMeta:'2025 · Product Designer · NDA',
    sbTitle:'AI-Ассистент принятия решений', sbSub:'СБОЛ.про · Обращения · [ 2025 ]',
    sbContext:'Сотрудники офисов банка переходили на новую справочную систему, которая заменила несколько информационно-справочных систем. Старая система строилась на жёстком последовательном 5-уровневом классификаторе. Это приводило к высокой нагрузке на внутренних специалистов, частым ошибкам классификации и увеличению времени решения проблем клиентов. Критической задачей было обеспечить плавный переход без падения качества обслуживания.',
    sbRoleLbl:'Моя роль',
    sbRole:'Product Designer. Проведение UX-исследований (гемба, глубинные интервью, UX-тестирование), анализ эффективности работы, проектирование AI-помощника, координация с командой разработки и data science.',
    sbSolution:'Спроектировала и внедрила два последовательных сценария с интеграцией AI-решений.',
    sbWasLbl:'Было', sbNowLbl:'Стало',
    sbWas1:'Жёсткий последовательный 5-уровневый классификатор', sbWas2:'Высокая нагрузка на внутренних специалистов',
    sbWas3:'Частые ошибки классификации', sbWas4:'Увеличение времени решения проблем клиентов',
    sbNow1:'Сквозной умный поиск — заменила последовательный классификатор на смысловой поиск (быстрый выигрыш)',
    sbNow2:'Диалог с AI-ассистентом — после UX-тестирования заменила шаг с классификатором на диалог: ассистент либо сразу предлагал способы решения, либо самостоятельно присваивал верную классификацию и регистрировал обращение',
    sbOutcomes:'Значительное сокращение трудозатрат и времени обработки обращений. Конкретные метрики:',
    sbM1:'обращений, передаваемых внутренним специалистам', sbM2:'ошибок при классификации обращений',
    sbM3:'адаптация новых сотрудников (вместо 6 ранее)', sbM4:'значительное сокращение трудозатрат и времени обработки',
    ndaText:'NDA. Продукт находится под соглашением о неразглашении. Визуальные материалы не подлежат экспорту из внутреннего контура банка — поэтому вместо скриншотов экранов здесь представлены ключевые метрики, типографика и табличные данные. Полное описание процесса и архитектуры доступно по запросу.',
    sbNext:'Следующий кейс: SmartCare',
    sbPrev:'Предыдущий кейс: МИС «Альтера»',
    /* SmartCare */
    scCardTitle:'SmartCare', scCardLbl:'удовлетворённость · эволюция за 2 года',
    scMeta:'2023 — 2025 · Product Designer · NDA',
    scTitle:'SmartCare. Эволюция инструмента поддержки', scSub:'Линия поддержки Сбера · [ 2023 — 2025 ]',
    scContext:'SmartCare — внутренний инструмент для сотрудников линии поддержки Сбера. Проблема была не в одном функционале, а в отсутствии системности: разные продуктовые команды выкатывали свои паттерны и сценарии, создавая путаницу. Это приводило к высокой когнитивной нагрузке на операторов, увеличению времени обработки звонков и долгому обучению новичков. Задача — без резких переворотов, а плавно и систематически повышать эффективность работы поддержки в течение двух лет.',
    scRole:'Product Designer. Моя стратегия — не «разовый редизайн», а постоянная итеративная работа над эволюцией продукта. Я проводила множество UX-исследований, которые, помимо проверки гипотез нового функционала, выявляли глубокие конфликты в паттернах работы между командами. Ключевым решением стала стандартизация: я привела все сценарии и паттерны к единому знаменателю для всех команд портала.',
    scSolution:'Стандартизация паттернов: на основе исследований выявила и устранила нелогичные сценарии, конфликтующие между собой. Это стало фундаментом для единого UX-стандарта, который приняли все продуктовые команды.',
    scKeyLbl:'Ключевой сценарий: быстрый возврат средств',
    scStep1:'Первый прототип', scStep1Text:'Построила на гипотетических «стек-холдер» паттернах.',
    scStep2:'Тестирование', scStep2Text:'Провела двухнедельное UX-тестирование на реальных сотрудниках (разного возраста и опыта).',
    scStep3:'Итерации', scStep3Text:'Тесты показали, что сценарий слишком сложен. Кардинально упростила его и привлекла UX-редакторов, которые заменили технические формулировки на привычные сотрудникам термины.',
    scStep4:'Результат', scStep4Text:'Новая функция была принята сотрудниками без сопротивления и не привела к падению скорости обслуживания.',
    scOutcomes:'За два года итеративной работы — четыре ключевых результата:',
    scM1:'среднее время звонка сократилось за два года', scM2:'период онбординга новых сотрудников',
    scM3:'удовлетворённость сервисом (CSAT) — вместо ожидаемого падения', scM4:'время возврата средств (вместо нескольких дней)',
    scPrev:'Предыдущий кейс: СБОЛ.про',
    scNext:'Следующий кейс: Бизнес-портал',
    /* Бизнес-портал */
    bpCardTitle:'Бизнес-портал', bpCardLbl:'Markswebb 2020 · семь лет эволюции платформы для МСБ',
    bpMeta:'2016 — 2022 · Lead Product Designer · B2B · FinTech',
    bpSub:'Платформа ДБО для МСБ · Банк «ФК Открытие»',
    bpKmNum:'№2', bpKmLbl:'в рейтинге Markswebb 2020 · 67,3 балла', bpKmNote:'старт · 19-е место (2016)',
    bpContext:'В 2016 году, когда я присоединилась к проекту как единственный дизайнер, банк не входил даже в топ-20 рейтинга Markswebb. Я спроектировала и выпустила MVP бизнес-портала в ноябре 2016. Продукт сразу стал приносить прибыль и попал в независимый рейтинг Business Internet Banking Rank (19-е место), что стало точкой отсчёта для последующего роста до 2-го места в 2020 году.',
    bpRoleLbl:'Моя роль и стратегия',
    bpRole1:'Senior (2016 — 2019) — единственный дизайнер проекта. Спроектировала и запустила MVP с нуля, проводила первые фокус-группы и исследования, заложила основы архитектуры интерфейса.',
    bpRole2:'Lead Product Designer / Design Team Lead (2019 — 2022). Выстроила дизайн-функцию с нуля, создала дизайн-систему на Atomic Design.',
    bpProcessLbl:'Решение и процесс',
    bpProcess:'Семь лет продукта — три больших этапа:',
    bpStage1:'Исследования и MVP', bpStage1Years:'[ 2016 — 2017 ]',
    bpStage1Text:'Начало работы: фокус-группы, тестирование маркетплейса, оценка первых макетов вместе с целевой аудиторией.',
    bpLbl1:'Точка отсчёта · ранние экраны (2016)',
    bpLblEval:'Оценка макетов · первые тесты', bpLblFlows:'Проектирование сценариев и флоу',
    bpCapLogin:'Вход в систему · стартовая версия', bpCapMain:'Главная страница · стартовая версия',
    bpCapPay:'Платёжный документ', bpCapAcc:'Мои счета', bpCapTar:'Тарифы',
    bpCapEval1:'Оценка макета · вход в систему', bpCapEval2:'Оценка макета · главная страница', bpCapEval3:'Оценка макета · реквизиты компании и счета',
    bpCapCjm:'Первичный CJM · сценарий платежа', bpCapFlows:'Вайрфреймы · карта флоу экранов',
    bpStage2:'Миграция и масштабирование', bpStage2Years:'[ 2018 — 2019 ]',
    bpStage2Text:'UX-исследование миграции с BSS (проблема двух подписей), экспертная оценка SWIFT GPI.',
    bpCapBss:'Глубокие интервью: как пользователи переживали переход с BSS', bpCapCredit:'Зрелая платформа: функционал кредитов и ВЭД (2019)',
    bpStage3:'Дизайн-система и рост', bpStage3Years:'[ 2019 — 2022 ]',
    bpStage3Text:'Создание дизайн-системы (Atomic Design) и масштабирование на 15+ продуктов экосистемы.',
    bpCapUikit:'Единая дизайн-система для всей экосистемы',
    bpEvLbl:'Доказательства и итоги',
    bpBaLbl:'Markswebb · до и после',
    bpBaWas:'2016 · 19-е место · точка отсчёта', bpBaNow:'2022 · 7-е место · Топ-5 по 4 блокам',
    bpMwHint:'13 слайдов · клик — полный размер · листайте или перетаскивайте',
    bpMwFootnote:'19-е место (2016) — именно с этой точки стартовал продукт, который я собрала как единственный дизайнер. Это был мой первый выпущенный MVP.',
    bpRiaLbl:'Публичное признание', bpRiaCap:'РИА Новости · 2020 · открыть статью',
    bpSumLbl:'Итоги семи лет',
    bpM1:'времени ключевых операций', bpM2:'пользователей', bpM3:'продуктов на единой дизайн-системе', bpM4:'рост дизайн-команды',
    bpProfitNote:'Продукт вышел на прибыльность в первый же квартал после релиза MVP (ноябрь 2016).',
    bpBpNda:'Что не видно на скриншотах. Проект закрыт в 2023 году в связи с поглощением ВТБ. Полные материалы доступны по запросу.',
    bpNext:'Следующий кейс: Редизайн CRM «КПИ»',
    bpPrev:'Предыдущий кейс: SmartCare',
    /* КОНТАКТЫ */
    contactsCounter:'открыта к предложениям · GMT+3',
    contactHint:'основной способ связи · telegram',
    footer:'© Мария Мишина · 2026',
    /* Бегущая строка */
    marquee:['Продуктовый дизайн','FinTech','B2B','GovTech','AI Интерфейсы','UX Research','Дизайн-системы','Менторинг','Figma','Enterprise','Service Design']
  },

  en: {
    /* UI */
    navProfile:'Profile', navExp:'Experience', navCases:'Cases', navContacts:'Contact',
    heroBtnExp:'Work experience', heroBtnCases:'View cases',
    secProfile:'Profile', secExperience:'Experience', secCases:'Case studies', secContacts:'Contact',
    secProfileIntro:'Professional profile', secSkills:'Core competencies',
    secTools:'Tools', secEducation:'Education',
    secContext:'Context', secSolution:'Solution',
    secEvidence:'Evidence', secOutcomes:'Outcomes',
    tlContext:'Context', tlInput:'My contribution', tlResults:'Outcomes',
    backToCases:'All case studies', linkOpenCase:'View case study',
    aTheme:'Toggle theme', aLang:'Interface language',
    /* HERO */
    heroTop1:'PORTFOLIO · 2026', heroTop2:'PRODUCT DESIGN', heroTop3:'MOSCOW · GMT+3',
    heroSince:'product since 2016',
    heroName1:'Maria', heroName2:'Mishina',
    uMin:'min', uHour:'h', uMonth:'mo.',
    /* ОПЫТ */
    expCounter:'interfaces since 2008 · product since 2016',
    /* ГлавНИВЦ */
         gnvName:'GlavNIVC',
    otkName:'Otkritie Bank',
    conName:'IT contractor companies',
    gnvRole:'Product Designer · Consulting',
    gnvContext:'GlavNIVC, a Federal State Unitary Enterprise under the Presidential Administration, acts as a central hub of expertise and IT integrator for subordinate organizations (sanatoriums, HR management, analytics). The company operates within a closed, highly secure environment, building software for unique government agency needs rather than the mass market. There was no established design function.',
    gnvInput:'Built a complete design library from scratch in Pixso (166 tokens, 2,069 components). Designed the MVP and React prototypes for the HIS. Redesigned the internal CRM while adhering to strict security and regulatory compliance requirements.',
    gnvResults:'The design system, developed based on the “KPI” CRM scenarios, became the foundation for GlavNIVC’s universal application builder. It ensures a unified UX standard for any future CRMs and internal systems, eliminating the need for re-developing interfaces. The project was completed ahead of schedule. Although the company is not yet ready for full-scale product processes, the system I put in place allows for a seamless transition to a new engine without duplicating work and enables scaling the design across the entire lineup of future solutions.',
    gnvLink1:'Case study: CRM “KPI” Redesign', gnvLink2:'Case study: Altera HIS',
    /* Сбер */
         sberName:'Sber',
    sberRole:'Product Designer (Senior)',
    sberContext:'The “Customer Requests” product for three Sber platforms: SmartCare (support line), Sbol.pro (branch employee workspace), and the client mobile app. Within an ecosystem with a multi-million audience, the goal was to improve request handling quality, reduce the load on experts, and accelerate problem resolution for users.',
    sberInput:'Designed the request handling logic, adapting the interface to the unique context of each platform: multi-tab layout and quick access to classifiers for SmartCare operators; a simplified workspace without unnecessary entities for Sbol.pro; and a clear registration and status tracking section for clients in the mobile app. Introduced an automatic refund service, increasing customer loyalty and reducing operator workload. Launched an AI assistant to support decision-making for SmartCare employees, integrating it into their direct workflows (classification recommendations and next steps). Optimized first-contact processes to minimize escalations to internal experts (first contact resolution).',
    sberResults:'Onboarding time for new SmartCare operators was reduced by nearly half. Customer request classification errors decreased by 13% thanks to AI assistant recommendations. The number of requests requiring escalation dropped by 20% by resolving issues at the first point of contact.',
    sberLink1:'Case study: Sbol.pro Customer Requests', sberLink2:'Case study: SmartCare',
    /* Открытие — этап 1 */
    otk1Role:'Senior Product Designer',
    otk1Context:'Designed the MVP and first versions of the Business Portal (digital banking) for startups and micro-businesses. Conducted focus groups and UX research to identify a niche and validate concepts.',
    otk1Input:'Built the design function from scratch: created the first screens and core logic. Conducted research and defended design decisions before development.',
    otk1Results:'Launched the first modules. The product began to grow and stand out against competitors.',
    /* Открытие — этап 2 */
    otk2Role:'Lead Product Designer · Design Team Lead',
    otk2Context:'Scaled the Business Portal into a full-fledged platform for SMEs. Migrated users from the legacy BSS system.',
    otk2Input:'Implemented a unified design system based on Atomic Design. Established UX research and design review processes (including in-depth interviews on dual approval migration and expert evaluation of SWIFT GPI). Led the design team, growing it from 3 to 12 people.',
    otk2Results:'Redesigned the product for 50,000+ users. Reduced time for key operations by 40%. Created a unified design system used across 15+ products. Successfully migrated users from the legacy BSS. Achieved Top-10 ranking among internet banks by Markswebb.',
    otkLink:'Case study: Business Portal',
    /* Подрядчики */
    conRole:'UX/UI Designer · development and implementation of information systems',
    conContext:'Digital agency, full-cycle design: e-commerce, portals, mobile applications.',
    conInput:'Led projects from research to development. Interviews, CJM, wireframes, prototypes.',
    conResults:'20+ launched projects, including: GAS “Zakonotvorchestvo” (Government of the Russian Federation), Moscow Traffic Management Center, AWP for the energy market (ENES Russia).',
    /* ПРОФИЛЬ */
    profileText:'Product designer with over 9 years of experience creating complex B2B and B2G products. Specializing in highly regulated environments (fintech, government, enterprise), where balancing legal requirements, technical constraints, and user needs is critical. A background in psychology enables me to research user behavior and design interaction strategies, not just draw screens.',
    edu1:'Graphic Design and Visual Communications', edu2:'Psychology, Bachelor’s degree',
    profileCounter:'interfaces since 2008 · product since 2016',
    /* КЕЙСЫ — общее */
    casesCounter:'total: 5',
    /* КПИ */
    kpiCardTitle:'CRM “KPI” Redesign', kpiCardLbl:'design system elements · tactics and strategy in 2 months',
    kpiMeta:'govtech · design system · 2026',
    kpiSub:'HR management platform · Product Designer / Design Lead · [ May — June 2026 ]',
    kpiM1:'design system elements', kpiM2:'screens handed off to development', kpiM3:'reduction in product entropy',
    kpiContext:'The company is a government integrator and competence center for the highest echelon of power (Presidential Administration). The product is an internal CRM for HR management and an HIS, running on an outdated Bootstrap framework with 200+ scattered screens and no unified logic. The goal was to improve UX “here and now” and lay the foundation for migration to a new technology stack.',
    kpiSolution:'Work was structured along two parallel tracks — a quick result for users and a systemic base for the future engine.',
    kpiTrack1:'Tactics · quick result', kpiTrack1Text:'A complete inventory of all existing screens, then a “skin” — repainting the current Bootstrap interface with new tokens. In the shortest time: better visual perception and lower cognitive load on users.',
    kpiTrack2:'Strategy · future', kpiTrack2Text:'In parallel, a full design system was built on the “Tokens → Atoms → Molecules → Organisms” principle. It is independent of the old code’s limitations and will run on the new engine.',
    kpiEvidence:'Created a fundamental system that moved the product from a state of “chaos” to structured components. 166 design tokens (colors, fonts, spacing). 99 styles (typography, shadows, border radii, grids). 2,069 library elements (~80 components × all states). 20 screens and modal windows handed off to frontend.',
    kpiStat1:'design tokens: colors, fonts, spacing', kpiStat2:'styles: typography, shadows, border radii, grids',
    kpiStat3:'library elements: ~80 components × all states', kpiStat4:'screens and modal windows handed off to frontend',
    kpiCap1:'Two horizons: tactics and strategy', kpiCap2:'Methodology: from chaos to atoms',
    kpiCap3:'App settings', kpiCap4:'Role model',
    kpiCap5:'Navigation and overlays — all states', kpiCap6:'Buttons and button groups',
    kpiCap7:'Datepicker', kpiCap8:'Typography: headings and text',
    kpiLbl1:'Pages · tactical skin', kpiLbl2:'Components · design system',
    kpiOutcomes:'Transition from 200+ scattered artifacts to 70+ systemic elements: product entropy reduced by 4–5 times. Each component received a full specification and is ready for handoff to development.',
    kpiFinalLbl:'artifacts → systemic components',
    kpiValueLbl:'Business value',
    kpiValue1:'No shock for users — the tactical skin delivers gradual improvement instead of an abrupt interface change',
    kpiValue2:'Resource savings — components are designed for the new engine: no need to redraw everything from scratch during migration',
    kpiValue3:'Validation on a live product — the skin became a testing ground for design system components in real-world markup conditions',
    kpiNext:'Next case study: Altera HIS',
    kpiPrev:'Previous case study: Business Portal',
    /* Альтера */
    altCardTitle:'Altera HIS for sanatoriums', altCardLbl:'physician MVP module · live interactive prototype',
    altMeta:'healthtech · MVP · 2026',
    altSub:'General practitioner module · Product Designer / UX Research / UI Architect · [ June — August 2026 ]',
    altM1:'physician MVP module — from scratch, without access to the live system', altM2:'legacy screenshots — the only source', altM3:'patients per day per GP — ergonomics under load',
    altContext:'The company (within GlavNIVC) owned an outdated HIS “Praktika.Sanatoriy” on legacy stacks. The business owner wanted a new modern module for physicians but set strict constraints: no access to the live system — only 10 static screenshots, and no opportunity to talk to real physician users. The main goal was to create an ergonomic, minimalist interface for the most common role, the general practitioner (who sees 13–17 patients per day), minimizing cognitive load and data entry time.',
    altSolution:'Work was structured in 4 stages — the ability to make decisions under uncertainty.',
    altStage1:'Stage 01 · Deep analysis of constraints', altStage1Text:'Studied 10 legacy screenshots, identified key scenarios: appointments, procedure prescription, execution control, payment control.',
    altStage2:'Stage 02 · Data collection without access to the live system', altStage2Text:'Launched survey forms in Yandex.Forms to verify pain points; designed the architecture for future roles (procedure nurse, ward nurse, specialist physician, administrator).',
    altStage3:'Stage 03 · Defending the UX approach before development', altStage3Text:'Instead of using the off-the-shelf Blazor SDK “as is” (which would have meant a return to the outdated interface), justification based on Hick’s and Miller’s laws. Proposed the “Skeleton + Skin” architecture: the SDK handles logic, while a custom design system (CSS variables and wrapper components) handles layout and ergonomics. This did not break the current development and eliminated duplicated work in the future.',
    altStage4:'Stage 04 · Building the foundation', altStage4Text:'Created a brief brand book (medical minimalism), a design library of styles, and UI component specifications for the target stack (Blazor/Tailwind).',
    altCapFlow:'Navigation and module logic: 4 levels and context menus',
    altEvidence:'Developed and launched a fully functional interactive prototype of the physician’s main scenario: dashboard, registry, patient card, schedule.',
    altConceptLbl:'Concept', altConceptText:'From natural materials to digital interface: exploring tactility, transparency, and calm for a medical product.',
    altCapMood:'Moodboard · “medical minimalism” direction',
    altUikitLbl:'Live UI Kit', altUikitCap:'A live UI kit with theme switcher is available on the prototype · the login form will open first',
    altUikitLink:'Open prototype',
    altCapPatient:'Patient card · visit history',
    altScreensLbl:'Prototype screens',
    altSpecLbl:'Technical specification for Frontend',
    altSpec1:'Description of custom components (wrapper components over SDK)',
    altSpec2:'Tab bar behavior in the physician workspace',
    altSpec3:'Schedule: “red timeline” — current moment marker',
    altSpec4:'Context menus and modal window scenarios',
    altOutcomes:'Created a fully development-ready MVP module for general practitioners, including Blazor specifications. The project’s legacy extends beyond a single module.',
    altFinalLbl:'from scratch — to a development-ready MVP, without access to the live system or users',
    altLegacyLbl:'Value and legacy',
    altLegacy1:'Product — a development-ready GP MVP module (including Blazor specifications)',
    altLegacy2:'Strategy — scalable architecture: new roles (nurses, administrators) added without rewriting the system',
    altLegacy3:'Business value — the “Skeleton + Skin” approach minimized risks and development costs, preparing the platform for a smooth transition to the new engine — without user shock',
    altLegacy4:'Methodology — UX research under limited access (surveys + screenshot analysis) while defending the end user’s interests in the face of technical constraints',
    altNext:'Next case study: Sbol.pro',
    altPrev:'Previous case study: CRM “KPI” Redesign',
    altFootnote:'Full technical specifications and strategic rationale for development (Blazor, UI patterns) are available upon request.',
    /* СБОЛ.про */
    sbCardTitle:'Sbol.pro · Customer Requests', sbCardLbl:'escalations · AI assistant',
    sbMeta:'2025 · Product Designer · NDA',
    sbTitle:'AI Decision-Making Assistant', sbSub:'Sbol.pro · Customer Requests · [ 2025 ]',
    sbContext:'Bank branch employees were transitioning to a new reference system that replaced several information systems. The old system was built on a rigid sequential 5-level classifier. This led to high load on internal specialists, frequent classification errors, and increased time to resolve customer problems. The critical task was to ensure a smooth transition without a drop in service quality.',
    sbRoleLbl:'My role',
    sbRole:'Product Designer. Conducted UX research (gemba, in-depth interviews, UX testing), analyzed work efficiency, designed the AI assistant, coordinated with the development and data science teams.',
    sbSolution:'Designed and implemented two sequential scenarios with integrated AI solutions.',
    sbWasLbl:'Before', sbNowLbl:'After',
    sbWas1:'Rigid sequential 5-level classifier', sbWas2:'High load on internal specialists',
    sbWas3:'Frequent classification errors', sbWas4:'Increased problem resolution time',
    sbNow1:'Cross-cutting smart search — replaced the sequential classifier with semantic search (quick win)',
    sbNow2:'Dialogue with the AI assistant — after UX testing, replaced the classifier step with a dialogue: the assistant either immediately suggested solutions or automatically assigned the correct classification and registered the request',
    sbOutcomes:'Significant reduction in labor costs and request handling time. Key metrics:',
    sbM1:'requests transferred to internal specialists', sbM2:'classification errors',
    sbM3:'new employee adaptation (instead of 6 previously)', sbM4:'significant reduction in labor costs and processing time',
    ndaText:'NDA. The product is under a non-disclosure agreement. Visual materials cannot be exported from the bank’s internal environment — therefore, instead of screenshots, key metrics, typography, and tabular data are presented here. A full description of the process and architecture is available upon request.',
    sbNext:'Next case study: SmartCare',
    sbPrev:'Previous case study: Altera HIS',
    /* SmartCare */
    scCardTitle:'SmartCare', scCardLbl:'satisfaction · evolution over 2 years',
    scMeta:'2023 — 2025 · Product Designer · NDA',
    scTitle:'SmartCare. Evolution of a support tool', scSub:'Sber support line · [ 2023 — 2025 ]',
    scContext:'SmartCare is an internal tool for Sber support line employees. The problem was not a single feature but a lack of consistency: different product teams rolled out their own patterns and scenarios, creating confusion. This led to high cognitive load on operators, longer call handling times, and slow onboarding of newcomers. The goal was to gradually and systematically improve support efficiency over two years without abrupt changes.',
    scRole:'Product Designer. My strategy was not a “one-time redesign” but continuous iterative work on product evolution. Numerous UX studies that, in addition to testing hypotheses, revealed deep conflicts in work patterns between teams. The key decision was standardization: I aligned all scenarios and patterns to a common denominator for all portal teams.',
    scSolution:'Pattern standardization: based on research, identified and eliminated illogical conflicting scenarios — the foundation of a unified UX standard adopted by all product teams.',
    scKeyLbl:'Key scenario: rapid refunds',
    scStep1:'First prototype', scStep1Text:'Built on hypothetical “stakeholder” patterns.',
    scStep2:'Testing', scStep2Text:'Conducted two-week UX testing with real employees (of different ages and experience).',
    scStep3:'Iterations', scStep3Text:'The scenario turned out too complex: I radically simplified it and brought in UX writers who replaced technical wording with familiar terms.',
    scStep4:'Result', scStep4Text:'The feature was accepted without resistance, service speed did not drop.',
    scOutcomes:'Four key results of two years of iterative work:',
    scM1:'average call time decreased over two years', scM2:'new employee onboarding period',
    scM3:'service satisfaction (CSAT) — instead of the expected drop', scM4:'refund time (instead of several days)',
    scPrev:'Previous case study: Sbol.pro',
    scNext:'Next case study: Business Portal',
    /* Бизнес-портал */
    bpCardTitle:'Business Portal', bpCardLbl:'Markswebb 2020 · seven years of SME platform evolution',
    bpMeta:'2016 — 2022 · Lead Product Designer · B2B · FinTech',
    bpSub:'Digital banking platform for SMEs · Otkritie Bank',
    bpKmNum:'No. 2', bpKmLbl:'in the Markswebb 2020 ranking · 67.3 points', bpKmNote:'start · 19th place (2016)',
    bpContext:'In 2016, when I joined the project as the only designer, the bank was not even in the top-20 of the Markswebb ranking. I designed and launched the MVP of the Business Portal in November 2016. The product immediately became profitable and entered the independent Business Internet Banking Rank (19th place), which became the starting point for subsequent growth to 2nd place in 2020.',
    bpRoleLbl:'My role and strategy',
    bpRole1:'Senior (2016 — 2019) — the only designer on the project. Designed and launched the MVP from scratch, conducted the first focus groups and research, laid the foundations of the interface architecture.',
    bpRole2:'Lead Product Designer / Design Team Lead (2019 — 2022). Built the design function from scratch, created a design system based on Atomic Design.',
    bpProcessLbl:'Solution and process',
    bpProcess:'Seven years of the product — three major stages:',
    bpStage1:'Research and MVP', bpStage1Years:'[ 2016 — 2017 ]',
    bpStage1Text:'Starting point: focus groups, marketplace testing, evaluation of first mockups with the target audience.',
    bpLbl1:'Starting point · early screens (2016)',
    bpLblEval:'Mockup evaluation · first tests', bpLblFlows:'Scenario and flow design',
    bpCapLogin:'Login · initial version', bpCapMain:'Home page · initial version',
    bpCapPay:'Payment document', bpCapAcc:'My accounts', bpCapTar:'Tariffs',
    bpCapEval1:'Mockup evaluation · login', bpCapEval2:'Mockup evaluation · home page', bpCapEval3:'Mockup evaluation · company details and accounts',
    bpCapCjm:'Initial CJM · payment scenario', bpCapFlows:'Wireframes · screen flow map',
    bpStage2:'Migration and scaling', bpStage2Years:'[ 2018 — 2019 ]',
    bpStage2Text:'UX research on migration from BSS (dual approval issue), expert evaluation of SWIFT GPI.',
    bpCapBss:'In-depth interviews: how users experienced the transition from BSS', bpCapCredit:'Mature platform: credit and foreign trade functionality (2019)',
    bpStage3:'Design system and growth', bpStage3Years:'[ 2019 — 2022 ]',
    bpStage3Text:'Creating a design system (Atomic Design) and scaling it across 15+ ecosystem products.',
    bpCapUikit:'Unified design system for the entire ecosystem',
    bpEvLbl:'Evidence and outcomes',
    bpBaLbl:'Markswebb · before and after',
    bpBaWas:'2016 · 19th place · starting point', bpBaNow:'2022 · 7th place · Top-5 in 4 categories',
    bpMwHint:'13 slides · click for full size · swipe or drag',
    bpMwFootnote:'19th place (2016) — exactly from this point the product I built as the only designer started. This was my first launched MVP.',
    bpRiaLbl:'Public recognition', bpRiaCap:'RIA Novosti · 2020 · open article',
    bpSumLbl:'Seven-year results',
    bpM1:'key operation time', bpM2:'users', bpM3:'products on a unified design system', bpM4:'design team growth',
    bpProfitNote:'The product reached profitability in its first quarter after MVP release (November 2016).',
    bpBpNda:'What is not visible in the screenshots. The project was closed in 2023 due to the VTB acquisition. Full materials are available upon request.',
    bpNext:'Next case study: CRM “KPI” Redesign',
    bpPrev:'Previous case study: SmartCare',
    /* КОНТАКТЫ */
    contactsCounter:'open to offers · GMT+3',
    contactHint:'primary contact method · telegram',
    footer:'© Maria Mishina · 2026',
    /* Бегущая строка */
    marquee:['Product Design','FinTech','B2B','GovTech','AI Interfaces','UX Research','Design Systems','Mentorship','Figma','Enterprise','Service Design']
  },

  cn: {
    navProfile:'简介', navExp:'经历', navCases:'案例', navContacts:'联系方式',
    heroBtnExp:'工作经历', heroBtnCases:'查看案例',
    secProfile:'简介', secExperience:'工作经历', secCases:'案例研究', secContacts:'联系方式',
    secProfileIntro:'职业简介', secSkills:'核心能力',
    secTools:'工具', secEducation:'教育背景',
    secContext:'背景', secSolution:'解决方案',
    secEvidence:'佐证', secOutcomes:'成果',
    tlContext:'背景', tlInput:'我的贡献', tlResults:'成果',
    backToCases:'全部案例', linkOpenCase:'查看案例',
    aTheme:'切换主题', aLang:'界面语言',
    heroTop1:'作品集 · 2026', heroTop2:'产品设计', heroTop3:'莫斯科 · GMT+3',
    heroSince:'产品经验自 2016 年起',
    heroName1:'Maria', heroName2:'Mishina',
    uMin:'分', uHour:'小时', uMonth:'个月',
    expCounter:'界面经验自 2008 年起 · 产品经验自 2016 年起',
    gnvName:'GlavNIVC', sberName:'Sber', otkName:'Otkritie Bank', conName:'IT 承包商',
    gnvRole:'产品设计师 · 咨询',
    gnvContext:'GlavNIVC 是俄罗斯联邦总统办公厅下属的联邦国家单一制企业，作为下属机构（疗养院、人事管理、数据分析）的统一专家中心和 IT 集成商。公司运行在封闭的高安全环境中，软件为机关的特殊需求而开发，而非面向大众市场。设计职能此前完全空白。',
    gnvInput:'从零构建了完整的 Pixso 设计库（166 个设计令牌，2,069 个组件）。设计了医疗信息系统的 MVP 及 React 原型。在严格遵守安全和合规要求的前提下，对内部 CRM 进行了改版。',
    gnvResults:'基于 CRM「KPI」场景开发的设计系统，成为 GlavNIVC 通用应用构建器的基础。它为任何未来的 CRM 和内部系统提供统一的 UX 标准，无需重复开发界面。项目提前完成：尽管公司现阶段尚未准备好推行完整的产品流程，但已建立的系统可以在不重复劳动的情况下迁移到新引擎，并将设计扩展到未来所有解决方案。',
    gnvLink1:'案例：CRM「KPI」改版', gnvLink2:'案例：Altera 医疗信息系统',
    sberRole:'高级产品设计师',
    sberContext:'为 Sber 的三个平台设计「客户请求」产品：SmartCare（支持热线）、Sbol.pro（网点员工工作台）和客户端移动应用。在拥有数百万用户的生态中，需要提升请求处理质量、减轻专家负担并加快解决用户问题。',
    sberInput:'设计了客户请求处理逻辑，根据各平台独特场景调整界面：为 SmartCare 操作员提供多标签页和快速分类入口；为 Sbol.pro 提供简洁无多余概念的工作台；为移动端客户提供清晰的登记与状态跟踪模块。上线了自动退款服务，提升客户忠诚度并减轻操作员负担。为 SmartCare 员工上线了 AI 决策辅助助手，并集成到实际工作场景中（分类建议和下一步建议）。优化了首次接触流程，以减少向内部专家的升级处理（首次接触解决率）。',
    sberResults:'SmartCare 新操作员的入职上手时间几乎缩短了一半。得益于 AI 助手的建议，分类错误减少了 13%。通过在首次接触时解决问题，需要升级处理的请求数量下降了 20%。',
    sberLink1:'案例：Sbol.pro 客户请求', sberLink2:'案例：SmartCare',
    otk1Role:'高级产品设计师',
    otk1Context:'为初创企业和微型企业设计数字银行服务 Business Portal 的 MVP 和早期版本。通过焦点小组和 UX 研究寻找细分市场并验证概念。',
    otk1Input:'从零建立设计职能：创建了首批界面和核心逻辑。开展研究，并在开发前为设计方案进行论证。',
    otk1Results:'首批模块成功上线。产品开始增长，并在与竞争对手的对比中脱颖而出。',
    otk2Role:'首席产品设计师 · 设计团队负责人',
    otk2Context:'将 Business Portal 扩展为面向中小企业的完整平台。将用户从陈旧的 BSS 系统迁移至新平台。',
    otk2Input:'基于原子化设计（Atomic Design）实施了统一设计系统。建立了 UX 研究和评审流程（包括针对双重审批迁移的深度访谈和 SWIFT GPI 专家评估）。领导设计团队，规模从 3 人扩展到 12 人。',
    otk2Results:'为 5万+ 用户完成改版。关键操作时间缩短 40%。统一设计系统覆盖 15 余个产品。成功从 BSS 迁移。在 Markswebb 排名中进入互联网银行前十。',
    otkLink:'案例：Business Portal',
    conRole:'UX/UI 设计师 · 信息系统开发与实施',
    conContext:'数字代理机构，覆盖完整设计周期：电子商务、门户网站、移动应用。',
    conInput:'从研究到开发全程主导项目。包括访谈、客户旅程地图（CJM）、线框图、原型。',
    conResults:'20 余个已上线项目。其中包括：GAS「Zakonotvorchestvo」（俄罗斯联邦政府）、莫斯科交通管理中心、能源市场自动化工作站（ENES Russia）。',
    profileText:'拥有 9 年以上复杂 B2B 和 B2G 产品设计经验的产品设计师。专注于强监管环境（金融科技、政府、企业级），在法规要求、技术限制与用户需求之间寻找平衡至关重要。心理学背景使我能够研究用户行为并设计交互策略，而不仅仅是绘制界面。',
    edu1:'平面设计与视觉传达', edu2:'心理学学士',
    profileCounter:'界面经验自 2008 年起 · 产品经验自 2016 年起',
    casesCounter:'共计：5',
    kpiCardTitle:'CRM「KPI」改版', kpiCardLbl:'设计系统元素 · 2 个月内的战术与策略',
    kpiMeta:'政务科技 · 设计系统 · 2026',
    kpiSub:'人事管理平台 · 产品设计师 / 设计负责人 · [ 2026年5月 — 6月 ]',
    kpiM1:'设计系统元素', kpiM2:'已交付开发的界面', kpiM3:'产品熵降低',
    kpiContext:'公司是为最高权力层（俄罗斯总统办公厅）服务的政府集成商和咨询中心。产品是用于人事管理和医疗信息系统（HIS）的内部 CRM，基于陈旧的 Bootstrap 框架运行，拥有 200 多个零散界面，缺乏统一逻辑。需要在“当下”改善 UX，并为迁移到新技术栈奠定基础。',
    kpiSolution:'工作沿两条并行轨道推进——为用户带来快速成效，为未来引擎构建系统化基础。',
    kpiTrack1:'战术 · 快速成效', kpiTrack1Text:'全面盘点界面，然后“换肤”——按新设计令牌重新着色 Bootstrap 界面，改善视觉感知并降低认知负担。',
    kpiTrack2:'策略 · 未来', kpiTrack2Text:'按照“设计令牌 → 原子 → 分子 → 有机体”的原则构建完整设计系统，不受旧代码限制，将在新引擎上运行。',
    kpiEvidence:'创建了一套基础系统，将产品从“混乱”状态转变为结构化组件。166 个设计令牌（颜色、字体、间距）。99 种样式（排版、阴影、圆角、栅格）。2,069 个库元素（约 80 个组件 × 所有状态）。20 个界面和模态窗口已交付前端。',
    kpiStat1:'设计令牌：颜色、字体、间距', kpiStat2:'样式：排版、阴影、圆角、栅格',
    kpiStat3:'库元素：约 80 个组件 × 所有状态', kpiStat4:'已交付前端的界面和模态窗口',
    kpiCap1:'两个层面：战术与策略', kpiCap2:'方法：从混乱到原子',
    kpiCap3:'应用设置', kpiCap4:'角色模型',
    kpiCap5:'导航与浮层——所有状态', kpiCap6:'按钮与按钮组',
    kpiCap7:'日期选择器', kpiCap8:'排版：标题与正文',
    kpiLbl1:'页面 · 战术换肤', kpiLbl2:'组件 · 设计系统',
    kpiOutcomes:'从 200 多个零散产物过渡到 70 多个系统化元素：产品熵降低至原来的 1/4–1/5。每个组件都有完整规范，可随时交付开发。',
    kpiFinalLbl:'零散产物 → 系统化组件',
    kpiValueLbl:'商业价值',
    kpiValue1:'对用户无冲击——渐进式改进而非突然切换界面',
    kpiValue2:'节省资源——迁移时无需从头重绘所有内容',
    kpiValue3:'在真实产品上验证——换肤成为组件验证的试验场',
    kpiNext:'下一个案例：Altera 医疗信息系统',
         kpiPrev:'上一个案例：Business Portal',
    altCardTitle:'Altera 疗养院医疗信息系统', altCardLbl:'医生 MVP 模块 · 可交互原型',
    altMeta:'医疗科技 · MVP · 2026',
    altSub:'全科医生（GP）模块 · 产品设计师 / UX 研究 / UI 架构师 · [ 2026年6月 — 8月 ]',
    altM1:'医生 MVP 模块——从零开始，无真实系统访问权限', altM2:'旧系统截图是唯一资料', altM3:'全科医生每天接诊 13–17 名患者——高负荷下的工效设计',
    altContext:'公司（隶属 GlavNIVC）拥有基于陈旧技术栈的旧版医疗信息系统「Praktika.Sanatoriy」。业务方希望为医生打造全新的现代化模块，但设置了严格限制：无法访问真实系统——只有 10 张静态截图；也无法与真实医生用户交流。核心任务是为最常用角色——全科医生（每天接诊 13–17 名患者）创建工效、极简的界面，最大程度降低认知负担和数据录入时间。',
    altSolution:'工作分四个阶段推进——在不确定条件下做决策的能力。',
    altStage1:'阶段 01 · 深入分析限制', altStage1Text:'研究 10 张旧系统截图，提炼关键场景（接诊、开治疗单、执行监控、费用监控）。',
    altStage2:'阶段 02 · 无法访问真实系统时的数据收集', altStage2Text:'使用 Yandex.Forms 问卷验证痛点；为未来角色（治疗护士、病房护士、专科医生、管理员）搭建架构。',
    altStage3:'阶段 03 · 在开发前坚持 UX 方法论', altStage3Text:'不直接采用现成的 Blazor SDK，而是依据希克定律和米勒定律进行论证；“骨架 + 皮肤”架构：SDK 负责逻辑，自定义设计系统（CSS 变量和封装组件）负责布局与工效。这没有破坏当时的开发进度，也避免了未来的重复劳动。',
    altStage4:'阶段 04 · 构建基础', altStage4Text:'精简品牌手册（医疗极简主义）、样式设计库和 UI 组件规范（Blazor/Tailwind）。',
    altCapFlow:'模块导航与逻辑：4 个层级和上下文菜单',
    altEvidence:'开发并上线了医生核心场景的完整可交互原型：仪表盘、登记簿、患者卡片、排班。',
    altConceptLbl:'概念', altConceptText:'从自然材料到数字界面：为医疗产品探索触感、透明感和沉静感。',
    altCapMood:'情绪板 · “医疗极简主义”方向',
    altUikitLbl:'可交互 UI Kit', altUikitCap:'可交互 UI Kit 含主题切换，可在原型中体验 · 打开后先显示登录表单',
    altUikitLink:'打开原型',
    altCapPatient:'患者卡片 · 就诊历史',
         altScreensLbl:'原型界面',
    altSpecLbl:'技术规范（前端）',
    altSpec1:'自定义组件说明（SDK 之上的封装组件）',
    altSpec2:'医生工作台中标签栏的行为',
    altSpec3:'排班：“红色时间线”——当前时刻标记',
    altSpec4:'上下文菜单与模态窗口场景',
    altOutcomes:'创建了完全可交付开发的全科医生 MVP 模块，包括 Blazor 规范。项目的遗产超出了单个模块：',
    altFinalLbl:'从零——到开发就绪的 MVP，无需访问真实系统和用户',
    altLegacyLbl:'价值与遗产',
    altLegacy1:'产品——开发就绪的全科医生 MVP 模块（包括 Blazor 规范）',
    altLegacy2:'策略——可扩展架构：新增角色（护士、管理员）无需重写系统',
    altLegacy3:'商业价值——“骨架 + 皮肤”将风险降至最低，并为平台无感切换到新引擎做好准备',
    altLegacy4:'方法论——受限访问条件下的 UX 研究（问卷 + 截图分析）',
    altNext:'下一个案例：Sbol.pro',
         altPrev:'上一个案例：CRM「KPI」改版',
    altFootnote:'完整技术规范和开发战略依据（Blazor、UI 模式）可应要求提供。', altFootnoteLink:'应要求提供',
    sbCardTitle:'Sbol.pro · 客户请求', sbCardLbl:'升级处理 · AI 助手',
    sbMeta:'2025 · 产品设计师 · NDA',
    sbTitle:'AI 决策辅助助手', sbSub:'Sbol.pro · 客户请求 · [ 2025 ]',
    sbContext:'银行网点员工正在切换到新的查询系统，以取代多个信息查询系统。旧系统基于严格串行的 5 级分类器，导致内部专家负担重、分类错误频发、解决客户问题的时间延长。关键任务是确保平稳过渡，不降低服务质量。',
    sbRoleLbl:'我的角色',
    sbRole:'产品设计师。', sbRoleRest:'开展 UX 研究（现场观察、深度访谈、UX 测试），分析工作效率，设计 AI 助手，与开发团队和数据科学团队协调。',
    sbSolution:'设计并实施了两个集成了 AI 的连续场景。',
    sbWasLbl:'之前', sbNowLbl:'之后',
    sbWas1:'严格串行的 5 级分类器', sbWas2:'内部专家负担重',
    sbWas3:'分类错误频发', sbWas4:'问题解决时间延长',
    sbNow1:'全局智能搜索——用语义搜索取代串行分类器（快速见效）',
    sbNow2:'与 AI 助手对话——助手要么直接提供解决方案，要么自动赋予正确分类并登记请求',
    sbOutcomes:'显著减少工作量和请求处理时间。关键指标：',
    sbM1:'转给内部专家的请求数量', sbM2:'请求分类错误',
    sbM3:'新员工适应期（此前为 6 个月）', sbM4:'工作量和处理时间显著减少',
    ndaText:'NDA。产品受保密协议约束。视觉素材不得导出银行内网环境，因此此处以关键指标、排版和表格数据代替界面截图。完整流程和架构说明可应要求提供。',
    sbNext:'下一个案例：SmartCare',
         sbPrev:'上一个案例：Altera 医疗信息系统',
    scCardTitle:'SmartCare', scCardLbl:'满意度 · 两年演进',
    scMeta:'2023 — 2025 · 产品设计师 · NDA',
    scTitle:'SmartCare：支持工具的演进', scSub:'Sber 支持热线 · [ 2023年 — 2025年 ]',
    scContext:'SmartCare 是 Sber 支持热线员工的内部工具。问题不在于某个功能，而在于缺乏系统性：不同产品团队各自推出自己的模式和场景，造成混乱。这导致操作员认知负担高、电话处理时间延长、新人培训周期长。任务是在两年内平稳、系统性地提升支持工作效率，避免剧烈变动。',
    scRole:'产品设计师。', scRoleRest:'我的策略不是“一次性改版”，而是持续迭代的产品演进。大量 UX 研究不仅验证假设，还揭示了团队之间工作模式中的深层冲突。关键决策是标准化：将门户所有团队的场景和模式统一到同一标准。',
    scSolution:'模式标准化：基于研究识别并消除了不合逻辑且相互冲突的场景——奠定了所有产品团队都接受的统一 UX 标准。',
    scKeyLbl:'关键场景：快速退款',
    scStep1:'首个原型', scStep1Text:'基于假设的“利益相关者”模式。',
    scStep2:'测试', scStep2Text:'在真实员工（不同年龄和经验）中进行为期两周的 UX 测试。',
    scStep3:'迭代', scStep3Text:'场景过于复杂，于是大幅简化，并引入 UX 文案将技术术语替换为常用表达。',
    scStep4:'结果', scStep4Text:'功能被顺利接受，服务速度未下降。',
    scOutcomes:'两年迭代工作的四项关键成果：',
    scM1:'两年内平均通话时长缩短', scM2:'新员工入职上手周期',
    scM3:'服务满意度（CSAT）——未出现预期下降', scM4:'退款时间（此前需数天）',
    scPrev:'上一个案例：Sbol.pro',
         scNext:'下一个案例：Business Portal',
    bpCardTitle:'Business Portal', bpCardLbl:'Markswebb 2020 · 中小企业平台七年演进',
    bpMeta:'2016 — 2022 · 首席产品设计师 · B2B · 金融科技',
    bpSub:'中小企业数字银行服务平台 · Otkritie Bank',
    bpKmNum:'第 2 名', bpKmLbl:'Markswebb 2020 排名 · 67.3 分', bpKmNote:'起点 · 第 19 名（2016）',
    bpContext:'2016 年我以唯一设计师身份加入该项目时，该银行甚至未进入 Markswebb 排名前 20。我设计并于 2016 年 11 月上线了 Business Portal MVP。产品立即实现盈利，并进入独立排名 Business Internet Banking Rank（第 19 名），成为后续增长至 2020 年第 2 名的起点。',
    bpRoleLbl:'我的角色与策略',
    bpRole1:'高级设计师（2016—2019）——项目唯一设计师。', bpRole1Rest:'从零设计并上线 MVP，开展首批焦点小组和研究，奠定界面架构基础。',
    bpRole2:'首席产品设计师 / 设计团队负责人（2019—2022）。', bpRole2Rest:'从零建立设计职能，基于原子化设计创建设计系统。',
    bpProcessLbl:'方案与流程',
    bpProcess:'七年产品——三个大阶段：',
    bpStage1:'研究与 MVP', bpStage1Years:'[ 2016 — 2017 ]',
    bpStage1Text:'工作起点：焦点小组、商城测试、与目标受众一起评估首批原型。',
    bpLbl1:'起点 · 早期界面（2016）',
    bpLblEval:'原型评估 · 首批测试', bpLblFlows:'场景与流程设计',
    bpCapLogin:'登录 · 初始版本', bpCapMain:'主页 · 初始版本',
    bpCapPay:'支付单据', bpCapAcc:'我的账户', bpCapTar:'资费',
    bpCapEval1:'原型评估 · 登录', bpCapEval2:'原型评估 · 主页', bpCapEval3:'原型评估 · 公司资料与账户',
    bpCapCjm:'初始 CJM · 支付场景', bpCapFlows:'线框图 · 界面流程图',
    bpStage2:'迁移与扩展', bpStage2Years:'[ 2018 — 2019 ]',
    bpStage2Text:'BSS 迁移 UX 研究（双重审批问题），SWIFT GPI 专家评估。',
    bpCapBss:'深度访谈：用户如何经历从 BSS 的切换', bpCapCredit:'成熟平台：信贷和外贸业务功能（2019）',
    bpStage3:'设计系统与增长', bpStage3Years:'[ 2019 — 2022 ]',
    bpStage3Text:'创建基于原子化设计的设计系统，并扩展至生态内 15 余个产品。',
    bpCapUikit:'为整个生态提供统一设计系统',
    bpEvLbl:'佐证与成果',
    bpBaLbl:'Markswebb · 前后对比',
    bpBaWas:'2016 · 第 19 名 · 起点', bpBaNow:'2022 · 第 7 名 · 4 个板块进入前五',
    bpMwHint:'13 张幻灯片 · 点击查看大图 · 滑动或拖拽浏览',
    bpMwFootnote:'第 19 名（2016）——正是我作为唯一设计师打造的产品起点。这是我第一个上线的 MVP。',
    bpRiaLbl:'公开认可', bpRiaPre:'RIA Novosti · 2020 ·', bpRiaCap:'打开文章',
    bpSumLbl:'七年成果',
    bpM1:'关键操作时间', bpM2:'用户数', bpM3:'统一设计系统覆盖的产品', bpM4:'设计团队规模增长',
    bpProfitNote:'产品在 MVP 上线后的第一个季度即实现盈利（2016 年 11 月）。',
    bpBpNdaLbl:'截图未能呈现的内容。', bpBpNda:'项目因 VTB 收购于 2023 年关闭。完整材料可应要求提供。',
    bpNext:'下一个案例：CRM「KPI」改版',
         bpPrev:'上一个案例：SmartCare',
    contactsCounter:'开放机会 · GMT+3',
    contactHint:'主要联系方式 · Telegram',
    footer:'© Maria Mishina · 2026',
    marquee:['产品设计','金融科技','B2B','政务科技','AI 界面','UX Research','设计系统','导师辅导','Figma','企业服务','服务设计']  }
};

function renderMarquee(l){
  const track = document.querySelector('.marquee-track');
  if(!track || !I18N[l] || !Array.isArray(I18N[l].marquee)) return;
  track.textContent = '';
  for(let pass = 0; pass < 2; pass++){
    I18N[l].marquee.forEach(word => {
      const item = document.createElement('span');
      item.className = 'mq-item'; item.textContent = word;
      const sep = document.createElement('span');
      sep.className = 'mq-sep'; sep.textContent = '◆';
      track.append(item, sep);
    });
  }
}

function setLang(l){
  if(!I18N[l]) l = 'ru';
  root.setAttribute('data-lang', l);
  root.setAttribute('lang', l === 'cn' ? 'zh-CN' : l);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = I18N[l][el.dataset.i18n];
    if(typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const v = I18N[l][el.dataset.i18nAria];
    if(v) el.setAttribute('aria-label', v);
  });
  document.querySelectorAll('[data-setlang]').forEach(b =>
    b.classList.toggle('active', b.dataset.setlang === l)
  );
  renderMarquee(l);
  store.set('lang', l);
}
document.querySelectorAll('[data-setlang]').forEach(b =>
  b.addEventListener('click', () => setLang(b.dataset.setlang))
);
setLang(store.get('lang') || 'ru');

/* ---------- РОУТЕР ---------- */
const PAGES = ['hero','about','experience','cases','case','altera','sber','smartcare','bp','contacts'];
function showPage(name){
  PAGES.forEach(p => {
    document.querySelector('[data-page="'+p+'"]').hidden = (p !== name);
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    const t = a.getAttribute('href').slice(1);
    a.classList.toggle('active', t === name || (t === 'cases' && (name === 'case' || name === 'altera' || name === 'sber' || name === 'smartcare' || name === 'bp')));
  });
  window.scrollTo(0, 0);
}
function route(){
  const h = (location.hash || '#home').slice(1);
  showPage(PAGES.includes(h) ? h : 'hero');
}
window.addEventListener('hashchange', route);
route();

document.querySelectorAll('[data-goto]').forEach(card => {
  const go = () => { location.hash = '#' + card.dataset.goto; };
  card.addEventListener('click', go);
  card.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); go(); }
  });
});

/* ---------- ТУМБЛЕР UI-KIT (Альтера) ---------- */
document.querySelectorAll('[data-uikit]').forEach(group => {
  const btns = group.querySelectorAll('[data-uikit-theme]');
  const imgs = group.querySelectorAll('.uikit-view img');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.uikitTheme;
      btns.forEach(b => b.classList.toggle('active', b === btn));
      imgs.forEach(img => { img.hidden = img.dataset.uikitTheme !== t; });
    });
  });
});

/* ---------- ЛАЙТБОКС ---------- */
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const lbCap = lightbox.querySelector('.lb-caption');
let lbItems = [], lbIdx = 0;

function captionOf(img){
  const fig = img.closest('figure');
  const cap = fig && fig.querySelector('figcaption');
  return cap ? cap.textContent.trim() : img.alt;
}
function showLB(){
  const item = lbItems[lbIdx];
  if(!item) return;
  lbImg.src = item.src;
  lbImg.alt = item.alt || '';
  lbCap.textContent = captionOf(item);
  [1,-1].forEach(d => {
    const n = lbItems[(lbIdx + d + lbItems.length) % lbItems.length];
    if(n){ const p = new Image(); p.src = n.src; }
  });
}
function openLB(items, idx){
  lbItems = items; lbIdx = idx;
  showLB();
  lightbox.hidden = false;
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeLB(){
  lightbox.hidden = true;
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  lbItems = [];
}
function moveLB(dir){
  if(!lbItems.length) return;
  lbIdx = (lbIdx + dir + lbItems.length) % lbItems.length;
  showLB();
}

document.addEventListener('click', e => {
  const img = e.target.closest('img[data-zoom]');
  if(img && !img.hidden){
    e.preventDefault();
    const page = img.closest('.page');
    const items = page
      ? Array.from(page.querySelectorAll('img[data-zoom]')).filter(i => !i.hidden || i === img)
      : [img];
    const idx = Math.max(0, items.indexOf(img));
    openLB(items, idx);
    return;
  }
  if(!lightbox.hidden){
    const act = e.target.closest('[data-lb-action]');
    if(act){
      const a = act.dataset.lbAction;
      if(a === 'close') closeLB();
      else if(a === 'prev') moveLB(-1);
      else if(a === 'next') moveLB(1);
      return;
    }
    if(e.target === lightbox) closeLB();
  }
});

document.addEventListener('keydown', e => {
  if(lightbox.hidden) return;
  if(e.key === 'Escape') closeLB();
  else if(e.key === 'ArrowLeft') moveLB(-1);
  else if(e.key === 'ArrowRight') moveLB(1);
});

let touchX = null;
lightbox.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, {passive:true});
lightbox.addEventListener('touchend', e => {
  if(touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if(Math.abs(dx) > 50) moveLB(dx < 0 ? 1 : -1);
  touchX = null;
}, {passive:true});

/* ---------- КАРУСЕЛЬ MARKSWEBB (кейс Бизнес-портал) ---------- */
document.querySelectorAll('[data-mw]').forEach(track => {
  const step = () => (track.querySelector('.mw-item') || {}).offsetWidth + 16;
  const prev = track.parentElement.querySelector('[data-mw-prev]');
  const next = track.parentElement.querySelector('[data-mw-next]');
  if(prev) prev.addEventListener('click', () => track.scrollBy({left:-step()*2, behavior:'smooth'}));
  if(next) next.addEventListener('click', () => track.scrollBy({left:step()*2, behavior:'smooth'}));
});

/* ---------- ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ---------- */
if('IntersectionObserver' in window){
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold:.12 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
}else{
  document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
}
})();
