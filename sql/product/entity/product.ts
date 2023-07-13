import { BaseEntity } from '@cool-midway/core';
import { Column, Index, Entity } from 'typeorm';

/**
 * 商品
 */
@Entity('product_product')
export class ProductProductEntity extends BaseEntity {
  @Column({ comment: '标题' })
  title: string;

  @Column({ comment: '描述' })
  description: string;

  @Column({ comment: '图片', type: 'text' })
  imgs: string;

  @Column({ comment: '分类 ID' })
  categoryId: number;

  @Column({ comment: '上架状态 0：下架 1：上架', default: 1, type: 'tinyint' })
  sale: number;

  @Column({ comment: '价格' })
  price: number;

  @Column({ comment: '库存', default: 0 })
  stock: number;

  @Column({ comment: '详情', type: 'text', nullable: true })
  content: string;

  @Column({ comment: '售后说明', nullable: true })
  afterSale: string;

  @Column({ comment: '状态 0：不限购 1：限购', default: 0, type: 'tinyint' })
  limit: number;

  @Column({ comment: '限购数量', nullable: true })
  limitNum: number;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Index()
  @Column({ comment: '创建人 ID' })
  createUserId: number;
}
