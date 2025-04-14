// Add this function with your other async functions
async function fetchProjectionUniverse(event) {
    event.preventDefault(); 

    const selectedColumns = [];
    if (document.getElementById("chkName").checked) selectedColumns.push("UNIVERSALNAME");
    if (document.getElementById("chkAge").checked) selectedColumns.push("AGE");
    if (document.getElementById("chkRate").checked) selectedColumns.push("EXPANSIONARYRATE");

    console.log(selectedColumns);

     const response = await fetch('/project-universe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ columns: selectedColumns })
    });
    
    const responseData = await response.json();
    const tableContent = responseData.data;

    const tableElement = document.getElementById("universeProjection");
    const tableHead = tableElement.querySelector("thead tr");
    const tableBody = tableElement.querySelector("tbody");

\    tableHead.innerHTML = "";
    tableBody.innerHTML = "";

    // Create table headers 
    selectedColumns.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col.replace("_", " ");
        tableHead.appendChild(th);
    });

    // Insert data 
    tableContent.forEach(rowData => {
        const row = tableBody.insertRow();
        rowData.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
    
    document.getElementById("projectionResultMsg").textContent = "Projection fetched successfully!";
}

document.addEventListener("DOMContentLoaded", function() {
    const projectionForm = document.getElementById("projectionUniverse");
    if (projectionForm) {
        projectionForm.addEventListener("submit", fetchProjectionUniverse);
    }
});

// Modify your window.onload function to include the fetchAndDisplayStars function
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    document.getElementById("resetUniverse").addEventListener("click", resetUniverse);
    document.getElementById("resetAstronomical").addEventListener("click", resetAstronomical);
    document.getElementById("resetGalaxy").addEventListener("click", resetGalaxy);
    document.getElementById("insertUniverse").addEventListener("submit", insertUniverse);
    document.getElementById("insertGalaxy").addEventListener("submit", insertGalaxy);
    document.getElementById("countUniverse").addEventListener("click", countUniverse);
};