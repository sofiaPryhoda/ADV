import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../service/user-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  id!: number;
  user: User = new User();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data
    });
  }

  onSubmit() {
    this.userService.updateUser(this.id, this.user).subscribe(data => {
      this.goToEmployeeList();
    });
  }

  goToEmployeeList() {
    this.router.navigate(['/users']);
  }
}
