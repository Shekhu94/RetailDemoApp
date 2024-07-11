import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ProfileStateModel } from './profile.model';

//actions
import { AddProfile } from './profile.action';

//define the state
@State<ProfileStateModel>({
  name: 'profie',
  defaults: {
    displayName: '',
    isSignedIn: false,
  },
})
//add this this to the app.config.ts provider -- can create more than one state
@Injectable()
export class ProfileState {
  constructor() {}

  //create the post action
  @Action(AddProfile) addProfile(
    ctx: StateContext<ProfileStateModel>,
    action: AddProfile
  ) {
    const state = ctx.getState();
    ctx.setState({ ...state, ...action.payload });
  }

  //create the profile selector
  @Selector()
  static getProfileInfo(state: ProfileStateModel) {
    return state;
  }
}
