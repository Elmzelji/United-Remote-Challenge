-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.16 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Creating structure for unitedremote
CREATE DATABASE IF NOT EXISTS `unitedremote` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `unitedremote`;

-- Creating table unitedremote.shops
CREATE TABLE IF NOT EXISTS `shops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `image_path` varchar(300) NOT NULL DEFAULT '/public/shops/default.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Addind Data to Shops
INSERT INTO `shops` (`id`, `name`, `image_path`) VALUES
	(1, 'Acima mall', '/shops/default.png'),
	(2, 'Ikea', '/shops/default.png'),
	(3, 'DELL', '/shops/default.png'),
	(4, 'HP', '/shops/default.png'),
	(5, 'Digital Multimiter', '/shops/default.png'),
	(6, 'United Remote', '/shops/default.png'),
	(7, 'Fablab', '/shops/default.png'),
	(8, '3D Cat', '/shops/default.png');

-- Creating Table unitedremote.shop_status
CREATE TABLE IF NOT EXISTS `shop_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop` int(11) NOT NULL DEFAULT '0',
  `user` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


-- Creating Table table unitedremote.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


