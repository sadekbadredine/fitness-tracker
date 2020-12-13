import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../components/dialog/dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 10;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        setTimeout(() => {
          this.trainingExit.emit();
        }, 2000);
      }
    }, 500);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.trainingExit.emit();
      else this.startOrResumeTimer();
    });
  }
}
