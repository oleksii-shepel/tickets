import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Department, Status } from '../common';
import { appendFiles, removeFile, DialogState, updateTimestamp, setData, selectDialog } from '../features/dialog.slice';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit, OnDestroy {
  departments: typeof Department = Department;
  @ViewChild("dropzone") dropzone!: ElementRef;
  subscription!: Subscription;

  iconList = new Map([
    [ "default", "fa fa-file-o" ],
    [ "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "fa fa-file-excel-o" ],
    [ "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "fa fa-file-word-o" ],
    [ "application/pdf", "fa fa-file-pdf-o" ],
    [ "image/jpeg", "fa fa-file-image-o" ],
    [ "image/png", "fa fa-file-image-o" ],
    [ "video/mp4", "fa fa-file-video-o" ],
    [ "text/html", "fa fa-file-text-o" ],
    [ "text/plain", "fa fa-file-text-o" ]]);

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogState,
    public store: Store<{ dialog: DialogState }>
    ) {
      this.store.dispatch(setData({ payload: data }));
  }

  ngOnInit(): void {
    this.subscription = this.store.select(selectDialog).subscribe((data)=> {
      this.data = data;
    });
  }
  
  updateTitle($event: any) {
    this.store.dispatch(setData({ payload: {...this.data, title: $event} }));
  }

  updateDepartment($event: any) {
    this.store.dispatch(setData({ payload: {...this.data, department: $event} }));
  }

  updateDetails($event: any) {
    this.store.dispatch(setData({ payload: {...this.data, details: $event} }));
  }

  uploadFiles(files: FileList) {
    this.store.dispatch(appendFiles({ payload: {...files} }));
  }
  
  getFileExtension(type: string) {
    return this.iconList.has(type) ? this.iconList.get(type) : this.iconList.get("default");
  }

  removeFile($event: any, file: File) {
    this.store.dispatch(removeFile({payload: file}));
  }

  fileInputChanged($event: any) {
    if ($event.target.files.length > 0) {
      this.uploadFiles($event.target.files);
    }
  }

  closeDialog($event: any){
    this.dialogRef.close({data: this.data, submitted: false});
  }

  onSubmit(form: NgForm) {
    if(form.valid){
      if(this.data.status == null) {
        this.store.dispatch(updateTimestamp({ created: Date.now(), updated: Date.now(), status: Status.New}));
      } else {
        this.store.dispatch(updateTimestamp({ created: this.data.created, updated: Date.now(), status: Status.Edited}));
      }
      this.dialogRef.close({ data: this.data, submitted: true});
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
