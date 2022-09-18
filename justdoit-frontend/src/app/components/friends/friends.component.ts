import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddFriendComponent } from '../add-friend/add-friend.component';
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";
import { ApiClientService } from 'src/app/services/todo-api';
import { UserRelationshipTransport } from 'src/app/services/todo-api/models';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})

export class FriendsComponent implements OnInit {

  requested: UserRelationshipTransport[] = [];
  pending: UserRelationshipTransport[] = [];
  friends: UserRelationshipTransport[] = [];

  constructor(private matDialog: MatDialog,
    private apiClient: ApiClientService) { }

  ngOnInit(): void {
    this.refreshData();
  }

  openAddFriend() {
    this.matDialog.open(AddFriendComponent);
  }

  getAllFriends(){
    this.apiClient.getAllFriendsUsingGET().subscribe((response: UserRelationshipTransport[])=>{
      console.log(response);
      this.friends = response;
    });
  }

  getAllFriendRequests(){
    this.apiClient.geAllPendingRequestsUsingGET().subscribe((response:UserRelationshipTransport[]) => {
      console.log(response)
      this.pending = response;
    })
  }

  getAllRequestedFriendships(){
    this.apiClient.getAllRequestedRequestsUsingGET().subscribe((response:UserRelationshipTransport[]) => {
      console.log(response)
      this.requested = response;
    })
  }

  acceptFriend(id: number) {
    this.apiClient.acceptUsingPUT(id).toPromise().then((response: UserRelationshipTransport)=>{
      console.log(response);
      this.refreshData();
    })
  }

  deleteFriend(id: number) {
    this.apiClient.deleteUsingDELETE_1(id).toPromise().then((response: UserRelationshipTransport)=>{
      console.log(response);
      this.refreshData();
    })
  }

  refreshData(): void {
    this.getAllFriendRequests();
    this.getAllFriends();
    this.getAllRequestedFriendships();
  }

}
