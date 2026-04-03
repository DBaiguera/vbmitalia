// ========================================
// DYNAMIC IMAGE LOADER
// This script loads actual images from directories
// ========================================

// Image counts per directory (update these numbers based on actual files)
const imageData = {
    brescia: {
        path: 'images/marmi/progetti/brescia/',
        images: [] // Will be populated
    },
    montecarlo: {
        path: 'images/marmi/progetti/montecarlo/',
        images: []
    },
    novatek: {
        path: 'images/marmi/progetti/novatek/',
        images: []
    },
    laboratorio: {
        path: 'images/marmi/laboratorio/',
        images: []
    },
    mobili: {
        path: 'images/mobili/',
        images: []
    },
    storia: {
        path: 'images/storia/',
        images: []
    }
};

// Load images from specific directories
// Note: In production, you'd use a server-side script to list files
// For now, we'll manually specify the images based on what we copied

// Function to get image list for a directory
async function getImageList(directory) {
    // This would normally make an API call to get the file list
    // For a static site, we'll need to use a manifest file or pre-generate the list

    // For now, return based on our known structure
    const manifests = {
        'brescia': await loadImageManifest('images/marmi/progetti/brescia/'),
        'montecarlo': await loadImageManifest('images/marmi/progetti/montecarlo/'),
        'novatek': await loadImageManifest('images/marmi/progetti/novatek/'),
        'laboratorio': await loadImageManifest('images/marmi/laboratorio/'),
        'mobili': await loadImageManifest('images/mobili/'),
        'storia': await loadImageManifest('images/storia/')
    };

    return manifests[directory] || [];
}

// Load images from manifest
async function loadImageManifest(path) {
    try {
        const response = await fetch(path + 'manifest.json');
        if (response.ok) {
            const data = await response.json();
            return data.files || [];
        }
    } catch (e) {
        // Manifest not found, return empty
    }
    return [];
}

// Alternative: Load all images with known patterns
function loadGalleryWithPattern(containerId, basePath, filePattern, count) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Try to load images and remove failed ones
    const promises = [];

    for (let i = 0; i < count; i++) {
        const img = new Image();
        const filename = filePattern.replace('{n}', i);
        img.src = basePath + filename;

        img.onload = function() {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';

            const imgEl = document.createElement('img');
            imgEl.src = this.src;
            imgEl.alt = 'Gallery image';
            imgEl.loading = 'lazy';

            galleryItem.appendChild(imgEl);
            container.appendChild(galleryItem);
        };
    }
}

// Manual image loading based on directory scan
// This function will be called with actual filenames
function loadGalleryFromList(containerId, basePath, filenames) {
    const container = document.getElementById(containerId);
    if (!container) return;

    filenames.forEach((filename, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = basePath + filename;
        img.alt = `Gallery image ${index + 1}`;
        img.loading = 'lazy';

        // Handle loading errors
        img.onerror = function() {
            galleryItem.remove();
        };

        galleryItem.appendChild(img);
        container.appendChild(galleryItem);
    });
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadGalleryFromList,
        loadGalleryWithPattern
    };
}
