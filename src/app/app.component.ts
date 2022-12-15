import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Cada definição de coluna resulta em uma coluna.
  public columnDefs: ColDef[] = [
    { field: 'make'},
    { field: 'model'},
    { field: 'price' }
  ];

  // DefaultColDef define comandos padrões a todas as colunas
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Variável onde será armazenados os dados que seram exibidos no grid 
  public rowData$!: Observable<any[]>;
  //OBS..
  // Observable é uma funcionalidade da biblioteca rxjs, que é utilizada 
  // internamente pelo framework e já é instalada quando você cria uma nova 
  // aplicação Angular. Com Observables, conseguimos lidar com transferência 
  // de dados assíncrona.

  // Para acessar o Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) {}

  // Exemplo de carregamento de dados do servidor
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  // Exemplo de carregamento de dados do servidor
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Exemplo usando Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
