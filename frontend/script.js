// JavaScript for handling modal display
const applyNowBtn = document.getElementById("applyNowBtn");
const applicationModal = document.getElementById("applicationModal");
const closeModal = document.getElementById("closeModal");

applyNowBtn.addEventListener("click", () => {
    applicationModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    applicationModal.style.display = "none";
});

// Close modal when clicking outside of modal content
window.addEventListener("click", (event) => {
    if (event.target === applicationModal) {
        applicationModal.style.display = "none";
    }
});
const form = document.getElementById("applicationForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        statement: document.getElementById("statement").value
    };

    try {
        const response = await fetch("http://localhost:5000/apply", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        alert(result.message || "Application submitted successfully!");
    } catch (error) {
        console.error("Error submitting form:", error);
    }
});

// JavaScript for toggling the mobile menu
document.getElementById("hamburger").addEventListener("click", function() {
    document.querySelector(".nav").classList.toggle("active");
});

