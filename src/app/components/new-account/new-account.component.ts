import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent implements OnInit {
  form: FormGroup | undefined;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = fb.group({
      firstName: [],
      password: [],
    });
  }

  ngOnInit(): void {}

  createAccount() {}
}
