import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { SearchCriteriaModel } from '../../../store/products/products.model';
import { GetProductListonMenu } from '../../../store/products/products.action';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatMenuModule, MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  menuOptions: string[] = ['Sale', 'Ladies', 'Men', 'Kids'];
  searchedValue: SearchCriteriaModel = { searchedText: '', selectedMenu: '' };
  public store = inject(Store);

  ngOnInit() {}

  showRelatedProducts(selectedMenu: string) {
    this.searchedValue.selectedMenu = selectedMenu;
    this.store.dispatch(new GetProductListonMenu(this.searchedValue));
  }
}
