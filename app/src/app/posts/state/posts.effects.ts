import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { dummyAction } from 'src/app/auth/state/auth.actions';
import { Post } from 'src/app/models/posts.model';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from 'src/app/posts/state/posts.actions';
import { getPosts } from 'src/app/posts/state/posts.selector';
import { PostsService } from 'src/app/services/posts.services';
import { AppState } from 'src/app/store/app.state';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>
  ) {}

  // loadPosts$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(loadPosts),
  //       mergeMap((action) => {
  //         return this.postsService.getPosts().pipe(
  //           map((data) => {
  //             console.log(data);
  //           })
  //         );
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
        if (!posts.length) {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              return loadPostsSuccess({ posts });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            const updatedPost: Update<Post> = {
              id: action.post.id + '',
              changes: {
                ...action.post,
              },
            };
            return updatePostSuccess({ post: updatedPost });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigatedAction) => {
        return r.payload.routerState['params']['id'];
      }),

      withLatestFrom(this.store.select(getPosts)),

      switchMap(([id, posts]) => {
        if (!posts.length) {
          return this.postsService.getPosts().pipe(
            map((post) => {
              const postData = [{ ...post, id }];
              return loadPostsSuccess({ posts: post });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });
} // End of class;
