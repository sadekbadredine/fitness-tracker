import { TrainingService } from 'src/app/pages/training/training.service';
import { Exercise } from 'src/app/pages/training/exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises!: Exercise[];
  exercisesSubscription!: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercisesSubscription =
      this.trainingService.exercisesChanged.subscribe((exercises) => {
        this.exercises = exercises;
      });
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExerciese(form.value.newExercise);
  }

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }
}
