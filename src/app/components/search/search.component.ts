import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FlowerService } from 'src/app/services/flower.service';
import { Flower } from 'src/app/model/flower.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  public inputValue: string = '';
  searchResults: Flower[] = [];

  // This value will be updated only after debounce
  public debouncedInputValue = this.inputValue;

  // Holds results
  public people$: Subject<any> = new Subject();

  // Observable for debouncing input changes
  private searchDecouncer$: Subject<string> = new Subject();

  constructor(private http: HttpClient, private flowerService: FlowerService) {}

  public ngOnInit(): void {
    // Setup debouncer
    this.setupSearchDebouncer();

    // Do initial search for 'darth'
    this.search(this.inputValue);
  }

  public onSearchInputChange(term: string): void {
    // `onSearchInputChange` is called whenever the input is changed.
    // We have to send the value to debouncing observable

    this.searchDecouncer$.next(term);
  }

  private setupSearchDebouncer(): void {
    // Subscribe to `searchDecouncer$` values,
    // but pipe through `debounceTime` and `distinctUntilChanged`
    this.searchDecouncer$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((term: string) => {
        // Remember value after debouncing
        this.debouncedInputValue = term;
        // Do the actual search
        this.search(term);
      });
  }

  private search(term: string): void {
    // this.flowerService.getFlowersSearch(term).subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //     this.searchResults = data.flowers;
    //   },
    // });
    // Clear results
    this.people$.next(null);
  }
}
