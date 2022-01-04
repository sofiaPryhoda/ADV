import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from "../service/advertisement.service";
import {Advertisement} from "../models/advertisement";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AdvertDetailPopupComponent} from "../advert-detail-popup/advert-detail-popup.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../models/user";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {
  advertisements: Advertisement[] = [];
  page = 1;
  count = 0;
  tableSize = 3;
  tableSizes = [3, 6, 9, 12];


  constructor(private advertisementService: AdvertisementService, private router: Router, public dialog: MatDialog, private modalService: NgbModal) {
  }

  openDialog() {
    this.dialog.open(AdvertDetailPopupComponent);
  }


  openDetails(targetModal : any, advert: Advertisement) {
    this.modalService.open(targetModal, {
      centered: true,
      windowClass: 'my-class',
      size: 'lg'

    });

    // @ts-ignore
    document.getElementById('name').setAttribute('value', advert.name);
    // @ts-ignore
    document.getElementById('description').setAttribute('value', advert.description);
    // @ts-ignore
    document.getElementById('user').setAttribute('value', advert.user?.name);
    // @ts-ignore
    document.getElementById('category').setAttribute('value', advert.category);
  }

  ngOnInit() {
    this.getAdverts();
  }

  getAdverts(): Advertisement[] {
    this.advertisementService.getAll().subscribe(data => {
      this.advertisements = data;
    });
    return this.advertisements;
  }
  deleteAdvert(id: number) {
    this.advertisementService.deleteAdvert(id).subscribe(data => {
      this.getAdverts();
    })
  }
  removeAdvert(advertObj: Advertisement) {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Profile deletion',
        message: advertObj.name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.advertisements = this.advertisements.filter(item => item.id !== advertObj.id);
        this.deleteAdvert(advertObj.id!);
      }
    });
  }
// @ts-ignore
  onTableDataChange(event) {
    this.page = event;
    this.getAdverts();
  }

  // @ts-ignore
  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAdverts();
  }
}


