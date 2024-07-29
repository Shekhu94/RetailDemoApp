import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { ProfileState } from '../../../store/profile/profile.state';
import { ProfileStateModel } from '../../../store/profile/profile.model';
import { CommonModule } from '@angular/common';
import { SearchCriteriaModel } from '../../../store/products/products.model';
import { GetProductListonSearch } from '../../../store/products/products.action';
import { CartState } from '../../../store/cart/cart.state';
import { RouterLink } from '@angular/router';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatBadgeModule,
    MenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('blink', [
      transition('* => true', [
        animate(
          '1s',
          keyframes([
            style({ opacity: 1 }),
            style({ opacity: 0 }),
            style({ opacity: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  @Output() loginEvent = new EventEmitter<string>();
  @Output() logoutEvent = new EventEmitter<string>();
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  public sidenavMenuItems: Array<any> = [];
  displayName: string | undefined = '';
  search: String = '';
  isSignedIn: boolean = false;
  blinkState: boolean = false;
  itemCount: number = 0;
  public store = inject(Store);

  // this will select the user profile info from the state
  userProfileInfo$: Observable<ProfileStateModel> = this.store.select(
    ProfileState.getProfileInfo
  );

  // this will select the total products inthe cart from the state
  itemsInCartCount$: Observable<number> = this.store.select(
    CartState.getProductsInCartCount
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
    this.itemsInCartCount$.subscribe((x) => {
      this.itemCount = x;
      if (this.itemCount > 0) {
        this.startShake();
      }
    });
  }

  ngOnInit() {
    this.sidenavMenuItems = [];
    this.userProfileInfo$.subscribe((payload) => {
      this.displayName = payload.displayName;
      this.isSignedIn = payload.isSignedIn;
    });
  }

  //this method will provide shake animation to the cart icon if items are added or deleted from the cart
  startShake() {
    this.blinkState = true;
    setTimeout(() => {
      this.blinkState = false; // Reset the animation state
    }, 500); // Adjust duration as needed
  }

  triggerLoginFlow(value: string) {
    this.loginEvent.emit(value);
  }

  triggerLogoutFlow(value: string) {
    this.logoutEvent.emit(value);
  }
}
