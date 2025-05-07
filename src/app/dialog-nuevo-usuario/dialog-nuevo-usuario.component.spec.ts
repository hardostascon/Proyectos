import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNuevoUsuarioComponent } from './dialog-nuevo-usuario.component';

describe('DialogNuevoUsuarioComponent', () => {
  let component: DialogNuevoUsuarioComponent;
  let fixture: ComponentFixture<DialogNuevoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNuevoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNuevoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
