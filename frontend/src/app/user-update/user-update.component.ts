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
  id: number | undefined;
  user: User = new User();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe(data => {
      this.user = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.userService.update(this.id, this.user).subscribe(data => {
        this.goUserList();
      }
      , error => console.log(error));
  }

  goUserList() {
    this.router.navigate(['/users']);
  }
}
