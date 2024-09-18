// Ensure DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const profileIcon = document.getElementById("profile-icon");
  const dropdownMenu = document.getElementById("dropdownMenu");

  // Toggle dropdown visibility
  profileIcon.addEventListener("click", function () {
      dropdownMenu.classList.toggle("show");
  });

  // Close dropdown if clicking outside
  // document.addEventListener("click", function (event) {
  //     if (!profileIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
  //         dropdownMenu.classList.remove("show");
  //     }
  // });
  document.getElementById('profile-icon').addEventListener('click', function() {
    var dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
  });
});

const menuButton = document.getElementById('menu-button');
const navLinks = document.getElementById('nav-links');

menuButton.addEventListener('click', () => {
  navLinks.classList.toggle('hidden');
  
});
document.getElementById('profile-icon').addEventListener('click', function() {
  var dropdown = document.getElementById('dropdownMenu');
  dropdown.classList.toggle('show');
});

