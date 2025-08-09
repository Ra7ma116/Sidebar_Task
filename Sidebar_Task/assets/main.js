function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('toggleBtn');

    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
    toggleBtn.classList.toggle('collapsed');

    const icon = sidebar.classList.contains('collapsed') ? 'fa-bars' : 'fa-times';
    toggleBtn.innerHTML = `<i class="fas ${icon}"></i>`;
}

function setActiveMenuItem() {
    const links = document.querySelectorAll('.sidebar-content a');
    links.forEach(link => {
        link.addEventListener('click', function () {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });
}

function toggleTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const isDark = html.getAttribute('data-theme') === 'dark';

    html.setAttribute('data-theme', isDark ? 'light' : 'dark');

    themeToggle.innerHTML = isDark
        ? '<i class="fas fa-moon"></i><span>Dark Mode</span>'
        : '<i class="fas fa-sun"></i><span>Light Mode</span>';

    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function closeSidebarOnClickOutside(event) {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');

    if (!sidebar.contains(event.target) && event.target !== toggleBtn && !sidebar.classList.contains('collapsed')) {
        toggleSidebar();
    }
}

function init() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    }

    document.getElementById('toggleBtn').addEventListener('click', toggleSidebar);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.addEventListener('click', closeSidebarOnClickOutside);

    setActiveMenuItem();
}

document.addEventListener('DOMContentLoaded', init);
