const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

/* Universe */

router.get('/universe', async (req, res) => {
    const tableContent = await appService.fetchUniverseFromDb();
    res.json({data: tableContent});
});

router.post("/project-kingdom", async (req, res) => {
    const { columns } = req.body;
    const projectionResult = await appService.fetchKingdomProjectionFromDb(columns);
    res.json({ data: projectionResult });
});




router.post("/initiate-universe", async (req, res) => {
    const initiateResult = await appService.initiateUniverse();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});


router.post("/insert-universe", async (req, res) => {
    const { name, age, rate } = req.body;
    const insertResult = await appService.insertUniverse(name, age, rate);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get("/get-universe", async (req, res) => {
    const tableContent = await appService.fetchUniverseNameFromDb();
    res.json({data: tableContent});
});

/* Astronomical Object */
router.post("/initiate-astronomical", async (req, res) => {
    const initiateResult = await appService.initiateAstronomical();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});


router.post("/insert-astronomical", async (req, res) => {
    const { name, distance, universe } = req.body;
    const insertResult = await appService.insertAstronomical(name, distance, universe);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

/* Galaxy */
router.get('/galaxy', async (req, res) => {
    const tableContent = await appService.fetchGalaxyFromDb();
    res.json({data: tableContent});
});


router.post("/initiate-galaxy", async (req, res) => {
    const initiateResult = await appService.initiateGalaxy();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});


router.post("/insert-galaxy", async (req, res) => {
    const { name, constellation, type, radius, count, object } = req.body;
    const insertResult = await appService.insertGalaxy(name, constellation, type, radius, count, object);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

/* division */

router.get("/dividePlanetarySystem", async(req, res) => {
    const tableContent = await appService.division();
    res.json({data: tableContent});
})

/* Biome / Kingdom */

router.search('/species', async (req, res) => {
    //alert('WHAT');

    const { biome } = req.body;
    const tableContent = await appService.fetchSpeciesFromDb(biome);
    res.json({data: tableContent});
});

router.get("/get-biomes", async (req, res) => {
    const tableContent = await appService.fetchBiomeNameFromDb();
    res.json({data: tableContent});
});

router.search('/get-alleles', async (req, res) => {
    const { biome } = req.body;
    const avgAlleles = await appService.getAvgAlleles(biome);
    res.json({ data: avgAlleles });

});

/* MOON */
router.search('/moonHaving', async (req, res) => {
    //alert('WHAT');

    const { number } = req.body;
    const tableContent = await appService.fetchMoonFromDb(number);
    res.json({data: tableContent});
});

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post('/count-universe', async (req, res) => {
    const { tableName } = req.body;

    const tableCount = await appService.countUniverse(tableName);
    if (tableCount >= 0) {
        res.json({ 
            success: true,  
            count: tableCount
        });
    } else {
        res.status(500).json({ 
            success: false, 
            count: tableCount
        });
    }
});


router.get('/star', async (req, res) => {
    const tableContent = await appService.fetchStarsFromDb();
    res.json({ data: tableContent });
});


router.delete('/delete-star', async (req, res) => {
    const { solarName } = req.body;
    const deleteResult = await appService.deleteStar(solarName);
    
    if (deleteResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/planetary-system', async (req, res) => {
    const tableContent = await appService.fetchPlanetarySystemsFromDb();
    res.json({ data: tableContent });
});

router.get('/get-planetary-system-names', async (req, res) => {
    const planetarySystemNames = await appService.getPlanetarySystemNames();
    res.json({ data: planetarySystemNames });
});

router.get('/get-planetary-system-data/:name', async (req, res) => {
    const planetarySystemName = req.params.name;
    const planetarySystemData = await appService.getPlanetarySystemData(planetarySystemName);
    
    if (planetarySystemData) {
        res.json({ success: true, data: planetarySystemData });
    } else {
        res.status(404).json({ success: false, message: 'planetarySystem not found' });
    }
});

router.post('/update-planetary-system', async (req, res) => {
    const { hostName, numStars, numPlanets, radius, galaxyHost } = req.body;
    const updateResult = await appService.updatePlanetarySystem(hostName, numStars, numPlanets, radius, galaxyHost);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/get-galaxy-hosts', async (req, res) => {
    const hosts = await appService.getGalaxyHosts();
    res.json({ data: hosts });
});

router.get("/get-hostName", async (req, res) => {
    const tableContent = await appService.fetchHostNameFromDb();
    res.json({data: tableContent});
});

router.get('/biome', async (req, res) => {
    const tableContent = await appService.fetchBiomeAllFromDb();
    res.json({ data: tableContent });
});

router.post('/search-biomes', async (req, res) => {
    const { criteria, operator } = req.body;
        
    if (!criteria || criteria.length === 0) {
        return res.status(400).json({ 
            success: false, 
            message: 'afhjlkhequwfeoiwfhe'
        });
    }
    
    const biomes = await appService.selectBiomes(criteria, operator);
    if (biomes) {
        res.json({ 
            success: true,
            data: biomes 
        });
    } else {
        res.json({ success: false }); //TODO CHANGE THIS
    }
});

router.post('/join-celestial', async (req, res) => {
    const {hostName} = req.body;
    const tableContent = await appService.fetchJoinCelestialDb(hostName);
    res.json({ success: tableContent.length > 0, data: tableContent });
});

router.post("/reset-tables", async (req, res) => {
    const initiateResult = await appService.executeTableCreateSqlFile();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insertion", async (req, res) => {
    const initiateResult = await appService.executeInsertionSqlFile();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

module.exports = router;