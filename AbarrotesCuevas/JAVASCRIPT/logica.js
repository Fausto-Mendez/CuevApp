// Lógica JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes agregar la lógica para manejar eventos, como clics en botones, etc.
    const searchBar = document.querySelector('.search-bar input');
    const searchIcon = document.querySelector('.search-icon');
  
    searchBar.addEventListener('focus', function() {
      this.placeholder = '';
    });
  
    searchBar.addEventListener('blur', function() {
      this.placeholder = 'Busca cualquier producto ...';
    });
  
    searchIcon.addEventListener('click', function() {
      
    });
  });
  