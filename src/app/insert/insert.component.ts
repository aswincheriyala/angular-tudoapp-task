import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent {
  count;
  posts: any[]
  flag=true;

  constructor(private service:TodoService) {
    
    this.all();

    this.service.get('/0')                                        ////update and get data
      .subscribe(response => {
        this.count = response.json().length;
      })
  }
  createPost(input: HTMLInputElement) {
    let post = { title: input.value, status: 0 }
    this.service.post(post)            /////Create data
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
    this.service.delete('/'+post.todo_id).subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      console.log(response)

    })
  }

  updatePost(post) {
    if (post.status == 0) {
      this.count--;
      console.log('status changing to 0');
      this.service.patch(post.todo_id, ({ status: 1 })).subscribe(response => {                                 //////Updatedata
        console.log(response.json())
        this.all();
      });
    }
    if (post.status == 1) {
      this.count++;
      console.log('status changing to 1');
      this.service.patch(post.todo_id, ({ status: 0 })).subscribe(response => {                                 //////Updatedata
        console.log(response.json())
        this.all();
      });
    }

  }

  all() {
    this.service.get('')                                        ////update and get data
      .subscribe(response => {
        this.posts = response.json();
        console.log(response.json())
      })
  }

  active() {
    this.service.get('/0')                                        ////update and get data
      .subscribe(response => {
        this.posts = response.json();
        console.log(response.json())
      })
  }
  complete() {
    this.service.get('/1')                                        ////update and get data
      .subscribe(response => {
        this.posts = response.json();
        console.log(response.json())
      })
  }

  clearcompleted() {
    this.service.delete('/id/1').subscribe(response => {
      this.service.get('')                                        ////update and get data
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
    this.service.patch('/' + post.todo_id, ({ title: post.title , status:post.status})).subscribe(response => {                                 //////Updatedata
      console.log(response.json())
      this.all();
    });
  }

}
