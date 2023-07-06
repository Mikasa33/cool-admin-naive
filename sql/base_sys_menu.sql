/*
 Navicat Premium Data Transfer

 Source Server         : cool_dev
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : 82.157.235.226:3306
 Source Schema         : cool_dev

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 06/07/2023 16:56:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for base_sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `base_sys_menu`;
CREATE TABLE `base_sys_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `parentId` bigint(20) DEFAULT NULL COMMENT '父菜单ID',
  `name` varchar(255) NOT NULL COMMENT '菜单名称',
  `router` varchar(255) DEFAULT NULL COMMENT '菜单地址',
  `perms` varchar(255) DEFAULT NULL COMMENT '权限标识',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型 0-目录 1-菜单 2-按钮',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `orderNum` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `viewPath` varchar(255) DEFAULT NULL COMMENT '视图地址',
  `keepAlive` tinyint(4) NOT NULL DEFAULT '1' COMMENT '路由缓存',
  `isShow` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否显示',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `IDX_05e3d6a56604771a6da47ebf8e` (`createTime`),
  KEY `IDX_d5203f18daaf7c3fe0ab34497f` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=467 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of base_sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (1, '2023-06-20 14:01:36.591037', '2023-06-25 15:18:55.441000', NULL, '工作台', '/workbench', NULL, 1, 'i-icon-park-outline-workbench', 0, '/views/workbench/index.vue', 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (2, '2019-09-11 11:14:47.000000', '2023-07-04 12:01:55.361000', NULL, '系统管理', '/system', NULL, 0, 'i-icon-park-outline-system', 1, NULL, 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (3, '2019-09-12 17:35:51.000000', '2023-06-28 15:25:04.939000', 2, '请求日志', '/system/log', NULL, 1, 'i-icon-park-outline-log', 6, '/views/system/log/index.vue', 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (4, '2019-09-12 15:52:44.000000', '2023-06-26 17:59:46.341000', 2, '权限管理', '/system/auth', NULL, 0, 'i-icon-park-outline-permissions', 1, NULL, 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (5, '1900-01-20 13:29:33.000000', '2023-06-26 17:59:41.927000', 2, '参数配置', '/system/param', NULL, 1, 'i-icon-park-outline-setting-config', 2, '/views/system/param/index.vue', 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (6, '1900-01-20 14:14:02.000000', '2023-06-20 14:48:56.187032', 4, '用户管理', '/system/auth/user', NULL, 1, 'i-icon-park-outline-user', 0, '/views/system/user/index.vue', 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (7, '2019-09-12 00:34:01.000000', '2023-06-20 14:46:00.736389', 4, '角色管理', '/system/auth/role', NULL, 1, 'i-icon-park-outline-peoples', 3, '/views/system/role/index.vue', 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (8, '1900-01-20 23:19:57.000000', '2023-06-20 14:46:01.752448', 4, '菜单管理', '/system/auth/menu', NULL, 1, 'i-icon-park-outline-hamburger-button', 2, '/views/system/menu/index.vue', 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (463, '2023-06-27 15:40:03.066000', '2023-06-27 15:40:03.066000', 2, '字典管理', '/system/dict', NULL, 1, 'i-icon-park-outline-bookmark-one', 3, '/views/system/dict/index.vue', 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (464, '2023-06-28 14:44:49.251000', '2023-06-28 15:25:02.283000', 2, '数据回收站', '/system/recycle', NULL, 1, 'i-icon-park-outline-delete-one', 5, '/views/system/recycle/index.vue', 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (465, '2023-06-28 15:24:58.145000', '2023-07-06 10:05:37.811000', NULL, '文件管理', '/space', NULL, 1, 'i-icon-park-outline-document-folder', 2, '/views/space/index.vue', 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`) VALUES (466, '2023-07-04 12:02:22.815000', '2023-07-06 10:05:35.834000', NULL, '用户管理', '/user', NULL, 1, 'i-icon-park-outline-user', 3, '/views/user/index.vue', 1, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
