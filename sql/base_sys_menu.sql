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

 Date: 13/07/2023 11:48:40
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
  `isFrame` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否外链',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `IDX_05e3d6a56604771a6da47ebf8e` (`createTime`),
  KEY `IDX_d5203f18daaf7c3fe0ab34497f` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of base_sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (1, '2023-06-20 14:01:36.591037', '2023-06-25 15:18:55.441000', NULL, '工作台', '/workbench', NULL, 1, 'i-icon-park-outline-workbench', 0, '/views/workbench/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (2, '2019-09-11 11:14:47.000000', '2023-07-04 12:01:55.361000', NULL, '系统管理', '/system', NULL, 0, 'i-icon-park-outline-system', 1, NULL, 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (3, '2019-09-12 17:35:51.000000', '2023-06-28 15:25:04.939000', 2, '请求日志', '/system/log', NULL, 1, 'i-icon-park-outline-log', 6, '/views/system/log/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (4, '2019-09-12 15:52:44.000000', '2023-06-26 17:59:46.341000', 2, '权限管理', '/system/auth', NULL, 0, 'i-icon-park-outline-permissions', 1, NULL, 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (5, '1900-01-20 13:29:33.000000', '2023-06-26 17:59:41.927000', 2, '参数配置', '/system/param', NULL, 1, 'i-icon-park-outline-setting-config', 2, '/views/system/param/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (6, '1900-01-20 14:14:02.000000', '2023-06-20 14:48:56.187032', 4, '用户管理', '/system/auth/user', NULL, 1, 'i-icon-park-outline-user', 0, '/views/system/user/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (7, '2019-09-12 00:34:01.000000', '2023-06-20 14:46:00.736389', 4, '角色管理', '/system/auth/role', NULL, 1, 'i-icon-park-outline-peoples', 3, '/views/system/role/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (8, '1900-01-20 23:19:57.000000', '2023-06-20 14:46:01.752448', 4, '菜单管理', '/system/auth/menu', NULL, 1, 'i-icon-park-outline-hamburger-button', 2, '/views/system/menu/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (9, '2023-06-27 15:40:03.066000', '2023-07-07 14:40:37.412921', 2, '字典管理', '/system/dict', NULL, 1, 'i-icon-park-outline-bookmark-one', 3, '/views/system/dict/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (10, '2023-06-28 14:44:49.251000', '2023-07-07 14:40:39.821476', 2, '数据回收站', '/system/recycle', NULL, 1, 'i-icon-park-outline-delete-one', 5, '/views/system/recycle/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (11, '2023-06-28 15:24:58.145000', '2023-07-07 14:40:41.270540', NULL, '文件管理', '/space', NULL, 1, 'i-icon-park-outline-document-folder', 2, '/views/space/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (12, '2023-07-04 12:02:22.815000', '2023-07-10 17:02:12.526000', NULL, '用户管理', '/user', NULL, 1, 'i-icon-park-outline-user', 3, '/views/user/index.vue', 1, 0, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (13, '1900-01-20 00:19:27.325000', '2023-07-07 14:42:08.382742', 8, '新增', NULL, 'base:sys:menu:add', 2, NULL, 1, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (14, '1900-01-20 00:19:51.101000', '2023-07-07 14:42:10.991550', 8, '删除', NULL, 'base:sys:menu:delete', 2, NULL, 2, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (15, '1900-01-20 00:20:19.341000', '2023-07-07 14:42:11.014139', 8, '查询', NULL, 'base:sys:menu:page,base:sys:menu:list,base:sys:menu:info', 2, NULL, 4, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (16, '2023-03-15 10:38:43.677000', '2023-07-07 14:42:11.035242', 8, '编辑', NULL, 'base:sys:menu:info,base:sys:menu:update', 2, NULL, 3, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (17, '1900-01-20 00:34:23.459000', '1900-01-20 00:34:23.459000', 7, '新增', NULL, 'base:sys:role:add', 2, NULL, 1, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (18, '1900-01-20 00:34:40.523000', '1900-01-20 00:34:40.523000', 7, '删除', NULL, 'base:sys:role:delete', 2, NULL, 2, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (19, '1900-01-20 00:34:53.306000', '1900-01-20 00:34:53.306000', 7, '修改', NULL, 'base:sys:role:update', 2, NULL, 3, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (20, '1900-01-20 00:35:05.024000', '1900-01-20 00:35:05.024000', 7, '查询', NULL, 'base:sys:role:page,base:sys:role:list,base:sys:role:info', 2, NULL, 4, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (21, '2019-09-12 17:37:03.000000', '2021-03-03 10:16:26.000000', 3, '权限', NULL, 'base:sys:log:page,base:sys:log:clear,base:sys:log:getKeep,base:sys:log:setKeep', 2, NULL, 1, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (22, '1900-01-20 13:29:50.146000', '2023-07-07 15:11:22.584569', 5, '新增', NULL, 'base:sys:param:add', 2, NULL, 1, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (23, '1900-01-20 13:30:10.030000', '2023-07-07 15:11:24.412521', 5, '修改', NULL, 'base:sys:param:info,base:sys:param:update', 2, NULL, 3, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (24, '1900-01-20 13:30:25.791000', '2023-07-07 15:11:25.422090', 5, '删除', NULL, 'base:sys:param:delete', 2, NULL, 2, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (25, '1900-01-20 13:30:40.469000', '2023-07-07 15:11:26.984211', 5, '查看', NULL, 'base:sys:param:page,base:sys:param:list,base:sys:param:info', 2, NULL, 4, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (26, '2019-11-18 16:50:27.000000', '2023-07-07 15:12:04.408254', 6, '部门列表', NULL, 'base:sys:department:list', 2, NULL, 9, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (27, '2019-11-18 16:50:45.000000', '2023-07-07 15:11:50.376010', 6, '新增部门', NULL, 'base:sys:department:add', 2, NULL, 6, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (28, '2019-11-18 16:50:59.000000', '2023-07-07 15:11:13.485914', 6, '更新部门', NULL, 'base:sys:department:update', 2, NULL, 8, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (29, '2019-11-18 16:51:13.000000', '2023-07-07 15:11:08.696509', 6, '删除部门', NULL, 'base:sys:department:delete', 2, NULL, 7, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (30, '2019-11-18 17:49:35.000000', '2023-07-07 15:11:18.549361', 6, '部门排序', NULL, 'base:sys:department:order', 2, NULL, 10, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (31, '2019-11-18 23:59:21.000000', '2023-07-07 15:11:05.308340', 6, '用户转移', NULL, 'base:sys:user:move', 2, NULL, 5, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (32, '1900-01-20 14:14:13.528000', '2023-07-07 15:10:28.239178', 6, '新增', NULL, 'base:sys:user:add', 2, NULL, 1, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (33, '1900-01-20 14:14:22.823000', '2023-07-07 15:10:29.510729', 6, '删除', NULL, 'base:sys:user:delete', 2, NULL, 2, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (34, '1900-01-20 14:14:33.973000', '2023-07-07 15:10:31.003959', 6, '修改', NULL, 'base:sys:user:delete,base:sys:user:update', 2, NULL, 3, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (35, '2021-01-12 14:14:51.000000', '2023-07-07 15:10:37.105467', 6, '查询', NULL, 'base:sys:user:page,base:sys:user:list,base:sys:user:info', 2, NULL, 4, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (36, '2022-07-05 16:08:50.748162', '2023-07-07 15:13:30.772330', 9, '删除', NULL, 'dict:info:delete', 2, NULL, 2, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (37, '2022-07-05 16:08:50.800623', '2023-07-07 15:13:42.352975', 9, '修改', NULL, 'dict:info:update,dict:info:info', 2, NULL, 3, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (38, '2022-07-05 16:08:50.859141', '2023-07-07 15:13:57.020544', 9, '获得字典数据', NULL, 'dict:info:data', 2, NULL, 7, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (39, '2022-07-05 16:08:50.916874', '2023-07-07 15:13:54.199094', 9, '单个信息', NULL, 'dict:info:info', 2, NULL, 6, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (40, '2022-07-05 16:08:50.972783', '2023-07-07 15:13:52.024625', 9, '列表查询', NULL, 'dict:info:list', 2, NULL, 5, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (41, '2022-07-05 16:08:51.030928', '2023-07-07 15:13:50.965212', 9, '分页查询', NULL, 'dict:info:page', 2, NULL, 4, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (42, '2022-07-05 16:08:51.087883', '2023-07-07 15:13:27.542545', 9, '新增', NULL, 'dict:info:add', 2, NULL, 1, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (43, '2022-07-06 10:41:26.503000', '2023-07-07 15:13:59.111539', 9, '组权限', NULL, 'dict:type:list,dict:type:update,dict:type:delete,dict:type:add', 2, NULL, 8, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (44, '2023-02-13 14:57:48.293292', '2023-07-07 15:14:42.942486', 10, '恢复数据', NULL, 'recycle:data:restore', 2, NULL, 1, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (45, '2023-02-13 14:57:48.293292', '2023-07-07 15:14:46.754580', 10, '单个信息', NULL, 'recycle:data:info', 2, NULL, 3, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (46, '2023-02-13 14:57:48.293292', '2023-07-07 15:14:45.240526', 10, '分页查询', NULL, 'recycle:data:page', 2, NULL, 2, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (47, '2023-04-16 21:59:58.525729', '2023-07-07 15:15:49.649907', 12, '删除', NULL, 'user:info:delete', 2, NULL, 2, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (48, '2023-04-16 21:59:58.525729', '2023-07-07 15:15:53.695354', 12, '修改', NULL, 'user:info:update,user:info:info', 2, NULL, 3, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (49, '2023-04-16 21:59:58.525729', '2023-07-07 15:15:56.905054', 12, '单个信息', NULL, 'user:info:info', 2, NULL, 6, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (50, '2023-04-16 21:59:58.525729', '2023-07-07 15:15:55.914857', 12, '列表查询', NULL, 'user:info:list', 2, NULL, 5, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (51, '2023-04-16 21:59:58.525729', '2023-07-07 15:15:54.703167', 12, '分页查询', NULL, 'user:info:page', 2, NULL, 4, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (52, '2023-04-16 21:59:58.525729', '2023-07-07 15:15:47.859987', 12, '新增', NULL, 'user:info:add', 2, NULL, 1, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (53, '2020-07-25 16:22:14.000000', '2021-03-03 10:36:00.000000', 11, '图片上传', NULL, 'space:info:page,space:info:list,space:info:info,space:info:add,space:info:delete,space:info:update,space:type:page,space:type:list,space:type:info,space:type:add,space:type:delete,space:type:update', 2, NULL, 1, NULL, 0, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (54, '2023-07-10 14:20:27.210000', '2023-07-11 18:15:41.750000', NULL, '异常页面', '/exception', NULL, 0, 'i-icon-park-outline-caution', 6, NULL, 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (55, '2023-07-10 14:26:49.347000', '2023-07-10 14:26:49.348000', 54, '403', '/exception/403', NULL, 1, 'i-icon-park-outline-wrong-user', 1, '/views/exception/403.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (56, '2023-07-10 14:27:44.111000', '2023-07-10 14:27:44.111000', 54, '404', '/exception/404', NULL, 1, 'i-icon-park-outline-close-one', 2, '/views/exception/404.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (57, '2023-07-10 14:28:32.210000', '2023-07-10 14:28:32.210000', 54, '500', '/exception/500', NULL, 1, 'i-icon-park-outline-link-cloud-faild', 3, '/views/exception/500.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (58, '2023-07-10 14:34:22.520000', '2023-07-11 18:15:39.676000', NULL, '结果页面', '/result', NULL, 0, 'i-icon-park-outline-doc-success', 7, NULL, 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (59, '2023-07-10 14:35:07.296000', '2023-07-10 14:35:07.296000', 58, '成功页', '/result/success', NULL, 1, 'i-icon-park-outline-check-one', 1, '/views/result/success.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (60, '2023-07-10 14:35:42.662000', '2023-07-10 14:35:42.662000', 58, '失败页', '/result/fail', NULL, 1, 'i-icon-park-outline-close-one', 2, '/views/result/fail.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (61, '2023-07-10 14:36:01.148000', '2023-07-10 14:36:01.148000', 58, '信息页', '/result/info', NULL, 1, 'i-icon-park-outline-info', 3, '/views/result/info.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (62, '2023-07-10 14:54:37.414000', '2023-07-11 18:15:33.777000', NULL, '关于项目', '/about', NULL, 1, 'i-icon-park-outline-lightning', 9, '/views/about/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (63, '2023-07-10 15:09:20.038000', '2023-07-11 18:15:37.648000', NULL, '外部页面', '/frame', NULL, 0, 'i-icon-park-outline-web-page', 8, NULL, 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (64, '2023-07-10 15:18:52.096000', '2023-07-10 15:40:06.768000', 63, 'Naive UI (内嵌)', '/frame/naiveui', NULL, 1, 'i-icon-park-outline-smiling-face', 1, '/views/frame/naiveui.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (65, '2023-07-10 15:23:49.687000', '2023-07-10 15:27:33.749000', 63, 'Naive UI (外链)', 'https://www.naiveui.com/zh-CN/light/', NULL, 1, 'i-icon-park-outline-upside-down-face', 2, NULL, 1, 1, 1);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (66, '2023-07-10 15:44:55.203000', '2023-07-10 15:44:55.203000', NULL, '功能示例', '/feature', NULL, 0, 'i-icon-park-outline-waterfalls-v', 4, NULL, 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (67, '2023-07-10 15:54:53.877000', '2023-07-10 15:54:59.254000', 66, '文件下载', '/feature/download', NULL, 1, 'i-icon-park-outline-download-two', 1, '/views/feature/download/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (68, '2023-07-10 16:18:17.958000', '2023-07-10 16:18:17.958000', 66, '右键菜单', '/feature/context-menus', NULL, 1, 'i-icon-park-outline-application-menu', 2, '/views/feature/context-menus/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (69, '2023-07-10 16:31:34.129000', '2023-07-10 16:31:34.129000', 66, '剪贴板', '/feature/copy', NULL, 1, 'i-icon-park-outline-copy', 3, '/views/feature/copy/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (70, '2023-07-10 16:45:54.150000', '2023-07-10 16:46:01.639000', 66, '打印', '/feature/print', NULL, 1, 'i-icon-park-outline-printer', 4, '/views/feature/print/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (71, '2023-07-10 16:49:33.705000', '2023-07-10 16:49:33.705000', 66, '水印', '/feature/watermark', NULL, 1, 'i-icon-park-outline-water-level', 5, '/views/feature/watermark/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (72, '2023-07-10 16:54:32.566000', '2023-07-10 16:54:32.566000', 66, '全屏', '/feature/fullscreen', NULL, 1, 'i-icon-park-outline-full-screen-two', 6, '/views/feature/fullscreen/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (73, '2023-07-11 18:16:24.267000', '2023-07-11 18:16:24.267000', NULL, '组件示例', '/comp', NULL, 0, 'i-icon-park-outline-components', 5, NULL, 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (74, '2023-07-11 18:18:01.315000', '2023-07-11 18:18:01.315000', 73, '图标', '/comp/icon', NULL, 1, 'i-icon-park-outline-application-two', 1, '/views/comp/icon/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (75, '2023-07-13 10:39:15.532000', '2023-07-13 10:39:15.532000', 73, '拖拽', '/comp/drag', NULL, 1, 'i-icon-park-outline-drag', 2, '/views/comp/drag/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (76, '2023-07-13 10:46:20.742000', '2023-07-13 10:46:20.742000', 73, '富文本', '/comp/richtext', NULL, 1, 'i-icon-park-outline-add-text', 3, '/views/comp/richtext/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (77, '2023-07-13 10:51:59.379000', '2023-07-13 10:53:34.711000', 73, '二维码', '/comp/qrcode', NULL, 1, 'i-icon-park-outline-two-dimensional-code', 4, '/views/comp/qrcode/index.vue', 1, 1, 0);
INSERT INTO `base_sys_menu` (`id`, `createTime`, `updateTime`, `parentId`, `name`, `router`, `perms`, `type`, `icon`, `orderNum`, `viewPath`, `keepAlive`, `isShow`, `isFrame`) VALUES (78, '2023-07-13 11:08:27.152000', '2023-07-13 11:08:59.226000', 73, '弹窗', '/comp/modal', NULL, 1, 'i-icon-park-outline-browser', 5, '/views/comp/modal/index.vue', 1, 1, 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
