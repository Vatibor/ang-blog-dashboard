import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {Category} from "../models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  categoryArray: Array<any> | undefined
  formCategory: string | undefined
  formStatus: string = 'Add'
  categoryId: string | undefined

  constructor(private categoryService: CategoriesService) {
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe( val => {
      console.log(val)
      this.categoryArray = val
    })
  }

  onSubmit(formData: any) {

    let categoryData: Category = {
      category: formData.value.category
    }

    if(this.formStatus == 'Add'){
      this.categoryService.saveData(categoryData)
      formData.reset()
    } else if (this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId, categoryData)
      formData.reset()
      this.formStatus = 'Add'
    }
  }

  onEdit(category: any, id: string){
    // console.log(category)
    this.formCategory = category
    this.formStatus = 'Edit'
    this.categoryId = id
  }

  onDelete(id: string | undefined){
    this.categoryService.deleteData(id)
  }



}
