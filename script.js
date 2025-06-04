// エラー表示関数
function showError(message) {
    console.error(message);
    const errorDiv = document.getElementById('global-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '10px';
        errorDiv.style.left = '10px';
        errorDiv.style.background = 'rgba(255, 0, 0, 0.8)';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '10px';
        errorDiv.style.borderRadius = '5px';
        errorDiv.style.zIndex = '9999';
    }
}

// ランダムな画像を選択する関数
function getRandomImage(category, count) {
    try {
        const randomNum = Math.floor(Math.random() * count) + 1;
        const imagePath = `/images/${category}/${category}_${randomNum.toString().padStart(2, '0')}.webp`;
        return imagePath;
    } catch (error) {
        showError(`画像の読み込み中にエラーが発生しました: ${error.message}`);
        return '';
    }
}

// スライドショーの画像をランダムに設定
function initRandomSlideshow() {
    try {
        // 各カテゴリの画像枚数（各カテゴリの画像数に合わせて調整してください）
        const imageCounts = {
            'anime': 5,
            'fantasy': 5,
            'illustration': 5,
            'landscape': 5,
            'portrait': 5,
            'sf': 5
        };

        // 各スライド要素を取得
        const slides = document.querySelectorAll('.slide');
        if (!slides.length) {
            throw new Error('スライド要素が見つかりません');
        }

        const categories = Object.keys(imageCounts);
        if (!categories.length) {
            throw new Error('カテゴリが設定されていません');
        }

        // 各スライドにランダムな画像を設定
        slides.forEach((slide, index) => {
            try {
                const category = categories[index % categories.length];
                const imageUrl = getRandomImage(category, imageCounts[category]);
                if (imageUrl) {
                    slide.style.backgroundImage = `url('${imageUrl}')`;
                    // 画像の読み込みを事前に行う
                    const img = new Image();
                    img.src = imageUrl;
                }
            } catch (error) {
                console.error(`スライド${index + 1}の初期化中にエラーが発生しました:`, error);
            }
        });
    } catch (error) {
        showError(`スライドショーの初期化に失敗しました: ${error.message}`);
    }
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', function() {
    // 既存の初期化処理があればここに追加
    initRandomSlideshow();
    
    // その他の初期化処理（必要に応じて）
    if (document.querySelector('.gallery')) {
        initGallery();
    }
    
    // パーティクルエフェクトの初期化
    initParticles();
});

// 共通パーティクル生成関数
function createParticles(targetSelector, particleClass, count, sizeMin, sizeMax, delayMax, durationMin, durationMax) {
    const container = document.querySelector(targetSelector);
    if (!container) return;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add(particleClass);
        const size = Math.random() * (sizeMax - sizeMin) + sizeMin;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * delayMax;
        const duration = Math.random() * (durationMax - durationMin) + durationMin;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        container.appendChild(particle);
    }
}

function showError(message) {
    let err = document.getElementById('global-error');
    if (!err) {
        err = document.createElement('div');
        err.id = 'global-error';
        err.style.position = 'fixed';
        err.style.top = '10px';
        err.style.left = '50%';
        err.style.transform = 'translateX(-50%)';
        err.style.background = 'rgba(255,0,0,0.9)';
        err.style.color = '#fff';
        err.style.padding = '8px 24px';
        err.style.zIndex = 9999;
        err.style.borderRadius = '4px';
        document.body.appendChild(err);
    }
    err.textContent = message;
    err.style.display = 'block';
    setTimeout(()=>{err.style.display='none';}, 4000);
}

function initSlideshow() {
    const slideshowContainer = document.querySelector('.hero-slideshow-background');
    if (!slideshowContainer) {
        showError('スライドショー領域が見つかりません');
        return;
    }
    const categories = ['anime', 'fantasy', 'illustration', 'landscape', 'portrait', 'sf', 'top'];
    // 画像パスを相対パスで明示的に指定
    const imagePaths = categories.map(category => `./images/${category}/${category}_01.webp`);
    console.log('Loading slide images:', imagePaths); // デバッグ用
    let loadedImages = 0;
    const totalImages = imagePaths.length;
    let slides = [];
    let currentSlide = 0;
    let slideshowInterval;
    slideshowContainer.innerHTML = '';
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'slideshow-loading';
    loadingIndicator.textContent = 'スライド読み込み中...';
    slideshowContainer.appendChild(loadingIndicator);
    function initializeSlideshow() {
        if (loadingIndicator.parentNode === slideshowContainer) {
            slideshowContainer.removeChild(loadingIndicator);
        }
        slides = Array.from(slideshowContainer.querySelectorAll('.slideshow-slide'));
        if (slides.length === 0) {
            showError('スライド画像がありません');
            return;
        }
        slides[0].classList.add('active');
        startSlideshow();
    }
    function startSlideshow() {
        if (slideshowInterval) clearInterval(slideshowInterval);
        slideshowInterval = setInterval(() => {
            changeSlide((currentSlide + 1) % slides.length);
        }, 3000);
    }
    function changeSlide(index) {
        if (!slides || slides.length === 0) return;
        index = (index + slides.length) % slides.length;
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        currentSlide = index;
    }
    imagePaths.forEach((path, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slideshow-slide';
        const img = new Image();
        img.src = path;
        img.alt = `${categories[index]} スライド画像 ${index + 1}`;
        img.onload = function() {
            loadedImages++;
            const picture = document.createElement('picture');
            const source = document.createElement('source');
            source.srcset = path;
            source.type = 'image/webp';
            picture.appendChild(source);
            picture.appendChild(img.cloneNode());
            slideDiv.appendChild(picture);
            slideshowContainer.appendChild(slideDiv);
            if (loadedImages === totalImages) initializeSlideshow();
        };
        img.onerror = function() {
            loadedImages++;
            if (loadedImages === totalImages) initializeSlideshow();
            showError(`${path} の画像が読み込めませんでした`);
        };
    });
    setTimeout(() => {
        if (loadedImages < totalImages) {
            showError('一部画像の読み込みに失敗しました');
            initializeSlideshow();
        }
    }, 5000);
    window.slideshow = {
        next: () => changeSlide(currentSlide + 1),
        prev: () => changeSlide(currentSlide - 1),
        goTo: (index) => changeSlide(index),
        start: startSlideshow,
        stop: () => clearInterval(slideshowInterval)
    };
}

function initGalleryModal() {
    const modal = document.querySelector('.gallery-modal');
    if (!modal) return;
    const modalImg = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;
    if (!modalImg || !closeBtn || galleryItems.length === 0) {
        showError('ギャラリーモーダル要素が見つかりません');
        return;
    }
    function showModal(index) {
        if (index >= 0 && index < galleryItems.length) {
            currentImageIndex = index;
            const item = galleryItems[index];
            modalImg.src = item.querySelector('img').src;
            modalImg.alt = item.querySelector('img').alt;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    closeBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') hideModal();
        }
    });
    galleryItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `ギャラリー画像${index + 1}`);
        item.addEventListener('click', () => showModal(index));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') showModal(index);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles('.global-particles-container', 'particle', 150, 1, 5, 20, 10, 20);
    createParticles('#categoryParticles', 'category-particle', 80, 2, 8, 15, 15, 35);
    initSlideshow();
    initGalleryModal();

    // ハンバーガーメニューの開閉機能
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
      });
      // メニュー外クリックで閉じる
      document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
          menuToggle.classList.remove('active');
          mainNav.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
});
