document.addEventListener('DOMContentLoaded', () => {
  // 年の自動更新
  document.getElementById('year').textContent = new Date().getFullYear();

  // モバイルメニューの制御
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');
  let mobileMenu = null;

  function toggleMenu() {
    if (!mobileMenu) {
      mobileMenu = document.createElement('div');
      mobileMenu.className = 'mobile-menu';
      mobileMenu.innerHTML = `
        <nav class="mobile-nav">
          <a href="#about">自己紹介</a>
          <a href="#skills">スキル</a>
          <a href="#projects">プロジェクト</a>
          <a href="#contact">お問い合わせ</a>
        </nav>
      `;
      nav.appendChild(mobileMenu);

      // スタイルを追加
      const style = document.createElement('style');
      style.textContent = `
        .mobile-menu {
          display: none;
          padding: 0.5rem 1rem 1rem;
          background: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-menu.active {
          display: block;
        }
        
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .mobile-nav a {
          display: block;
          padding: 0.5rem;
          color: var(--color-gray-700);
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .mobile-nav a:hover {
          color: var(--color-primary);
        }
        
        @media (min-width: 768px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    mobileMenu.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
  }

  menuButton.addEventListener('click', toggleMenu);

  // スクロール時のヘッダー制御
  let lastScroll = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.style.transform = 'translateY(0)';
      return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      header.style.transform = 'translateY(-100%)';
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      header.style.transform = 'translateY(0)';
      header.classList.remove('scroll-down');
    }

    lastScroll = currentScroll;
  });

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // モバイルメニューが開いている場合は閉じる
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          toggleMenu();
        }
      }
    });
  });
});