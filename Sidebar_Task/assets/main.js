function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('toggleBtn');

    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
    toggleBtn.classList.toggle('collapsed');

    const isCollapsed = sidebar.classList.contains('collapsed');
    const icon = isCollapsed ? 'fa-bars' : 'fa-times';
    toggleBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    toggleBtn.setAttribute('aria-expanded', !isCollapsed);

    localStorage.setItem('sidebarCollapsed', isCollapsed);
}

function setActiveMenuItem() {
    const links = document.querySelectorAll('.sidebar-content a:not(.user-profile)');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }

            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            this.setAttribute('aria-current', 'page');

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

    themeToggle.innerHTML = isDark ?
        '<i class="fas fa-moon"></i><span>Dark Mode</span>' :
        '<i class="fas fa-sun"></i><span>Light Mode</span>';

    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function closeSidebarOnClickOutside(event) {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');

    if (!sidebar.contains(event.target) &&
        event.target !== toggleBtn &&
        !sidebar.classList.contains('collapsed') &&
        window.innerWidth <= 768) {
        toggleSidebar();
    }
}

function handleKeyboardNavigation(e) {
    const sidebar = document.getElementById('sidebar');
    if (e.key === 'Escape' && !sidebar.classList.contains('collapsed') && window.innerWidth <= 768) {
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

    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed && window.innerWidth > 768) {
        toggleSidebar();
    }

    document.getElementById('toggleBtn').addEventListener('click', toggleSidebar);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.addEventListener('click', closeSidebarOnClickOutside);
    document.addEventListener('keydown', handleKeyboardNavigation);

    setActiveMenuItem();

    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar.classList.contains('collapsed')) {
            toggleSidebar();
        }
    }
}

function handleResize() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768 && sidebar.classList.contains('collapsed')) {
        toggleSidebar();
    } else if (window.innerWidth <= 768 && !sidebar.classList.contains('collapsed')) {
        toggleSidebar();
    }
}

window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', init);
