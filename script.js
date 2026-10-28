document.addEventListener("DOMContentLoaded", function() {
    // ================= 1. 暗黑模式 =================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
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

    // ================= 2. 滚动渐显 =================
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15 });
    faders.forEach(fader => appearOnScroll.observe(fader));

    // ================= 3. 分类过滤功能 =================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 切换按钮的高亮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // 遍历商品卡片，控制显示隐藏
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    // 简单的渐显动画
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ================= 4. 商品详情弹窗功能 =================
    const modal = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModal');
    const viewDetailBtns = document.querySelectorAll('.view-detail-btn');

    // 弹窗里的元素
    const modalImg = document.getElementById('modalImg');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');

    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 获取当前点击的按钮所在的卡片
            const card = this.closest('.product-card');
            
            // 提取卡片里的数据
            const imgSrc = card.querySelector('.product-img').src;
            const category = card.querySelector('.category-tag').innerText;
            const title = card.querySelector('h2').innerText;
            const price = card.querySelector('.price').innerText;
            const desc = card.querySelector('.product-desc').innerText;

            // 把数据塞进弹窗
            modalImg.src = imgSrc;
            modalCategory.innerText = category;
            modalTitle.innerText = title;
            modalPrice.innerText = price;
            // 这里可以写更长的介绍，为了演示直接复制了短介绍
            modalDesc.innerText = desc + " 我们选用最优质的材料，经过数十道工序精心打磨，确保每一件产品都能成为您家中的艺术品。支持定制尺寸与颜色，欢迎咨询客服获取更多实拍图和材质样板。";

            // 显示弹窗
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 禁止背景滚动
        });
    });

    // 关闭弹窗
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // 恢复背景滚动
    }
    closeModalBtn.addEventListener('click', closeModal);
    // 点击遮罩层也能关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // ================= 5. 复制微信号 =================
    const copyBtns = [document.getElementById('copyWechatBtn'), document.getElementById('modalCopyBtn')];
    const copySuccess = document.getElementById('copySuccess');
    const wechatId = 'zhange_888'; // 记得改微信号

    copyBtns.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', function() {
                navigator.clipboard.writeText(wechatId).then(() => {
                    if(this.id === 'copyWechatBtn') {
                        copySuccess.style.display = 'block';
                        setTimeout(() => copySuccess.style.display = 'none', 3000);
                    } else {
                        this.innerText = '✅ 微信号已复制！';
                        setTimeout(() => this.innerText = '复制微信号并咨询', 3000);
                    }
                });
            });
        }
    });
});