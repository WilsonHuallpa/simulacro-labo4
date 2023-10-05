import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-alta-actores',
  templateUrl: './alta-actores.component.html',
  styleUrls: ['./alta-actores.component.scss'],
})
export class AltaActoresComponent {
  actores: FormGroup;
  valorPasarAlHijo = 'pais';

  constructor(private toastr: ToastrService, private fb: FormBuilder, private firestore: FirestoreService, private notifyService: NotificationService) {
    this.actores = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      direOpcional: ['', [Validators.minLength(3)]],
      pais: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      zip: ['', [Validators.required]],
    });
  }

  addUser() {
    const user = this.actores.value;
    try {
      this.firestore.addActores(user);
      // this.toastr.success('Hello world!', 'Toastr fun!');
    } catch (error) {
      // this.notifyService.showError('¡Error!', 'Al registrar');
    }
  }
  seleccionarPais(pais: string) {
    this.actores.patchValue({ pais: pais });
  }
}
