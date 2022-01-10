import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UserService} from "./service/user-service.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NgbdSortableHeader, UserListComponent} from "./user-list/user-list.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {HomePageComponent} from './home-page/home-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSortModule} from '@angular/material/sort';
import {CategoryComponent} from './category/category.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {UpdateDialogComponent} from './update-dialog/update-dialog.component';
import {AdvertisementListComponent, NgbdSortableHeader2} from './advertisement-list/advertisement-list.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {AdvertDetailPopupComponent} from "./advert-detail-popup/advert-detail-popup.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";
export class MaterialModule {
}

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    HomePageComponent,
    CategoryComponent,
    UserUpdateComponent,
    UserDetailComponent,
    ConfirmationDialogComponent,
    UpdateDialogComponent,
    AdvertisementListComponent,
    AdvertDetailPopupComponent,
    NgbdSortableHeader,
    NgbdSortableHeader2
  ],
  exports: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    ReactiveFormsModule,
    NgbModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,

  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
