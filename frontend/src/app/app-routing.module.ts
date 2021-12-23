import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'users', component: UserListComponent},
  {path: 'add', component: UserCreateComponent},
  {path: 'asc', component: UserCreateComponent},
  {path: 'desk', component: UserCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
