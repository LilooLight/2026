/* app.js — логика портфолио Марии Мишиной
   Подключается в index.html: <script src="app.js" defer>
   Меняется очень редко — только при новой интерактивной фиче.
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

/* ---------- i18n ---------- */
const I18N = {
  ru: {
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
    marquee:['Продуктовый дизайн','FinTech','B2B','GovTech','AI Интерфейсы','UX Research','Дизайн-системы','Менторинг','Figma','Enterprise','Service Design']
  },
  en: {
    navProfile:'Profile', navExp:'Experience', navCases:'Cases', navContacts:'Contact',
    heroBtnExp:'Work experience', heroBtnCases:'View cases',
    secProfile:'Profile', secExperience:'Experience', secCases:'Case studies', secContacts:'Contact',
    secProfileIntro:'Professional profile', secSkills:'Core competencies',
    secTools:'Tools', secEducation:'Education',
    secContext:'Context', secSolution:'Solution',
    secEvidence:'Evidence', secOutcomes:'Outcomes',
    tlContext:'Context', tlInput:'My contribution', tlResults:'Outcomes',
    backToCases:'All cases', linkOpenCase:'View case',
    aTheme:'Toggle theme', aLang:'Interface language',
    marquee:['Product Design','FinTech','B2B','GovTech','AI Interfaces','UX Research','Design Systems','Mentorship','Figma','Enterprise','Service Design']
  },
  cn: {
    navProfile:'简介', navExp:'经验', navCases:'案例', navContacts:'联系',
    heroBtnExp:'工作经历', heroBtnCases:'查看案例',
    secProfile:'简介', secExperience:'工作经历', secCases:'案例研究', secContacts:'联系方式',
    secProfileIntro:'专业简介', secSkills:'核心能力',
    secTools:'工具', secEducation:'教育背景',
    secContext:'背景', secSolution:'解决方案',
    secEvidence:'验证', secOutcomes:'成果',
    tlContext:'背景', tlInput:'我的贡献', tlResults:'成果',
    backToCases:'所有案例', linkOpenCase:'查看案例',
    aTheme:'切换主题', aLang:'界面语言',
    marquee:['产品设计','FinTech','B2B','GovTech','AI 界面','UX Research','设计系统','导师辅导','Figma','企业服务','服务设计']
  }
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
const PAGES = ['hero','about','experience','cases','case','altera','sber','smartcare','bp','contacts'];function showPage(name){
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
