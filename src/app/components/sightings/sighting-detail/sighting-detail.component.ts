import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Sighting, SightingComment } from 'src/app/model/sightings.model';
import { SightingsService } from 'src/app/services/sightings.service';

@Component({
  selector: 'app-sighting-detail',
  templateUrl: './sighting-detail.component.html',
  styleUrls: ['./sighting-detail.component.scss'],
})
export class SightingDetailComponent implements OnInit {
  commentForm: FormGroup;

  @Output() sighting: Sighting = new Sighting();
  sightingComments: SightingComment[] = [];
  sightingId: number = -1;
  constructor(
    private sightingService: SightingsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private viewportScroller: ViewportScroller
  ) {
    this.commentForm = fb.group({
      comment: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.sightingId = params['id'];
    });
    this.getSightingComments();
    this.getSighting();
  }

  goToCommentSection() {
    this.viewportScroller.scrollToAnchor('form');
  }

  getSighting(): void {
    this.sightingService.getOne(this.sightingId).subscribe({
      next: (data: any) => {
        this.sighting = data.sighting;
      },
      error: (err) => console.log(err),
    });
  }

  getSightingComments() {
    this.sightingService.getSightingComments(this.sightingId).subscribe({
      next: (data: SightingComment[]) => {
        console.log(data);
        this.sightingComments = data;
      },
    });
  }

  postComment(): void {
    console.log(this.commentForm.get('comment')?.value, 'forma post com');
    let comment = this.commentForm.get('comment')?.value;

    this.sightingService
      .postSightingComment(this.sightingId, { content: comment })
      .subscribe({
        next: (data: Comment) => {
          console.log(data);
          comment = data;
          this.getSightingComments();
        },
        error: (err) => console.log(err),
      });
  }

  removeComment(commId: number) {
    this.sightingService
      .deleteSightingComment(this.sightingId, commId)
      .subscribe({
        next: (comment: SightingComment) => {
          let ind = this.sightingComments
            .map((comm: SightingComment) => comm.id)
            .indexOf(comment.id);
          this.sightingComments.splice(ind, 1);
          this.getSightingComments();
        },
        error: (err) => console.log(err),
      });
  }
}
