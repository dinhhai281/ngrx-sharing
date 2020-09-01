import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  getAllPost = () => this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');

  constructor(private http: HttpClient) {}
}
