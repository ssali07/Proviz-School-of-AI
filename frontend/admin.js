// Fetches applicant data from the server and displays it
async function fetchApplicants() {
    try {
        const response = await fetch("http://localhost:5000/admin/applicants"); // Adjust the URL if your server is on a different port
        const applicants = await response.json();

        if (response.ok) {
            displayApplicants(applicants);
        } else {
            console.error("Failed to load applicants");
            displayError("Unable to fetch applicant data.");
        }
    } catch (error) {
        console.error("Error fetching applicants:", error);
        displayError("An error occurred while fetching applicant data.");
    }
}

// Renders applicant data in a table
function displayApplicants(applicants) {
    const applicantsContainer = document.getElementById("applicants-container");

    // Clear any existing content
    applicantsContainer.innerHTML = "";

    // Check if there are any applicants
    if (applicants.length === 0) {
        applicantsContainer.innerHTML = "<p>No applicants found.</p>";
        return;
    }

    // Create a table structure
    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Statement</th>
                <th>Submitted At</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector("tbody");

    // Populate the table rows with applicant data
    applicants.forEach(applicant => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${applicant.id}</td>
            <td>${applicant.name}</td>
            <td>${applicant.phone}</td>
            <td>${applicant.email}</td>
            <td>${applicant.statement}</td>
            <td>${new Date(applicant.submitted_at).toLocaleString()}</td>
        `;

        tbody.appendChild(row);
    });

    applicantsContainer.appendChild(table);
}

// Displays an error message if something goes wrong
function displayError(message) {
    const applicantsContainer = document.getElementById("applicants-container");
    applicantsContainer.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Load applicants when the page is loaded
fetchApplicants();
