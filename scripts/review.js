const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    
    // Check if this is a form submission by verifying presence of key parameters
    const isSubmission = params.has('productId') && params.has('rating') && params.has('installDate');
    
    if (isSubmission) {
        const productId = params.get('productId');
        const rating = params.get('rating');
        const installDate = params.get('installDate');
        const features = params.getAll('features');
        const writtenReview = params.get('writtenReview') || 'No review provided.';
        const userName = params.get('userName') || 'Anonymous';

        const productName = products.find(p => p.id === productId)?.name || 'Unknown Product';

        const contentDiv = document.getElementById('confirmation-content');
        contentDiv.innerHTML = `
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Rating:</strong> ${rating} stars</p>
            <p><strong>Date of Installation:</strong> ${installDate}</p>
            <p><strong>Useful Features:</strong> ${features.length > 0 ? features.join(', ') : 'None selected'}</p>
            <p><strong>Review:</strong> ${writtenReview}</p>
            <p><strong>Submitted by:</strong> ${userName}</p>
        `;

        // Increment counter only on successful form submission
        let count = parseInt(localStorage.getItem('reviewCount') || '0', 10) + 1;
        localStorage.setItem('reviewCount', count.toString());
        document.getElementById('counter').textContent = `You have submitted ${count} review(s) so far.`;
    } else {
        // If not a submission (e.g., direct access or refresh), show current count without incrementing
        const count = parseInt(localStorage.getItem('reviewCount') || '0', 10);
        document.getElementById('confirmation-content').innerHTML = '<p>No review data found. Please submit a review from the form.</p>';
        document.getElementById('counter').textContent = `You have submitted ${count} review(s) so far.`;
    }
});

// Footer dynamic values: copyright year and last modified
const yearSpan = document.getElementById('copyright-year');
const lastModSpan = document.getElementById('last-modified');


if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified;