import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  PopupRequest,
  RedirectRequest,
  EventMessage,
  EventType,
} from '@azure/msal-browser';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { filter, Subject, takeUntil } from 'rxjs';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AddProfile } from './store/profile/profile.action';
import { ProfileStateModel } from './store/profile/profile.model';
import { MsalloginService } from './shared/services/msallogin.service';
import { Meta, Title } from '@angular/platform-browser';

type ProfileType = {
  displayName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MsalModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'yCompany';
  loginDisplay = false;
  profile: ProfileType | undefined;
  private readonly _destroying$ = new Subject<void>();
  profileInfo!: ProfileStateModel;

  public store = inject(Store);

  constructor(
    private msalloginService: MsalloginService,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient,
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // to improve SEO, we are adding Tags
    this.titleService.setTitle('yCompany -An Ecommerce solution for everyone');
    this.meta.addTag({
      name: 'keywords',
      content: 'ecommerce, ycompany, sale, men, women, ladies, kids, dress',
    });

    this.authService.handleRedirectObservable().subscribe();
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  setLoginDisplay() {
    let accounts = this.authService.instance.getAllAccounts()[0];
    let profileInfo = new ProfileStateModel();
    profileInfo.displayName = accounts ? accounts.name : '';
    profileInfo.isSignedIn = accounts ? true : false;
    this.store.dispatch(new AddProfile(profileInfo));
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  getProfile() {
    this.http.get(environment.apiConfig.uri).subscribe((profile) => {
      this.profile = profile;
      let profileInfo = new ProfileStateModel();
      profileInfo.displayName = this.profile.displayName;
      profileInfo.isSignedIn = true;
      this.store.dispatch(new AddProfile(profileInfo));
    });
  }

  loginRedirect() {
    this.msalloginService.loginRedirect();
  }

  loginPopup() {
    this.msalloginService.loginPopup();
  }

  logout(popup?: boolean) {
    this.msalloginService.logout(popup);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
