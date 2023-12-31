import { Component, computed, effect, inject, signal } from '@angular/core';
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
  $favorites = signal<Product[]>([]);
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

  constructor() {
    effect(() => {
      if (this.$favorites().length > 3) {
        console.log('reach limit');
      }
    });
  }

  addFavorite(product: Product) {
    this.$favorites.update((p) => [...p, product]);
    console.log(this.$favorites());
  }

  clearFavorites(): void {
    this.$favorites.set([]);
  }

  updateFilter(filter: string) {
    if (filter.length > 3) {
      this.$searchFilter.set(filter);
    } else {
      this.$searchFilter.set('');
    }
  }
}
