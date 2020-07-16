import { Component, OnInit ,Input,Injector, ViewChild} from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish!: Dish;
  
  commentForm!: FormGroup;
  comment!: Comment;
  @ViewChild('fform') commentFormDirective;
  
  formErrors = {
  	'author':'',
	'comment':''
  };
  
  validationMessages = {
  	'author' :{
		'required':'Author is required.',
		'minlength':'Author must be atleast 2 characters long.',
		'maxlength':'Author cannot be more than 25 characters long.'
	},
	'comment' :{
		'required':'Comment is required.' 
	}
	
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
	private fb: FormBuilder) {
		this.createForm();
	}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.dishservice.getDish(String(id)).subscribe(dish => { this.dish = dish;});
  }

  goBack(): void {
    this.location.back();
  }

	createForm() {
    this.commentForm = this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['',Validators.required],
	  rating:''
      
    });
	
	this.commentForm.valueChanges.subscribe(data=> this.onValueChanged(data));
	
	this.onValueChanged(); //(re)set form validation messages
  }
  
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {
  	const years = [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "June" , "July" , "Sep" , "Oct" , "Nov" , "Dec"];
	var date = new Date();
    this.comment = this.commentForm.value;
	this.comment.date = String(years[date.getMonth()]) + " " + String(date.getDate()) + ", "+ String(date.getFullYear());
    //console.log(this.comment);
	this.dish.comments.push(this.comment);
	console.log(this.dish.comments);
    this.commentForm.reset({
	author: '',
	comment:''
	
	});
	this.commentForm.value.rating.value="5";
	this.commentFormDirective.reset();
  }

}
