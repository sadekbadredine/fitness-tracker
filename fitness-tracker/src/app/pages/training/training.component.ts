import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription: Subscription = new Subscription();
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      (exercise) => {
        if (!!exercise) this.ongoingTraining = true;
        else this.ongoingTraining = false;
      }
    );
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
