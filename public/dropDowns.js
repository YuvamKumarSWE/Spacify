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



