import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-succes-dialog',
  templateUrl: './succes-dialog.component.html',
  styleUrls: ['./succes-dialog.component.css']
})
export class SuccesDialogComponent {

  constructor(public dialogRef: MatDialogRef<SuccesDialogComponent>) {}

  
  cancelar() {
    this.dialogRef.close();
  }

}
