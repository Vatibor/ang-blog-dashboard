import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {FetchBackend} from "@angular/common/http";

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit{

  postArray: Array<any> | undefined

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.postService.loadData().subscribe(val => {
      console.log(val)
      this.postArray = val
    })
  }

  onDelete(postimgPath: any, id: string) {
    this.postService.deleteImage(postimgPath, id)
  }

  onFeatured(id: string, value: boolean) {
    const featuredData = {
      isFeatured: value
    }

    this.postService.markFeatured(id, featuredData)
  }
}
