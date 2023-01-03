import { Model } from 'sequelize-typescript';

export abstract class AbstractModel<T, E> extends Model<T> {
  abstract modelToEntity(model: T): E;
}
