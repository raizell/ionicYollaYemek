import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-yemek-detay',
  templateUrl: './yemek-detay.page.html',
  styleUrls: ['./yemek-detay.page.scss'],
})
export class YemekDetayPage implements OnInit {

  constructor(private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  donus()
  {
    this.router.navigateByUrl('/home');
  }

}
