// Photo data with descriptions
const photos = [
    {
        src: 'images/photo1.jpg',
        description: '21 Nisan 2025. İlk buluşmamız, sana ilk defa uzun uzun sarılmıştım. O günkü heyecanımı, mutluluğumu dün gibi hatırlıyorum.'
    },
    {
        src: 'images/photo2.jpg',
        description: '3 Mayıs 2025. Beraber sinemaya gitmiştik. Filmden sonra Özlüce\'ye gitmiştik. Giderken uzun uzun filmlerden, dizilerden konuşmuştuk.'
    },
    {
        src: 'images/photo3.jpg',
        description: '19 Mayıs 2025. İlk defa çiçek almıştım sana. O kadar heyecanlıydım ki anlatamam. Bu fotoğrafta da o kadar güzelsin ki bitanem benim. İyi ki varsın.'
    },
    {
        src: 'images/photo4.jpg',
        description: '30 Mayıs 2025. Beraber ilk önce hayvanat bahçesine gitmiştik. Sonra sen bana tatlı yapıp getirmiştin. O kadar mutlu olmuştum ki. Sonra da seninle beraber bisiklet sürmüştük.'
    },
    {
        src: 'images/photo5.jpg',
        description: '13 Haziran 2025. Tophaneye çıkmadım demiştin. Beraber Tophaneye çıkmıştık seninle. Ondan önce de kahve içmiştik aşağıda. Tabi yukarıda da dondurma yedik.'
    },
    {
        src: 'images/photo6.jpg',
        description: '15 Haziran 2025. Ben kampüse gelmiştim. Beraber el ele kampüste yürümüştük. Bu fotoğrafta da o kadar güzelsin ki sevgilim.'
    },
    {
        src: 'images/photo7.jpg',
        description: '21 Haziran 2025. Bu fotoğrafta 2. ayımızdan. Birbirimize doyamadığımız için bilerek metro kaçırmıştık. Sen bizim fotoğraflarımızı çıkarmıştın. Güzel kalpli sevgilim benim.'
    },
    {
        src: 'images/photo8.jpg',
        description: '4 Temmuz 2025. Hayatımda bu kadar mutlu olduğum bir gün hatırlamıyorum. Rüya gibiydi her şey. Sen de o rüyanın perisi idin aşkım. Beni sürekli mutlu ediyorsun.'
    },
    {
        src: 'images/photo9.jpg',
        description: '11 Ekim 2025. Parmesana gitmiştik Mustafalarla. Bu fotoğrafta da gözlerin o kadar güzeller ki her baktığımda sırıtıyorum.'
    },
    {
        src: 'images/photo10.jpg',
        description: '11 Ekim 2025. Bu fotoğrafta Parmesana gittiğimiz zamandan. Yanında o kadar mutluyum ki umarım sen de öylesindir sevgilim.'
    },
    {
        src: 'images/photo11.jpg',
        description: '13 Ekim 2025. Beraber kütüphaneden çıkmıştık. Kedi görmüştün. E tabi sevmeden duramazsın.'
    },
    {
        src: 'images/photo12.jpg',
        description: '14 Ekim 2025. Benim kampüsüme gelmiştin. Sen gelince ben de tabi kendimi sana bırakıyorum. Eriyip bitiyorum sana.'
    },
    {
        src: 'images/photo13.jpg',
        description: '15 Ekim 2025. Bu fotoğrafta o kadar tatlıyız ki sevgilim ve bugün o kadar neşeli, enerjiktin ki seni öyle görmeyi çok seviyorum.'
    },
    {
        src: 'images/photo14.jpg',
        description: '18 Ekim 2025. Basket maçı izlemeye gitmiştik seninle. Tontik ve Burunla bugün tanışmıştın.'
    },
    {
        src: 'images/photo15.jpg',
        description: '18 Ekim 2025. Basket maçı izlediğimiz günden. Bu da Tontikle ilk fotoğrafın.'
    },
    
    {
        src: 'images/photo17.jpg',
        description: '27 Ekim 2025. Seninle beraber sırıksıklam ıslanmıştık. Sana ıslanmayı sevmediğimi söylemiştim ama seninle olunca her şey çok güzel sevgilim.'
    },
    {
        src: 'images/photo18.jpg',
        description: '5 Kasım 2025. Bu da bonus olsun. 7. ayımız kutlu olsun canım sevgilim. Bir ömür boyu beraber olalım.'
    }
];

let currentPhotoIndex = 0;
const startDate = new Date('2025-04-21T00:30:00');
let modal = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeCountdown();
    initializeModal();
    createIndicators();
});

// Close Modal Function (Global)
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Open Modal Function (Global)
function openModal() {
    if (modal) {
        const modalImg = document.getElementById('modalImg');
        const modalDescription = document.getElementById('modalDescription');
        modal.classList.add('active');
        modalImg.src = photos[currentPhotoIndex].src;
        modalDescription.textContent = photos[currentPhotoIndex].description;
        document.body.style.overflow = 'hidden';
    }
}

// Initialize Gallery
function initializeGallery() {
    updatePhoto();
    
    document.getElementById('nextBtn').addEventListener('click', nextPhoto);
    document.getElementById('prevBtn').addEventListener('click', prevPhoto);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            if (modal && modal.classList.contains('active')) {
                nextPhotoInModal();
            } else {
                nextPhoto();
            }
        }
        if (e.key === 'ArrowLeft') {
            if (modal && modal.classList.contains('active')) {
                prevPhotoInModal();
            } else {
                prevPhoto();
            }
        }
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Update Photo Display
function updatePhoto() {
    const currentPhoto = document.getElementById('currentPhoto');
    const photoDescription = document.getElementById('photoDescription');
    const prevPhoto = document.getElementById('prevPhoto');
    const nextPhoto = document.getElementById('nextPhoto');
    
    // Update current photo
    currentPhoto.src = photos[currentPhotoIndex].src;
    currentPhoto.alt = `Fotoğraf ${currentPhotoIndex + 1}`;
    photoDescription.textContent = photos[currentPhotoIndex].description;
    
    // Update previous photo (left side)
    const prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    prevPhoto.src = photos[prevIndex].src;
    prevPhoto.alt = `Fotoğraf ${prevIndex + 1}`;
    
    // Update next photo (right side)
    const nextIndex = (currentPhotoIndex + 1) % photos.length;
    nextPhoto.src = photos[nextIndex].src;
    nextPhoto.alt = `Fotoğraf ${nextIndex + 1}`;
    
    // Add fade effect
    currentPhoto.style.opacity = '0';
    setTimeout(() => {
        currentPhoto.style.opacity = '1';
    }, 150);
    
    updateIndicators();
    
    // Handle image error (if photo doesn't exist)
    const placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2ZmZWJlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNjNjI4MjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb3RvxJnEsWYgWcO2a2xlbml5b3IuLi48L3RleHQ+PC9zdmc+';
    
    currentPhoto.onerror = function() {
        this.src = placeholder;
    };
    
    prevPhoto.onerror = function() {
        this.src = placeholder;
    };
    
    nextPhoto.onerror = function() {
        this.src = placeholder;
    };
}

// Next Photo
function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updatePhoto();
}

// Previous Photo
function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updatePhoto();
}

// Create Indicators
function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    indicatorsContainer.innerHTML = '';
    
    photos.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === currentPhotoIndex) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            currentPhotoIndex = index;
            updatePhoto();
        });
        indicatorsContainer.appendChild(indicator);
    });
}

// Update Indicators
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentPhotoIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Next Photo in Modal
function nextPhotoInModal() {
    nextPhoto();
    const modalImg = document.getElementById('modalImg');
    const modalDescription = document.getElementById('modalDescription');
    modalImg.src = photos[currentPhotoIndex].src;
    modalDescription.textContent = photos[currentPhotoIndex].description;
}

// Previous Photo in Modal
function prevPhotoInModal() {
    prevPhoto();
    const modalImg = document.getElementById('modalImg');
    const modalDescription = document.getElementById('modalDescription');
    modalImg.src = photos[currentPhotoIndex].src;
    modalDescription.textContent = photos[currentPhotoIndex].description;
}

// Initialize Modal
function initializeModal() {
    const currentPhoto = document.getElementById('currentPhoto');
    const zoomBtn = document.getElementById('zoomBtn');
    modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalDescription = document.getElementById('modalDescription');
    const closeModalBtn = document.getElementById('closeModal');
    const prevModalBtn = document.getElementById('prevModal');
    const nextModalBtn = document.getElementById('nextModal');
    
    // Open modal on photo click or zoom button
    currentPhoto.addEventListener('click', openModal);
    zoomBtn.addEventListener('click', openModal);
    
    // Close modal
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Modal navigation
    prevModalBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        prevPhotoInModal();
    });
    
    nextModalBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        nextPhotoInModal();
    });
    
    // Handle modal image error
    modalImg.onerror = function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2ZmZWJlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNjNjI4MjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb3RvxJnEsWYgWcO2a2xlbml5b3IuLi48L3RleHQ+PC9zdmc+';
    };
}

// Initialize Countdown
function initializeCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Update Countdown - Calculate elapsed time accurately
function updateCountdown() {
    const now = new Date();
    const start = new Date(startDate);
    let diff = now - start;
    
    if (diff < 0) {
        // If start date is in the future, show zeros
        document.getElementById('years').textContent = '0';
        document.getElementById('months').textContent = '0';
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    // Calculate years
    let years = now.getFullYear() - start.getFullYear();
    let dateAtYear = new Date(start);
    dateAtYear.setFullYear(start.getFullYear() + years);
    if (dateAtYear > now) {
        years--;
        dateAtYear.setFullYear(start.getFullYear() + years);
    }
    
    // Calculate months
    let months = 0;
    let dateAtMonth = new Date(dateAtYear);
    while (true) {
        let nextMonth = new Date(dateAtMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        if (nextMonth > now) break;
        dateAtMonth = nextMonth;
        months++;
    }
    
    // Calculate days
    let days = Math.floor((now - dateAtMonth) / (1000 * 60 * 60 * 24));
    
    // Calculate hours, minutes, seconds from dateAtMonth + days
    let dateAtDay = new Date(dateAtMonth);
    dateAtDay.setDate(dateAtDay.getDate() + days);
    dateAtDay.setHours(0, 0, 0, 0);
    
    let timeDiff = now - dateAtDay;
    let hours = Math.floor(timeDiff / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Ensure non-negative values
    if (years < 0) years = 0;
    if (months < 0) months = 0;
    if (days < 0) days = 0;
    if (hours < 0) hours = 0;
    if (minutes < 0) minutes = 0;
    if (seconds < 0) seconds = 0;
    
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}
