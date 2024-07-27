import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  Order: number;
  Date: number;
  Payment: number;
  Fulfillment: string;
  Total: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Order: 1,
    Date: 1212,
    Payment: 129,
    Fulfillment: 'In progress',
    Total: '129',
  },
  {
    Order: 2,
    Date: 1212,
    Payment: 129,
    Fulfillment: 'In progress',
    Total: '129',
  },
];

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  displayedColumns: string[] = [
    'Order',
    'Date',
    'Payment',
    'Fulfillment',
    'Total',
  ];
  dataSource = ELEMENT_DATA;
}
