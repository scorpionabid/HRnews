// jQuery hazır olduqdan sonra işləsin
$(document).ready(function () {
    // 1. Dynamic news loading and shifting
    let newsList = [
        {
            title: 'Xəbərin Başlığı Burada',
            image: 'https://via.placeholder.com/600x400',
            snippet: 'Xəbərin qısa təsviri burada görünəcək.',
            date: '5 gün əvvəl',
            url: '#'
        },
        {
            title: 'Başqa Bir Xəbər Başlığı',
            image: 'https://via.placeholder.com/600x400',
            snippet: 'Bu xəbərin təsviri burada yerləşir.',
            date: '3 gün əvvəl',
            url: '#'
        },
        {
            title: 'Əlavə Xəbər Başlığı',
            image: 'https://via.placeholder.com/300x200',
            snippet: 'Əlavə xəbərin qısa təsviri.',
            date: '2 gün əvvəl',
            url: '#'
        }
        // Daha çox xəbər burada əlavə oluna bilər
    ];

    // Dinamik olaraq ilk xəbərin sola, əvvəlki xəbərlərin sağa yüklənməsi
    function loadNews() {
        let latestNews = newsList[0];
        let olderNews = newsList.slice(1);

        // Sol sütun: Ən son xəbər
        $('#latest-news .col-md-6:first').html(`
            <div class="card">
                <img src="${latestNews.image}" class="card-img-top" alt="Xəbər Şəkli">
                <div class="card-body">
                    <h5 class="card-title">${latestNews.title}</h5>
                    <p class="card-text">${latestNews.snippet}</p>
                    <p class="card-text"><small class="text-muted">${latestNews.date}</small></p>
                    <a href="${latestNews.url}" class="btn btn-primary">Davamını Oxu</a>
                </div>
            </div>
        `);

        // Sağ sütun: Keçmiş xəbərlər
        let olderNewsHTML = '';
        olderNews.forEach(news => {
            olderNewsHTML += `
                <div class="card sidebar-news mb-3">
                    <img src="${news.image}" class="card-img-top" alt="Xəbər Şəkli">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text"><small class="text-muted">${news.date}</small></p>
                    </div>
                </div>
            `;
        });

        $('#older-news').html(olderNewsHTML);
    }

    // İlk xəbərin dinamik yüklənməsi
    loadNews();

    // 2. Show "Back to Top" button when scrolling
    let backToTop = $('<button id="backToTop" class="btn btn-primary">Yuxarı</button>');
    backToTop.css({
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'none',
        'z-index': '1000',
        'border-radius': '50%',
        padding: '10px 15px',
        'font-size': '16px'
    });
    $('body').append(backToTop);

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });

    $('#backToTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    // 3. Partner logo hover effect with animation
    $('#partners img').hover(function () {
        $(this).css({
            transform: 'scale(1.1)',
            transition: 'transform 0.3s ease-in-out'
        });
    }, function () {
        $(this).css({
            transform: 'scale(1)'
        });
    });

    // 4. Lazy loading for images
    const lazyImages = document.querySelectorAll('img');
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    img.setAttribute('src', src);
                    observer.disconnect();
                }
            });
        });
        io.observe(target);
    };

    lazyImages.forEach(lazyLoad);

    // 5. Toggleable Most Popular and Most Read sections
    $('.toggle-section').click(function () {
        let section = $(this).data('section');
        $('.news-section').hide();
        $(`#${section}`).fadeIn();
    });

    // 6. Search functionality with jQuery
    $('#search-input').on('keyup', function () {
        let query = $(this).val().toLowerCase();
        $('.card').filter(function () {
            $(this).toggle($(this).find('.card-title').text().toLowerCase().indexOf(query) > -1);
        });
    });

    // 7. Auto-refresh news content every 30 seconds (for demo purposes)
    setInterval(function () {
        // Yeni xəbər əlavə etmək üçün saxta yeni xəbər yaratmaq
        let newNews = {
            title: 'Yeni Xəbər Başlığı',
            image: 'https://via.placeholder.com/600x400',
            snippet: 'Bu yeni xəbərin təsviri buradadır.',
            date: '1 gün əvvəl',
            url: '#'
        };

        // Ən son xəbərin sağ sütuna köçməsi və yeni xəbərin sola əlavə edilməsi
        newsList.unshift(newNews);
        if (newsList.length > 4) {
            newsList.pop(); // Ən köhnə xəbəri sil
        }

        loadNews();
    }, 30000); // 30 saniyədən bir yenilənmə
});

