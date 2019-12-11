import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Medicine } from 'src/app/models/medicine';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-list-medicines',
  templateUrl: './list-medicines.component.html',
  styleUrls: ['./list-medicines.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListMedicinesComponent implements OnInit {
  medicinesDataSource: MatTableDataSource<Medicine>;
  displayedColumns: string[] = ['label', 'chemicalComposition', 'usage'];
  expandedElement: Medicine | null;

  private addMedicineSuccess: Subscription;

  constructor(
    private medicineService: MedicineService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  openAddDialog() {
  }

  fetchData() {
    this.medicineService.getAllMedicines().subscribe(data => {
      this.medicinesDataSource = new MatTableDataSource(data);
    })
  }
}
