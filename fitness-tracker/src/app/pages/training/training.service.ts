import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/components/UI/ui.service';
import { Exercise } from './exercise.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  finishedExercisesChanged = new Subject<Exercise[]>();
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: any | Exercise;
  private firebaseSubs: Subscription[] = [];

  constructor(
    private fireStore: AngularFirestore,
    private uiService: UIService
  ) {}

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
    this.uiService.loadingStateChanged.next(true);
    this.firebaseSubs.push(
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
        .subscribe(
          (exercises: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
          },
          (error) => {
            this.uiService.showSnackbar(
              'Error while fetching data, please try again',
              undefined,
              3000
            );
          }
        )
    );
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  fetchFinishedExercises() {
    this.uiService.loadingStateChanged.next(false);
    this.firebaseSubs.push(
      this.fireStore
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: any[]) => {
            this.uiService.loadingStateChanged.next(true);
            this.finishedExercisesChanged.next(exercises);
          },
          (error) => {
            this.uiService.showSnackbar(
              'Error while fetching data, please try again',
              undefined,
              3000
            );
          }
        )
    );
  }

  cancelSubscriptions() {
    this.firebaseSubs.forEach((sub) => sub.unsubscribe());
  }

  private storeExercises(exercise: Exercise) {
    this.fireStore.collection('finishedExercises').add(exercise);
  }
}
