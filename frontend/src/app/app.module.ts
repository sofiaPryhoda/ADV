import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UserService} from "./service/user-service.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {HomePageComponent} from './home-page/home-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSortModule} from '@angular/material/sort';
import {FilterPipe} from "./user-list/filter.pipe";
import { CategoryComponent } from './category/category.component';
import { UserUpdateComponent } from './user-update/user-update.component';
@NgModule({
  declarations: [
    AppComponent, UserListComponent, UserCreateComponent, HomePageComponent, FilterPipe, CategoryComponent, UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {

}

