
// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}

// Fetches data from the demotable and displays it.
// async function fetchAndDisplayUniverse() 
/* UNIVERSE */
async function fetchAndDisplayUniverse() {
    const tableElement = document.getElementById('universe');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/universe', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch('/get-universe', {
        method: 'GET'
    });

    const dropDownUniverse = document.getElementById('insertGalacticUniverse');
    const responseData = await response.json();
    const data = responseData.data;

    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      dropDownUniverse.appendChild(option);
    });
});


async function resetUniverse() {
    const response = await fetch("/initiate-universe", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "universe initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating universe table!");
    }
}

async function insertUniverse(event) {
    event.preventDefault();

    const nameValue = document.getElementById('insertName').value;
    const ageValue = document.getElementById('insertAge').value;
    const rateValue = document.getElementById('insertRate').value;


    const response = await fetch('/insert-universe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue,
            age: ageValue,
            rate: rateValue
        })
    });

    insertionMsg(response)
}

/* ASTRONOMICAL */
async function resetAstronomical() {
    const response = await fetch("/initiate-astronomical", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "Astronomical Object initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating Astronomical Object table!");
    }

    insertionMsg(response)
}


/* GALAXY */
async function fetchAndDisplayGalaxy() {
    const tableElement = document.getElementById('galaxy');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/galaxy', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function resetGalaxy() {
    const response = await fetch("/initiate-galaxy", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "Galaxy initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating Galaxy table!");
    }

    insertionMsg(response)
}




async function insertGalaxy(event) {
    event.preventDefault();

    const nameValue = document.getElementById('insertGalacticName').value;
    const constellationValue = document.getElementById('insertConstellation').value;
    const typeValue = document.getElementById('insertGalacticType').value;
    const radiusValue = document.getElementById('insertGalacticRadius').value;
    const countValue = document.getElementById('insertGalacticCount').value;
    const objectValue = document.getElementById('insertGalacticObject').value;
    const distanceValue = document.getElementById('insertGalacticDistance').value;
    const universeValue = document.getElementById('insertGalacticUniverse').value;


    await fetch('/insert-astronomical', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue,
            distance: distanceValue,
            universe: universeValue
        })
    });

    const response = await fetch('/insert-galaxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue,
            constellation: constellationValue,
            type: typeValue,
            radius: radiusValue,
            count: countValue,
            object: objectValue
        })
    });

    insertionMsg(response)
}

/* GALAXY but division */

async function dividePlanetarySystem() {
    event.preventDefault();
    const tableElement = document.getElementById('dividePlanetarySystem');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/dividePlanetarySystem', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

/* KINGDOM / BIOME STUFF */
document.addEventListener("DOMContentLoaded", async function() {
    
    const response = await fetch('/get-biomes', {
        method: 'GET'
    });

    const dropDownUniverse = document.getElementById('nestedBiomeType');
    const responseData = await response.json();
    const data = responseData.data;

    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      dropDownUniverse.appendChild(option);
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const nestedBiomeForm = document.getElementById('nestedBiome');
    if (nestedBiomeForm) {
        nestedBiomeForm.addEventListener('submit', fetchAndDisplayBiomeSpecies);
    }
});


async function fetchAndDisplayBiomeSpecies(event) {
    event.preventDefault();

    const biome = document.getElementById('nestedBiomeType').value;
    const tableElement = document.getElementById('species');
    const tableBody = tableElement.querySelector('tbody');

    if (!biome) {
        alert('Please select a biome to search');
        return;
    }

    const response = await fetch('/species', {
        method: 'SEARCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            biome: biome 
        })
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    await getAvgAlleles(biome);

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        console.log(user);
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function getAvgAlleles(biome) {
    const messageElement = document.getElementById('insertAvgAlleles');


    const response = await fetch('/get-alleles', {
        method: 'SEARCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            biome: biome 
        })
    });


    const responseData = await response.json();

    const val = Math.round(responseData.data);

    messageElement.textContent = `The average number of alleles across all taxonomies in the ${biome} biome is: ${val}`;

}

/* MOON */

document.addEventListener("DOMContentLoaded", function() {
    const nestedBiomeForm = document.getElementById('havingMoon');
    if (nestedBiomeForm) {
        nestedBiomeForm.addEventListener('submit', fetchAndDisplayMoons);
    }
});

async function fetchAndDisplayMoons(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    const number = document.getElementById('havingMoonField').value;
    const tableElement = document.getElementById('moons');
    const tableBody = tableElement.querySelector('tbody');

    // if (!number) {
    //     alert('Please input a minimum number of moons');
    //     return;
    // }
    const response = await fetch('/moonHaving', {
        method: 'SEARCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            number: number 
        })
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        console.log(user);
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}


async function insertionMsg(response) {
    const responseData = await response.json();
    const messageElement = document.getElementById('insertResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

// Updates names in the demotable.
async function updateNameDemotable(event) {
    event.preventDefault();

    const oldNameValue = document.getElementById('updateOldName').value;
    const newNameValue = document.getElementById('updateNewName').value;

    const response = await fetch('/update-name-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldName: oldNameValue,
            newName: newNameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateNameResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Name updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating name!";
    }
}

// Counts rows in the demotable.
// Modify the function accordingly if using different aggregate functions or procedures.
async function countUniverse() {
    event.preventDefault();
    const countEntity = document.getElementById('countUniverse');
    //alert(countEntity.value)
    if (countEntity.value == "") {
        alert('Please select an entity to search');
        return;
    }
    const response = await fetch("/count-universe", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tableName: countEntity.value
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('countResultMsg');

    if (responseData.success) {
        const tupleCount = responseData.count;
        messageElement.textContent = `The number of tuples in the ${countEntity.value} table: ${tupleCount}`;
    } else {
        alert("Error in count universe!");
    }
}

/* PLANETARY SYSTEM */
async function fetchAndDisplayPlanetarySystem() {
    const tableElement = document.getElementById('planetarySystem');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/planetary-system', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

document.addEventListener("DOMContentLoaded", async function() {
    //choose planetarySystem
    event.preventDefault();

    const planetarySystemForm = document.getElementById('updatePlanetarySystemSelectForm');
    const updateForm = document.getElementById('updatePlanetarySystemForm');

    const firstSection = document.getElementById('updatePlanetarySystemSelect');
    const secondSection = document.getElementById('updatePlanetarySystem');

    const confirmSelection = document.getElementById('confirmSelection');
    const backToSelection = document.getElementById('backToSelection');


    //hide second part first
    secondSection.style.display = 'none';

    //lunar name
    const response = await fetch('/get-planetary-system-names', {
        method: 'GET'
    });

    const hostNameDropdown = document.getElementById('selectHostName');
    const responseData = await response.json();
    const names = responseData.data;

    names.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        hostNameDropdown.appendChild(option);
    });
    
    //host name
    const hostResponse = await fetch('/get-galaxy-hosts', {
        method: 'GET'
    });

    const selectHostDropdown = document.getElementById('insertGalaxyHost');
    const hostResponseData = await hostResponse.json();
    const hosts = hostResponseData.data;

    
    hosts.forEach(host => {
        const soption = document.createElement("option");
        soption.value = host;
        soption.textContent = host;
        selectHostDropdown.appendChild(soption);
    });

    fetchAndDisplayPlanetarySystem();

    const selectMsgElement = document.getElementById('selectResultMsg');
    
    confirmSelection.addEventListener('click', async function() {
        if (!hostNameDropdown.value) {
            alert("Please select a host name");
        }
            const planetarySystemDataResponse = await fetch(`/get-planetary-system-data/${hostNameDropdown.value}`, {
                method: 'GET'
            });
            const planetarySystemData = await planetarySystemDataResponse.json();

            if (planetarySystemData.success) {
                const planetarySystem = planetarySystemData.data;
                document.getElementById('insertNumStars').value = planetarySystem.numStars;
                document.getElementById('insertNumPlanets').value = planetarySystem.numPlanets;
                document.getElementById('insertRadius').value = planetarySystem.radius;
                document.getElementById('insertGalaxyHost').value = planetarySystem.galaxyHost;
                document.getElementById('planetarySystemInfo').textContent = `Planetary System: ${planetarySystem.hostName}`;

                //ye
                firstSection.style.display = 'none';
                secondSection.style.display = 'block';

            } else {
                alert("Error selecting planetary system");
            }
        
    });

    backToSelection.addEventListener('click', function() {
        secondSection.style.display = 'none';
        firstSection.style.display = 'block';
        document.getElementById('updateResultMsg').textContent = "";
    });

    updateForm.addEventListener('submit', updatePlanetarySystem);
});

async function updatePlanetarySystem(event) {
    event.preventDefault();

    const oldHostName = document.getElementById('selectHostName').value;
    const numStarsValue = document.getElementById('insertNumStars').value;
    const numPlanetsValue = document.getElementById('insertNumPlanets').value;
    const radiusValue = document.getElementById('insertRadius').value;
    const galaxyHostValue = document.getElementById('insertGalaxyHost').value;

    const response = await fetch('/update-planetary-system', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            hostName: oldHostName,
            numStars: numStarsValue,
            numPlanets: numPlanetsValue,
            radius: radiusValue,
            galaxyHost: galaxyHostValue,
        })
    });

    const responseData = await response.json();

    const messageElement = document.getElementById('updateResultMsg');
    if (responseData.success) {
        messageElement.textContent = `Planetary system ${oldHostName} updated successfully!`;
        const secondSection = document.getElementById('updatePlanetarySystem');
        secondSection.style.display = 'none';
        fetchAndDisplayPlanetarySystem(); 

        //reset
        document.getElementById('selectHostName').value = "";
        const firstSection = document.getElementById('updatePlanetarySystemSelect');
        secondSection.style.display = 'none';
        firstSection.style.display = 'block';
        alert("Updated successfully!");
    } else {
        messageElement.textContent = 'Error updating PlanetarySystem!';
        alert("Please check that # of stars, # of planets, and radius are non-negative")
    }
    
}


/* STAR */
document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch('/star', {
        method: 'GET'
    });

    const deleteStarDropDown = document.getElementById('deleteStarDropDown');
    const responseData = await response.json();
    const starData = responseData.data;

    deleteStarDropDown.innerHTML = '<option value="">Delete a Star</option>';

    starData.forEach(star => {
        const option = document.createElement("option");
        option.value = star[0]; 
        option.textContent = star[0];
        deleteStarDropDown.appendChild(option);
    });
});


async function fetchAndDisplayStars() {
    const tableElement = document.getElementById('star');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/star', {
        method: 'GET'
    });

    const responseData = await response.json();
    const starTableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    starTableContent.forEach(star => {
      
        const row = tableBody.insertRow();
        star.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function deleteStar(event) {
    event.preventDefault();

    const solarName = document.getElementById('deleteStarDropDown').value;

    if (!solarName) {
        alert('Please select a star to delete');
        return;
    }

    const response = await fetch('/delete-star', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ solarName: solarName })
    });

    const responseData = await response.json();

    const messageElement = document.getElementById('deleteResultMsg');
    if (responseData.success) {
        messageElement.textContent = `Star ${solarName} deleted successfully!`;
        fetchTableData(); // Refresh the table data
        alert("Deleted successfully!");
    } else {
        messageElement.textContent = 'Error deleting star!';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const deleteStarForm = document.getElementById('deleteStar');
    if (deleteStarForm) {
        deleteStarForm.addEventListener('submit', deleteStar);
    }
});

/* BIOME (selection) */
async function fetchAndDisplayBiome() {
    const tableElement = document.getElementById('biome');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/biome', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

document.addEventListener("DOMContentLoaded", async function() {
    //choose biome
    const biomeForm = document.getElementById('selectBiomeForm');
    const searchCriteriaContainer = document.getElementById('searchCriteriaContainer');

    //buttons
    const addCriteriaButton = document.getElementById('addCriteriaButton');
    const goButton = document.getElementById('goButton');

    const firstSection = document.getElementById('biome');
    const secondSection = document.getElementById('biomeResults');

    const biomeAttribute = document.getElementById('biomeAttribute');
    const biomeOperator = document.getElementById('biomeOperator'); 

    //hide second part first
    secondSection.style.display = 'none';

    fetchAndDisplayBiome();

    addCriteriaButton.addEventListener('click', function() {
        addSelectRow();
    });

    goButton.addEventListener('click', function() {
        // firstSection.style.display = 'none';
        // secondSection.style.display = 'block';
        selectBiomes();
    });

    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('remove-criteria-btn')) {
            const numRows = searchCriteriaContainer.querySelectorAll('.search-criteria-row');
            if (numRows.length > 1) {
                e.target.closest('.search-criteria-row').remove();
            } else {
                alert("Unable to remove, you only have 1 row");
            }
        }
    });

    document.addEventListener('change', function(e) {
        if (e.target && e.target.classList.contains('attribute-select')) {
            const attribute = e.target.value;
            const operatorSelect = e.target.closest('.search-criteria-row').querySelector('.operator-select');
            
            updateOp(attribute, operatorSelect);
        }
    });

    updateOp(biomeAttribute.value, biomeOperator);
});

function updateOp(attribute, biomeOperator) {
    biomeOperator.innerHTML = '';

    const opList = [
        { value: '=', text: '=' },
        { value: '<', text: '<' },
        { value: '>', text: '>' },
        { value: '<=', text: '<=' },
        { value: '>=', text: '>=' },
        { value: 'LIKE', text: 'LIKE (string only)' }
    ];
    
    //we have to do it like this bc like only can have strings
    if (attribute === 'AverageTemperature') {
        opList.forEach(op => {
            if (op.value !== 'LIKE') {
                const option = document.createElement('option');
                option.value = op.value;
                option.textContent = op.text;
                biomeOperator.appendChild(option);
            }
        });
    } else {
        opList.forEach(op => {
            const option = document.createElement('option');
            option.value = op.value;
            option.textContent = op.text;
            biomeOperator.appendChild(option);
        });
    }
}

function addSelectRow() {
    const criteriaContainer = document.getElementById('searchCriteriaContainer');
    const newRow = document.createElement('div');
    newRow.className = 'search-criteria-row';

    const logicOperators = document.createElement('select');
    logicOperators.className = 'logic-operator-select dropDown';
    logicOperators.required = true;
    logicOperators.innerHTML = `
                                        <option value="AND">AND</option>
                                        <option value="OR">OR</option>
    `;

    const attributeSelect = document.createElement('select');
    attributeSelect.className = 'attribute-select dropDown';
    attributeSelect.required = true;
    attributeSelect.innerHTML = `
        <option value="BiomeType">Biome Type</option>
        <option value="FoliageDensity">Foliage Density</option>
        <option value="AverageTemperature">Average Temperature (Degrees C)</option>
    `;

    const operatorSelect = document.createElement('select');
    operatorSelect.className = 'operator-select dropDown';
    operatorSelect.required = true;
    operatorSelect.innerHTML = `
        <option value="=">=</option>
        <option value="<"><</option>
        <option value=">">></option>
        <option value="<="><=</option>
        <option value=">=">>=</option>
        <option value="LIKE">LIKE (string only)</option>
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'search-value';
    input.placeholder = 'Enter value';

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-criteria-btn';
    removeButton.textContent = 'Remove';
    
    newRow.appendChild(logicOperators);
    newRow.appendChild(attributeSelect);
    newRow.appendChild(operatorSelect);
    newRow.appendChild(input);
    newRow.appendChild(removeButton);
    
    criteriaContainer.appendChild(newRow);

    updateOp(attributeSelect.value, operatorSelect);
}

async function selectBiomes() {
    const firstSection = document.getElementById('biome');
    const secondSection = document.getElementById('biomeResults');

    const searchCriteriaContainer = document.getElementById('searchCriteriaContainer');
    const criteriaRows = searchCriteriaContainer.querySelectorAll('.search-criteria-row');
    // const logicOperators = criteriaRows.length > 0 ? 
    // criteriaRows[0].querySelector('.logicOperator').value : 'AND'; //just chose and as default value if u only have one
    // console.log(logicOperators);
    let logicOperators;

    const totalCriteria = [];

    let flag = false;

    criteriaRows.forEach(row => {
        const logicOperatorsTemp = row.querySelector('.logic-operator-select') ? 
        row.querySelector('.logic-operator-select').value : 
        'AND';

        const attribute = row.querySelector('.attribute-select') ? 
                         row.querySelector('.attribute-select').value : 
                         row.querySelector('#biomeAttribute').value;
        
        const operator = row.querySelector('.operator-select') ? 
                        row.querySelector('.operator-select').value : 
                        row.querySelector('#biomeOperator').value;
        const value = row.querySelector('.search-value').value;

        if (!attribute || !operator || !value) {
            alert("Please fill in all fields before confirming.");
            flag = true;
            return;
        }
        
        if (attribute && operator && value) {
            totalCriteria.push({
                attribute,
                operator,
                value
            });
        }

        if (logicOperatorsTemp) {
            logicOperators = logicOperatorsTemp;
        }
    });

    if (flag) {
        return;
    }
    
    if (totalCriteria.length === 0 ) {
        alert("Error selecting! Please check result message.");
        document.getElementById('selectResultMsg').textContent = "your search criteria is invalid";
        return;
    }

    const response = await fetch('/search-biomes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            criteria: totalCriteria,
            operator: logicOperators
        })
    });
        
    const responseData = await response.json();
        
    if (responseData.success) {
        firstSection.style.display = 'none';
        secondSection.style.display = 'block';
        showRows(responseData.data);
        alert("Successully selected!");
        //document.getElementById('selectResultMsg').textContent = `Success`;
    } else {
        //todo error handling!
        //im pretty sure this should be impossible i hope
        alert("Invalid selection!");
        //document.getElementById('selectResultMsg').textContent = `errior occured`;
    }
    
}

function showRows(biomes) {
    const tableBody = document.querySelector('#biomeResults tbody');
    tableBody.innerHTML = '';
    
    if (biomes.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell();
        cell.textContent = 'No biomes found!';
        return;
    }
    
    biomes.forEach(biome => {
        const row = tableBody.insertRow();
        const biomeTypeRow = row.insertCell();
        biomeTypeRow.textContent = biome.biomeType;
        const foliageDensityRow = row.insertCell();
        foliageDensityRow.textContent = biome.foliageDensity;
        const averageTemperatureRow = row.insertCell();
        averageTemperatureRow.textContent = biome.averageTemperature;
    });
}


async function fetchProjectionKingdom(event) {
    event.preventDefault(); 

    const selectedColumns = [];
    if (document.getElementById("chkTaxonomy").checked) selectedColumns.push("TAXONOMY");
    if (document.getElementById("chkGenus").checked) selectedColumns.push("COLLOQUIALGENUS");
    if (document.getElementById("chkTrophic").checked) selectedColumns.push("TROPHICLEVEL");
    if (document.getElementById("chkCount").checked) selectedColumns.push("SPECIESCOUNT");
    if (document.getElementById("chkReproduction").checked) selectedColumns.push("REPRODUCTIONTYPE");
    if (document.getElementById("chkLifespan").checked) selectedColumns.push("LIFESPAN");

    console.log(selectedColumns); 
    if (selectedColumns.length === 0) {
        alert('Choose at least one field!');
        document.getElementById("projectionResultMsg").textContent = "Choose at least one field!";
        return;  
    }

    const response = await fetch('/project-kingdom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ columns: selectedColumns })
    });
    
    const responseData = await response.json();
    const tableContent = responseData.data;

    const tableElement = document.getElementById("kingdomProjection");
    const tableHead = tableElement.querySelector("thead tr");
    const tableBody = tableElement.querySelector("tbody");

    tableHead.innerHTML = "";
    tableBody.innerHTML = "";

    selectedColumns.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col.replace("_", " ");
        tableHead.appendChild(th);
    });

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
    const projectionForm = document.getElementById("projectionKingdom");
    if (projectionForm) {
        projectionForm.addEventListener("submit", fetchProjectionKingdom);
    }
});



document.addEventListener("DOMContentLoaded", async function(){
    const response = await fetch('/get-hostName',{
        method: 'GET'
    });

    const dropDownSystemHost = document.getElementById('insertCelestialBodyNames');
    const responseData = await response.json();
    const data = responseData.data;


    data.forEach( item => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      dropDownSystemHost.appendChild(option);
    }

    );


} )


///////////////////////////////////

async function joinCelestial(event) {
    event.preventDefault();

    const hostName = document.getElementById('insertCelestialBodyNames').value;

    if (!hostName) {
        alert('Please select a star to delete');
        return;
    }
    console.log(hostName);

    const response = await fetch('/join-celestial', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hostName: hostName })
    });

    const responseData = await response.json();
    const joinTableContent = responseData.data;

    const tableElement = document.getElementById('joinCelestialBody');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    joinTableContent.forEach(item => {
        const row = tableBody.insertRow();
        item.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });

    const messageElement = document.getElementById('joinResultMsg');
    if (responseData.success) {
        messageElement.textContent = `Joined tables successfully!`;
        fetchTableData(); // Refresh the table data
    } else {
        messageElement.textContent = 'Error';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const joinForm = document.getElementById('joinCelestial');
    if (joinForm) {
        joinForm.addEventListener('submit', joinCelestial);
    }
});

// Resets ALL tables
async function resetTables() {
    const response = await fetch("/reset-tables", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "Tables reset successfully!";
        alert("All tables successfully dropped and recreated!");
        fetchTableData();
    } else {
        alert("Error dropping or initializing tables!");
    }

    insertionMsg(response)
}

async function insertion() {

    alert('Values are being inserted! Please wait as this will take a while.  Another alert will posted when it is complete!  Press OK to proceed with insertion.');

    const response = await fetch("/insertion", {
        method: 'POST'
    }); 

    const responseData = await response.json();
    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "All values inserted!";
        alert("All values inserted! Yahoo!");
        fetchTableData();
    } else {
        alert("Error inserting!");
    }
    fetchTableData();
    insertionMsg(response)
}


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();

    document.getElementById("resetTables").addEventListener("click", resetTables);
    document.getElementById("insertion").addEventListener("click", insertion);


    document.getElementById("insertUniverse").addEventListener("submit", insertUniverse);
    document.getElementById("insertGalaxy").addEventListener("submit", insertGalaxy);
    document.getElementById("count").addEventListener("submit", countUniverse);
    document.getElementById("divide").addEventListener("click", dividePlanetarySystem);
    
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUniverse();
    fetchAndDisplayGalaxy();
    fetchAndDisplayStars();
    fetchAndDisplayMoons();
    fetchAndDisplayPlanetarySystem();
    //getAvgAlleles();
    //fetchAndDisplayBiome();
}
