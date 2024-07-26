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
import { RouterModule } from '@angular/router';
import { StaticdataService } from '../../shared/services/staticdata.service';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartStateModel } from '../../store/cart/cart.model';
import { CartState } from '../../store/cart/cart.state';
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
  providers: [StaticdataService],
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
  formBuilder = inject(FormBuilder);
  staticDataService = inject(StaticdataService);
  store = inject(Store);

  cartDetails$: Observable<CartStateModel> = this.store.select(
    CartState.getCart
  );
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
    console.log(this.billingForm);
    this.payNow();
  }

  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 100000,
      name: 'Shekhar Saini',
      key: 'rzp_test_GCT0rSIkStB0uH',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: 'Shekhar Saini',
        email: 'shekhu.93hhh@gmail.com',
        phone: '9898989898',
      },
      theme: {
        color: '#6466e3',
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        },
      },
    };

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    };

    const failureCallback = (e: any) => {
      console.log(e);
    };

    Razorpay.open(RozarpayOptions, successCallback, failureCallback);
  }
}
