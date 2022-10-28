import {
  Directive,
  Output,
  Input,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appUpload]',
})
export class UploadDirective {
  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('class.droppable') public droppable = false;

  //Dragover listener, when something is dragged over our host element
  @HostListener('dragover', ['$event']) onDragOver($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.droppable = true;
  }
  //Dragleave listener, when something is dragged away from our host element
  @HostListener('dragleave', ['$event']) public onDragLeave($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.droppable = false;
  }

  @HostListener('drop', ['$event']) public onDrop($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    let files = $event.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }
  constructor() {}
}
