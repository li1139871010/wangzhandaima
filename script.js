document.addEventListener("DOMContentLoaded", function() {
    // 1. 暗黑模式逻辑
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // 检查本地存储中是否有之前的偏好
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ 切换浅色';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ 切换浅色';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙 切换深色';
            localStorage.setItem('theme', 'light');
        }
    });

    // 2. 滚动渐显动画（Intersection Observer）
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15, // 元素出现 15% 时触发
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});