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

/* */

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/count-universe', async (req, res) => {
    const tableCount = await appService.countUniverse();
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


module.exports = router;