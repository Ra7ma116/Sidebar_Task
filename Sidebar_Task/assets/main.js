function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('toggleBtn');

    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
    toggleBtn.classList.toggle('collapsed');

    toggleBtn.innerHTML = sidebar.classList.contains('collapsed')
        ? '<i class="fas fa-bars"></i>'
        : '<i class="fas fa-times"></i>';
}
