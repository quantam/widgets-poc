import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-widget-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  template: `
    <h2>Add Widget Preferences</h2>
    <mat-form-field appearance="fill">
      <mat-label>Clearable input</mat-label>
      <input matInput type="text" [(ngModel)]="value" />

      <mat-label>Widget Type</mat-label>
      <mat-select [(value)]="selectedType">
        <mat-option *ngFor="let type of widgetTypes" [value]="type">{{
          type | titlecase
        }}</mat-option>
      </mat-select>
    </mat-form-field>
    <div class="actions">
      <button mat-button color="primary" (click)="apply()">Apply</button>
      <button mat-button color="warn" (click)="cancel()">Cancel</button>
    </div>
  `,
  styles: [
    `
      h2 {
        margin-bottom: 16px;
      }
      .actions {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    `,
  ],
})
export class AddWidgetModalComponent {
  widgetTypes = ['chart', 'calendar', 'form', 'table'];
  selectedType: string = this.widgetTypes[0];

  constructor(private dialogRef: MatDialogRef<AddWidgetModalComponent>) {}

  apply() {
    this.dialogRef.close({ type: this.selectedType });
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
