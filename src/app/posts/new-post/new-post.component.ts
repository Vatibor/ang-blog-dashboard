import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {
  permalink: string = ''
  imgSrc: any = './assets/placeholder-image.png'
  selectedImg: any
  categories: Array<any> | undefined

  postForm: FormGroup
  constructor(private categoryService: CategoriesService, private fb: FormBuilder) {

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required]
    })

  }

  ngOnInit() {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val
    })
    this.postForm.controls['permalink'].disable();
  }

  get fc(){
    return this.postForm.controls
  }


  onTitleChanged($event: KeyboardEvent) {
    // console.log(($event.target as HTMLInputElement).value)
    const title = ($event.target as HTMLInputElement).value
    // with regex pattern changed all space in the string
    this.permalink = title.replace(/\s/g, "-")
  }

  // showPreview($event: Event) {
  //
  //   const reader = new FileReader()
  //   reader.onload = (e) => {
  //
  //     this.imgSrc = e.target.result
  //   }
  //
  //   reader.readAsDataURL($event.target.files[0])
  // }

  showPreview(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.imgSrc = e.target.result as string;
        }
      };

      reader.readAsDataURL(file);
      this.selectedImg = file
    }
  }

}
