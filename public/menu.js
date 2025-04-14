//this the menu code no touchy touchy

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navLink');
    const contentPages = document.querySelectorAll('.content-page');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            navLinks.forEach(nav => nav.classList.remove('active'));

            this.classList.add('active');

            contentPages.forEach(page => page.classList.remove('active'));

            const pageId = this.getAttribute('data-page');
            let pageToShow;
            
            switch(pageId) {
                case 'i':
                    pageToShow = 'insertPage';
                    break;
                case 'd':
                    pageToShow = 'deletePage';
                    break;
                case 'u':
                    pageToShow = 'updatePage';
                    break;
                case 'r':
                    pageToShow = 'readPage';
                    break;
                default:
                    pageToShow = 'insertPage';
            }
            
            document.getElementById(pageToShow).classList.add('active');
        });
    });
});