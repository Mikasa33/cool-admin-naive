import { BaseEntity } from '@cool-midway/core';
import { Column, Index, Entity } from 'typeorm';

/**
 * 商品分类
 */
@Entity('product_category')
export class ProductCategoryEntity extends BaseEntity {
  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '排序', default: 0 })
  orderNum: number;

  @Column({ comment: '状态 0：禁用 1：启用', default: 1, type: 'tinyint' })
  status: number;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Index()
  @Column({ comment: '创建人 ID' })
  createUserId: number;
}
