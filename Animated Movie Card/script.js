document.querySelector('.movie-card').addEventListener('click', (event) => {
    if (event.target.classList.contains('watch-now')) {
        console.log('Watch Now clicked');
        
    } else if (event.target.classList.contains('add-to-playlist')) {
        console.log('Add to Playlist clicked'); }
    });