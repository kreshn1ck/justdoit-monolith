import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TokenDecode } from 'src/app/models/tokenDecode';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ApiClientService } from 'src/app/services/todo-api';
import { TodoTransport, UserRelationshipTransport, UserTransport } from 'src/app/services/todo-api/models';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  friends: UserRelationshipTransport[] = [];

  currentUser: UserTransport = {} as UserTransport;

  createTodo: FormGroup;
  title: FormControl;
  description: FormControl;
  dueDate: FormControl;
  assignee: FormControl;

  constructor(public dialogRef: MatDialogRef<CreateTodoComponent>,
    private authService: AuthenticationService,
    private apiService: ApiClientService) {

    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.dueDate = new FormControl('', Validators.required);
    this.assignee = new FormControl('', Validators.required);

    this.createTodo = new FormGroup({
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      assignee: this.assignee,
    });
  }

  ngOnInit(): void {
    const token: TokenDecode = this.authService.getTokenDecode();
    const _user: UserTransport = {
      username: token.usr,
      email: token.eml,
      id: Number(token.id)
    }
    this.currentUser = _user;
    this.getAllFriends();
  }

  submit() {
    if (this.createTodo.valid) {
      const todoTransport: TodoTransport = {
        title: this.title.value,
        description: this.description.value,
        dueDate: this.dueDate.value,
        assignee: this.assignee.value
      };

      this.apiService.createUsingPOST(todoTransport).toPromise().then((response: TodoTransport) => {
        console.log(response);
        this.dialogRef.close();
      })
    }

  }


  async getAllFriends() {
    this.apiService.getAllFriendsUsingGET().subscribe((response: UserRelationshipTransport[]) => {
      console.log("response, friends", response)
      this.friends = response.filter(friendship => friendship.userRelationshipType === 'FRIENDS');
    });
  }

}
