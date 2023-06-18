import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router) { }

  uploadImage(selectedImage: any, postData: any){
    const filePath = `postIMG/${Date.now()}`
    // console.log(postData)

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log("Upload successfully!")

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL

        this.saveData(postData)
      })
    })
  }

  saveData(postData: any){
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Data Insert Successfully')
      this.router.navigate(['/posts'])
    })
  }

  loadData(){
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}

        })
      })
    )
  }

}
