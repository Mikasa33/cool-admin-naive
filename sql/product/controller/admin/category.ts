import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProductCategoryEntity } from '../../entity/category';
import { ProductCategoryService } from '../../service/category';

/**
 * 文章分类
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProductCategoryEntity,
  service: ProductCategoryService,
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
export class ProductCategoryController extends BaseController {
  @Inject()
  productCategoryService: ProductCategoryService;
}
