import { TrainingService } from 'src/app/pages/training/training.service';
import { Exercise } from 'src/app/pages/training/exercise.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) tableSort: MatSort = new MatSort();
  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  dataSource = new MatTableDataSource<Exercise>();
  exercisesSubscription!: Subscription;
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercisesSubscription =
      this.trainingService.finishedExercisesChanged.subscribe(
        (exercises: Exercise[]) => {
          console.log(exercises);

          this.dataSource.data = exercises;
        }
      );
    this.trainingService.fetchFinishedExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.tableSort;
    this.dataSource.paginator = this.tablePaginator;
  }

  doFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLocaleLowerCase();
  }

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }
}
