import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from './exercise.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  finishedExercisesChanged = new Subject<Exercise[]>();
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: any | Exercise;

  constructor(private fireStore: AngularFirestore) {}

  startExerciese(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (item: Exercise) => item.id === selectedId
    );
    this.exerciseChanged.next(this.runningExercise);
  }

  completeExercise() {
    this.storeExercises({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.storeExercises({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchAvailableExercises() {
    // this.fireStore
    //   .collection('availableExercises')
    //   .valueChanges();
    // valueChanges gives us only the value of the document
    // it doens't give us the name of the document, the ID
    this.fireStore
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  fetchFinishedExercises() {
    this.fireStore
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: any[]) => {
        this.finishedExercisesChanged.next(exercises);
      });
  }

  private storeExercises(exercise: Exercise) {
    this.fireStore.collection('finishedExercises').add(exercise);
  }
}
