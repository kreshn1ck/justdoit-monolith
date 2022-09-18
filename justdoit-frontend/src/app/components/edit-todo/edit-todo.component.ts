import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenDecode } from 'src/app/models/tokenDecode';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ApiClientService } from 'src/app/services/todo-api';
import { TodoTransport, UserRelationshipTransport, UserTransport } from 'src/app/services/todo-api/models';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  friends: UserRelationshipTransport[] = [];

  currentUser: UserTransport = {} as UserTransport;
  todo: TodoTransport;

  createTodo: FormGroup;
  title: FormControl;
  description: FormControl;
  dueDate: FormControl;
  assignee: FormControl;

  constructor(public dialogRef: MatDialogRef<EditTodoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { todo: TodoTransport },
    private authService: AuthenticationService,
    private apiService: ApiClientService) {
    this.todo = data.todo;
    this.title = new FormControl(data.todo?.title || '', Validators.required);
    this.description = new FormControl(data.todo?.description || '', Validators.required);
    this.dueDate = new FormControl(data.todo?.dueDate || '', Validators.required);
    this.assignee = new FormControl(data.todo?.assignee.id || '', Validators.required);

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

  console.log("submit clicked", this.friends);
    const _assignee: UserRelationshipTransport | undefined = this.friends.find((friend: UserRelationshipTransport) => friend.relatedUser.id === this.assignee.value);
    if (this.createTodo.valid) {
      const todoTransport: TodoTransport = {
        id: this.todo.id,
        title: this.title.value,
        description: this.description.value,
        dueDate: this.dueDate.value,
        assignee: _assignee ? _assignee.relatedUser : this.currentUser
      };
      console.log("submit", todoTransport);
      if (todoTransport.id) {
        this.apiService.updateUsingPUT(todoTransport.id, todoTransport).toPromise().then((response: TodoTransport) => {
          console.log(response);
          this.dialogRef.close();
        })
      }
    }

  }

  async getAllFriends() {
    this.apiService.getAllFriendsUsingGET().subscribe((response: UserRelationshipTransport[]) => {
      this.friends = response;
    });
  }

}
