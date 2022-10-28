import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { AppService } from './app.service';
import { Store } from '@ngrx/store';
import {
  addData,
  AppState,
  loadData,
  selectAppItems,
  updateData,
} from './features/app.slice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tickets';
  displayedColumns = [
    'id',
    'created',
    'updated',
    'department',
    'title',
    'status',
    'details',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription1!: Subscription;
  subscription2!: Subscription;

  constructor(
    private dialog: MatDialog,
    private appService: AppService,
    private store: Store<{ app: AppState }>
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>([]);
    this.store.dispatch(loadData());

    this.subscription1 = this.store.select(selectAppItems).subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  createNewTicket($event: any) {
    this.openDialog({});
  }

  openTicketDialog($event: any, data: any) {
    this.openDialog(data);
  }

  openDialog(data: any) {
    let dialogRef = this.dialog.open(PopUpComponent, {
      data,
      disableClose: true,
    });

    this.subscription2 = dialogRef.afterClosed().subscribe((result) => {
      if (!!result.submitted) {
        if (!result.data.id) {
          this.store.dispatch(
            addData({ data: this.dataSource.data, payload: result.data })
          );
        } else {
          this.store.dispatch(
            updateData({ data: this.dataSource.data, payload: result.data })
          );
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
