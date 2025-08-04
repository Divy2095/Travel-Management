/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tmdb
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trip_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `emergency_contact` varchar(255) DEFAULT NULL,
  `emergency_phone` varchar(20) DEFAULT NULL,
  `participants` int NOT NULL DEFAULT '1',
  `special_requests` text,
  `total_amount` decimal(10,2) NOT NULL,
  `booking_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  `entry_by` varchar(100) DEFAULT NULL,
  `update_by` varchar(100) DEFAULT NULL,
  `entry_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `payment_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_bookings_trip_id` (`trip_id`),
  KEY `idx_bookings_user_id` (`user_id`),
  KEY `idx_bookings_status` (`status`),
  KEY `idx_bookings_booking_date` (`booking_date`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES
(1,10,7,'Ash','ash1234@gmail.com','8200544242','Divy','7854693587',1,NULL,1200.00,'2025-08-03 09:29:12','confirmed',NULL,NULL,'2025-08-03 09:29:12','2025-08-03 09:29:12','54806271'),
(2,10,4,'Max','max1234@gmail.com','9998390232','Ryan','8349254890',1,NULL,1200.00,'2025-08-03 09:39:22','confirmed',NULL,NULL,'2025-08-03 09:39:22','2025-08-03 09:39:22','ek1wdj11'),
(3,10,8,'Meet','meet1234@gmail.com','8200544343','Dev','8567498857',1,NULL,1200.00,'2025-08-04 04:08:38','confirmed',NULL,NULL,'2025-08-04 04:08:38','2025-08-04 04:08:38','fkz751h0'),
(4,10,9,'Dishant','dishant1234@gmail.com','7990311379','Divy','8200544242',1,NULL,1200.00,'2025-08-04 04:34:20','confirmed',NULL,NULL,'2025-08-04 04:34:20','2025-08-04 04:34:20','rqsn7tzz');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `entry_by` varchar(100) DEFAULT NULL,
  `update_by` varchar(100) DEFAULT NULL,
  `entry_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `drivers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `license_number` varchar(50) NOT NULL,
  `license_expiry` date NOT NULL,
  `address` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `assigned_vehicle_id` int DEFAULT NULL,
  `joined_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `profile_photo` text,
  `rating` decimal(2,1) DEFAULT NULL,
  `entry_by` varchar(100) DEFAULT NULL,
  `update_by` varchar(100) DEFAULT NULL,
  `entry_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `assigned_vehicle_id` (`assigned_vehicle_id`),
  CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`assigned_vehicle_id`) REFERENCES `vehicles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
INSERT INTO `drivers` VALUES
(1,'Mohan','mohan1234@gmail.com','8204578892','GJ-05-2025-0123456','2025-07-17','Near Madhapar chwok Rajkot','active',2,'2025-07-14 11:38:00','',4.0,'admin',NULL,'2025-07-14 11:38:00','2025-07-14 11:38:00'),
(2,'Suresh','suresh1234@gmail.com','9816547820','GJ-05-2025-0123414','2028-09-12','Somewhere in Rajkot, Gujarat','active',2,'2025-07-22 16:29:08','',4.0,'admin',NULL,'2025-07-22 16:29:08','2025-07-22 16:29:08');
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `address` text,
  `pincode` varchar(10) DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `entry_by` varchar(100) DEFAULT NULL,
  `update_by` varchar(100) DEFAULT NULL,
  `entry_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `image` longtext,
  `location_id` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `max_participants` int DEFAULT '10',
  `status` enum('active','inactive','completed') DEFAULT 'active',
  `entry_by` varchar(100) DEFAULT NULL,
  `update_by` varchar(100) DEFAULT NULL,
  `entry_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` VALUES
(5,'Goa','A good place to visit','2025-07-27','https://res.cloudinary.com/dfrwvoowc/image/upload/v1753014065/trips/tmp-1-1753014057932_l9ohx9.jpg',NULL,3500.00,'3 days 2 nights',10,'active','admin',NULL,'2025-07-20 12:21:05','2025-07-20 12:21:05'),
(6,'Goa ','Goa is a vibrant coastal state known for its stunning beaches, lively nightlife, rich Portuguese heritage, and laid-back vibe. It\'s the perfect mix of relaxation and adventure.','2025-07-27','https://res.cloudinary.com/dfrwvoowc/image/upload/v1753201236/trips/tmp-1-1753201230600_ozo2ko.jpg',NULL,3500.00,'3 days 2 nights',20,'active','admin',NULL,'2025-07-22 16:20:38','2025-07-22 16:20:38'),
(7,'Goa','Goa is a vibrant coastal state known for its stunning beaches, lively nightlife, rich Portuguese heritage, and laid-back vibe. It\'s the perfect mix of relaxation and adventure.','2025-07-27','https://res.cloudinary.com/dfrwvoowc/image/upload/v1753201283/trips/tmp-2-1753201281096_c9pgm9.jpg',NULL,3500.00,'3 days 2 nights',10,'active','admin',NULL,'2025-07-22 16:21:24','2025-07-22 16:21:24'),
(8,'Goa','Nice place to visit ','2025-08-03','https://res.cloudinary.com/dfrwvoowc/image/upload/v1753792647/trips/tmp-1-1753792643801_um1jvv.jpg',NULL,3500.00,'3 days 2 nights',20,'active','admin',NULL,'2025-07-29 12:37:27','2025-07-29 12:37:27'),
(9,'Dwarka','Dwarka is a sacred coastal city in Gujarat, known as the legendary kingdom of Lord Krishna. It\'s one of the four Char Dham pilgrimage sites and holds deep spiritual and historical significance. The famous Dwarkadhish Temple attracts thousands of devotees, while nearby spots like Bet Dwarka add to its mythological charm. With its blend of ancient stories, temples, and serene sea views, Dwarka is a peaceful yet powerful place to visit.','2025-08-10','https://res.cloudinary.com/dfrwvoowc/image/upload/v1754208282/trips/tmp-1-1754208279459_fbxdqx.jpg',NULL,2000.00,'2 days 1 night',20,'active','admin',NULL,'2025-08-03 08:04:42','2025-08-03 08:04:42'),
(10,'Dwarka','Sure! Here’s a short and sweet para for you:\r\n\r\n---\r\n\r\n**Dwarka** is a sacred coastal city in Gujarat, known as the legendary kingdom of Lord Krishna. It\'s one of the four Char Dham pilgrimage sites and holds deep spiritual and historical significance. The famous **Dwarkadhish Temple** attracts thousands of devotees, while nearby spots like **Bet Dwarka** add to its mythological charm. With its blend of ancient stories, temples, and serene sea views, Dwarka is a peaceful yet powerful place to visit.\r\n','2025-09-06','https://res.cloudinary.com/dfrwvoowc/image/upload/v1754212275/trips/tmp-1-1754212272246_g3kjzk.jpg',NULL,1200.00,'2 days 1 night',10,'active','admin',NULL,'2025-08-03 09:11:16','2025-08-03 09:11:16');
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `login_type` enum('admin','driver','customer') NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `entry_by` varchar(100) DEFAULT NULL,
  `update_by` varchar(100) DEFAULT NULL,
  `entry_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Divy','divydedaniya@gmail.com','$2b$10$QU8SSO5XE5cLojQ5hkGI8uDDE0ccQIrY.TF/yVMS/yAfgAgIxHDda','admin',NULL,'active','divydedaniya@gmail.com',NULL,'2025-07-10 04:46:47','2025-07-10 05:57:30'),
(2,'Alex','alex1234@gmail.com','$2b$10$eb8yBxd8RFvpTGXfNew5/uLevzIVTAL1LNT6mcnceF65V4Q51Dudi','customer',NULL,'active','alex1234@gmail.com',NULL,'2025-07-10 04:49:38','2025-07-10 04:49:38'),
(3,'Jhon','jhon1234@gmail.com','$2b$10$1B7f/6eFvY663sCzE7hyGOVGFkprDF6musqYo8Hsz/VW2GGGUhtti','customer',NULL,'active','jhon1234@gmail.com',NULL,'2025-07-10 04:53:45','2025-07-10 04:53:45'),
(4,'Max','max1234@gmail.com','$2b$10$1bnRe1VMKsWF4DEblObG0.VI6/wInYmUEmct740kqpJ2ksbLcGHPW','customer','','active','max1234@gmail.com',NULL,'2025-07-10 05:22:38','2025-07-10 05:57:30'),
(5,'Rohan','rohan1234@gmail.com','$2b$10$xxJwFUgaNt6sAs7WCbEaMO8hpt7QTHl2mUDHeJf1gfdSgVuKerTRO','customer','https://api.dicebear.com/9.x/initials/svg?seed=Rohan&radius=50&backgroundColor=ffd5dc&fontSize=40','active','rohan1234@gmail.com',NULL,'2025-07-20 10:05:47','2025-07-20 10:05:47'),
(6,'Jay','jay1234@gmail.com','$2b$10$Vn8O33T8bYoTmYo7S9g7nuh0TMVtnwWybAISwbdZNRQb6q17BQ22G','customer','https://api.dicebear.com/9.x/initials/svg?seed=Jay&radius=50&backgroundColor=ffd5dc&fontSize=40','active','jay1234@gmail.com',NULL,'2025-07-20 10:08:11','2025-07-20 10:08:11'),
(7,'Ash','ash1234@gmail.com','$2b$10$vWFQ0FlLzbBMXi050JXLAecb7oNjqb7t8m4wtwlunregD5HLgsI6i','customer','https://api.dicebear.com/9.x/initials/svg?seed=Ash&radius=50&backgroundColor=ffd5dc&fontSize=40','active','ash1234@gmail.com',NULL,'2025-07-29 12:36:08','2025-07-29 12:36:08'),
(8,'Meet','meet1234@gmail.com','$2b$10$UwHq7HSzfAwXIFQAqX3heOpvDBNxMCf9y/VZTUj9axguraTX7yyR.','customer','https://api.dicebear.com/9.x/initials/svg?seed=Meet&radius=50&backgroundColor=ffd5dc&fontSize=40','active','meet1234@gmail.com',NULL,'2025-08-04 04:06:08','2025-08-04 04:06:08'),
(9,'Dishant','dishant1234@gmail.com','$2b$10$/w9ZMbHA4xbNnz151HBXSeJofpGu1JMGwoKFQN8w0f2Q1S2sKrsW2','customer','https://api.dicebear.com/9.x/initials/svg?seed=Dishant&radius=50&backgroundColor=ffd5dc&fontSize=40','active','dishant1234@gmail.com',NULL,'2025-08-04 04:33:10','2025-08-04 04:33:10');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vehicle_number` varchar(200) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `status` enum('available','in_use','maintenance') DEFAULT 'available',
  `entry_by` varchar(100) DEFAULT NULL,
  `update_by` varchar(100) DEFAULT NULL,
  `entry_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicle_number` (`vehicle_number`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES
(1,'7796','Car','Sedan',5,'available','admin',NULL,'2025-07-13 06:31:42','2025-07-13 06:31:42'),
(2,'GJ 03 BA 9956','Bus','Mini-Bus',20,'available','admin',NULL,'2025-07-14 04:01:51','2025-07-14 04:01:51');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tmdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-08-04 10:27:12
