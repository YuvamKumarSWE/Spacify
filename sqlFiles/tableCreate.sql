
/* on initial setup we drop the existing tables to ensure consistency */

drop table Has_Kingdom;
drop table Kingdom;
drop table Ecosystem;
drop table Biome;
drop table Moon;
drop table Exoplanet;
drop table Star;
drop table CelestialBody;
drop table Quasar;
drop table PlanetarySystem;
drop table Galaxy;
drop table AstronomicalObject;
drop table Universe;


CREATE TABLE Universe (
    UniversalName VARCHAR(50),
    Age REAL,
    ExpansionaryRate REAL,
    PRIMARY KEY (UniversalName)
);

CREATE TABLE AstronomicalObject (
    AstronomicalName VARCHAR(50),
    DistanceFromEarth REAL,
    Universe VARCHAR(50) NOT NULL,
    PRIMARY KEY (AstronomicalName),
    FOREIGN KEY (Universe) REFERENCES Universe(UniversalName) ON DELETE CASCADE
);

CREATE TABLE Galaxy (
    GalacticName VARCHAR(50),
    Constellation VARCHAR(50),
    VariationType VARCHAR(50),
    Radius REAL,
    StarCount VARCHAR(50),
    CentralObject VARCHAR(50),
    PRIMARY KEY (GalacticName),
    FOREIGN KEY (GalacticName) REFERENCES AstronomicalObject(AstronomicalName) ON DELETE CASCADE
);

CREATE TABLE PlanetarySystem (
    HostName VARCHAR(50),
    NumberOfStars INT,
    NumberOfPlanets INT,
    Radius REAL,
    GalaxyHost VARCHAR(50) NOT NULL,
    PRIMARY KEY (HostName),
    FOREIGN KEY (GalaxyHost) REFERENCES Galaxy(GalacticName) ON DELETE CASCADE,
    FOREIGN KEY (HostName) REFERENCES AstronomicalObject(AstronomicalName) ON DELETE CASCADE
);

CREATE TABLE Quasar (
    QuasarName VARCHAR(50),
    SpectralRedshift REAL,
    Luminosity REAL,
    BlackHoleMass VARCHAR(50),
    PRIMARY KEY (QuasarName),
    FOREIGN KEY (QuasarName) REFERENCES AstronomicalObject(AstronomicalName) ON DELETE CASCADE
);

CREATE TABLE CelestialBody (
    CelestialName VARCHAR(50),
    DiscoveryYear INT,
    SystemHost VARCHAR(50) NOT NULL,
    PRIMARY KEY (CelestialName),
    FOREIGN KEY (SystemHost) REFERENCES PlanetarySystem(HostName) ON DELETE CASCADE
);

CREATE TABLE Star (
    SolarName VARCHAR(50),
    SpectralType CHAR(10),
    Radius REAL,
    ElementalComposition VARCHAR(50),
    PRIMARY KEY (SolarName),
    FOREIGN KEY (SolarName) REFERENCES CelestialBody(CelestialName) ON DELETE CASCADE
);

CREATE TABLE Exoplanet (
    PlanetaryName VARCHAR(50),
    Radius REAL,
    DurationOfDay REAL,
    OrbitalPeriod REAL,
    PlanetaryType VARCHAR(50),
    GravityStrength VARCHAR(50),
    Biosphere INT,
    SolarHost VARCHAR(50) NOT NULL,
    PRIMARY KEY (PlanetaryName),
    FOREIGN KEY (SolarHost) REFERENCES Star(SolarName) ON DELETE CASCADE,
    FOREIGN KEY (PlanetaryName) REFERENCES CelestialBody(CelestialName) ON DELETE CASCADE
);


CREATE TABLE Moon (
    LunarName VARCHAR(50),
    Radius REAL,
    TidalLock INT,
    CoreComposition VARCHAR(50),
    OrbitalPeriod REAL,
    DiscoveryYear INT,
    Host VARCHAR(50) NOT NULL,
    PRIMARY KEY (LunarName, Host),
    FOREIGN KEY (Host) REFERENCES Exoplanet(PlanetaryName) ON DELETE CASCADE
);


CREATE TABLE Biome (
    BiomeType VARCHAR(50),
    FoliageDensity VARCHAR(50),
    AverageTemperature REAL,
    PRIMARY KEY (BiomeType)
);

CREATE TABLE Ecosystem (
    Planet VARCHAR(50),
    Biome VARCHAR(50),
    PRIMARY KEY (Planet, Biome),
    FOREIGN KEY (Planet) REFERENCES Exoplanet(PlanetaryName) ON DELETE CASCADE,
    FOREIGN KEY (Biome) REFERENCES Biome(BiomeType) ON DELETE CASCADE
);

CREATE TABLE Kingdom (
    Taxonomy VARCHAR(50),
    ColloquialGenus VARCHAR(50),
    TrophicLevel VARCHAR(50),
    SpeciesCount INT,
    ReproductionType VARCHAR(50),
    Lifespan INT,
    PRIMARY KEY (Taxonomy)
);

CREATE TABLE Has_Kingdom(
    Taxonomy VARCHAR(50),
    Planet VARCHAR(50),
    Biome VARCHAR(50),
    Alleles INT,
    PRIMARY KEY (Taxonomy, Planet, Biome),
    FOREIGN KEY (Taxonomy) REFERENCES Kingdom(Taxonomy) ON DELETE CASCADE,
    FOREIGN KEY (Planet, Biome) REFERENCES Ecosystem(Planet, Biome) ON DELETE CASCADE
);