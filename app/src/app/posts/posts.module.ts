import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddPostComponent } from 'src/app/posts/add-post/add-post.component';
import { EditPostComponent } from 'src/app/posts/edit-post/edit-post.component';
import { PostsListComponent } from 'src/app/posts/posts-list/posts-list.component';
import { PostsEffects } from 'src/app/posts/state/posts.effects';
import { postsReducer } from 'src/app/posts/state/posts.reducer';
import { POST_STATE_NAME } from 'src/app/posts/state/posts.selector';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      { path: 'add', component: AddPostComponent },
      { path: 'edit/:id', component: EditPostComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
  declarations: [PostsListComponent, AddPostComponent, EditPostComponent],
})
export class PostsModule {}
