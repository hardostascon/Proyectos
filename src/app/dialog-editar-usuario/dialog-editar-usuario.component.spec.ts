import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarUsuarioComponent } from './dialog-editar-usuario.component';

describe('DialogEditarUsuarioComponent', () => {
  let component: DialogEditarUsuarioComponent;
  let fixture: ComponentFixture<DialogEditarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditarUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
