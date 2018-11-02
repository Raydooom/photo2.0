/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : think_server

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2018-10-26 19:05:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_user`
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(1) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES ('1', 'admin', '123456');

-- ----------------------------
-- Table structure for `article_comment`
-- ----------------------------
DROP TABLE IF EXISTS `article_comment`;
CREATE TABLE `article_comment` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `article_id` char(6) COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `comment_user_id` int(6) NOT NULL,
  `comment_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `create_date` char(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of article_comment
-- ----------------------------
INSERT INTO `article_comment` VALUES ('7', '7', '12', 0x6173E689A56164E58F917765E68CBCE58EBB, '2018-10-25 16:10:37');
INSERT INTO `article_comment` VALUES ('8', '7', '12', 0x6173E689A56164E58F917765E68CBCE58EBBE59388E59388, '2018-10-25 16:12:00');
INSERT INTO `article_comment` VALUES ('9', '7', '12', 0x7361646661737172313233313233, '2018-10-26 15:21:08');
INSERT INTO `article_comment` VALUES ('10', '7', '12', 0x7361646661737172313233313233, '2018-10-26 15:21:24');
INSERT INTO `article_comment` VALUES ('11', '7', '12', 0x7361646661737172313233313233, '2018-10-26 15:24:21');
INSERT INTO `article_comment` VALUES ('12', '7', '12', 0x7361646661737172313233313233, '2018-10-26 15:24:45');
INSERT INTO `article_comment` VALUES ('13', '8', '12', 0x7361646661737172313233313233, '2018-10-26 15:27:24');

-- ----------------------------
-- Table structure for `article_kind_list`
-- ----------------------------
DROP TABLE IF EXISTS `article_kind_list`;
CREATE TABLE `article_kind_list` (
  `id` int(2) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article_kind_list
-- ----------------------------
INSERT INTO `article_kind_list` VALUES ('1', '风景');
INSERT INTO `article_kind_list` VALUES ('2', '人像');
INSERT INTO `article_kind_list` VALUES ('3', '游记');

-- ----------------------------
-- Table structure for `article_list`
-- ----------------------------
DROP TABLE IF EXISTS `article_list`;
CREATE TABLE `article_list` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) DEFAULT NULL,
  `cover_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `kind_id` int(6) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` text,
  `home_show` int(1) DEFAULT '0',
  `views` int(6) DEFAULT '0',
  `praises` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `comments` int(6) DEFAULT '0',
  `create_date` char(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `update_date` char(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article_list
-- ----------------------------
INSERT INTO `article_list` VALUES ('7', '文章名', 'http://img1.imgtn.bdimg.com/it/u=371772476,1548437417&fm=26&gp=0.jpg', '1', null, '123123123', '1', '5', '12,5,4,3,1,2', '6', '2018-10-24 16:28:14', '2018-10-26 15:29:53');
INSERT INTO `article_list` VALUES ('8', '123124', 'http://img1.imgtn.bdimg.com/it/u=371772476,1548437417&fm=26&gp=0.jpg', '1', null, '<p>123123123</p>', '1', '0', '12', '1', '2018-10-24 16:28:19', null);
INSERT INTO `article_list` VALUES ('9', '123124', 'http://img1.imgtn.bdimg.com/it/u=371772476,1548437417&fm=26&gp=0.jpg', '1', null, '123123123', '0', '0', null, '0', '2018-10-23 16:10:13', null);
INSERT INTO `article_list` VALUES ('10', '123123', 'http://localhost:8360/static/uploadimg/nu99kphuz.jpg', '2', null, '<p>123123</p>', '0', '0', null, '0', '2018-10-24 11:17:40', null);
INSERT INTO `article_list` VALUES ('11', '123123', 'http://localhost:8360/static/uploadimg/nu99kphuz.jpg', '2', null, '<p>123123</p>', '0', '0', null, '0', '2018-10-24 11:18:56', null);
INSERT INTO `article_list` VALUES ('12', '123', 'http://localhost:8360/static/uploadimg/b3x1yp4l4p4.jpg', '1', null, '<p>123</p>', '1', '0', null, '0', '2018-10-24 11:19:29', null);
INSERT INTO `article_list` VALUES ('13', '文章名', 'http://img1.imgtn.bdimg.com/it/u=371772476,1548437417&fm=26&gp=0.jpg', '3', null, '123123123', '0', '0', null, '0', '2018-10-24 15:18:10', null);
INSERT INTO `article_list` VALUES ('14', '文章名', 'http://localhost:8360/static/uploadimg/9qtszlsc1im.png', '3', null, '123123123', '0', '0', null, '0', '2018-10-24 15:20:11', null);
INSERT INTO `article_list` VALUES ('15', '文章名', 'http://localhost:8360/static/uploadimg/9qtszlsc1im.png', '3', null, '123123123', '0', '0', null, '0', '2018-10-24 15:20:18', null);
INSERT INTO `article_list` VALUES ('16', '内容回显测试', 'http://localhost:8360/static/uploadimg/oq6kciz4iv.png', '2', null, '<p>内容回显<img src=\"http://localhost:8360/static/uploadimg/j7fl9iei8gm.png\"></p>', '0', '0', '0', '0', '2018-10-24 15:26:17', null);
INSERT INTO `article_list` VALUES ('21', '文章名', 'http://pic23.nipic.com/20120816/10630322_204821643000_2.jpg', '1', null, '123123123', '0', '0', null, '0', '2018-10-26 15:11:45', '2018-10-26 15:11:45');
INSERT INTO `article_list` VALUES ('22', '文章名', 'http://up.enterdesk.com/edpic_source/cf/08/63/cf086352b55948489accbdd2b2b69b46.jpg', '1', null, '123123123', '0', '0', null, '0', '2018-10-26 18:49:57', '2018-10-26 18:49:57');
INSERT INTO `article_list` VALUES ('23', '文章名', 'http://up.enterdesk.com/edpic_source/cf/08/63/cf086352b55948489accbdd2b2b69b46.jpg', '1', null, '<p>123123123</p>', '1', '0', null, '0', '2018-10-26 18:50:18', '2018-10-26 18:51:07');
INSERT INTO `article_list` VALUES ('24', '文章名', 'http://up.enterdesk.com/edpic_source/cf/08/63/cf086352b55948489accbdd2b2b69b46.jpg', '1', null, '123123123', '0', '0', null, '0', '2018-10-26 18:53:25', '2018-10-26 18:53:25');
INSERT INTO `article_list` VALUES ('25', '文章名', 'http://up.enterdesk.com/edpic_source/cf/08/63/cf086352b55948489accbdd2b2b69b46.jpg', '1', '文章描述', '<p>123123123</p>', '1', '0', null, '0', '2018-10-26 18:55:38', '2018-10-26 18:56:08');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(6) NOT NULL,
  `user_name` char(64) COLLATE utf8mb4_bin DEFAULT NULL,
  `gender` int(1) DEFAULT '0',
  `avatar` char(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `province` char(32) COLLATE utf8mb4_bin DEFAULT NULL,
  `city` char(32) COLLATE utf8mb4_bin DEFAULT NULL,
  `create_date` char(32) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of user
-- ----------------------------
