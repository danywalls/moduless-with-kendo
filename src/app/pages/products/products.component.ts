import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {toSignal} from "@angular/core/rxjs-interop";
import {CardModule} from "@progress/kendo-angular-layout";
import {CurrencyPipe} from "@angular/common";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
};


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CardModule,
    CurrencyPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  http = inject(HttpClient);
  products = toSignal(
    this.http.get<Product[]>('https://fakestoreapi.com/products'),
  );

}
