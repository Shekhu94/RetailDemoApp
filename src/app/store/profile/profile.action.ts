import { ProfileStateModel } from './profile.model';

export class AddProfile {
  static readonly type = '[Profile page] AddProfile';
  constructor(public payload: ProfileStateModel) {}
}
