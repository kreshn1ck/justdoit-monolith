import { Component, OnInit } from '@angular/core';
import { TokenDecode } from 'src/app/models/tokenDecode';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from "../../services/user/user.service";
import { RelationshipService } from "../../services/relationship.service";
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";
import { TodoTransport, UserRelationshipTransport } from 'src/app/services/todo-api/models';
import { ApiClientService } from 'src/app/services/todo-api';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  todos: TodoTransport[] = [];
  onGoingTodos: TodoTransport[] = [];
  overDueTodos: TodoTransport[] = [];
  finishedTodos: TodoTransport[] = [];

  swiperConfig: any = {
    slidesPerView: 'auto',
    loop: false,
    navigator: true,
    scrollbar: { draggable: true },
    pagination: {
      clickable: true
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
      },
      1400: {
        slidesPerView: 3,
      }
    }
  }

  public tabs = [
    {
      id: 1,
      name: 'My ToDos',
      url: '/dashboard',
      active: true,
    },
    {
      id: 2,
      name: 'Shared ToDos',
      url: '/my-dashboard',
      active: false,
    }
  ]

  constructor(private authService: AuthenticationService,
    private apiClient: ApiClientService,
    private relationshipService: RelationshipService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    const token: TokenDecode = this.authService.getTokenDecode();

    if (token.sub) {
      this.userName = token.sub;
    }

    this.getAllTodos();
  }

  getAllTodos() {
    this.apiClient.getAssignedTodosUsingGET(false).subscribe((response: TodoTransport[]) => {
      this.todos = response;
      const _onGoing: TodoTransport[] = []
      const _expired: TodoTransport[] = []
      const _finished: TodoTransport[] = []
      response.forEach((todo: TodoTransport) => {
        if (todo.status === "FINISHED") {
          _finished.push(todo)
        } else if (todo.status === "EXPIRED") {
          _expired.push(todo)
        } else {
          _onGoing.push(todo)
        }
      })
      this.finishedTodos = _finished;
      this.overDueTodos = _expired;
      this.onGoingTodos = _onGoing;
    })
  }

  openCreateTodo() {
    this.matDialog.open(CreateTodoComponent).afterClosed().subscribe(() => {
      this.getAllTodos();
    })
  }

  deleteTodo(id?: number) {
    if (id)
      this.apiClient.deleteUsingDELETE(id).toPromise().then(() => {
        this.getAllTodos();
      })
  }

  finishTodo(id?: number) {
    if (id)
      this.apiClient.markFinishedUsingPUT(id).toPromise().then((response: TodoTransport) => {
        console.log(response)
        this.getAllTodos();
      })
  }

  editTodo(todo: TodoTransport) {
    this.matDialog.open(EditTodoComponent, {
      data: { todo: todo }
    }).afterClosed().subscribe(() => {
      this.getAllTodos();
    })
  }

  // getMyTodos() {
  //   this.apiClient.getCreatedTodosUsingGET(false).subscribe((response: TodoTransport[]) => {
  //     this.overDueTodos = response;
  //     const _onGoing: TodoTransport[] = []
  //     const _todos: TodoTransport[] = []
  //     response.forEach((todo: TodoTransport) => {
  //       if (todo.status !== "FINISHED" && todo.status !== "EXPIRED")
  //         _todos.push(todo)
  //     })
  //     this.finishedTodos = _todos;
  //     this
  //   })
  // }

}
