import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApiClientService } from 'src/app/services/todo-api';
import { UserRelationshipTransport, UserTransport } from 'src/app/services/todo-api/models';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  users: UserRelationshipTransport[] = [];
  subscriptions: Subscription = new Subscription();
  usersLoading: boolean = true;

  constructor(public dialogRef: MatDialogRef<AddFriendComponent>,
    private apiService: ApiClientService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAllUsers() {
    this.subscriptions = this.apiService.getAllPeopleUsingGET().subscribe((response) => {
      console.log(response);
      this.users = response;
      this.usersLoading = false;
    });
  }

  async addFriend(id: number) {
    await this.apiService.createUsingPOST_1(id).toPromise().then((response: UserRelationshipTransport) => {
      console.log(response);
      this.getAllUsers();
    })
  }

}
