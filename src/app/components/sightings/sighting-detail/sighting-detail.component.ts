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
    private fb: FormBuilder
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
    let comment = new Comment(this.commentForm.value);
    this.sightingService.postSightingComment(this.sightingId).subscribe({
      next: (data: Comment) => {
        comment = data;
      },
      error: (err) => console.log(err),
    });
  }

  onSubmit(): void {}
}
