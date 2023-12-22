import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProductsComponent} from "./pages/products/products.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path:'products/:id',
    loadComponent: () =>
        import('./pages/product-detail/product-detail.component').then(c => c.ProductDetailComponent)
  }
];

