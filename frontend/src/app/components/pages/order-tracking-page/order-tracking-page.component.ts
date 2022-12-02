import { IfStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-tracking-page',
  templateUrl: './order-tracking-page.component.html',
  styleUrls: ['./order-tracking-page.component.scss'],
})
export class OrderTrackingPageComponent {
  order!: Order;
  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {
    const params = activatedRoute.snapshot.params;
    if (!params.orderId) return;
    orderService.trackOrderById(params.orderId).subscribe((order) => {
      this.order = order;
    });
  }
}
