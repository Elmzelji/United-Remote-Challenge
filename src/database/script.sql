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


-- Dumping database structure for unitedremote
CREATE DATABASE IF NOT EXISTS `unitedremote` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `unitedremote`;

-- Dumping structure for table unitedremote.dislike
CREATE TABLE IF NOT EXISTS `dislike` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `disliked_at` timestamp NULL DEFAULT NULL,
  `removed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping structure for table unitedremote.shops
CREATE TABLE IF NOT EXISTS `shops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `image_path` varchar(300) NOT NULL DEFAULT '/public/shops/default.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Dumping data for table unitedremote.shops: ~0 rows (approximately)
/*!40000 ALTER TABLE `shops` DISABLE KEYS */;
INSERT INTO `shops` (`id`, `name`, `image_path`) VALUES
	(1, 'Acima mall', '/shops/default.png'),
	(2, 'Ikea', '/shops/default.png'),
	(3, 'DELL', '/shops/default.png'),
	(4, 'HP', '/shops/default.png'),
	(5, 'Digital Multimiter', '/shops/default.png'),
	(6, 'United Remote', '/shops/default.png'),
	(7, 'Fablab', '/shops/default.png'),
	(8, '3D Cat', '/shops/default.png');
/*!40000 ALTER TABLE `shops` ENABLE KEYS */;

-- Dumping structure for table unitedremote.shop_status
CREATE TABLE IF NOT EXISTS `shop_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop` int(11) NOT NULL DEFAULT '0',
  `user` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping structure for table unitedremote.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

