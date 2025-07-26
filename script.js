document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.menu-link');
    const sections = [
        { id: 'about', link: null },
        { id: 'projects', link: null },
        { id: 'contact', link: null }
    ];
    sections.forEach(s => {
        s.link = document.querySelector('.menu-link[href="#' + s.id + '"]');
    });

    // スムーズスクロール＋クリックアニメーション
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.getElementById(href.slice(1));
                if (target) {
                    e.preventDefault();

                    // 波紋アニメーション
                    link.classList.add('ripple-animate');
                    setTimeout(() => {
                        link.classList.remove('ripple-animate');
                    }, 400);

                    // スクロール
                    const y = target.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    function onScroll() {
        let current = null;
        for (let i = 0; i < sections.length; i++) {
            const section = document.getElementById(sections[i].id);
            if (section && window.scrollY + 120 >= section.offsetTop) {
                current = sections[i];
            }
        }
        links.forEach(link => link.classList.remove('active'));
        if (current && current.link) current.link.classList.add('active');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ハンバーガーメニュー開閉
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', function () {
            const isOpen = sideMenu.classList.toggle('open');
            menuToggle.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        // メニュークリックで自動的に閉じる
        sideMenu.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 900) {
                    sideMenu.classList.remove('open');
                    menuToggle.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});

