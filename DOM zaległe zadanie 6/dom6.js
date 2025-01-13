const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

function showImage(index) {
    const image = galleryImages[index];
    lightboxImg.src = image.getAttribute('data-full');
    lightbox.style.display = 'flex';
}

galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    }
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
});