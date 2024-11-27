// Get all the company type cards and the Next button
const companyTypeCards = document.querySelectorAll('.company-type');
const nextButton = document.querySelector('.next-btn');

// Retrieve any previously selected types from localStorage and apply 'selected' class
const selectedTypesFromStorage = JSON.parse(localStorage.getItem('selectedTypes')) || [];
companyTypeCards.forEach(card => {
    const cardValue = card.dataset.value;
    // Check if this card was previously selected and apply the 'selected' class
    if (selectedTypesFromStorage.includes(cardValue)) {
        card.classList.add('selected');
    }

    // Add click event to toggle the 'selected' class
    card.addEventListener('click', () => {
        card.classList.toggle('selected'); // Toggle the selected class

        // Update localStorage with the new selection state
        updateSelectedTypes();
    });
});

// Function to update localStorage with the currently selected types
function updateSelectedTypes() {
    // Get all selected cards and store their data values in an array
    const selectedTypes = Array.from(document.querySelectorAll('.company-type.selected')).map(card => card.dataset.value);
    localStorage.setItem('selectedTypes', JSON.stringify(selectedTypes)); // Save to localStorage
}

// Modal elements
const modal = document.getElementById('thankYouModal');
const emailSubmitButton = document.getElementById('emailSubmitButton');
const closeModalButton = document.getElementById('closeModalButton');
const emailInput = document.getElementById('emailInput');

// Event listener for "Next" button to check selection and display the modal
nextButton.addEventListener('click', (event) => {
    const selectedTypes = document.querySelectorAll('.company-type.selected');
    if (selectedTypes.length === 0) {
        event.preventDefault(); // Prevent navigation if no cards are selected
        alert('Please select at least one option.');
    } else {
        // Show the modal
        modal.style.display = 'flex';
    }
});

// Event listener for the email "Submit" button in the modal
emailSubmitButton.addEventListener('click', () => {
    const email = emailInput.value;
    if (email) {
        alert(`Thank you! We've received your email: ${email}`);
        modal.style.display = 'none'; // Hide the modal after submission

        // Navigate to the next page after submission
        window.location.href = "../pricing-geography.html"; // Make sure this path is correct
    } else {
        alert('Please enter a valid email address.');
    }
});

// Event listener for the modal "Close" button
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide the modal without submitting
});

// Optional: Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});