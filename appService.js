const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return  await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

/* Fetch Statements */



/* Universe */

async function fetchUniverseFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM UNIVERSE');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiateUniverse() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE UNIVERSE`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE UNIVERSE (
                UniversalName VARCHAR(50),
                Age REAL,
                ExpansionaryRate REAL,
                PRIMARY KEY (UniversalName)
            )
        `);
        return true;
    }).catch(() => {
        console.log('DIED');

        return false;
    });
}

async function insertUniverse(name, age, rate) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO UNIVERSE (UniversalName, Age, ExpansionaryRate) VALUES (:name, :age, :rate)`,
            [name, age, rate],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function fetchUniverseNameFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT UniversalName FROM UNIVERSE');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

/* Astronomical Object */

async function initiateAstronomical() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE GALAXY`);
        } catch(err) {
            console.log('Galaxy table not empty');
        }

        try {
            await connection.execute(`DROP TABLE AstronomicalObject`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE AstronomicalObject (
                AstronomicalName VARCHAR(50),
                DistanceFromEarth REAL,
                Universe VARCHAR(50) NOT NULL,
                PRIMARY KEY (AstronomicalName),
                FOREIGN KEY (Universe) REFERENCES Universe(UniversalName) ON DELETE CASCADE
            )
        `);
        return true;
    }).catch(() => {
        console.log('DIED');

        return false;
    });
}

async function insertAstronomical(name, distance, universe) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO AstronomicalObject  (AstronomicalName, DistanceFromEarth, Universe) VALUES (:name, :distance, :universe)`,
            [name, distance, universe],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

/* Galaxy */

async function fetchGalaxyFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT Galaxy.GalacticName, astronomicalobject.universe, galaxy.constellation, galaxy.variationtype, galaxy.radius, galaxy.starcount, galaxy.centralobject, astronomicalobject.distancefromearth FROM Galaxy JOIN AstronomicalObject ON Galaxy.GalacticName = AstronomicalObject.AstronomicalName');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiateGalaxy() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE GALAXY`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE GALAXY (
                GalacticName VARCHAR(50),
                Constellation VARCHAR(50),
                VariationType VARCHAR(50),
                Radius REAL,
                StarCount VARCHAR(50),
                CentralObject VARCHAR(50),
                PRIMARY KEY (GalacticName),
                FOREIGN KEY (GalacticName) REFERENCES AstronomicalObject(AstronomicalName) ON DELETE CASCADE
            )
        `);
        return true;
    }).catch(() => {
        console.log('DIED');

        return false;
    });
}

async function insertGalaxy(name, constellation, type, radius, count, object) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO GALAXY (GalacticName, Constellation, VariationType, Radius, StarCount, CentralObject) VALUES (:name, :constellation, :type, :radius, :count, :object)`,
            [name, constellation, type, radius, count, object],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

/* Insertion Statements */












async function updateNameDemotable(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE ZUBAT SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function countUniverse() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM UNIVERSE');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}



async function fetchStarsFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Star');
        return result.rows;
    }).catch(() => {
        return [];
    });
}



async function deleteStar(solarName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM Star WHERE SolarName = :solarName`,
            { solarName: solarName }, 
            { autoCommit: true }
        );

        return result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}


module.exports = {
    testOracleConnection,
    fetchUniverseFromDb,
    initiateUniverse,
    insertUniverse, 
    initiateAstronomical,
    insertAstronomical,
    fetchUniverseNameFromDb,
    fetchGalaxyFromDb,
    initiateGalaxy, 
    insertGalaxy,
    updateNameDemotable, 
    countUniverse,
    fetchStarsFromDb,
    deleteStar
};