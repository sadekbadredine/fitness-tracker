import { TrainingService } from 'src/app/pages/training/training.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Exercise } from 'src/app/pages/training/exercise.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) tableSort: MatSort = new MatSort();
  @ViewChild(MatPaginator)
  tablePaginator!: MatPaginator;

  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getFinishedExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.tableSort;
    this.dataSource.paginator = this.tablePaginator;
  }

  doFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLocaleLowerCase();
  }
}
