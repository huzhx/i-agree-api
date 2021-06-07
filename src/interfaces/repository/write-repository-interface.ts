export interface WriteRepositoryInterface {
  save<Type>(entity: Type): void;
  nextIdentity?(): string;
  getById<Type>(id: Type): Type;
}
