import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../service/user-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  // @ts-ignore
  id: number
  // @ts-ignore
  user: User

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.user = new User();
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    });
  }

}
