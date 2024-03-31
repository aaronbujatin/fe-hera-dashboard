import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Spinkit } from 'ng-http-loader';
import { Product } from 'src/app/model/product.model';
import { ProductServiceService } from 'src/app/service/product-service.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductServiceService,
    private toast: NgToastService) {

  }

  public spinkit = Spinkit;

  ngOnInit(): void {
    this.getAllProducts()
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      descriptions: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });



  }

  products: Product[]
  totalPageNumber: number;
  currentPage = 0;
  pageNumber: 0;
  itemsSize: 10;
  totalProductElements: number;
  contentNumber: number;
  startItemIndex: number;
  endItemIndex: number;

  public getAllProducts() {
    this.productService.getAllProducts(this.currentPage, this.itemsSize).subscribe(
      (response: any) => {
        this.products = response.content;
        this.totalPageNumber = response.totalPages;
        this.totalProductElements = response.totalElements
        this.contentNumber = response.content.length
        console.log(response);
        console.log(this.totalPageNumber);
        this.calculateRange(this.currentPage)
      }, (error) => {
        console.log(error);
      }
    )
  }

  submitted = false;

  saveProduct() {
    const productData = this.productForm.value;
    const descriptions = productData.descriptions.split(',').map((tag: string) => tag.trim());
    const imageUrl = productData.imageUrl.split(',').map((tag: string) => tag.trim());

    const product: Product = {
      id: null,
      name: productData.name,
      price: productData.price,
      imageUrl: imageUrl,
      descriptions: descriptions,
      stock: productData.stock,
      brand: productData.brand,
      category: productData.category,

    }


    this.submitted = true;
    if (this.productForm.valid) {

      this.productService.saveProduct(product).subscribe(
        (response) => {
          console.log(response);
          this.getAllProducts()
          this.productForm.reset();
          this.showSuccess();
          this.closeModal();
        }, (error) => {
          console.log(error);
        }
      )
    }



  }

  @ViewChild('formModal') formModal: any;

  showSuccess() {
    this.toast.success({ detail: "Success", summary: 'Product successfully added', position: 'bottomRight', duration: 5000 });

  }

  closeModal() {
    const toggleElement = document.querySelector('[data-modal-toggle="crud-modal"]');
    if (toggleElement) {
      toggleElement.dispatchEvent(new Event('click'));
    }
  }



  onPreviousClick() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllProducts()
    }
  }

  onNextClick() {
    this.currentPage++;
    if (this.currentPage <= this.totalPageNumber) {
      this.currentPage
      this.getAllProducts()
    }
  }

  calculateRange(pageNumber: number) {
    this.startItemIndex = ((pageNumber + 1) * 10) - 9
    this.endItemIndex = (pageNumber + 1) * 10

  }



  product: Product
  descriptions: string[]
  public viewProduct(id: number) {
    this.productService.getProductById(id).subscribe(
      (response: Product) => {
        this.product = response
        console.log(this.product);
        console.log(id);

      }
    )
  }


}
