// ====== Temple data array ======
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: 'images/aba-nigeria-temple-5087-main.jpg'
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: 'images/manti.jpg'
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: 'images/payson.jpg'
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
        imageUrl: 'images/yigo.jpg'
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: 'images/washington.jpg'
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
        imageUrl: 'images/lima.jpg'
  },  
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: 'images/mexico.jpg'
   },  
  {
    templeName: "Paris France",
    location: "Paris, France",
    dedicated: "2017, May, 21",
    area: 44175,
    imageUrl: 'images/paris.jpg'
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: 'images/salt-lake-temple-15669-main.jpg'
  }
];

// ====== Render function ======
function renderTemples(list) {
  const gallery = document.getElementById("templeGallery");
  gallery.innerHTML = ""; // clear previous

  list.forEach(t => {
    const card = document.createElement("figure");

    const img = document.createElement("img");
    img.src = t.imageUrl;
    img.alt = t.templeName;
    img.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.innerHTML = `
      <h3>${t.templeName}</h3>
      <p><strong>Location:</strong> ${t.location}</p>
      <p><strong>Dedicated:</strong> ${t.dedicated}</p>
      <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
    `;

    card.appendChild(img);
    card.appendChild(caption);
    gallery.appendChild(card);
  });
}

// ====== Initial render ======
renderTemples(temples);

// ====== Filtering ======
document.querySelectorAll(".nav-list a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const filter = link.textContent;

    switch (filter) {
      case "Old":
        renderTemples(temples.filter(t => parseInt(t.dedicated) < 1900));
        break;
      case "New":
        renderTemples(temples.filter(t => parseInt(t.dedicated) > 2000));
        break;
      case "Large":
        renderTemples(temples.filter(t => t.area > 90000));
        break;
      case "Small":
        renderTemples(temples.filter(t => t.area < 10000));
        break;
      default:
        renderTemples(temples);
    }
  });
});

// ====== Hamburger menu toggle ======
const menuButton = document.getElementById('menuButton');
const primaryNav = document.getElementById('primaryNav');

if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.textContent = primaryNav.classList.contains('open') ? '✕' : '☰';
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 700) {
      primaryNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    }
  });
}

// ====== Footer dynamic values ======
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;
