export interface PreferenceCompletenessRepositoryInterface {
  getBy(userId: string): Promise<boolean>;
}
