/* ========================================
   DOI SUPPORT PORTAL — SPA ROUTER & APP
   ======================================== */

(function () {
  const VIEWS = {
    HOME: 'view-home',
    CATALOG: 'view-catalog',
    DETAIL: 'view-detail',
    SEARCH: 'view-search',
  };

  const CATEGORIES = {
    estabilizacion: {
      id: 'estabilizacion',
      title: 'Estabilización',
      basePath: 'assets/images/products/estabilizacion/',
      active: true,
    },
    silla: {
      id: 'silla',
      title: 'Silla',
      basePath: 'assets/images/products/silla/',
      active: false,
    },
    banarse: {
      id: 'banarse',
      title: 'Bañarse',
      basePath: 'assets/images/products/banarse/',
      active: false,
    },
    caminar: {
      id: 'caminar',
      title: 'Caminar',
      basePath: 'assets/images/products/caminar/',
      active: false,
    },
    mesas: {
      id: 'mesas',
      title: 'Mesas',
      basePath: 'assets/images/products/mesas/',
      active: false,
    },
  };

  const PRODUCTS = [
    {
      id: 'sitting',
      title: 'Sitting',
      code: 'S200',
      category: 'estabilizacion',
      active: true,
      description: 'Diseñado para mejorar el posicionamiento en sedestación para niños y adolescentes, este asiento moldeado ofrece un control postural óptimo.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20tengo%20una%20consulta%20sobre%20el%20producto%20Sitting%20(S200)',
      tutorial: 'https://www.youtube.com/watch?v=XYnNx3IqQVE',
      storeUrl: 'https://doifamily.com/producto/sitting-m/',
      guiaTecnica: 'assets/docs/sitting-guia-tecnica.pdf',
      guiaPractica: 'assets/docs/sitting-guia-practica.pdf',
      arLink: '#ar-sitting',
    },
    {
      id: 'maxxitting',
      title: 'Maxxitting',
      code: 'S300',
      category: 'estabilizacion',
      active: false,
      description: 'Sistema de sedestación avanzado con múltiples ajustes para adolescentes y adultos jóvenes que requieren soporte postural completo.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20consulta%20sobre%20Maxxitting%20(S300)',
      tutorial: '#',
      guiaTecnica: 'assets/docs/maxxitting-guia-tecnica.pdf',
      guiaPractica: 'assets/docs/maxxitting-guia-practica.pdf',
      arLink: '#ar-maxxitting',
    },
    {
      id: 'bipedestador-mediano',
      title: 'Bipedestador Mediano',
      code: 'P600',
      category: 'estabilizacion',
      active: false,
      description: 'Bipedestador de tamaño mediano que permite mantener la posición de pie con soporte completo para tronco y extremidades.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20consulta%20sobre%20Bipedestador%20Mediano%20(P600)',
      tutorial: '#',
      guiaTecnica: 'assets/docs/bipedestador-mediano-guia-tecnica.pdf',
      guiaPractica: 'assets/docs/bipedestador-mediano-guia-practica.pdf',
      arLink: '#ar-bipedestador-mediano',
    },
    {
      id: 'bipedestador-grande',
      title: 'Bipedestador Grande',
      code: 'P700',
      category: 'estabilizacion',
      active: false,
      description: 'Bipedestador de tamaño grande diseñado para adolescentes y adultos, con ajustes amplios y estructura reforzada.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20consulta%20sobre%20Bipedestador%20Grande%20(P700)',
      tutorial: '#',
      guiaTecnica: 'assets/docs/bipedestador-grande-guia-tecnica.pdf',
      guiaPractica: 'assets/docs/bipedestador-grande-guia-practica.pdf',
      arLink: '#ar-bipedestador-grande',
    },
    {
      id: 'parador',
      title: 'Parador',
      code: 'P300',
      category: 'estabilizacion',
      active: false,
      description: 'Sistema de bipedestación vertical con mesa de actividades integrada para facilitar la participación en actividades terapéuticas.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20consulta%20sobre%20Parador%20(P300)',
      tutorial: '#',
      guiaTecnica: 'assets/docs/parador-guia-tecnica.pdf',
      guiaPractica: 'assets/docs/parador-guia-practica.pdf',
      arLink: '#ar-parador',
    },
    {
      id: 'cuello-de-sujecion',
      title: 'Cuello de Sujeción',
      code: 'CS200',
      category: 'estabilizacion',
      active: false,
      description: 'Soporte cervical de sujeción diseñado para ofrecer estabilidad y control del cuello durante actividades de posicionamiento.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20consulta%20sobre%20Cuello%20de%20Sujeci%C3%B3n%20(CS200)',
      tutorial: '#',
      guiaTecnica: 'assets/docs/cuello-sujecion-guia-tecnica.pdf',
      guiaPractica: 'assets/docs/cuello-sujecion-guia-practica.pdf',
      arLink: '#ar-cuello-sujecion',
    },
  ];

  let currentView = VIEWS.HOME;

  function getProductImagePath(product, variant) {
    const cat = CATEGORIES[product.category];
    const file = variant || 'main.png';
    const base = cat ? cat.basePath : 'assets/images/products/';
    return base + product.code + '/' + file;
  }

  function findProductByCode(code) {
    const normalized = code.trim().toUpperCase();
    return PRODUCTS.find((p) => p.code.toUpperCase() === normalized);
  }

  function findProductById(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  function navigateTo(view) {
    document.getElementById(VIEWS.HOME).classList.add('hidden');
    document.getElementById(VIEWS.CATALOG).classList.add('hidden');
    document.getElementById(VIEWS.DETAIL).classList.add('hidden');
    document.getElementById(VIEWS.SEARCH).classList.add('hidden');

    document.getElementById(view).classList.remove('hidden');
    currentView = view;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateHash(view);
  }

  function updateHash(view) {
    const map = {
      [VIEWS.HOME]: '',
      [VIEWS.CATALOG]: 'estabilizacion',
      [VIEWS.DETAIL]: 'sitting',
      [VIEWS.SEARCH]: 'buscar',
    };
    const hash = map[view] || '';
    history.pushState(null, '', hash ? `#${hash}` : window.location.pathname);
  }

  function resolveHash() {
    const hash = window.location.hash.replace('#', '');
    switch (hash) {
      case 'estabilizacion':
        return VIEWS.CATALOG;
      case 'sitting':
        return VIEWS.DETAIL;
      case 'buscar':
        return VIEWS.SEARCH;
      default:
        return VIEWS.HOME;
    }
  }

  function renderProductCards(products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const list = products || PRODUCTS;
    list.forEach((product) => {
      const imgPath = getProductImagePath(product);
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-card__info">
          <h3 class="product-card__title">${product.title}</h3>
          <p class="product-card__code">Código: ${product.code}</p>
        </div>
        <div class="product-card__image">
          <img src="${imgPath}" alt="${product.title}" onerror="this.style.display='none'">
        </div>
        <div class="product-card__actions">
          ${product.active
            ? `<button class="btn-pill btn-pill--active btn-pill--small" data-action="view-product" data-id="${product.id}">VER</button>`
            : `<button class="btn-pill btn-pill--disabled btn-pill--small" disabled>COMING SOON</button>`
          }
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function renderDetail(product) {
    const d = product || PRODUCTS.find((p) => p.id === 'sitting');
    if (!d) return;

    const mainImg = getProductImagePath(d, 'main.png');
    const secondaryImg = getProductImagePath(d, 'secondary.png');
    document.getElementById('detail-title').textContent = d.title;
    document.getElementById('detail-code').textContent = `Código: ${d.code}`;
    document.getElementById('detail-description').textContent = d.description;
    document.getElementById('detail-image').src = mainImg;
    document.getElementById('detail-photo').src = secondaryImg;
    document.getElementById('btn-whatsapp').href = d.whatsapp;
    document.getElementById('btn-guia-tecnica').href = d.guiaTecnica;
    document.getElementById('btn-guia-practica').href = d.guiaPractica;
    document.getElementById('btn-ar').href = d.arLink;

    document.getElementById('breadcrumb-product').textContent = d.title;

    const storeBtn = document.getElementById('btn-store');
    if (d.storeUrl) {
      storeBtn.href = d.storeUrl;
      storeBtn.classList.remove('hidden');
    } else {
      storeBtn.classList.add('hidden');
    }

    currentProductTutorial = d.tutorial;
    const tutBtn = document.getElementById('btn-tutorial');
    tutBtn.href = d.tutorial;
    tutBtn.removeEventListener('click', launchTutorial);
    tutBtn.addEventListener('click', launchTutorial);
  }

  function navigateToProduct(product) {
    renderDetail(product);
    navigateTo(VIEWS.DETAIL);
  }

  /* ========================================
     SEARCH ENGINE
     ======================================== */

  function searchProducts(query) {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;

    return PRODUCTS.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }

  function renderSearchResults(results, query) {
    const container = document.getElementById('search-results');
    container.innerHTML = '';

    if (results.length === 0) {
      container.innerHTML = `
        <div class="search-empty">
          <p class="search-empty__text">No se encontraron productos para "<strong>${escapeHtml(query)}</strong>"</p>
          <p class="search-empty__hint">Intenta con otro término, código de producto o categoría.</p>
        </div>
      `;
      return;
    }

    results.forEach((product) => {
      const imgPath = getProductImagePath(product);
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-card__info">
          <h3 class="product-card__title">${product.title}</h3>
          <p class="product-card__code">Código: ${product.code}</p>
          <p class="product-card__category">Categoría: ${CATEGORIES[product.category]?.title || product.category}</p>
        </div>
        <div class="product-card__image">
          <img src="${imgPath}" alt="${product.title}" onerror="this.style.display='none'">
        </div>
        <div class="product-card__actions">
          ${product.active
            ? `<button class="btn-pill btn-pill--active btn-pill--small" data-action="search-view-product" data-id="${product.id}">VER</button>`
            : `<button class="btn-pill btn-pill--disabled btn-pill--small" disabled>COMING SOON</button>`
          }
        </div>
      `;
      container.appendChild(card);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  let searchDebounceTimer = null;

  function handleSearchInput(e) {
    const query = e.target.value;

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      if (query.trim().length === 0) {
        if (currentView === VIEWS.SEARCH) {
          navigateTo(VIEWS.HOME);
        }
        return;
      }

      const results = searchProducts(query);

      const exactMatch = findProductByCode(query);
      if (exactMatch && exactMatch.active) {
        navigateToProduct(exactMatch);
        return;
      }

      document.getElementById('search-query-label').textContent = query;
      document.getElementById('search-count').textContent = results.length;
      renderSearchResults(results, query);
      if (currentView !== VIEWS.SEARCH) {
        navigateTo(VIEWS.SEARCH);
      }
    }, 300);
  }

  /* ========================================
     YOUTUBE DEEP LINK LAUNCHER
     ======================================== */

  let currentProductTutorial = '#';

  function launchTutorial(e) {
    e.preventDefault();
    const url = currentProductTutorial;
    if (!url || url === '#') return;

    const videoId = extractYouTubeId(url);

    if (videoId && isMobileDevice()) {
      const deepLink = 'vnd.youtube:' + videoId;
      const fallbackTimer = setTimeout(() => {
        window.open(url, '_blank', 'noopener');
      }, 800);

      window.addEventListener('blur', function onBlur() {
        clearTimeout(fallbackTimer);
        window.removeEventListener('blur', onBlur);
      }, { once: true });

      window.location.href = deepLink;
    } else {
      window.open(url, '_blank', 'noopener');
    }
  }

  function extractYouTubeId(url) {
    try {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    } catch (_) {
      return null;
    }
  }

  /* ========================================
     QR CAMERA SCANNER
     ======================================== */

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      ('ontouchstart' in window && window.innerWidth < 1024);
  }

  function openQRScanner() {
    if (!isMobileDevice()) {
      showDesktopScannerModal();
      return;
    }
    showCameraScanner();
  }

  function showDesktopScannerModal() {
    const overlay = document.getElementById('scanner-modal');
    const content = document.getElementById('scanner-modal-content');
    content.innerHTML = `
      <div class="scanner-desktop">
        <svg class="scanner-desktop__icon" viewBox="0 0 24 24" fill="none" stroke="#fa4615" stroke-width="1.5">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
        <h3 class="scanner-desktop__title">Escáner QR no disponible</h3>
        <p class="scanner-desktop__text">El escáner de códigos QR está optimizado para dispositivos móviles con cámara. Accede desde tu celular o tablet para escanear el código de tu producto.</p>
        <div class="scanner-desktop__manual">
          <p>También puedes ingresar el código del producto directamente en la barra de búsqueda:</p>
          <input type="text" class="scanner-desktop__input" id="manual-code-input" placeholder="Ej: DOI102" maxlength="10">
          <button class="btn-pill btn-pill--active" id="manual-code-submit">BUSCAR CÓDIGO</button>
        </div>
      </div>
    `;
    overlay.classList.remove('hidden');

    document.getElementById('manual-code-submit').addEventListener('click', () => {
      const code = document.getElementById('manual-code-input').value;
      const product = findProductByCode(code);
      overlay.classList.add('hidden');
      if (product && product.active) {
        navigateToProduct(product);
      } else if (product) {
        showToast('Este producto aún no está disponible. ¡Pronto!');
      } else {
        showToast('Código no encontrado. Verifica e intenta nuevamente.');
      }
    });

    document.getElementById('manual-code-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('manual-code-submit').click();
    });
  }

  function showCameraScanner() {
    const overlay = document.getElementById('scanner-modal');
    const content = document.getElementById('scanner-modal-content');
    content.innerHTML = `
      <div class="scanner-camera">
        <h3 class="scanner-camera__title">Escanea el código QR del producto</h3>
        <p class="scanner-camera__hint">Apunta la cámara al código QR de tu producto doi</p>
        <div class="scanner-camera__viewport">
          <video id="scanner-video" autoplay playsinline muted></video>
          <canvas id="scanner-canvas" class="hidden"></canvas>
          <div class="scanner-camera__frame"></div>
        </div>
        <p class="scanner-camera__status" id="scanner-status">Iniciando cámara...</p>
        <div class="scanner-camera__manual">
          <p>¿No puedes escanear? Ingresa el código manualmente:</p>
          <input type="text" class="scanner-desktop__input" id="mobile-code-input" placeholder="Ej: DOI102" maxlength="10">
          <button class="btn-pill btn-pill--active btn-pill--small" id="mobile-code-submit">BUSCAR</button>
        </div>
      </div>
    `;
    overlay.classList.remove('hidden');

    document.getElementById('mobile-code-submit').addEventListener('click', () => {
      const code = document.getElementById('mobile-code-input').value;
      stopCameraStream();
      overlay.classList.add('hidden');
      const product = findProductByCode(code);
      if (product && product.active) {
        navigateToProduct(product);
      } else if (product) {
        showToast('Este producto aún no está disponible. ¡Pronto!');
      } else {
        showToast('Código no encontrado. Verifica e intenta nuevamente.');
      }
    });

    document.getElementById('mobile-code-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('mobile-code-submit').click();
    });

    startCameraStream();
  }

  let cameraStream = null;
  let scanInterval = null;

  function startCameraStream() {
    const video = document.getElementById('scanner-video');
    const status = document.getElementById('scanner-status');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      status.textContent = 'Tu navegador no soporta acceso a la cámara.';
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then((stream) => {
        cameraStream = stream;
        video.srcObject = stream;
        status.textContent = 'Buscando código QR...';
        startQRScan();
      })
      .catch((err) => {
        if (err.name === 'NotAllowedError') {
          status.textContent = 'Permiso de cámara denegado. Permite el acceso en la configuración de tu navegador.';
        } else {
          status.textContent = 'No se pudo acceder a la cámara. Usa la entrada manual.';
        }
      });
  }

  function stopCameraStream() {
    if (scanInterval) {
      clearInterval(scanInterval);
      scanInterval = null;
    }
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = null;
    }
  }

  function startQRScan() {
    const video = document.getElementById('scanner-video');
    const canvas = document.getElementById('scanner-canvas');
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    scanInterval = setInterval(() => {
      if (video.readyState !== video.HAVE_ENOUGH_DATA) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (qrCode && qrCode.data) {
          handleScannedCode(qrCode.data);
        }
      } catch (_) {
        // jsQR not loaded — use manual fallback only
      }
    }, 250);
  }

  function handleScannedCode(rawCode) {
    const code = rawCode.trim().toUpperCase();
    const product = findProductByCode(code);

    stopCameraStream();
    document.getElementById('scanner-modal').classList.add('hidden');

    if (product && product.active) {
      showToast(`Producto encontrado: ${product.title}`);
      navigateToProduct(product);
    } else if (product) {
      showToast(`Producto ${product.title} reconocido, pero aún no disponible.`);
    } else {
      showToast('Código QR no corresponde a un producto doi registrado.');
    }
  }

  /* ========================================
     TOAST NOTIFICATIONS
     ======================================== */

  function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('toast--hidden');
    toast.classList.add('toast--visible');

    setTimeout(() => {
      toast.classList.remove('toast--visible');
      toast.classList.add('toast--hidden');
    }, 3500);
  }

  /* ========================================
     EVENT LISTENERS
     ======================================== */

  function initEventListeners() {
    document.getElementById('btn-ver-categoria').addEventListener('click', () => {
      navigateTo(VIEWS.CATALOG);
    });

    document.getElementById('product-grid').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="view-product"]');
      if (btn) {
        const product = findProductById(btn.dataset.id);
        navigateToProduct(product || PRODUCTS.find((p) => p.id === 'sitting'));
      }
    });

    document.getElementById('search-results').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="search-view-product"]');
      if (btn) {
        const product = findProductById(btn.dataset.id);
        if (product) navigateToProduct(product);
      }
    });

    document.querySelectorAll('[data-action="go-home"]').forEach((btn) => {
      btn.addEventListener('click', () => navigateTo(VIEWS.HOME));
    });

    document.querySelectorAll('[data-action="go-catalog"]').forEach((btn) => {
      btn.addEventListener('click', () => navigateTo(VIEWS.CATALOG));
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length > 0 && currentView !== VIEWS.SEARCH) {
        const results = searchProducts(searchInput.value);
        document.getElementById('search-query-label').textContent = searchInput.value;
        document.getElementById('search-count').textContent = results.length;
        renderSearchResults(results, searchInput.value);
        navigateTo(VIEWS.SEARCH);
      }
    });

    document.getElementById('btn-qr-scanner').addEventListener('click', openQRScanner);

    document.getElementById('scanner-modal-close').addEventListener('click', () => {
      stopCameraStream();
      document.getElementById('scanner-modal').classList.add('hidden');
    });

    document.getElementById('scanner-modal').addEventListener('click', (e) => {
      if (e.target.id === 'scanner-modal') {
        stopCameraStream();
        document.getElementById('scanner-modal').classList.add('hidden');
      }
    });

    window.addEventListener('popstate', () => {
      const view = resolveHash();
      if (view !== currentView) {
        document.getElementById(VIEWS.HOME).classList.add('hidden');
        document.getElementById(VIEWS.CATALOG).classList.add('hidden');
        document.getElementById(VIEWS.DETAIL).classList.add('hidden');
        document.getElementById(VIEWS.SEARCH).classList.add('hidden');
        document.getElementById(view).classList.remove('hidden');
        currentView = view;
      }
    });
  }

  /* ========================================
     QR ICON ADAPTIVE DISPLAY
     ======================================== */

  function updateQRIcon() {
    const btn = document.getElementById('btn-qr-scanner');
    if (isMobileDevice()) {
      btn.title = 'Escanear código QR';
      btn.setAttribute('aria-label', 'Escanear código QR del producto');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>`;
    } else {
      btn.title = 'Buscar por código QR';
      btn.setAttribute('aria-label', 'Ingresar código de producto');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>`;
    }
  }

  /* ========================================
     INIT
     ======================================== */

  function init() {
    renderProductCards();
    renderDetail();
    updateQRIcon();
    initEventListeners();

    const startView = resolveHash();
    navigateTo(startView);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
