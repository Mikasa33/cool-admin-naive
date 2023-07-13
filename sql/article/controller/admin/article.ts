import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { ArticleArticleEntity } from '../../entity/article';
import { ArticleArticleService } from '../../service/article';

/**
 * 文章
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ArticleArticleEntity,
  service: ArticleArticleService,
  pageQueryOp: {
    keyWordLikeFields: ['a.title'],
    where: (ctx: any) => {
      return [
        ['a.createUserId = :createUserId', { createUserId: ctx.admin.userId }],
      ];
    },
  },
  listQueryOp: {
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
export class ArticleArticleController extends BaseController {
  @Inject()
  articleArticleService: ArticleArticleService;
}
