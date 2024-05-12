const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');


searchIcon.addEventListener('click', function() {
    if (searchBar.style.display === 'none') {
        searchBar.style.display = 'block';
            } else {
        searchBar.style.display = 'none';
            }
});