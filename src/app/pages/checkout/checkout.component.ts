import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StaticdataService } from '../../shared/services/staticdata.service';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartStateModel } from '../../store/cart/cart.model';
import { CartState } from '../../store/cart/cart.state';
import { CheckoutService } from './checkout.service';
import { Order } from './checkout.model';
import { ClearCartAfterSuccessfulOrder } from '../../store/cart/cart.action';
declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    DecimalPipe,
    CurrencyPipe,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  providers: [StaticdataService, CheckoutService],
})
export class CheckoutComponent {
  @ViewChild('horizontalStepper') horizontalStepper!: MatStepper;
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';
  billingForm!: FormGroup;
  deliveryForm!: FormGroup;
  paymentForm!: FormGroup;
  countries: { name: string; code: string }[] = [];
  months: { value: string; name: string }[] = [];
  years: string[] = [];
  deliveryMethods: { value: string; name: string; desc: string }[] = [];
  grandTotal = 0;
  orderDetails: Order = { orderId: '', createdAt: '', razorKey: '' };
  formBuilder = inject(FormBuilder);
  staticDataService = inject(StaticdataService);
  store = inject(Store);
  checkoutService = inject(CheckoutService);

  cartDetails$: Observable<CartStateModel> = this.store.select(
    CartState.getCart
  );
  RazorpayOptions = {
    description: 'YCompany Razor Payment',
    currency: 'INR',
    amount: 100000,
    name: '',
    key: '',
    image: 'https://i.imgur.com/FApqk3D.jpeg',
    prefill: {
      name: '',
      email: '',
      phone: '',
    },
    order_id: '',
    theme: {
      color: '#6466e3',
    },
    modal: {
      ondismiss: () => {
        console.log('dismissed');
      },
    },
    handler: (res: any) => {
      console.log(res);
    },
  };

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.countries = this.staticDataService.getCountries();
    this.months = this.staticDataService.getMonths();
    this.years = this.staticDataService.getYears();
    this.deliveryMethods = this.staticDataService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: '',
      company: '',
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: '',
      zip: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required],
    });
    this.cartDetails$.subscribe((x) => {
      this.grandTotal = +x.totalPrice;
    });
  }

  checkout() {
    this.checkoutService
      .createOrder(this.grandTotal)
      .subscribe((order: Order) => {
        console.log(order);
        this.orderDetails.createdAt = order.createdAt;
        this.orderDetails.orderId = order.orderId;
        this.orderDetails.razorKey = order.razorKey;
        this.payNow();
      });
  }

  // this will trigger the razorpay model for payment and call the razorpay api on payment submission
  payNow() {
    this.RazorpayOptions.key = this.orderDetails.razorKey;
    this.RazorpayOptions.order_id = this.orderDetails.orderId;
    this.RazorpayOptions.amount = this.grandTotal;
    this.RazorpayOptions.name =
      this.billingForm.get('firstName')?.value +
      ' ' +
      this.billingForm.get('lastName')?.value;

    this.RazorpayOptions.prefill.name = this.RazorpayOptions.name;
    this.RazorpayOptions.prefill.email =
      this.billingForm.get('email')?.value || '';
    this.RazorpayOptions.prefill.phone =
      this.billingForm.get('phone')?.value || '';

    this.RazorpayOptions.handler = this.paymentResponseHandler.bind(this);
    Razorpay.open(this.RazorpayOptions);
  }

  paymentResponseHandler() {
    this.store.dispatch(new ClearCartAfterSuccessfulOrder());
    this.router.navigate(['order'], { relativeTo: this.route });
  }
}
