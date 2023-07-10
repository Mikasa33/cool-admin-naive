import { BaseEntity } from '@cool-midway/core';
import { Column, Entity } from 'typeorm';

/**
 * 菜单
 */
@Entity('base_sys_menu')
export class BaseSysMenuEntity extends BaseEntity {
  @Column({ comment: '父菜单ID', type: 'bigint', nullable: true })
  parentId: number;

  @Column({ comment: '菜单名称' })
  name: string;

  @Column({ comment: '菜单地址', nullable: true })
  router: string;

  @Column({ comment: '权限标识', nullable: true })
  perms: string;

  @Column({
    comment: '类型 0-目录 1-菜单 2-按钮',
    default: 0,
    type: 'tinyint',
  })
  type: number;

  @Column({ comment: '图标', nullable: true })
  icon: string;

  @Column({ comment: '排序', default: 0 })
  orderNum: number;

  @Column({ comment: '视图地址', nullable: true })
  viewPath: string;

  @Column({ comment: '路由缓存', default: true })
  keepAlive: boolean;

  // 父菜单名称
  parentName: string;

  @Column({ comment: '是否显示', default: true })
  isShow: boolean;

  @Column({ comment: '是否外链', default: false })
  isFrame: boolean;
}
