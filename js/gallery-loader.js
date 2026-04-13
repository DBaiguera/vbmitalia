// ========================================
// GALLERY IMAGE LOADER
// ========================================

// Configuration object with image paths
const galleryConfig = {
    // Marmi Projects
    brescia: {
        path: 'images/marmi/progetti/brescia/',
        count: 42,
        container: 'brescia-gallery',
        useManifest: true
    },
    montecarlo: {
        path: 'images/marmi/progetti/montecarlo/',
        count: 28,
        container: 'montecarlo-gallery',
        useManifest: true
    },
    austria: {
        path: 'images/marmi/progetti/austria/',
        count: 50,
        container: 'austria-gallery',
        useManifest: true
    },
    scalaUffici: {
        path: 'images/marmi/progetti/scala-uffici/',
        count: 50,
        container: 'scala-uffici-gallery',
        useManifest: true
    },
    workshop: {
        path: 'images/marmi/laboratorio/',
        count: 30,
        container: 'workshop-gallery',
        useManifest: true
    },
    // Mobili
    mobili: {
        path: 'images/mobili/',
        count: 16,
        container: 'mobili-gallery',
        useManifest: true
    },
    // Heritage (Chi Siamo)
    heritage: {
        path: 'images/storia/',
        count: 8,
        container: 'heritage-gallery',
        useManifest: true
    }
};

// Function to load images into a gallery
async function loadGallery(config) {
    const container = document.getElementById(config.container);
    if (!container) return;

    // Try to load from manifest first
    if (config.useManifest) {
        try {
            const response = await fetch(config.path + 'manifest.json');
            if (response.ok) {
                const data = await response.json();
                if (data.files && data.files.length > 0) {
                    loadImagesFromList(container, config.path, data.files);
                    return;
                }
            }
        } catch (e) {
            console.log('Manifest not found, using fallback method');
        }
    }

    // Fallback: try to load all images with common patterns
    loadImagesWithPatterns(container, config.path, config.count);
}

// Load images from a list (manifest)
function loadImagesFromList(container, basePath, filenames) {
    filenames.forEach((filename, index) => {
        // Skip empty filenames
        if (!filename || filename.trim() === '') return;

        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = basePath + filename;
        img.alt = `Gallery image ${index + 1}`;
        img.loading = 'lazy';

        // Remove item if image fails to load
        img.onerror = function() {
            galleryItem.remove();
        };

        galleryItem.appendChild(img);
        container.appendChild(galleryItem);
    });
}

// Load images trying common naming patterns
function loadImagesWithPatterns(container, basePath, maxCount) {
    const patterns = [
        (i) => `image-${i}.jpg`,
        (i) => `img-${i}.jpg`,
        (i) => `photo-${i}.jpg`,
        (i) => `${i}.jpg`
    ];

    let loaded = 0;
    const maxAttempts = Math.min(maxCount * 2, 100); // Don't try too many

    for (let i = 0; i < maxAttempts && loaded < maxCount; i++) {
        patterns.forEach(pattern => {
            if (loaded >= maxCount) return;

            const img = new Image();
            img.src = basePath + pattern(i);

            img.onload = function() {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';

                const imgEl = document.createElement('img');
                imgEl.src = this.src;
                imgEl.alt = `Gallery image`;
                imgEl.loading = 'lazy';

                galleryItem.appendChild(imgEl);
                container.appendChild(galleryItem);
                loaded++;
            };
        });
    }
}

// Initialize galleries on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load galleries based on which page we're on
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'marmi.html' || currentPage === '') {
        if (document.getElementById('brescia-gallery')) {
            loadGallery(galleryConfig.brescia);
        }
        if (document.getElementById('montecarlo-gallery')) {
            loadGallery(galleryConfig.montecarlo);
        }
        if (document.getElementById('austria-gallery')) {
            loadGallery(galleryConfig.austria);
        }
        if (document.getElementById('scala-uffici-gallery')) {
            loadGallery(galleryConfig.scalaUffici);
        }
        if (document.getElementById('workshop-gallery')) {
            loadGallery(galleryConfig.workshop);
        }
    }

    if (currentPage === 'mobili.html') {
        if (document.getElementById('mobili-gallery')) {
            loadGallery(galleryConfig.mobili);
        }
    }

    if (currentPage === 'chi-siamo.html') {
        if (document.getElementById('heritage-gallery')) {
            loadGallery(galleryConfig.heritage);
        }
    }
});

// ========================================
// MANUAL IMAGE LOADING (for when images are added)
// ========================================

// This function can be used to manually add specific images to galleries
function addImageToGallery(containerId, imagePath, altText = '') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = altText;
    img.loading = 'lazy';

    galleryItem.appendChild(img);
    container.appendChild(galleryItem);
}

// ========================================
// HELPER: Clear gallery
// ========================================
function clearGallery(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
    }
}

// Export functions for use in console or other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadGallery,
        addImageToGallery,
        clearGallery,
        galleryConfig
    };
}
