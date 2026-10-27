document.addEventListener("DOMContentLoaded", function() {
    // 1. 处理暗黑模式切换
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', function() {
        // 切换 body 上的 dark-mode 类
        body.classList.toggle('dark-mode');
        
        // 根据当前模式改变按钮文字
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ 切换浅色';
        } else {
            themeToggle.textContent = '🌙 切换深色';
        }
    });

    // 2. 处理查看详情按钮的点击弹窗
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
            alert("章鱼哥，这个作品还在努力制作中，敬请期待！");
        });
    });
});