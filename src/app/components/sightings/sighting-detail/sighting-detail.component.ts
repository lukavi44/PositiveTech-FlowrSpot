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
  @Input() comment: Comment = new Comment();
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
        console.log(data, 'sighting');
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
    this.sightingService
      .postSightingComment(this.sightingId, this.comment)
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
      });
  }

  onSubmit(): void {}
}
