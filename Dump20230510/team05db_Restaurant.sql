-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: team05db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Restaurant`
--

DROP TABLE IF EXISTS `Restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restaurant` (
  `restaurant_id` int NOT NULL AUTO_INCREMENT,
  `restaurant_name` varchar(255) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `restaurant_address` varchar(2048) NOT NULL,
  `price_range` varchar(45) NOT NULL,
  `restaurant_category` varchar(45) NOT NULL,
  `image_path` varchar(2048) DEFAULT NULL,
  `display_status` tinyint NOT NULL DEFAULT '0',
  `category_id` int DEFAULT NULL,
  `menu_item_id` int NOT NULL,
  `display_approved` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`restaurant_id`),
  UNIQUE KEY `idRestaurant_UNIQUE` (`restaurant_id`),
  KEY `fk_category_idx` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurant`
--

LOCK TABLES `Restaurant` WRITE;
/*!40000 ALTER TABLE `Restaurant` DISABLE KEYS */;
INSERT INTO `Restaurant` VALUES (1,'Marugame Udon',37.72749,-122.47649,'3251 20th Ave, Space 184, San Francisco, CA 94132','$20-$30','Asian','s3://my-bucket/irestaurant_image/658fc40df8fcb098b7fca9e685ff9d41e4ee6de4500b.jpeg',0,NULL,0,0),(2,'Shake Shack',37.72738,-122.47637,'3251 20th Ave San Francisco, CA 94132','$10-$20','American','s3://my-bucket/restaurant_image/87d97f3ed3cc0ec2010c47f744e759b771bcd19208f1.jpeg',0,NULL,0,0),(3,'Chipotle',37.72769,-122.47655,'3251 20th Ave San Francisco, CA 94132','$20-$30','Mexican','s3://my-bucket/restaurant_image/fac1f4a152a18e1129ef13e0231e9d1c06f18143ceff.jpeg',0,NULL,0,0),(4,'Blaze Pizza',37.72794,-122.47658,'3251 20th Ave San Francisco, CA 94132','$20-$30','Italian','s3://my-bucket/restaurant_image/edece07137985c2d24b29a6dbe0726a02cd9c7ccd782.jpeg',0,NULL,0,0),(5,'Panda Express',37.72764,-122.47661,'3251 20th Ave San Francisco, CA 94132','$10-$20','Asian','s3://my-bucket/restaurant_image/bda0201a19db402630ff24eafcbc7af129cc408d5c09.jpeg',0,NULL,0,0),(6,'Cadillac Bar & Grill',37.77701,-122.41587,'44 9th St, San Francisco, CA 94103','$20-$30','Mexican','s3://my-bucket/restaurant_image/49d05a42c214e837383a5997a54f805d6c975bf6dd5a.jpeg\n',0,NULL,0,0),(7,'McDonald\'s',37.72656,-122.47655,'255 Winston Dr San Francisco, CA 94132','<$10','American','s3://my-bucket/restaurant_image/38c5ecc2348ab594654f69aaa291750d3c61c8e1f29d.jpeg',0,NULL,0,0);
/*!40000 ALTER TABLE `Restaurant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-10 22:29:22
