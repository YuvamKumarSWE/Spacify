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
                case 's':
                    pageToShow = 'selectionPage';
                    break;
                case 'p':
                    pageToShow = 'projectionPage';
                    break;
                case 'j':
                    pageToShow = 'joinPage';
                    break;
                case 'ag':
                    pageToShow = 'aggregationGroupByPage';
                    break;
                case 'ah':
                    pageToShow = 'aggregationHavingPage';
                    break;
                case 'n':
                    pageToShow = 'nestedAggregationPage';
                    break;
                case 'dq':
                    pageToShow = 'divisionPage';
                    break;
                case 'dz':
                    pageToShow = 'dangerZonePage';
                    break;
                
                
                default:
                    pageToShow = 'insertPage';
            }
            
            document.getElementById(pageToShow).classList.add('active');
        });
    });
});