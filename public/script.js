function myHamburger() {
    const menu = document.getElementById('link-block');
    const icon = document.getElementById('menu-icon');
    menu.classList.toggle('active');
    icon.classList.toggle('active');
    icon.textContent = icon.classList.contains('active') ? 'close' : 'menu';
  }