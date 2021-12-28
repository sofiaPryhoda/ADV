import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {UserUpdateComponent} from "./user-update/user-update.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'users', component: UserListComponent},
  {path: 'add', component: UserCreateComponent},
  {path: 'update-user/:id', component: UserUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
