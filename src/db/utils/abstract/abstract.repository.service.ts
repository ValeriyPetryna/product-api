import { AbstractModel } from './abstract.model';

export abstract class AbstractRepositoryService<
  T extends AbstractModel<T, E>,
  E,
> {
  protected getEntity(model: T): E {
    if (!model) {
      return undefined;
    }
    return model.modelToEntity(model);
  }
}
