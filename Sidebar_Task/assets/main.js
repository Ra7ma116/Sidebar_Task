document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');

    function toggleSidebar() {
        sidebar.classList.toggle('closed');
        content.classList.toggle('sidebar-closed');

        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
        }
    }

    if (window.innerWidth <= 768) {
        sidebar.classList.add('closed');
        content.classList.add('sidebar-closed');
    }

    sidebarToggle.addEventListener('click', toggleSidebar);

    content.addEventListener('click', function (event) {
        if (window.innerWidth <= 768 && sidebar.classList.contains('open') && !sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            toggleSidebar();
        }
    });
});