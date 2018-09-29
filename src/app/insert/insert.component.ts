import { Component } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent {
  count;
  posts: any[]
  flag=true;
  private url = 'http://localhost:6030/api/todo';
  constructor(private http: Http) {
    this.all();
    this.http.get(this.url + '/0')                                        ////update and get data
      .subscribe(response => {
        this.count = response.json().length;
      })
  }
  createPost(input: HTMLInputElement) {
    let post = { title: input.value, status: 0 }
    this.http.post(this.url, post)            /////Create data
      .subscribe(response => {
        this.posts.push(response.json())
        console.log(response.json())
      })
    input.value = '';
    this.count++;
  }


  deletePost(post) {
    if (post.status == 0) {
      this.count--;
    }
    console.log(post);
    this.http.delete(this.url + '/' + post.todo_id).subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      console.log(response)

    })
  }

  updatePost(post) {
    if (post.status == 0) {
      this.count--;
      console.log('status changing to 0');
      this.http.patch(this.url + '/' + post.todo_id, { status: 1 }).subscribe(response => {                                 //////Updatedata
        console.log(response.json())
        this.all();
      });
    }
    if (post.status == 1) {
      this.count++;
      console.log('status changing to 1');
      this.http.patch(this.url + '/' + post.todo_id, { status: 0 }).subscribe(response => {                                 //////Updatedata
        console.log(response.json())
        this.all();
      });
    }

  }

  all() {
    this.http.get(this.url)                                        ////update and get data
      .subscribe(response => {
        this.posts = response.json();
        console.log(response.json())
      })
  }

  active() {
    this.http.get(this.url + '/0')                                        ////update and get data
      .subscribe(response => {
        this.posts = response.json();
        console.log(response.json())
      })
  }
  complete() {
    this.http.get(this.url + '/1')                                        ////update and get data
      .subscribe(response => {
        this.posts = response.json();
        console.log(response.json())
      })
  }

  clearcompleted() {
    this.http.delete(this.url + '/id/1').subscribe(response => {
      this.http.get(this.url)                                        ////update and get data
        .subscribe(response => {
          this.posts = response.json();
          console.log(response.json())
        })

    })
  }

  togle(index) {
    this.posts[index].flag = !this.posts[index].flag ;  
  }

  edit(post){
    this.http.patch(this.url + '/' + post.todo_id, { title: post.title , status:post.status}).subscribe(response => {                                 //////Updatedata
      console.log(response.json())
      this.all();
    });
  }

}
