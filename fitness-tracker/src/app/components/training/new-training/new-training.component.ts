import { TrainingService } from 'src/app/pages/training/training.service';
import { Exercise } from 'src/app/pages/training/exercise.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises!: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private fireStore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.exercises = this.fireStore
      .collection('availableExercises')
      .valueChanges();
  }

  onStartTraining(newExerciseForm: NgForm) {
    this.trainingService.startExerciese(newExerciseForm.value.newExercise);
  }
}
