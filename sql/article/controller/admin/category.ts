import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ArticleCategoryEntity } from '../../entity/category';
import { ArticleCategoryService } from '../../service/category';

/**
 * 文章分类
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ArticleCategoryEntity,
  service: ArticleCategoryService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['a.status'],
    where: (ctx: any) => {
      return [
        ['a.createUserId = :createUserId', { createUserId: ctx.admin.userId }],
      ];
    },
  },
  listQueryOp: {
    fieldEq: ['a.status'],
    where: (ctx: any) => {
      return [
        ['a.createUserId = :createUserId', { createUserId: ctx.admin.userId }],
      ];
    },
  },
  insertParam: (ctx: any) => {
    return {
      createUserId: ctx.admin.userId,
    };
  },
})
export class ArticleCategoryController extends BaseController {
  @Inject()
  articleCategoryService: ArticleCategoryService;
}
