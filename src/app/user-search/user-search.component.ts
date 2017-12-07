import { Component, OnInit } from '@angular/core';
import { UserSearchService } from '../services/user-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../viewmodels/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  user: FormGroup;
  userSearchResponse;
  userDetailsResponse;
  constructor(private userService: UserSearchService) { }

  ngOnInit() {
    this.user = new FormGroup({
      userName: new FormControl('', [Validators.required])
    });
    this.user.get('userName').valueChanges.debounceTime(100)
      .distinctUntilChanged()
      .subscribe(value => this.applyFilter(value));
  }
  applyFilter(value) {
    if (value) {
      this.userDetailsResponse = null;
      this.userSearchResponse = null;
      this.userService.getUserDetails(value).subscribe(res => {
        this.userDetailsResponse = res;
        this.userService.getUserRepos(value).subscribe(response => {
          this.userSearchResponse = response;
        });
      });
    }
  }
}
