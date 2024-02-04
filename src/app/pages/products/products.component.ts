import { Component, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardModule } from '@progress/kendo-angular-layout';
import { CurrencyPipe } from '@angular/common';

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
  imports: [CardModule, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

  public $favorites = signal<Product[]>([]);
  public $products = computed(() => {
    return this.$productsAPI()?.filter((p) =>
      p.title.toLowerCase().includes(this.$searchFilter())
    );
  });

  private http = inject(HttpClient);
  private $searchFilter = signal<string>('');
  private $productsAPI = toSignal(
    this.http.get<Product[]>('https://fakestoreapi.com/products')
  );

  constructor() {
    effect(() => {
      if (this.$favorites().length >= 3) {
        document.body.classList.add('red');
      }
    });
  }

  addFavorite(product: Product) {
    this.$favorites.update((p) => [...p, product]);
  }

  clearFavorites(): void {
    this.$favorites.set([]);
  }

  updateFilter(filter: string) {
    const filterValue = filter.length > 3 ? filter : '';
    this.$searchFilter.set(filterValue);
  }
}
