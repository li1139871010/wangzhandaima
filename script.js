// 等网页加载完毕后执行
document.addEventListener("DOMContentLoaded", function() {
    // 找到所有的按钮
    const buttons = document.querySelectorAll('.btn');
    
    // 给每个按钮加上点击事件
    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            // 阻止按钮默认的跳转行为
            event.preventDefault(); 
            // 弹出提示框
            alert("章鱼哥，这个作品还在努力制作中，敬请期待！");
        });
    });
});