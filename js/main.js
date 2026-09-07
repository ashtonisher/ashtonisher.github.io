const root = document.getElementById('root');
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 100);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
const themeBtn = document.getElementById('themeBtn');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

let dark = false;

function applyTheme() {
  root.classList.toggle('light-mode', !dark);
  themeBtn.setAttribute('aria-pressed', String(!dark));
  themeBtn.setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
  const moonIcons = document.querySelectorAll('#iconMoon, #iconMoonFilled');
  const sunIcons = document.querySelectorAll('#iconSun, #iconSunFilled');
  moonIcons.forEach(el => el.classList.toggle('hidden-icon', !dark));
  sunIcons.forEach(el => el.classList.toggle('hidden-icon', dark));
}

themeBtn.addEventListener('click', () => {
  dark = !dark;
  applyTheme();
});

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = document.querySelector('.nav').offsetHeight;
  const top = el.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top, behavior: 'smooth' });
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Stats 슬롯머신 애니메이션
const statSlots = document.querySelectorAll('.stat-num-slot[data-target]');

function animateSlot(el) {
  const target = parseInt(el.dataset.target);
  const digits = String(target).length;
  el.style.minWidth = `${digits}ch`;
  const TOTAL = 12;
  const STEP_MS = 50;
  let step = 0;

  el.innerHTML = `<span class="stat-num-inner">—</span>`;

  function showNext() {
    if (step > TOTAL) return;

    const isLast = step === TOTAL;
    let value;
    if (isLast) {
      value = target;
    } else if (step / TOTAL < 0.5) {
      value = Math.floor(Math.random() * (target * 3 + 10));
    } else {
      const gap = TOTAL - step;
      value = Math.max(0, target - Math.floor(Math.random() * (gap + 1)));
    }

    const current = el.querySelector('.stat-num-inner');
    const next = document.createElement('span');
    next.className = 'stat-num-inner';
    next.textContent = value;
    next.style.cssText = `top: -100%; transition: top ${STEP_MS * 0.85}ms ease;`;
    el.appendChild(next);

    current.style.cssText = `top: 0; transition: top ${STEP_MS * 0.85}ms ease;`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        current.style.top = '100%';
        next.style.top = '0';
      });
    });

    setTimeout(() => {
      current.remove();
      step++;
      if (step <= TOTAL) showNext();
    }, STEP_MS);
  }

  showNext();
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statSlots.forEach(el => {
        if (reducedMotion) {
          el.innerHTML = `<span class="stat-num-inner">${el.dataset.target}</span>`;
        } else {
          animateSlot(el);
        }
      });
      statObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

// 프로젝트 스크린샷 모달
const projectData = {
  banapresso: {
    tag: '홈페이지',
    title: '바나프레소 홈페이지',
    desc: 'React 18 마이그레이션. 이미지 최적화·lazy loading·PurgeCSS·Gzip으로 번들 사이즈 80% 감소. Next.js 기반 SSR 전환 설계 및 검증.',
    screenshots: ['images/screenshots/banapresso/01.png', 'images/screenshots/banapresso/02.png', 'images/screenshots/banapresso/03.png', 'images/screenshots/banapresso/04.png']
  },
  order: {
    tag: '주문',
    title: '바나프레소 웹 주문',
    desc: '결제·장바구니·할인·회원 인증 로직 전반 개발. 나이스 본인인증 모듈 연동.',
    screenshots: ['images/screenshots/order/01.png', 'images/screenshots/order/02.png', 'images/screenshots/order/03.png', 'images/screenshots/order/04.png', 'images/screenshots/order/05.png']
  },
  banaple: {
    tag: '홈페이지',
    title: '바나플 홈페이지 (퀵 서비스)',
    desc: 'ASP → React 마이그레이션. 법인 분리 시 외부 ASP 의존 없이 독립 운영 가능한 구조로 전환.',
    screenshots: ['images/screenshots/banaple/01.png', 'images/screenshots/banaple/02.png']
  },
  farm: {
    tag: '웹뷰',
    title: '복숭아키우기',
    desc: '게임형 앱테크 서비스 프론트엔드 단독 개발. Android·iOS 웹뷰 크로스 플랫폼 대응 및 렌더링 최적화로 DAU 1만 명+ (피크 1.3만 명) 1년 이상 안정 운영.',
    screenshots: ['images/screenshots/farm/01.png', 'images/screenshots/farm/02.png', 'images/screenshots/farm/03.png', 'images/screenshots/farm/04.png', 'images/screenshots/farm/05.png']
  },
  badge: {
    tag: '게이미피케이션',
    title: '활동배지',
    desc: 'SNS OCR 인증 포함 미션 기반 게이미피케이션·경쟁 요소 구현 및 서비스 런칭.',
    screenshots: ['images/screenshots/badge/01.png', 'images/screenshots/badge/02.png']
  },
  quick: {
    tag: '솔루션',
    title: '범용 퀵 페이지',
    desc: '회원사별 커스터마이징 지원하는 퀵 주문 접수·상태 추적 솔루션 신규 개발 및 런칭. 카카오 채널 연동.',
    screenshots: ['images/screenshots/quick/01.png', 'images/screenshots/quick/02.png']
  },
  franchise: {
    tag: '어드민',
    title: '가맹점주용 웹 사이트',
    desc: '50개 이상 가맹점 대상 매출·정산·발주 도메인 관리 페이지 신규 개발부터 유지보수·리뉴얼까지 전 주기 단독 담당. 차트·테이블 기반 데이터 시각화 및 엑셀 다운로드.',
    screenshots: ['images/screenshots/franchise/01.png', 'images/screenshots/franchise/02.png', 'images/screenshots/franchise/03.png', 'images/screenshots/franchise/04.png', 'images/screenshots/franchise/05.png', 'images/screenshots/franchise/06.png']
  }
};

const projectModal = document.getElementById('projectModal');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalScreenshots = document.getElementById('modalScreenshots');
let lastFocusedEl = null;

function openProjectModal(id) {
  const data = projectData[id];
  if (!data) return;

  lastFocusedEl = document.activeElement;
  modalTag.textContent = data.tag;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalScreenshots.innerHTML = '';

  data.screenshots.forEach((src, i) => {
    const img = new Image();
    img.alt = `${data.title} 스크린샷 ${i + 1}`;
    img.className = 'modal-screenshot';
    img.onload = () => {
      if (placeholder.parentNode === modalScreenshots) placeholder.replaceWith(img);
    };
    img.onerror = () => {};

    const placeholder = document.createElement('div');
    placeholder.className = 'modal-screenshot-placeholder';
    placeholder.textContent = `스크린샷 준비 중 (${i + 1}/${data.screenshots.length})`;

    modalScreenshots.appendChild(placeholder);
    img.src = src;
  });

  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  projectModal.querySelector('.modal-close').focus();
}

function closeProjectModal() {
  if (!projectModal.classList.contains('open')) return;

  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedEl) lastFocusedEl.focus();
}

document.addEventListener('keydown', (e) => {
  if (!projectModal.classList.contains('open')) return;

  if (e.key === 'Escape') closeProjectModal();
  if (e.key === 'Tab') {
    e.preventDefault();
    projectModal.querySelector('.modal-close').focus();
  }
});

function toggleSection(label) {
  const body = label.nextElementSibling;
  label.classList.toggle('collapsed');
  body.classList.toggle('collapsed');
  const isExpanded = !label.classList.contains('collapsed');
  label.setAttribute('aria-expanded', String(isExpanded));
}

statObserver.observe(document.getElementById('statRow'));

applyTheme();

const start = new Date(2022, 1); // 2022.02
const now = new Date();
const expYears = now.getFullYear() - start.getFullYear() - (now.getMonth() < start.getMonth() ? 1 : 0) + 1;
document.getElementById('expYear').textContent = expYears;

document.getElementById('copyYear').textContent = new Date().getFullYear();

const heroText = document.getElementById('heroText');
const typeTarget = 'gubog.dev';
let i = 0;
let typeTimer;
function typeNext() {
  if (i < typeTarget.length) {
    heroText.textContent += typeTarget[i++];
    typeTimer = setTimeout(typeNext, 70);
  }
}
typeTimer = setTimeout(typeNext, 250);

// 프로젝트 카드 masonry 레이아웃
// DOM 순서(읽는 순서)를 유지하면서 각 카드의 실제 높이만큼 grid row-span을 부여해
// 컬럼별 높이를 자동으로 맞추는 방식 (순서를 뒤섞는 진짜 packing masonry는 아님)
function layoutMasonryGrid(grid) {
  const rowHeight = parseFloat(getComputedStyle(grid).gridAutoRows) || 8;
  const rowGap = parseFloat(getComputedStyle(grid).rowGap) || 0;

  Array.from(grid.children).forEach(card => {
    card.style.gridRowEnd = 'auto';
  });

  Array.from(grid.children).forEach(card => {
    const height = card.getBoundingClientRect().height;
    const span = Math.ceil((height + rowGap) / (rowHeight + rowGap));
    card.style.gridRowEnd = `span ${span}`;
  });
}

function layoutAllMasonryGrids() {
  document.querySelectorAll('.project-grid').forEach(layoutMasonryGrid);
}

function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

layoutAllMasonryGrids();
window.addEventListener('resize', debounce(layoutAllMasonryGrids, 150));
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(layoutAllMasonryGrids);
}
