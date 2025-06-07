// Helper function to display errors
function displayError(msg) {
    const errorElement = document.getElementById('card-error');
    if (errorElement) {
        errorElement.innerHTML = msg;
        const formErrorsContainer = document.getElementById('form-errors');
        if (msg === '') {
            formErrorsContainer.classList.add('hidden');
        } else {
            formErrorsContainer.classList.remove('hidden');
        }
    }
}

// Function to check if card number is valid (simplified for this exercise)
function isCardNumberValid(number) {
    // This is a simplified validation for the demo.
    // In a real application, you'd integrate with a payment gateway for real validation.
    return number === '1234567891011020'; // This is the simplified validation
}

// Submit handler for the form
function submitHandler(event) {
    event.preventDefault(); // Stop the browser from reloading the page

    let errorMsg = '';
    displayError(''); // Clear any previous errors

    // References to the form elements using their IDs
    const cardNumberInput = document.getElementById('card-number');
    const cardMonthInput = document.getElementById('card-month');
    const cardYearInput = document.getElementById('card-year');
    const cardCVCInput = document.getElementById('card-cvc');

    // Remove any previous invalid classes
    cardNumberInput.classList.remove('invalid');
    cardMonthInput.classList.remove('invalid');
    cardYearInput.classList.remove('invalid');
    cardCVCInput.classList.remove('invalid'); // Added for CVC as well

    // 1. Basic HTML5 validation already handles required fields,
    // but we can add more robust checks here if needed beyond 'required'.

    // 2. Check credit card number (isNaN and simplified valid number)
    const cleanedCardNumber = cardNumberInput.value.replace(/\s/g, ''); // Remove spaces for validation

    if (isNaN(cleanedCardNumber)) {
        errorMsg += 'Card number is not a valid number (contains non-numeric characters).\n';
        cardNumberInput.classList.add('invalid');
    } else if (!isCardNumberValid(cleanedCardNumber)) {
        errorMsg += 'Card number is not a valid card number (for this demo).\n';
        cardNumberInput.classList.add('invalid');
    }

    // 3. Check expiration date is in the future
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed (January is 0)

    const enteredMonth = parseInt(cardMonthInput.value, 10);
    const enteredYearTwoDigits = parseInt(cardYearInput.value, 10);
    const enteredYear = 2000 + enteredYearTwoDigits; // Assuming YY means 20YY

    let isExpDateValidFormat = true;

    if (isNaN(enteredMonth) || enteredMonth < 1 || enteredMonth > 12) {
        errorMsg += 'Invalid month format.\n';
        cardMonthInput.classList.add('invalid');
        isExpDateValidFormat = false;
    }
    if (isNaN(enteredYearTwoDigits) || enteredYearTwoDigits < 0 || enteredYearTwoDigits > 99) {
        errorMsg += 'Invalid year format.\n';
        cardYearInput.classList.add('invalid');
        isExpDateValidFormat = false;
    }

    if (isExpDateValidFormat) {
        if (enteredYear < currentYear || (enteredYear === currentYear && enteredMonth < currentMonth)) {
            errorMsg += 'Expiration date must be in the future.\n';
            cardMonthInput.classList.add('invalid');
            cardYearInput.classList.add('invalid');
        }
    }


    // Check CVC (basic length check, could add isNaN if numbers only)
    if (cardCVCInput.value.length < 3 || cardCVCInput.value.length > 4 || isNaN(cardCVCInput.value)) {
        errorMsg += 'CVC/CVV must be 3 or 4 digits and numeric.\n';
        cardCVCInput.classList.add('invalid');
    }


    // If there were any errors, display them and stop the form submission
    if (errorMsg !== '') {
        displayError(errorMsg);
        document.getElementById('card-success').classList.add('hidden'); // Hide success if errors
        return false;
    } else {
        // No errors, so display success message and clear error message
        displayError(''); // Clear error message
        document.getElementById('form-errors').classList.add('hidden'); // Hide error container
        document.getElementById('card-success').classList.remove('hidden'); // Show success message

        // In a real application, you would now send this data to a server or payment gateway.
        // For this demo, we just show success.
        console.log("Form submitted successfully! (Demo validation passed)");

        return true; // Although preventDefault stops actual browser submit, this indicates logical success
    }
}

// Attach the event listener to the form itself
const creditCardForm = document.getElementById('credit-card-form'); // Use the ID we set on the <form> tag

if (creditCardForm) {
    creditCardForm.addEventListener('submit', submitHandler);
} else {
    console.error("Form element with ID 'credit-card-form' not found. Please ensure your HTML has a form with this ID.");
}


// --- Existing jQuery (Stripe Integration and card type detection) ---
// This part uses jQuery and Stripe.js. Ensure these scripts are loaded in your HTML.

$(document).ready(function () {

    Stripe.setPublishableKey('pk_test_9D43kM3d2vEHZYzPzwAblYXl');

    // Function to check card type and display corresponding icon
    function checkCardType() {
        var cardNumber = $('#card-number').val().replace(/\s/g, ''); // Remove spaces for Stripe validation
        var cardType = Stripe.card.cardType(cardNumber);

        switch (cardType) {
            case 'Visa':
                $('#card-image').html('<img src="https://js.stripe.com/v2/img/cards/visa.svg" alt="Visa">');
                break;
            case 'MasterCard':
                $('#card-image').html('<img src="https://js.stripe.com/v2/img/cards/mastercard.svg" alt="MasterCard">');
                break;
            case 'American Express':
                $('#card-image').html('<img src="https://js.stripe.com/v2/img/cards/amex.svg" alt="American Express">');
                break;
            case 'Discover':
                $('#card-image').html('<img src="https://js.stripe.com/v2/img/cards/discover.svg" alt="Discover">');
                break;
            case 'Diners Club':
                $('#card-image').html('<img src="https://js.stripe.com/v2/img/cards/diners.svg" alt="Diners Club">');
                break;
            case 'JCB':
                $('#card-image').html('<img src="https://js.stripe.com/v2/img/cards/jcb.svg" alt="JCB">');
                break;
            default:
                // Fallback to generic card placeholder if type is unknown or input is empty
                $('#card-image').html('<img src="https://via.placeholder.com/40x25/FFA500/FFFFFF?text=CARD" alt="Card Placeholder">');
                break;
        }
    }

    // Check card type on card number input blur and keyup (for real-time feedback)
    $('#card-number').on('blur keyup', function () {
        checkCardType();
    });

    // The original jQuery click listener for the button is commented out
    // because we are now using the native form submit event handler.
    // If you needed to integrate Stripe.js validation directly into your submitHandler,
    // you would call Stripe.card.validate methods within submitHandler.
});