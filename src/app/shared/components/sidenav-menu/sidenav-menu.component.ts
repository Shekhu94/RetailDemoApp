import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav-menu',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  providers: [],
})
export class SidenavMenuComponent implements OnInit {
  @Input('menuItems') menuItems: any[] = [];
  @Input('menuParentId') menuParentId: any;
  parentMenu: Array<any> = [];

  constructor() {}

  ngOnInit() {
    this.parentMenu = this.menuItems.filter(
      (item) => item.parentId == this.menuParentId
    );
  }

  onClick(menuId: any) {}
}
