import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, ColGroupDef, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Observable } from 'rxjs';

import { Propriedades } from './prop_medicoes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
  public pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' = 'always';
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns'],
  };

  public gridApi: any;
  public gridColumnApi: any;


  // Cada definição de coluna resulta em uma coluna.
  public columnDefs: (ColDef | ColGroupDef)[] = [ 
    { 
      field: 'titulo', 
      headerName: 'Título da Medição',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true, 
      rowDrag: true,
      minWidth: 400  
    },
    { 
      field: 'desc_situacao_contestacao', 
      headerName: 'Aferição',
      minWidth: 200 
    },
    { 
      field: 'tipo_de_contagem', 
      headerName: 'Tipo de Contagem',
      minWidth: 200 
    },
    { 
      field: 'nivel_detalhe', 
      headerName: 'Nível de Detalhe',
      minWidth: 200 
    },
    { 
      field: 'situacao_contagem', 
      headerName: 'Situação',
      minWidth: 200 
    },
    { 
      field: 'total_medicao_ifpug', 
      headerName: 'PF Líquido',
      minWidth: 200 
    },
    { 
      field: 'esforco', 
      headerName: 'Esforço',
      minWidth: 200 
    },
    { 
      field: 'custo', 
      headerName: 'Custo', 
      minWidth: 200 
    },
    { 
      field: 'criado_por', 
      headerName: 'Criado Por',
      minWidth: 200 
    },
    { 
      field: 'alterado_por', 
      headerName: 'Modificado Por',
      minWidth: 200 
    }
  ];

  // DefaultColDef define comandos padrões a todas as colunas
  public defaultColDef: ColDef = {
    sortable: true, 
    resizable: true,
    floatingFilter: true,
    filter: 'agTextColumnFilter',
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    flex: 1
  };

  // Variável onde será armazenados os dados que seram exibidos no grid 
  public rowData$!: Observable<Propriedades[]>;
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
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData$ = this.http.get<any[]>('assets/medicoes.json');
  }

  // Exemplo de carregamento de dados do servidor
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }


}
