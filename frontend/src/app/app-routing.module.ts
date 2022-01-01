import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {UserUpdateComponent} from "./user-update/user-update.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {CategoryComponent} from "./category/category.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'users', component: UserListComponent},
  {path: 'users/:id', component: UserListComponent},
  {path: 'userdelete/:id', component: UserListComponent},
  {path: 'add', component: UserCreateComponent},
  {path: 'updateuser/:id', component: UserUpdateComponent},
  {path: 'users/:id', component: UserDetailComponent},
  {path: 'all', component: CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
