import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YemekDetayPage } from './yemek-detay.page';

describe('YemekDetayPage', () => {
  let component: YemekDetayPage;
  let fixture: ComponentFixture<YemekDetayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YemekDetayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YemekDetayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
