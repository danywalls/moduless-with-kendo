import {
  Component,
  inject,
  Injector,
  Input,
  OnInit,
  runInInjectionContext,
  Signal,
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { CardModule } from '@progress/kendo-angular-layout';
import { Product } from '../products/products.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CardModule, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  @Input() id!: string;
  $product!: Signal<Product | undefined>;
  #http = inject(HttpClient);
  #injector = inject(Injector);

  ngOnInit(): void {
    this.getProductDetail();
  }

  private getProductDetail() {
    runInInjectionContext(this.#injector, () => {
      this.$product = toSignal(
        this.#http.get<Product>(`https://fakestoreapi.com/products/${this.id}`),
      );
    });
  }
}
