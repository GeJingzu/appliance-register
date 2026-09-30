CREATE DATABASE IF NOT EXISTS appliance_register;
USE appliance_register;

CREATE TABLE IF NOT EXISTS User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Eircode VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS Appliance (
    ApplianceID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ApplianceType VARCHAR(50),
    Brand VARCHAR(50),
    ModelNumber VARCHAR(50),
    SerialNumber VARCHAR(50) NOT NULL UNIQUE,
    PurchaseDate DATE,
    WarrantyExpirationDate DATE,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);
