import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';
import { MenuComponent } from '../menu/menu.component';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { ProfileState } from '../../../store/profile/profile.state';
import { ProfileStateModel } from '../../../store/profile/profile.model';
import { CommonModule } from '@angular/common';
import { SearchCriteriaModel } from '../../../store/products/products.model';
import { GetProductListonSearch } from '../../../store/products/products.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
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
  searchControl!: FormControl;
  searchedValue: SearchCriteriaModel = { searchedText: '', selectedMenu: '' };
  constructor() {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait for 300ms pause in typing
        distinctUntilChanged() // Only emit if the value has changed
      )
      .subscribe((searchValue) => {
        console.log('Search term:', searchValue);
        this.searchedValue.searchedText = searchValue;
        this.store.dispatch(new GetProductListonSearch(this.searchedValue));
      });
  }

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
