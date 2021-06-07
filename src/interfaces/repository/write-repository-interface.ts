export interface WriteRepositoryInterface {
  save(entity: any): void;
  nextIdentity?(): string;
  getById?(id: string): any;
  getBy?(entity: any): any;
}
