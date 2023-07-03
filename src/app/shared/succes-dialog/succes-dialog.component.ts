import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-succes-dialog',
  templateUrl: './succes-dialog.component.html',
  styleUrls: ['./succes-dialog.component.css']
})
export class SuccesDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SuccesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  
  cancelar() {
    this.dialogRef.close();
  }

}
