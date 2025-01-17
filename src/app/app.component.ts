import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
// import { DashboardService } from './services/dashboard.service';
import { AddWidgetModalComponent } from './add-widget-modal/add-widget-modal.component';
// import { ChartTileComponent } from './tile/chart-tile/chart-tile.component';
// import { CalendarTileComponent } from './tile/calendar-tile/calendar-tile.component';
// import { FormTileComponent } from './tile/form-tile/form-tile.component';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardService } from './services/dashboard.service';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  componentMap = {
    chart: ChartComponent,
    // calendar: CalendarTileComponent,
    // form: FormTileComponent,
    table: TableComponent,
  };

  constructor(
    public dashboardService: DashboardService,
    private dialog: MatDialog
  ) {}

  getComponent(type: string) {
    // Ensure the type is a valid key of componentMap
    if (type in this.componentMap) {
      return this.componentMap[type as keyof typeof this.componentMap];
    }
    return null; // Return null or a default component if the type is invalid
  }

  onDrop(event: CdkDragDrop<any[]>) {
    this.dashboardService.reorderWidgets(
      event.previousIndex,
      event.currentIndex
    );
  }

  openAddWidgetModal(index?: number) {
    const dialogRef = this.dialog.open(AddWidgetModalComponent, {
      width: '400px',
      data: index !== undefined ? this.dashboardService.tiles()[index] : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (index !== undefined) {
          this.dashboardService.updateWidget(index, result);
        } else {
          this.dashboardService.addWidget(result);
        }
      }
    });
  }

  editWidget(index: number) {
    this.openAddWidgetModal(index);
  }

  removeWidget(index: number) {
    this.dashboardService.removeWidget(index);
  }
}
