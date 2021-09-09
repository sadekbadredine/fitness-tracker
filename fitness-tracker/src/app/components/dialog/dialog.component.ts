import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

  ngOnInit(): void {}
}
// @Inject(), is a mechanism, where we basically assign a value to a property passedData
// by defining the type of what you want to inject, work in most cases, but here
// we're not injecting a class, we're injecting an object, an objcet managed internally
// by angular materialby using @Inject() decorator, and it has to be added in front of some argument
// but we need to pass an argument to the Inject() decorator.
// and that argument is something important by @angular/material,
// which is a constant called MAT_DIALOG_DATA
// this is simply a constant storing a random number or ID, which allows us to access to data
// which angular material internally stores when we call the open method.
// we can think of that as a service storing some data we wanna pass between components
// Angular material does this internally for the data we pass in the open method
// and it gives that data an ID, or it uses an ID to store the data internally
// and that ID is some number we could use, but since it's easier to remember text,
// it masks this ID with this text MAT_DIALOG_DATA, a so called TOKEN.
// we now pass this TOKEN to @Inject(MAT_DIALOG_DATA) to basically tell Angular material:
// In your reference of data, where you store the data of the currently opened dialog
// Please give me the data, and store it in the passedData property
