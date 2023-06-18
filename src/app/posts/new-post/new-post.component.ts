import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/post";
import {PostsService} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";
import {identity} from "rxjs";

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

  // @ts-ignore
  postForm: FormGroup
  post: any

  formStatus: string = 'Add New'
  docId: string | undefined

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute) {

    this.route.queryParams.subscribe(val => {
      this.docId = val['id']

      if(this.docId){
        this.postService.loadOneData(val['id']).subscribe(post => {
          // console.log(post)

          this.post = post

          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(10)]],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required]
          })

          this.imgSrc = this.post.postImgPath
          this.formStatus = 'Edit'
          this.postForm.controls['permalink'].disable();
        })
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required]
        })
        this.postForm.controls['permalink'].disable();
      }

    })

  // TODO 7:19:14
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val
    })

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

  onSubmit() {
    // console.log(this.postForm.value)

    let splitted = this.postForm.value.category.split('-')

    const postData: Post = {
      title: this.postForm.value.title,
      // permalink: this.postForm.value.permalink,
      permalink: this.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    // console.log(postData)
    this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId)
    this.postForm.reset()
    this.imgSrc = './assets/placeholder-image.png'
  }

}
