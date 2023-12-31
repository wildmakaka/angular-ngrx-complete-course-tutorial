import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { deletePost, loadPosts } from 'src/app/posts/state/posts.actions';
import { getCount, getPosts } from 'src/app/posts/state/posts.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;
  count$: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.count$ = this.store.select(getCount);
    this.store.dispatch(loadPosts());
  }

  onDeletePost(id: string) {
    if (confirm('Are you sure you want to delete?')) {
      this.store.dispatch(deletePost({ id }));
    }
  }
}
