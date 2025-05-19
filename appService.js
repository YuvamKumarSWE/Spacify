const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');
const fs = require('fs');
const NodeCache = require('node-cache');
const dbCache = new NodeCache({ stdTTL: 3600 });


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
        await withOracleDB(async (connection) => {
            await connection.execute(`CREATE INDEX IF NOT EXISTS idx_universe_name ON UNIVERSE(UniversalName)`);
            await connection.execute(`CREATE INDEX IF NOT EXISTS idx_galaxy_name ON GALAXY(GalacticName)`);
            await connection.execute(`CREATE INDEX IF NOT EXISTS idx_galaxy_constellation ON GALAXY(Constellation)`);
        });
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

/* This function will drop and recreate the ENTIRE DB */
async function executeTableCreateSqlFile() {
    return await withOracleDB(async (connection) => {
        try {

            const filePath ='./sqlFiles/tableCreate.sql';
            const sqlQuery = fs.readFileSync(filePath, 'utf8');
            const sqlStatements = sqlQuery.split(';').map(statement =>statement.trim()).filter(Boolean);
        
            for (const statement of sqlStatements) {
                console.log(`Executing: ${statement}`);
                await connection.execute(statement);
            }
        
        } catch(err) {
            console.log('Something exploded');
        }

        return true;
    }).catch(() => {
        console.log('DIED');

        return false;
    });
}

/* This function will run ALL insertion statements for ALL tables */
async function executeInsertionSqlFile() {
    return await withOracleDB(async (connection) => {
        
            fails = 0;
            const filePath2 ='./sqlFiles/insertion.sql';
            const sqlQuery2 = fs.readFileSync(filePath2, 'utf8');
            const sqlStatements2 = sqlQuery2.split(';').map(statement2 =>statement2.trim()).filter(Boolean);
        
            for (const statement2 of sqlStatements2) {
                try {
                    console.log(`Executing: ${statement2}`);
                    await connection.execute(statement2);
                    await connection.commit();
                } catch(err) {
                    console.log(`Failed to insert: ${statement2}`);
                    fails++;
                }

            }
        return true;
    }).catch(() => {
        console.log('DIED');

        return false;
    });
}


/* To facilitate Insertion */
async function fetchUniverseFromDb() {
    const cacheKey = 'all_universe';
    const cached = dbCache.get(cacheKey);
    if (cached) return cached;
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM UNIVERSE ORDER BY UniversalName');
        dbCache.set(cacheKey, result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function insertUniverse(name, age, rate) {
    dbCache.del('all_universe');
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

async function fetchGalaxyFromDb() {
    const cacheKey = 'all_galaxies';
    const cached = dbCache.get(cacheKey);
    if (cached) return cached;
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT Galaxy.GalacticName, 
            astronomicalobject.universe, 
            galaxy.constellation, 
            galaxy.variationtype, 
            galaxy.radius, 
            galaxy.starcount, 
            galaxy.centralobject, 
            astronomicalobject.distancefromearth 
            FROM Galaxy JOIN AstronomicalObject ON Galaxy.GalacticName = AstronomicalObject.AstronomicalName
            ORDER BY Galaxy.GalacticName`);
        dbCache.set(cacheKey, result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchUniverseNameFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT UniversalName FROM UNIVERSE ORDER BY UniversalName');
        return result.rows;
    }).catch(() => {
        return [];
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

async function insertGalaxy(name, constellation, type, radius, count, object) {
    dbCache.del('all_galaxies');
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

/* To facilitate Division */
async function division() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT * FROM PlanetarySystem ps 
                WHERE NOT EXISTS (SELECT * FROM Exoplanet p 
                    WHERE p.SolarHost = ps.HostName
                    AND NOT EXISTS (SELECT * FROM Ecosystem e
                        WHERE e.Planet = p.PlanetaryName  
                        AND NOT EXISTS (SELECT * FROM Moon m WHERE m.Host = p.PlanetaryName)))
            ORDER BY ps.HostName`
    );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

/* To facilitate Aggregation & Group By */
async function countUniverse(tableName) {
    const sqlQuery = `SELECT Count(*) FROM ${tableName}`
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(sqlQuery);
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}


/* To facilitate Deleting */
async function fetchStarsFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Star ORDER BY SolarName');
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


// async function fetchMoonsFromDb() {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute('SELECT * FROM Moon ORDER BY LunarName');
//         return result.rows;
//     }).catch(() => {
//         return [];
//     });
// }

// async function getMoonNames() {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute('SELECT LunarName FROM Moon ORDER BY LunarName');
//         return result.rows.map(row => row[0]);
//     }).catch(() => {
//         return [];
//     });
// }

/* To facilitate Updating */
async function fetchPlanetarySystemsFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM PlanetarySystem ORDER BY HostName');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getPlanetarySystemNames() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT HostName FROM PlanetarySystem ORDER BY HostName');
        return result.rows.map(row => row[0]);
    }).catch(() => {
        return [];
    });
}

async function getHosts() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT DISTINCT PlanetaryName FROM ExoPlanet ORDER BY PlanetaryName');
        return result.rows.map(row => row[0]);
    }).catch(() => {
        return [];
    });
}

async function getGalaxyHosts() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT DISTINCT GalacticName FROM Galaxy ORDER BY GalacticName');
        return result.rows.map(row => row[0]);
    }).catch(() => {
        return [];
    });
}

async function getPlanetarySystemData(planetarySystemName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * FROM PlanetarySystem WHERE HostName = :name ORDER BY HostName',
            { name: planetarySystemName }
        );
        
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return {
                hostName: row[0],
                numStars: row[1],
                numPlanets: row[2],
                radius: row[3],
                galaxyHost: row[4],
            };
        } else {
            return null;
        }
    }).catch(() => {
        return null;
    });
}

async function updatePlanetarySystem(hostName, numStars, numPlanets, radius, galaxyHost) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE PlanetarySystem SET NumberOfStars = :numStars, NumberOfPlanets = :numPlanets, Radius = :radius, 
            GalaxyHost = :galaxyHost
            WHERE HostName = :hostName`,
            { 
                hostName: hostName,
                numStars: numStars,
                numPlanets: numPlanets,
                radius: radius,
                galaxyHost: galaxyHost
            }, 
            { autoCommit: true }
        );

        return result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}


/* To facilitate Selection */
async function fetchBiomeAllFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM BIOME ORDER BY BiomeType');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function selectBiomes(criteria, operator) {
    return await withOracleDB(async (connection) => {
        let where = '';
        const joiners = {};

        if (criteria.length >= 1) {
            const conditions = criteria.map((criterion, index) => {
                const { attribute, operator, value } = criterion;
                const currParam = `param${index}`;
                
                if (operator === 'LIKE') {
                    joiners[currParam] = `%${value}%`;
                    return `${attribute} LIKE :${currParam}`;
                } else {
                    joiners[currParam] = value;
                    return `${attribute} ${operator} :${currParam}`;
                }
            });
            
            where = `${conditions.join(` ${operator} `)}`;
        }

        const result = await connection.execute(`SELECT * FROM Biome WHERE ${where} ORDER BY BiomeType`, joiners, { outFormat: connection.OUT_FORMAT_OBJECT } );

        return result.rows.map(row => ({            
            biomeType: row[0],
            foliageDensity: row[1],
            averageTemperature: row[2],
        }));
    }).catch(() => {
        return [];
    });
}

/* To facilitate Nested Aggregation with Group By */
async function fetchBiomeNameFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT BiomeType FROM BIOME ORDER BY BiomeType');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchSpeciesFromDb(biome) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT Taxonomy, 
            COUNT(DISTINCT Planet) AS UniquePlanets, 
            MIN(Alleles) AS MinAlleles,
            ROUND(AVG(Alleles),0) AS AvgAlleles,
            MAX(Alleles) AS MaxALleles
            FROM HAS_KINGDOM K 
            GROUP BY Taxonomy 
            HAVING AVG(Alleles) > (SELECT AVG(Alleles) FROM HAS_KINGDOM K2 WHERE K2.Biome = :biome)
            ORDER BY Taxonomy`,
            { biome: biome },
            { autoCommit: true }
        );

        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getAvgAlleles(biome) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT AVG(Alleles) FROM HAS_KINGDOM WHERE Biome = :biome',
            { biome: biome },
            { autoCommit: true }
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

/* To facilitate Aggregation with Having */
async function fetchMoonFromDb(moon) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT E.PlanetaryName, COUNT(M.LunarName) AS LunarCount
            FROM Exoplanet E, MOON M
            WHERE M.Host = E.PlanetaryName
            Group by E.PlanetaryName
            HAVING COUNT(M.LunarName) >= :moon
            ORDER BY E.PlanetaryName`,
            { moon: moon }, 
            { autoCommit: true }
        );

        return result.rows;
    }).catch(() => {
        return [];
    });
}

/* To facilitate Projection */
async function fetchKingdomProjectionFromDb(columns) {
    return await withOracleDB(async (connection) => {
        const selectedColumns = columns.join(', ');
        const query = `SELECT ${selectedColumns} FROM KINGDOM ORDER BY Taxonomy`;
        
        const result = await connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_ARRAY });
        return result.rows;
    }).catch((err) => {
        console.error('Error in projectKingdom:', err);
        return [];
    });
}

/* To facilitate Join */
async function fetchHostNameFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT HostName FROM PlanetarySystem ORDER BY HostName');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchJoinCelestialDb(hostName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT CB.* 
            FROM CelestialBody CB, PlanetarySystem PS 
            WHERE CB.SystemHost = PS.HostName 
            AND CB.SystemHost = :hostName`,
            [hostName],
            { autoCommit: true }

        );
        
        return result.rows;
    }).catch((err) => {
        console.error('Error in projectUniverse:', err);
        return [];
    });
}


module.exports = {
    testOracleConnection,
    fetchUniverseFromDb,
    insertUniverse, 
    insertAstronomical,
    fetchUniverseNameFromDb,
    fetchGalaxyFromDb,
    insertGalaxy,
    countUniverse,
    fetchStarsFromDb,
    deleteStar,
    //fetchMoonsFromDb,
    //getMoonNames,
    fetchPlanetarySystemsFromDb,
    getPlanetarySystemNames,
    getHosts,
    getPlanetarySystemData,
    updatePlanetarySystem,
    fetchBiomeNameFromDb,
    fetchBiomeAllFromDb,
    selectBiomes,
    fetchSpeciesFromDb,
    fetchKingdomProjectionFromDb,
    fetchHostNameFromDb,
    fetchJoinCelestialDb,
    fetchMoonFromDb,
    executeTableCreateSqlFile,
    executeInsertionSqlFile,
    division,
    getGalaxyHosts,
    getAvgAlleles
};