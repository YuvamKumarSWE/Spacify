//HEY GUYS THIS IS THE DROP DOWN STUFF

document.addEventListener('DOMContentLoaded', function() {
    const tableSelector = document.getElementById('insertDropDown');
    const universeSelect = document.getElementById('universeInsertOption');        
    const galaxySelect = document.getElementById('galaxyInsertOption');
        
        tableSelector.addEventListener('change', function() {
           
            universeSelect.classList.remove('active');
            galaxySelect.classList.remove('active');
            
          
            const selectedOption = tableSelector.value;

            switch (selectedOption) {
                case 'universe':
                    universeSelect.classList.add('active');
                    break;
                case 'galaxy':
                    galaxySelect.classList.add('active');
                    break;
                
            }

        });
});

document.addEventListener('DOMContentLoaded', function() {
    const tableSelector = document.getElementById('deleteDropDown');
    
    const starSelect = document.getElementById('starDeleteOption');        
        
        tableSelector.addEventListener('change', function() {
           
            starSelect.classList.remove('active');
            
          
            const selectedOption = tableSelector.value;

            switch (selectedOption) {
                case 'star':
                    starSelect.classList.add('active');
                    break;
                
                
            }

        });
         
});

document.addEventListener('DOMContentLoaded', function() {
    const tableSelector = document.getElementById('updateDropDown');
    
    const planetarySystemSelect = document.getElementById('updatePlanetarySystemSelect');        
        
        tableSelector.addEventListener('change', function() {
           
            planetarySystemSelect.classList.remove('active');
            
          
            const selectedOption = tableSelector.value;

            switch (selectedOption) {
                case 'planetarySystem':
                    planetarySystemSelect.classList.add('active');
                    document.getElementById('updatePlanetarySystem').style.display = 'none';
                    document.getElementById('updatePlanetarySystemSelect').style.display = 'block';
                    break;
                
            }

        });
         
});

document.addEventListener('DOMContentLoaded', function() {
    const tableSelector = document.getElementById('selectDropDown');
    
    const biomeSelect = document.getElementById('selectBiome');        
        
        tableSelector.addEventListener('change', function() {
           
            biomeSelect.classList.remove('active');
            
          
            const selectedOption = tableSelector.value;

            switch (selectedOption) {
                case 'biome':
                    biomeSelect.classList.add('active');
                    break;
                
            }

        });
         
});



document.addEventListener('DOMContentLoaded', function() {
    const tableSelector = document.getElementById('readDropDown');
    /*
    const universeSelect = document.getElementById('universeInsertOption');        
    const galaxySelect = document.getElementById('galaxyInsertOption');
        
        tableSelector.addEventListener('change', function() {
           
            universeSelect.classList.remove('active');
            galaxySelect.classList.remove('active');
            
          
            const selectedOption = tableSelector.value;

            switch (selectedOption) {
                case 'universe':
                    universeSelect.classList.add('active');
                    break;
                case 'galaxy':
                    galaxySelect.classList.add('active');
                    break;
                
            }

        });
         */
});



