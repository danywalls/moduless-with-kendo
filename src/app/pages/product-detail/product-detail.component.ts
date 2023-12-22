import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {CurrencyPipe, JsonPipe} from "@angular/common";
import {CardModule} from "@progress/kendo-angular-layout";
import {Product} from "../products/products.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    JsonPipe,
    CardModule,
    CurrencyPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  route = inject(ActivatedRoute)
  http = inject(HttpClient);


    $product = toSignal(this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`)
      })
    ));
}
