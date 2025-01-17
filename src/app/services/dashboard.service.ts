import { Injectable, signal, computed } from '@angular/core';

type Tile = {
  id: number;
  name: string;
  type: string;
  data: any;
};

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private tilesSignal = signal<Tile[]>([]);

  constructor() {
    this.loadTilesFromStorage();
  }

  get tiles() {
    return computed(() => this.tilesSignal());
  }

  addWidget(widget: Partial<Tile>) {
    const newTile: Tile = {
      id: Date.now(),
      name: widget.name || 'New Widget',
      type: widget.type || 'chart',
      data: widget.data || {},
    };
    this.tilesSignal.update((tiles) => [...tiles, newTile]);
    this.saveTilesToStorage();
  }

  updateWidget(index: number, widget: Partial<Tile>) {
    this.tilesSignal.update((tiles) =>
      tiles.map((tile, i) => (i === index ? { ...tile, ...widget } : tile))
    );
    this.saveTilesToStorage();
  }

  removeWidget(index: number) {
    this.tilesSignal.update((tiles) => tiles.filter((_, i) => i !== index));
    this.saveTilesToStorage();
  }

  loadTilesFromStorage() {
    const savedTiles = localStorage.getItem('dashboardTiles');
    if (savedTiles) {
      this.tilesSignal.set(JSON.parse(savedTiles));
    }
  }

  saveTilesToStorage() {
    localStorage.setItem('dashboardTiles', JSON.stringify(this.tilesSignal()));
  }

  reorderWidgets(previousIndex: number, currentIndex: number) {
    this.tilesSignal.update((tiles) => {
      const updatedTiles = [...tiles];
      const [movedTile] = updatedTiles.splice(previousIndex, 1);
      updatedTiles.splice(currentIndex, 0, movedTile);
      return updatedTiles;
    });
    this.saveTilesToStorage();
  }
}
