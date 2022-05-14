import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/dto/tweet';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit {

  @Output() postTweetEvent = new EventEmitter<Tweet>();

  constructor(
    private formBuilder: FormBuilder,
    private tweetService: TweetService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  tweetForm = this.formBuilder.group({
    message: ['', [Validators.required, Validators.maxLength(144)]]
  });

  postTweet() {
    this.tweetService.postTweet(this.tweetForm.value).subscribe(
      response => {
        this.toastrService.success('Tweet posted successfully', 'Success', { timeOut: 1000 });
        this.postTweetEvent.emit(response);
        setTimeout(() => {
          this.tweetForm.reset();
        }, 100);
      },
      errorObj => {
        this.toastrService.error(errorObj.error.errors, 'Bad Request', { timeOut: 2000 });
      }
    );
  }

  get message() {
    return this.tweetForm.get('message');
  }
}
