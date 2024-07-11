import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';
import { MenuComponent } from '../menu/menu.component';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProfileState } from '../../../store/profile/profile.state';
import { ProfileStateModel } from '../../../store/profile/profile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    FormsModule,
    SidenavMenuComponent,
    MenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() loginEvent = new EventEmitter<string>();
  @Output() logoutEvent = new EventEmitter<string>();
  public sidenavMenuItems: Array<any> = [];
  displayName: string | undefined = '';
  isSignedIn: boolean = false;
  search: String = '';
  public store = inject(Store);
  userProfileInfo$: Observable<ProfileStateModel> = this.store.select(
    ProfileState.getProfileInfo
  );

  ngOnInit() {
    this.sidenavMenuItems = [];
    this.userProfileInfo$.subscribe((payload) => {
      this.displayName = payload.displayName;
      this.isSignedIn = payload.isSignedIn;
    });
  }

  triggerLoginFlow(value: string) {
    this.loginEvent.emit(value);
  }

  triggerLogoutFlow(value: string) {
    this.logoutEvent.emit(value);
  }
}
