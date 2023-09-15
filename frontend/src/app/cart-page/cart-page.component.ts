import { Component, OnInit } from '@angular/core';
import { addproducts, details } from '../datatype';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {


  productlist: any[] | undefined
  // details: details | undefined

  constructor(private service: ProductsService, private router: Router) { }


  ngOnInit(): void {
    let cart = localStorage.getItem('cart');
    if (cart) {
      const cartitems = JSON.parse(cart);
      this.productlist = cartitems;
    }

  }


  removetocart(id: number) {
    this.service.removecart(id);
  }

}
