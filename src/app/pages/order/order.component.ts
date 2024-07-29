import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { OrderService } from './order.service';
import { OrderDetails } from './order.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe],
  providers: [OrderService, DatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  displayedColumns: string[] = [
    'Order ID',
    'Date',
    'Payment',
    'Fulfillment',
    'Total',
  ];
  orderDetails: OrderDetails[] = [];
  ELEMENT_DATA: Partial<OrderDetails>[] = [];
  orderService = inject(OrderService);
  datePipe = inject(DatePipe);

  ngOnInit() {
    this.orderService.getOrderDetails().subscribe((data: OrderDetails[]) => {
      this.orderDetails = data;
      this.createTableData();
    });
  }

  createTableData() {
    this.ELEMENT_DATA = this.orderDetails.map((data) => {
      let createdAt =
        this.datePipe.transform(
          +data.createdAt * 1000,
          'dd/MM/yyyy HH:mm:ss'
        ) || '';
      let orderId = data.orderId?.split('_')[1];
      return {
        orderId,
        createdAt,
        totalPrice: data.totalPrice,
        status: data.status ? 'Paid' : 'Unpaid',
        fulfillmentStatus: 'In progress',
      };
    });
  }
}
