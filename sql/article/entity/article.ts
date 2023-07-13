import { BaseEntity } from '@cool-midway/core';
import { Column, Index, Entity } from 'typeorm';

/**
 * 文章
 */
@Entity('article_article')
export class ArticleArticleEntity extends BaseEntity {
  @Column({ comment: '标题' })
  title: string;

  @Column({ comment: '作者' })
  author: string;

  @Column({ comment: '分类 ID' })
  categoryId: number;

  @Column({ comment: '内容', type: 'text', nullable: true })
  content: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Index()
  @Column({ comment: '创建人 ID' })
  createUserId: number;
}
