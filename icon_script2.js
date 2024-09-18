document.addEventListener('DOMContentLoaded', () => {
    //const profileIcon = document.getElementById('profileIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');
  
    profileIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });
  
    document.addEventListener('click', (event) => {
        if (!profileIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
  });
  