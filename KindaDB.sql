-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `user_ID` INT NOT NULL AUTO_INCREMENT,
  `user_FullName` VARCHAR(45) NOT NULL,
  `user_Email` VARCHAR(100) NOT NULL,
  `user_Password` VARCHAR(45) NOT NULL,
  `user_PhoneNumber` BIGINT NOT NULL,
  PRIMARY KEY (`user_ID`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`address` (
  `address_ID` INT NOT NULL AUTO_INCREMENT,
  `region` VARCHAR(45) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `building` VARCHAR(45) NOT NULL,
  `floor` INT NULL DEFAULT 0,
  `moredetails` VARCHAR(45) NULL,
  `user_ID` INT NOT NULL,
  PRIMARY KEY (`address_ID`),
  UNIQUE INDEX `user_ID_UNIQUE` (`user_ID` ASC),
  CONSTRAINT `fk_user_ID`
    FOREIGN KEY (`user_ID`)
    REFERENCES `mydb`.`user` (`user_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`category` (
  `category_ID` INT NOT NULL AUTO_INCREMENT,
  `category_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`category_ID`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`product` (
  `product_ID` INT NOT NULL AUTO_INCREMENT,
  `product_IMG` BLOB NOT NULL,
  `product_Name` VARCHAR(45) NOT NULL,
  `product_Description` MEDIUMTEXT NOT NULL,
  `product_Info` MEDIUMTEXT NOT NULL,
  `product_Price` DECIMAL NOT NULL,
  `category_ID` INT NOT NULL,
  PRIMARY KEY (`product_ID`),
  INDEX `fk_category_ID_idx` (`category_ID` ASC),
  CONSTRAINT `fk_category_ID`
    FOREIGN KEY (`category_ID`)
    REFERENCES `mydb`.`category` (`category_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cart` (
  `cart_ID` INT NOT NULL AUTO_INCREMENT,
  `user_ID` INT NOT NULL,
  `product_ID` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`cart_ID`),
  INDEX `fk1_user_ID_idx` (`user_ID` ASC),
  INDEX `fk1_product_ID_idx` (`product_ID` ASC),
  CONSTRAINT `fk1_user_ID`
    FOREIGN KEY (`user_ID`)
    REFERENCES `mydb`.`user` (`user_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk1_product_ID`
    FOREIGN KEY (`product_ID`)
    REFERENCES `mydb`.`product` (`product_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`reviews` (
  `review_ID` INT NOT NULL AUTO_INCREMENT,
  `user_ID` INT NOT NULL,
  `product_ID` INT NOT NULL,
  `rating` INT NOT NULL,
  `review_Text` MEDIUMTEXT NULL,
  PRIMARY KEY (`review_ID`),
  INDEX `fk2_user_ID_idx` (`user_ID` ASC),
  INDEX `fk2_product_ID_idx` (`product_ID` ASC),
  CONSTRAINT `fk2_user_ID`
    FOREIGN KEY (`user_ID`)
    REFERENCES `mydb`.`user` (`user_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk2_product_ID`
    FOREIGN KEY (`product_ID`)
    REFERENCES `mydb`.`product` (`product_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`orders` (
  `order_ID` INT NOT NULL AUTO_INCREMENT,
  `cart_ID` INT NOT NULL,
  PRIMARY KEY (`order_ID`),
  INDEX `fk3_cart_ID_idx` (`cart_ID` ASC),
  CONSTRAINT `fk3_cart_ID`
    FOREIGN KEY (`cart_ID`)
    REFERENCES `mydb`.`cart` (`cart_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`shipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`shipment` (
  `shipment_ID` INT NOT NULL AUTO_INCREMENT,
  `order_ID` INT NOT NULL,
  `user_ID` INT NOT NULL,
  PRIMARY KEY (`shipment_ID`),
  INDEX `fk6_order_ID_idx` (`order_ID` ASC),
  INDEX `fk6_user_ID_idx` (`user_ID` ASC),
  CONSTRAINT `fk6_order_ID`
    FOREIGN KEY (`order_ID`)
    REFERENCES `mydb`.`orders` (`order_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk6_user_ID`
    FOREIGN KEY (`user_ID`)
    REFERENCES `mydb`.`user` (`user_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`customization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customization` (
  `customization_ID` INT NOT NULL AUTO_INCREMENT,
  `customization_Size` INT NOT NULL,
  `customization_Color` VARCHAR(45) NOT NULL,
  `product_ID` INT NOT NULL,
  PRIMARY KEY (`customization_ID`),
  INDEX `fk7_product_ID_idx` (`product_ID` ASC),
  CONSTRAINT `fk7_product_ID`
    FOREIGN KEY (`product_ID`)
    REFERENCES `mydb`.`product` (`product_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
