import { DataElementPreferenceForInstitutionTypeInterface } from '../interfaces/baseline-preference/data-element-preference-for-institution-type-interface';
import { InstitutionTypeInterface } from '../interfaces/institution/institution-type-interface';

export class DataElementPreferenceForInstitutionType implements DataElementPreferenceForInstitutionTypeInterface {
  private _id: string | undefined = undefined;
  private _institutionType: InstitutionTypeInterface | undefined = undefined;
  private _consentState: number | undefined = undefined;
  private _userID: string | undefined = undefined;

  private constructor() {}

  public static create({
    id,
    institutionType,
    consentState,
    userID,
  }: {
    id: string;
    institutionType: InstitutionTypeInterface;
    consentState: number;
    userID: string;
  }): DataElementPreferenceForInstitutionType {
    const dataElementPreference = new DataElementPreferenceForInstitutionType();
    dataElementPreference._id = id;
    dataElementPreference._institutionType = institutionType;
    dataElementPreference._consentState = consentState;
    dataElementPreference._userID = userID;
    return dataElementPreference;
  }

  get id() {
    return this._id;
  }

  get institutionType() {
    return this._institutionType;
  }

  get consentState() {
    return this._consentState;
  }

  get userID() {
    return this._userID;
  }
}
