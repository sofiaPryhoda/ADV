import {Component} from '@angular/core';

import {UserService} from "../service/user-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: User;
  submitted = false;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user = new User();
  }

  save() {
    this.userService.save(this.user).subscribe(result => this.gotoUserList());
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
