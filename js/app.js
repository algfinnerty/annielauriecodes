const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
const panelImages = Array.from(document.querySelectorAll('.service-panel-img'));
const paginationDots = Array.from(document.querySelectorAll('.pagination-dot'));

function initializeParallaxImages() {
	const images = Array.from(document.querySelectorAll('[data-parallax]'));
	const containers = images.map((image) => image.closest('.header-image-container') || image.parentElement);
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

	if (containers.length === 0) return;

	const updateParallax = () => {
		if (reduceMotion.matches) {
			images.forEach((image) => image.style.removeProperty('object-position'));
			return;
		}

		containers.forEach((container) => {
			const verticalOffset = 50;
			const bounds = container.getBoundingClientRect();
			const image = container.querySelector('[data-parallax]');
			if (!image) return;

			if (window.scrollY === 0 && (bounds.bottom < 0 || bounds.top > window.innerHeight)) {
				var currentOffset = parseFloat(image.style.objectPosition.split(' ')[1]);
				if(currentOffset && currentOffset !== verticalOffset){
					while(currentOffset > verticalOffset){
						currentOffset -= 1;
						image.style.objectPosition = `50% ${currentOffset}%`;
					}
				} else {
					image.style.objectPosition = `50% ${verticalOffset}%`;
				}
				
				return;
			}

			const travelProgress = Math.min(1, Math.max(0,
				(window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)
			));
			
			const limit = 80;
			const rate = 30;
			
			const verticalPosition = verticalOffset + travelProgress * rate > limit ? limit : verticalOffset + travelProgress * rate;
			image.style.objectPosition = `50% ${verticalPosition}%`;
		});
	};

	window.addEventListener('scroll', updateParallax, { passive: true });
	window.addEventListener('resize', updateParallax);
	reduceMotion.addEventListener('change', (event) => {
		if (event.matches) {
			images.forEach((image) => image.style.removeProperty('object-position'));
		}
		updateParallax();
	});
	updateParallax();
}

initializeParallaxImages();

function initializeBalloonAnimation(){
	const balloon = document.getElementById('balloon');
	if(!balloon) return;
}

const appScriptUrl = document.currentScript?.src || window.location.href;
const imageAssetBase = new URL('img/', appScriptUrl);
const imageGalleryItems = [
	{
		id: 'macaw',
		description: 'A red-and-blue macaw perched on a branch',
		magnifiedFilename: 'Macaw.jpg',
		source: 'https://commons.wikimedia.org/wiki/File:Macaw.png',
		title: 'A Red-and-Blue Macaw',
		creator: 'Unknown',
		rights: 'Public domain, via Wikimedia Commons',
		longDescription: [
			'This natural-history illustration depicts a red-and-blue macaw resting on a diagonal branch. The bird’s long tail feathers extend below the perch, while layered red, green, and blue feathers give its body a richly patterned appearance.',
			'The smaller transparent artwork is used as a decorative accent on the homepage. The magnified version presents the complete printed plate, including its warm paper texture and the caption identifying the bird.',
			'The strong colors and carefully drawn feather details make the macaw a lively counterpoint to the site’s botanical and animal illustrations.'
		]
	},
	{
		id: 'equatorial-jungle',
		description: 'A dense tropical jungle painting with foliage and flowers',
		magnifiedFilename: 'The_Equatorial_Jungle.jpeg',
		source: 'https://commons.wikimedia.org/wiki/File:The_Equatorial_Jungle.jpeg',
		title: 'The Equatorial Jungle',
		creator: 'Henri Rousseau',
		rights: 'Public domain, via Wikimedia Commons',
		longDescription: [
			'This wide painting shows a dense tropical landscape, with overlapping leaves and branches framing a lighter opening near the center. Pink and white flowers appear among the deep green foliage, and small animals are partly concealed within the scene.',
			'The composition is busy by design: broad leaves, fine stems, and varied shades of green create several layers of depth. The original artwork’s textured surface remains visible in the larger view.',
			'On the homepage, a shallow crop of this image acts as a decorative banner. Opening the image reveals more of the original composition beyond that narrow crop.'
		]
	},
	{
		id: 'dicotyledones',
		description: 'A botanical plate of Manettia bicolor and flower anatomy',
		magnifiedFilename: "Dictionnaire_universel_d'histoire_naturelle_(Dicotyledones_Pl._14)_(6436324815).jpg",
		source: 'https://commons.wikimedia.org/wiki/File:Dictionnaire_universel_d%27histoire_naturelle_(Dicotyledones_Pl._14)_(6436324815).jpg',
		title: 'Dicotyledones',
		creator: 'Unknown',
		rights: 'Public domain, via Wikimedia Commons',
		longDescription: [
			'This botanical plate presents a climbing plant with dark green leaves and narrow flowers that shift from warm orange to yellow at their tips. A set of smaller diagrams along the bottom records details of the flower and its structure.',
			'The printed heading identifies the plate as part of a natural-history dictionary and labels the plant Manettia bicolor. The original scan also preserves the paper tone, fine printed labels, and delicate line work that are not present in the transparent decorative cutout.',
			'The illustration is used as a subtle decorative element near the contact section. The magnified scan makes it possible to explore both the plant and the botanical diagrams.'
		]
	},
	{
		id: 'panther',
		description: 'A vintage etching of a spotted panther',
		magnifiedFilename: 'A_panther._Etching_by_T._Owen._Wellcome_V0020933.jpg',
		source: 'https://commons.wikimedia.org/wiki/File:A_panther._Etching_by_T._Owen._Wellcome_V0020933.jpg',
		title: 'A Panther',
		creator: 'T. Owen',
		rights: 'Public domain, via Wikimedia Commons',
		longDescription: [
			'This monochrome natural-history etching shows a spotted panther standing in profile. Dense engraved lines describe the animal’s coat, limbs, and facial features, while the original printed caption sits below the figure.',
			'The artwork is used as the site footer background, where only part of the composition is visible behind the footer content. The larger scan provides a clearer look at the full figure and the texture of the printed page.',
			'The panther belongs to the same vintage illustration collection as the botanical and bird artwork used elsewhere on the site.'
		]
	},
	{
		id: 'monkey',
		description: 'A vintage etching of a spotted monkey',
		magnifiedFilename: 'A_monkey._Etching_by_T._Owen._Wellcome_V0020934.jpg',
		source: 'https://commons.wikimedia.org/wiki/File:Pseudo-Jan_van_Kessel_II_-_Still_life_of_fruit_with_a_monkey_and_a_dog.jpg',
		title: 'Still life of fruit with a monkey and a dog',
		creator: 'Pseudo-Jan van Kessel the Younger',
		rights: 'Public domain via Wikimedia Commons',
		longDescription: [
			'This monochrome natural-history etching shows a spotted monkey standing in profile. Dense engraved lines describe the animal’s coat, limbs, and facial features, while the original printed caption sits below the figure.',
			'The artwork is used as the site footer background, where only part of the composition is visible behind the footer content. The larger scan provides a clearer look at the full figure and the texture of the printed page.',
			'The monkey belongs to the same vintage illustration collection as the botanical and bird artwork used elsewhere on the site.'
		]
	},
	{
		id: 'tiger',
		description: 'A vintage etching of a spotted tiger',
		magnifiedFilename: 'Giulio_Aristide_Sartorio_-_A_Tiger_Struggling_with_a_Snake.jpg',
		source: 'https://commons.wikimedia.org/wiki/File:Giulio_Aristide_Sartorio_-_A_Tiger_Struggling_with_a_Snake.jpg',
		title: 'A Tiger Struggling with a Snake',
		creator: 'Giulio Aristide Sartorio',
		rights: 'Public domain via Wikimedia Commons',
		longDescription: [
			'This monochrome natural-history etching shows a spotted tiger standing in profile. Dense engraved lines describe the animal’s coat, limbs, and facial features, while the original printed caption sits below the figure.',
			'The artwork is used as the site footer background, where only part of the composition is visible behind the footer content. The larger scan provides a clearer look at the full figure and the texture of the printed page.',
			'The tiger belongs to the same vintage illustration collection as the botanical and bird artwork used elsewhere on the site.'
		]
	}
];

function createImageGallery() {
	const dialog = document.createElement('dialog');
	dialog.className = 'image-gallery-dialog';
	dialog.id = 'image-gallery-modal';
	dialog.setAttribute('aria-label', 'Image gallery');
	dialog.innerHTML = `
		<div class="image-gallery-shell">
			<header class="image-gallery-header">
				<p class="image-gallery-count" aria-live="polite"></p>
				<button class="image-gallery-index-button" type="button">All images</button>
				<button class="image-gallery-close" type="button" aria-label="Close image gallery">×</button>
			</header>
			<section class="image-gallery-index" aria-label="All gallery images" hidden>
				<h2>Image gallery</h2>
				<p>Select an image to view it larger.</p>
				<div class="image-gallery-tiles"></div>
			</section>
			<div class="image-gallery-slide" hidden>
			<div class="image-gallery-viewer">
				<button class="image-gallery-previous" type="button" aria-label="Previous image">←</button>
				<img class="image-gallery-image" alt="">
				<button class="image-gallery-next" type="button" aria-label="Next image">→</button>
			</div>
			<section class="image-gallery-details" aria-live="polite">
				<h2 class="image-gallery-title"></h2>
				<div class="image-gallery-description"></div>
			</section>
			</div>
		</div>`;
	document.body.append(dialog);

	const galleryImage = dialog.querySelector('.image-gallery-image');
	const galleryTitle = dialog.querySelector('.image-gallery-title');
	const galleryCount = dialog.querySelector('.image-gallery-count');
	const galleryDescription = dialog.querySelector('.image-gallery-description');
	const galleryIndex = dialog.querySelector('.image-gallery-index');
	const galleryTiles = dialog.querySelector('.image-gallery-tiles');
	const gallerySlide = dialog.querySelector('.image-gallery-slide');
	const galleryIndexButton = dialog.querySelector('.image-gallery-index-button');
	const galleryItems = [...imageGalleryItems];
	let activeIndex = 0;
	let returnFocusTarget = null;

	function renderImage(index) {
		activeIndex = (index + galleryItems.length) % galleryItems.length;
		const item = galleryItems[activeIndex];
		galleryIndex.hidden = true;
		gallerySlide.hidden = false;
		galleryIndexButton.hidden = false;
		galleryImage.src = new URL(item.magnifiedFilename, imageAssetBase).href;
		galleryImage.alt = item.description;
		galleryTitle.textContent = item.description;
		galleryCount.textContent = `${activeIndex + 1} of ${galleryItems.length}`;
		galleryDescription.replaceChildren(...item.longDescription.map((paragraph) => {
			const element = document.createElement('p');
			element.textContent = paragraph;
			return element;
		}));
	}

	function renderGalleryIndex() {
		galleryIndex.hidden = false;
		gallerySlide.hidden = true;
		galleryIndexButton.hidden = true;
		galleryCount.textContent = `${galleryItems.length} images`;
	}

	function openImageGallery(imageId = null, trigger = null) {
		const matchingIndex = galleryItems.findIndex((item) => item.id === imageId);
		returnFocusTarget = trigger;
		if (matchingIndex >= 0) renderImage(matchingIndex);
		else renderGalleryIndex();
		if (!dialog.open) dialog.showModal();
	}

	dialog.querySelector('.image-gallery-close').addEventListener('click', () => dialog.close());
	galleryIndexButton.addEventListener('click', renderGalleryIndex);
	dialog.querySelector('.image-gallery-previous').addEventListener('click', () => renderImage(activeIndex - 1));
	dialog.querySelector('.image-gallery-next').addEventListener('click', () => renderImage(activeIndex + 1));
	galleryTiles.addEventListener('click', (event) => {
		const target = event.target instanceof Element ? event.target : null;
		const tile = target?.closest('[data-gallery-tile]');
		if (!tile) return;
		const index = galleryItems.findIndex((item) => item.id === tile.dataset.galleryTile);
		if (index >= 0) renderImage(index);
	});
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) dialog.close();
	});
	dialog.addEventListener('close', () => {
		if (returnFocusTarget?.isConnected) returnFocusTarget.focus({ preventScroll: true });
	});
	document.addEventListener('keydown', (event) => {
		if (!dialog.open) return;
		if (event.key === 'ArrowLeft') renderImage(activeIndex - 1);
		if (event.key === 'ArrowRight') renderImage(activeIndex + 1);
	});

	function filenameFromSource(source) {
		try {
			return decodeURIComponent(new URL(source, window.location.href).pathname.split('/').pop());
		} catch {
			return source;
		}
	}

	const pageImages = Array.from(document.querySelectorAll('img:not(#portrait):not(.portrait):not(.image-gallery-image)'));
	pageImages.forEach((image) => {
		const explicitId = image.dataset.imageId || image.id;
		const sourceFilename = filenameFromSource(image.currentSrc || image.src);
		let item = galleryItems.find((entry) => entry.id === explicitId
			|| entry.minifiedFilename === sourceFilename
			|| entry.magnifiedFilename === sourceFilename);

		if (!item) {
			item = {
				id: explicitId || `image-${galleryItems.length + 1}`,
				description: image.alt || 'Image',
				minifiedFilename: sourceFilename,
				magnifiedFilename: image.dataset.magnifiedSrc || sourceFilename,
				longDescription: [
					image.alt || 'An image shown on this page.',
					'Add this image to imageGalleryItems in app.js to provide a fuller description and a separate magnified file, if one is available.'
				]
			};
			galleryItems.push(item);
		}

		image.classList.add('image-gallery-trigger');
		image.setAttribute('role', 'button');
		image.setAttribute('tabindex', '0');
		image.setAttribute('aria-label', `Open image: ${item.description}`);
		image.removeAttribute('aria-hidden');
		if (!image.alt) image.alt = item.description;

		const openFromImage = () => openImageGallery(item.id, image);
		image.addEventListener('click', openFromImage);
		image.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				openFromImage();
			}
		});
	});

	const footer = document.querySelector('.site-footer');
	if (footer) {
		const footerBackground = getComputedStyle(footer).backgroundImage;
		const backgroundSource = footerBackground.match(/url\(["']?(.*?)["']?\)/)?.[1];
		if (backgroundSource) {
			const backgroundFilename = filenameFromSource(backgroundSource);
			const backgroundItem = galleryItems.find((item) => item.minifiedFilename === backgroundFilename
				|| item.magnifiedFilename === backgroundFilename);
			if (backgroundItem) {
				const backgroundTrigger = document.createElement('button');
				backgroundTrigger.className = 'footer-image-trigger';
				backgroundTrigger.type = 'button';
				backgroundTrigger.dataset.openImageGallery = '';
				backgroundTrigger.dataset.imageId = backgroundItem.id;
				backgroundTrigger.setAttribute('aria-label', `Open image: ${backgroundItem.description}`);
				footer.prepend(backgroundTrigger);
			}
		}
	}

	galleryItems.forEach((item) => {
		const tile = document.createElement('button');
		tile.className = 'image-gallery-tile';
		tile.type = 'button';
		tile.dataset.galleryTile = item.id;
		tile.setAttribute('aria-label', `Open image: ${item.description}`);
		const thumbnail = document.createElement('img');
		thumbnail.src = new URL(item.minifiedFilename, imageAssetBase).href;
		thumbnail.alt = '';
		thumbnail.loading = 'lazy';
		const caption = document.createElement('span');
		caption.textContent = item.description;
		tile.append(thumbnail, caption);
		galleryTiles.append(tile);
	});

	document.addEventListener('click', (event) => {
		const target = event.target instanceof Element ? event.target : null;
		const link = target?.closest('a[href="#image-gallery"], a[href="#image-gallery-modal"], [data-open-image-gallery]');
		if (!link) return;
		event.preventDefault();
		openImageGallery(link.dataset.imageId, link);
	});

	window.openImageGallery = openImageGallery;
}

// if (document.readyState === 'loading') {
// 	document.addEventListener('DOMContentLoaded', createImageGallery, { once: true });
// } else {
// 	createImageGallery();
// }

const primaryNav = document.querySelector('.primary-nav');

if (primaryNav) {
	const siteHeader = document.querySelector('.site-header');
	const menuToggle = primaryNav.querySelector('[data-mobile-menu-toggle]');
	const mobileMenu = primaryNav.querySelector('#mobile-primary-menu');
	const mobileViewport = window.matchMedia('(max-width: 699px)');

	const closeMobileMenu = (restoreFocus = false) => {
		if (!menuToggle || !mobileMenu) return;

		mobileMenu.classList.remove('is-open');
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open navigation menu');
		if (restoreFocus) menuToggle.focus();
	};

	const updatePrimaryNavVisibility = () => {
		const isVisible = window.scrollY >= window.innerHeight;
		primaryNav.classList.toggle('is-visible', isVisible);
		if (!isVisible) closeMobileMenu();
	};

	window.addEventListener('scroll', updatePrimaryNavVisibility, { passive: true });
	window.addEventListener('resize', updatePrimaryNavVisibility);
	mobileViewport.addEventListener('change', updatePrimaryNavVisibility);
	updatePrimaryNavVisibility();

	if (menuToggle && mobileMenu) {
		menuToggle.addEventListener('click', () => {
			const isOpen = mobileMenu.classList.toggle('is-open');
			menuToggle.setAttribute('aria-expanded', String(isOpen));
			menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
		});

		mobileMenu.addEventListener('click', (event) => {
			if (event.target instanceof Element && event.target.closest('a')) closeMobileMenu();
		});

		document.addEventListener('click', (event) => {
			if (event.target instanceof Node && !primaryNav.contains(event.target)) closeMobileMenu();
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMobileMenu(true);
		});

		window.addEventListener('resize', () => {
			if (window.innerWidth >= 700) closeMobileMenu();
		});
	}
}

function initializeMenuVisitTracking() {
	
	const storagePrefix = 'annielauriecodes:visited:';
	localStorage.setItem(`${storagePrefix}page:${window.location.pathname}`, 'true');

	const menuItems = Array.from(document.querySelectorAll('.primary-nav nav a[href]'));
	if (menuItems.length === 0) return;

	const visitedSections = new Set();
	const sectionItems = [];

	const getVisitKey = (item) => {
		const destination = new URL(item.href, window.location.href);
		if (destination.origin !== window.location.origin) return null;

		if (destination.hash) {
			const sectionId = decodeURIComponent(destination.hash.slice(1));
			if (document.getElementById(sectionId)) return `section:${sectionId}`;
		}

		return `page:${destination.pathname}`;
	};

	const setVisited = (item, key) => {
		item.classList.add('is-visited');
		item.setAttribute('aria-label', `${item.textContent.trim()} (visited)`);
		localStorage.setItem(`${storagePrefix}${key}`, 'true');
	};

	menuItems.forEach((item) => {
		const key = getVisitKey(item);
		if (!key) return;

		const alreadyVisited = localStorage.getItem(`${storagePrefix}${key}`) === 'true';
		if (alreadyVisited) {
			item.classList.add('is-visited');
			item.setAttribute('aria-label', `${item.textContent.trim()} (visited)`);
		}

		if (key.startsWith('section:')) {
			const section = document.getElementById(key.slice('section:'.length));
			if (!section) return;

			if (alreadyVisited) visitedSections.add(key);
			sectionItems.push({ item, key, section });
		} else if (key === `page:${window.location.pathname}`) {
			setVisited(item, key);
		}

		item.addEventListener('click', () => {
			if (key.startsWith('section:')) {
				visitedSections.add(key);
				setVisited(item, key);
				updateBalloonProgress();
			} else {
				setVisited(item, key);
			}
		});
	});

	const balloon = document.getElementById('balloon');
	const desktopViewport = window.matchMedia('(min-width: 700px)');
	const updateBalloonProgress = () => {
		if (!balloon) return;
		if (!desktopViewport.matches) {
			balloon.style.removeProperty('top');
			return;
		}

		const totalSections = sectionItems.length;
		const progress = totalSections ? visitedSections.size / totalSections : 0;
		const startHeight = 80;
		const maxHeight = 50;
		balloon.style.top = startHeight - progress * 30 < maxHeight ? `${startHeight - progress * 30}vh` : `${maxHeight}vh`;
	};

	const markSectionVisited = (item, key) => {
		if (visitedSections.has(key)) return;
		visitedSections.add(key);
		setVisited(item, key);
		updateBalloonProgress();
	};

	const checkVisibleSections = () => {
		const viewportStart = window.innerHeight * .35;
		const viewportEnd = window.innerHeight * .65;

		sectionItems.forEach(({ item, key, section }) => {
			const bounds = section.getBoundingClientRect();
			if (bounds.top <= viewportEnd && bounds.bottom >= viewportStart) {
				markSectionVisited(item, key);
			}
		});
	};

	window.addEventListener('scroll', checkVisibleSections, { passive: true });
	window.addEventListener('resize', checkVisibleSections);
	checkVisibleSections();

	desktopViewport.addEventListener('change', updateBalloonProgress);
	updateBalloonProgress();
}

initializeMenuVisitTracking();

function selectTab(selectedTab, moveFocus = false) {
	tabs.forEach((tab, index) => {
		const isSelected = tab === selectedTab;
		tab.setAttribute('aria-selected', String(isSelected));
		tab.tabIndex = isSelected ? 0 : -1;
		panels[index].hidden = !isSelected;
		panelImages[index].hidden = !isSelected;
		paginationDots[index].classList.toggle('current', isSelected);
		paginationDots[index].setAttribute('aria-pressed', String(isSelected));
	});

	if (moveFocus) selectedTab.focus();
}

tabs.forEach((tab, index) => {
	tab.addEventListener('click', () => selectTab(tab));
	tab.addEventListener('keydown', (event) => {
		let nextIndex;
		if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
		if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
		if (event.key === 'Home') nextIndex = 0;
		if (event.key === 'End') nextIndex = tabs.length - 1;

		if (nextIndex !== undefined) {
			event.preventDefault();
			selectTab(tabs[nextIndex], true);
		}
	});
});

paginationDots.forEach((dot) => {
	dot.addEventListener('click', () => {
		const matchingTab = document.getElementById(dot.dataset.tab);
		if (matchingTab) selectTab(matchingTab);
	});
});

