import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {CategoryComponent} from "./category/category.component";
import {AdvertisementListComponent} from "./advertisement-list/advertisement-list.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'users', component: UserListComponent},
  {path: 'usersadd', component: UserListComponent},
  {path: 'users/:id', component: UserListComponent},
  {path: 'users/:id', component: UserListComponent},
  {path: 'users/:id', component: UserListComponent},
  {path: 'users/:id', component: UserDetailComponent},
  {path: 'categories', component: CategoryComponent},
  {path: 'categories/:id', component: CategoryComponent},
  {path: 'advertisements', component: AdvertisementListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
