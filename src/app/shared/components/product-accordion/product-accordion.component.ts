import { Component } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-product-accordion',
  standalone: true,
  imports: [CdkAccordionModule, MatIconModule],
  templateUrl: './product-accordion.component.html',
  styleUrl: './product-accordion.component.scss',
})
export class ProductAccordionComponent {
  items = ['Description & Fit', 'Materials', 'Care'];
  expandedIndex = 0;
}
