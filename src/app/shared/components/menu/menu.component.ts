import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchCriteriaModel } from '../../../store/products/products.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    TitleCasePipe,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  menuOptions: string[] = ['sale', 'ladies', 'men', 'kids'];
  searchedValue: SearchCriteriaModel = { searchedText: '', selectedMenu: '' };
  public router = inject(Router);

  ngOnInit() {}
}
