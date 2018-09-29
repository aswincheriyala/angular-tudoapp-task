import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = 'http://localhost:6030/api/todo'

  constructor(private http:Http) { }

  get(x){
    return this.http.get(this.url+x)
  }

  post(post){
    return this.http.post(this.url,post)
  }

  delete(link){
    return this.http.delete(this.url+'/'+link)
  }

  patch(post,status){
    return this.http.patch(this.url + '/' + post, status)
  }
}
