import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardModule } from '@progress/kendo-angular-layout';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  imports: [CardModule, CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  #http = inject(HttpClient);

  private $searchFilter = signal<string>('');

  private $productsAPI = toSignal(
    this.#http.get<Product[]>('https://fakestoreapi.com/products'),
  );
  $products = computed(() => {
    return this.$productsAPI()?.filter((p) =>
      p.title.toLowerCase().includes(this.$searchFilter()),
    );
  });

  updateFilter(filter: string) {
    if (filter.length > 3) {
      this.$searchFilter.set(filter);
    } else {
      this.$searchFilter.set('');
    }
  }
}
