import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: {
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChatsRoutingModule {}
