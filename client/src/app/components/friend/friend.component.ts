import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../services/friend.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {User } from '../../models/user.model'

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  users:Array<User>;
  user:User=new User();
  constructor(private friendService:FriendService,
              private router:Router,
              private flashMessage:  FlashMessagesService,
              private authService:AuthService,) { }

  ngOnInit(): void {

  	this.authService.getAllUsers().subscribe((data : any) => {
      this.user = data.user;
      this.users = data.users;
      this.users= this.users.filter((it) => it._id!=this.user._id);
    },
     err => {
       console.log(err);
       return false;
     });

  }

  addFriend(friend_id){
  	const friend={
  		friend:friend_id
  	};

    this.friendService.addFriend(friend).subscribe((data :any) => {
        if(data.success) {
         this.flashMessage.show("Ami ajouté", {cssClass: 'alert-success', timeout: 5000});
         
         this.users=this.users.filter((item) => item._id!= friend_id); 
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          
        }
    });
     
  }

  
}
