import { AfterViewInit, Component, Input } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { AccordionModel } from './product-accordion.model';
@Component({
  selector: 'app-product-accordion',
  standalone: true,
  imports: [CdkAccordionModule, MatIconModule],
  templateUrl: './product-accordion.component.html',
  styleUrl: './product-accordion.component.scss',
})
export class ProductAccordionComponent implements AfterViewInit {
  items = [];
  expandedIndex = 0;
  @Input() AccordionData: AccordionModel[] = [];
  ngAfterViewInit() {
    console.log(this.AccordionData);
  }
}
