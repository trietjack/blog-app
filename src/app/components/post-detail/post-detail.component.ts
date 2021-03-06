import { Component, OnInit, DoCheck } from '@angular/core';
import { Post } from '../../states/post-state/posts.model';
import { PostsQuery } from 'src/app/states/post-state/posts.query';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit, DoCheck {

  // SKELETON CODE
  post$: Observable<Post>;
  previousId: string;

  constructor(
    private postsQuery: PostsQuery,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Simply get a stream of the specific Post from the query
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.previousId = id;
    this.post$ = this.postsQuery.selectPost(id);
  }

  // Initialize a new post that is selected in search box
  ngDoCheck() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if ( id !== this.previousId) {
      this.post$ = this.postsQuery.selectPost(id);
      this.previousId = id;
    }
  }
}
