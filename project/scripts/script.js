document.addEventListener('DOMContentLoaded', () => {
  // ---------- Hamburger menu toggle ----------
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      navUl.classList.toggle('active');
    });
  }

  // =======================
  // Universal Site Search (Enhanced with Full-Text Snippets)
  // =======================
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const searchForm = document.querySelector('.search-form');

  // Prevent page reload on Enter key
  if (searchForm) {
    searchForm.addEventListener('submit', e => e.preventDefault());
  }

  // Enhanced data index: titles, keywords, and content snippets from page bodies
  const siteIndex = [
    {
      title: 'Home',
      url: 'index.html',
      keywords: ['overview', 'precision agriculture', 'introduction', 'home'],
      content: [
        'precisionag hub - home overview visuals benefits overview of precision agriculture precision agriculture is a key application of biosystems engineering that uses technology to optimize crop production, reduce resource waste, and promote sustainability.',
        'benefits to biosystems engineering water conservation: precision irrigation systems save up to 20-50% of water usage while maintaining or increasing yields.',
        'yield optimization: data-driven insights enable targeted inputs, boosting crop yields by up to 20% in variable field conditions.',
        'sustainability: reduces overuse of fertilizers and pesticides, protecting soil health and minimizing environmental impact.'
      ]
    },
    {
      title: 'Tools & Technologies',
      url: 'tools.html',
      keywords: ['gps', 'iot', 'ai', 'irrigation', 'mapping', 'sensors', 'technology', 'quiz', 'recommendations'],
      content: [
        'tools & technologies - precisionag hub key technologies in precision agriculture gps soil mapping enables precise field mapping for variable-rate applications, optimizing inputs across varied terrain.',
        'iot sensors real-time monitoring of soil moisture and crop health via connected devices.',
        'ai-driven irrigation uses forecasts and sensors for automated, efficient water distribution.',
        'interactive tool recommender crop type: corn wheat vegetables fruits'
      ]
    },
    {
      title: 'Case Studies',
      url: 'cases.html',
      keywords: ['field data', 'africa', 'drones', 'satellite', 'csir', 'twiga', 'success'],
      content: [
        'case studies - precisionag hub real-world case studies'
      ]
    },
    {
      title: 'Resources / Contact',
      url: 'resources.html',
      keywords: ['resources', 'contact', 'email', 'form', 'help', 'links'],
      content: [
        'resources/contact - precisionag hub downloadable resources precision agriculture guide - montana state university (pdf) precision agriculture handbook for beginners - eu (pdf) guidelines for adopting precision practices - university of kentucky (pdf) precision agriculture introduction - university of missouri (pdf) further reading precision ag: current state & technologies contact us'
      ]
    },
    {
      title: 'About PrecisionAg Hub',
      url: 'about.html',
      keywords: ['overview', 'benefits', 'biosystems engineering', 'sustainability'],
      content: [
        'about precisionag hub overview of benefits and biosystems engineering in sustainability.'
      ]
    }
  ];

  if (searchInput && resultsContainer) {
    let timeout; // For debounce

    // Live filtering with full-text support
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const query = searchInput.value.trim().toLowerCase();
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';

        if (query.length < 2) return;

        const matches = siteIndex.filter(page => {
          // Check title
          if (page.title.toLowerCase().includes(query)) return true;
          // Check keywords
          if (page.keywords.some(k => k.toLowerCase().includes(query))) return true;
          // Check content snippets
          if (page.content.some(snippet => snippet.includes(query))) return true;
          return false;
        });

        if (matches.length > 0) {
          const list = matches.map(page => {
            // Find best matching snippet (first that contains query)
            let snippet = '';
            const matchingSnippet = page.content.find(s => s.includes(query));
            if (matchingSnippet) {
              // Truncate and add ellipsis
              snippet = matchingSnippet.slice(0, 100) + (matchingSnippet.length > 100 ? '...' : '');
            }
            return `
              <a href="${page.url}" class="search-result-item">
                <strong>${page.title}</strong>
                ${snippet ? `<br><small>${snippet}</small>` : ''}
              </a>
            `;
          }).join('');
          resultsContainer.innerHTML = list;
          resultsContainer.style.display = 'block';
        } else {
          resultsContainer.innerHTML = '<div class="no-results">No matches found.</div>';
          resultsContainer.style.display = 'block';
        }
      }, 150); // 150ms debounce
    });

    // Re-show on focus if query exists
    searchInput.addEventListener('focus', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length >= 2) {
        searchInput.dispatchEvent(new Event('input'));
      }
    });

    // Icon click to trigger search (navigates to first result)
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
      searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput.value.trim().length >= 2) {
          const firstLink = resultsContainer.querySelector('.search-result-item');
          if (firstLink) {
            window.location.href = firstLink.href;
          } else {
            searchInput.dispatchEvent(new Event('input'));
          }
        }
      });
      // Keyboard support for icon
      searchIcon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          searchIcon.click();
        }
      });
    }

    // Hide results when clicking outside
    document.addEventListener('click', e => {
      if (!resultsContainer.contains(e.target) && e.target !== searchInput && e.target !== searchIcon) {
        resultsContainer.style.display = 'none';
      }
    });
  }

  // ---------- Tools Page: Quiz logic ----------
  const form = document.querySelector('.quiz-form');
  if (form) {
    const result = document.querySelector('.quiz-result');
    const toolsData = {
      gps: { name: 'GPS Soil Mapping', suitableFor: ['large', 'medium'], crops: ['corn', 'wheat'], desc: 'For precise field mapping and variable-rate application.' },
      iot: { name: 'IoT Sensors', suitableFor: ['small', 'medium', 'large'], crops: ['vegetables', 'corn'], desc: 'Monitors soil moisture and crop health in real-time.' },
      ai: { name: 'AI-Driven Irrigation', suitableFor: ['medium', 'large'], crops: ['corn', 'fruits'], desc: 'Optimizes water use based on weather and soil data.' }
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const farmSize = document.getElementById('farm-size').value;
      const cropType = document.getElementById('crop-type').value;
      let recommendations = [];
      for (let tool in toolsData) {
        if (toolsData[tool].suitableFor.includes(farmSize) && toolsData[tool].crops.includes(cropType)) {
          recommendations.push(toolsData[tool]);
        }
      }
      let output = recommendations.length ?
        recommendations.map(t => `<p><strong>${t.name}:</strong> ${t.desc}</p>`).join('') :
        '<p>No specific recommendations match your inputs. Explore all tools!</p>';
      result.innerHTML = `<h3>Recommended Tools:</h3>${output}`;
      result.style.display = 'block';
    });
  }

  // ---------- Cases Page: Dynamic gallery filter ----------
  if (document.querySelector('.filter-buttons')) {
    const cases = [
      { id: 1, title: 'Zimbabwe Maize Satellite Monitoring', region: 'Southern Africa', tech: 'Satellite', summary: 'Satellite imagery and GIS tools optimized maize crop performance...', img: 'images/zimbabwe.jpg' },
      { id: 2, title: 'Kenya Twiga Foods Agritech Platform', region: 'East Africa', tech: 'AI', summary: 'Mobile platform with big data analytics and AI recommendations...', img: 'images/kenya.jpg' },
      { id: 3, title: 'South Africa CSIR Transformative Farming', region: 'Southern Africa', tech: 'Drones', summary: 'Drones with multispectral sensors and GPS provided actionable maps...', img: 'images/southafrica.jpg' }
    ];

    function renderCases(filteredCases) {
      const gallery = document.querySelector('.card-grid');
      if (!gallery) return;
      gallery.innerHTML = filteredCases.map(c => `
        <div class="card" id="case${c.id}">
          <img src="${c.img}" alt="${c.title}" loading="lazy">
          <h3>${c.title}</h3>
          <p>${c.summary}</p>
        </div>
      `).join('');
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const filter = btn.dataset.filter;
        const filtered = filter === 'all' ? cases : cases.filter(c => c[filter] === btn.textContent);
        renderCases(filtered);
      });
    });

    renderCases(cases);
  }

  // ---------- Resources Page: Form validation & localStorage ----------
  if (document.querySelector('.contact-form')) {
    const contactForm = document.querySelector('.contact-form');
    const message = document.querySelector('.message');

    contactForm.addEventListener('input', () => {
      const formData = new FormData(contactForm);
      const draft = Object.fromEntries(formData);
      localStorage.setItem('formDraft', JSON.stringify(draft));
    });

    const saved = localStorage.getItem('formDraft');
    if (saved) {
      const draft = JSON.parse(saved);
      Object.keys(draft).forEach(key => {
        if (contactForm.elements[key]) contactForm.elements[key].value = draft[key];
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.elements.name.value.trim();
      const email = contactForm.elements.email.value.trim();
      const messageText = contactForm.elements.message.value.trim();

      if (!name || !email || !messageText) {
        showMessage('Please fill all fields.', 'error');
        return;
      }
      if (!email.includes('@')) {
        showMessage('Invalid email.', 'error');
        return;
      }

      localStorage.removeItem('formDraft');
      showMessage('Thank you! Your message has been sent.', 'success');
      contactForm.reset();
    });

    function showMessage(text, type) {
      message.textContent = text;
      message.className = `message ${type}`;
      message.style.display = 'block';
      setTimeout(() => message.style.display = 'none', 5000);
    }
  }

  // ---------- Footer dynamic values ----------
  const yearSpan = document.getElementById('copyright-year');
  const lastModSpan = document.getElementById('last-modified');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (lastModSpan) lastModSpan.textContent = document.lastModified;
});