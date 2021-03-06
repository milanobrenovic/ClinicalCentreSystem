import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { ExaminationPagingDTO } from './../../models/examinations';
import { ExaminationService } from './../../services/examination.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Examination } from './../../models/examination';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-operation-requests',
  templateUrl: './list-operation-requests.component.html',
  styleUrls: ['./list-operation-requests.component.css']
})
export class ListOperationRequestsComponent implements OnInit {
  examinationsDataSource: MatTableDataSource<Examination>;
  displayedColumns: string[] = ['patient', 'examinationType', 'interval', 'assign'];
  numberOfItem: number;
  itemsPerPage = environment.itemsPerPage;

  constructor(
    public dialog: MatDialog,
    private examinationService: ExaminationService,
    private router: Router
  ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.getAwaitingExaminations();
  }

  getAwaitingExaminations(): void {
    this.examinationService.getAwaitingExaminations('OPERATION', this.paginator.pageIndex, 5, this.sort).subscribe((data: ExaminationPagingDTO) => {
      this.numberOfItem = data.numberOfItems;
      this.examinationsDataSource = new MatTableDataSource(data.examinationList);
      this.examinationsDataSource.sort = this.sort;
    })
  }

  assignRoom(element: Examination): void {
    if (JSON.parse(localStorage.getItem('selectedExamination'))) {
      localStorage.removeItem('selectedExamination');
    }
    localStorage.setItem('selectedExamination', JSON.stringify(element));
    this.router.navigate(['/clinic-admin/search-rooms'], { queryParams: { kind: 'operation' } });
  }

}
