//typing effect for home page
document.addEventListener("DOMContentLoaded", function () {
    const text = "Welcome to Shielded Savings";
    const typedText = document.getElementById("typed-text");
    const cursor = document.querySelector(".cursor");
    
    let i = 0;

    function typeEffect() {
        if (i < text.length) {
            typedText.textContent += text.charAt(i);
            i++;
            setTimeout(typeEffect, 100); // Adjust typing speed
        } else {
            setTimeout(() => {
                deleteEffect(); // Start deleting after a pause
            }, 2000); // Pause for 2 seconds before deleting
        }
    }

    function deleteEffect() {
        if (i > 0) {
            typedText.textContent = text.substring(0, i - 1);
            i--;
            setTimeout(deleteEffect, 50); // Adjust deleting speed
        } else {
            setTimeout(typeEffect, 500); // Start typing again after a pause
        }
    }

    typeEffect(); // Initial typing animation
});



//mortgage calc logic
$(document).ready(function () {
    $("#calculateBtn").on("click", function () {
        const loanAmount = parseFloat($("#loanAmount").val());
        const loanTerm = parseInt($("#loanTerm").val());
        const monthlyIncome = parseFloat($("#monthlyIncome").val());

        // Error handling
        if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(monthlyIncome) || loanAmount <= 0 || loanTerm <= 0 || monthlyIncome <= 0) {
            alert("Please enter valid positive numbers for all fields.");
            return;
        }

        const annualInterestRate = 0.045; // Fixed interest rate
        const monthlyInterestRate = annualInterestRate / 12;
        const numberOfPayments = loanTerm * 12;

        const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                               (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - loanAmount;

        const affordabilityCheck = 0.3 * monthlyIncome;

        // Update results section dynamically
        $("#monthlyPayment").text(`Monthly Payment: £${monthlyPayment.toFixed(2)}`);
        $("#totalInterest").text(`Total Interest: £${totalInterest.toFixed(2)}`);
        $("#totalPayment").text(`Total Payment: £${totalPayment.toFixed(2)}`);

        if (monthlyPayment > affordabilityCheck) {
            $("#eligibility").text("Mortgage Denied: Monthly payment exceeds 30% of your income.").css({
                "color": "red",
                "font-weight": "bold"
            });
        } else {
            $("#eligibility").text("Mortgage Approved: Monthly payment is within your income limit.").css({
                "color": "green",
                "font-weight": "bold"
            });
        }

        // Ensure the results section is visible and animated
        $("#results").removeClass("hidden").fadeIn(500);
    });
});



//about us accordion
// Function to toggle accordion content and icon
function toggleAccordion(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('.accordion-icon');
    
    // Check if the content is already open
    if (content.classList.contains('open')) {
        // If it's open, close it
        content.classList.remove('open');
        icon.textContent = "+"; // Reset icon to plus
    } else {
        // If it's closed, open it and set maxHeight to the scrollHeight (content height)
        content.classList.add('open');
        icon.textContent = "−"; // Change icon to minus
    }
}

// Add event listeners to each accordion header
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;

        // Close other open accordions
        document.querySelectorAll('.accordion-content').forEach(openContent => {
            if (openContent !== content) {
                openContent.classList.remove('open');
                openContent.previousElementSibling.querySelector('.accordion-icon').textContent = "+"; // Reset the icon to '+'
            }
        });

        // Toggle the clicked accordion content
        if (content.classList.contains('open')) {
            content.classList.remove('open');
            header.querySelector('.accordion-icon').textContent = "+"; // Reset icon to plus
        } else {
            content.classList.add('open');
            header.querySelector('.accordion-icon').textContent = "−"; // Change icon to minus
        }
    });
});

// FAQ Accordion
// Function to toggle accordion content and icon
function toggleFAQAccordion(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('.faq-accordion-icon');

    if (content.classList.contains('open')) {
        content.classList.remove('open');
        icon.textContent = "+"; // Reset icon to plus
    } else {
        content.classList.add('open');
        icon.textContent = "−"; // Change icon to minus
    }
}

// Add event listeners to each FAQ accordion header
document.querySelectorAll('.faq-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;

        // Close other open FAQ accordions
        document.querySelectorAll('.faq-accordion-content').forEach(openContent => {
            if (openContent !== content) {
                openContent.classList.remove('open');
                openContent.previousElementSibling.querySelector('.faq-accordion-icon').textContent = "+"; // Reset the icon to '+'
            }
        });

        // Toggle the clicked FAQ accordion content
        if (content.classList.contains('open')) {
            content.classList.remove('open');
            header.querySelector('.faq-accordion-icon').textContent = "+"; // Reset icon to plus
        } else {
            content.classList.add('open');
            header.querySelector('.faq-accordion-icon').textContent = "−"; // Change icon to minus
        }
    });
});

//contact us
document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Prevent form submission for validation
    event.preventDefault();

    // Get the form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (name === '' || email === '' || subject === '' || message === '') {
        alert('All fields are required!');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // If validation passes, submit the form
    alert('Your message has been sent!');
    // Uncomment the following line to allow form submission
    // this.submit();
});

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

  


   

