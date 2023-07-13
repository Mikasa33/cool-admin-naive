import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ProductProductEntity } from '../../entity/product';
import { ProductProductService } from '../../service/product';

/**
 * 商品
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ProductProductEntity,
  service: ProductProductService,
  pageQueryOp: {
    keyWordLikeFields: ['a.title'],
    fieldEq: ['a.sale'],
    where: (ctx: any) => {
      return [
        ['a.createUserId = :createUserId', { createUserId: ctx.admin.userId }],
      ];
    },
  },
  listQueryOp: {
    fieldEq: ['a.sale'],
    where: (ctx: any) => {
      return [
        ['a.createUserId = :createUserId', { createUserId: ctx.admin.userId }],
      ];
    },
  },
  insertParam: ctx => {
    return {
      createUserId: ctx.admin.userId,
    };
  },
})
export class ProductProductController extends BaseController {
  @Inject()
  productProductService: ProductProductService;
}
