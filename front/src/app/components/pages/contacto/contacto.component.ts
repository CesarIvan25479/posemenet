
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../services/user/clientService.service';
import { NgxSonnerToaster, toast } from 'ngx-sonner';


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgxSonnerToaster],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  contactForm: FormGroup;
  loading = false;
  enviado = false;

  constructor(private fb: FormBuilder, private api: ClientService) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  get nombre() { return this.contactForm.get('nombre'); }
  get telefono() { return this.contactForm.get('telefono'); }
  get correo() { return this.contactForm.get('correo'); }
  get mensaje() { return this.contactForm.get('mensaje'); }

  
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { nombre, telefono, correo, mensaje } = this.contactForm.value;

    const payload = {
      nombre,
      telefono: `+52${telefono}`,
      correo,
      mensaje
    };

    this.api.sendEmail(payload).subscribe({  // se pasa el payload correctamente
      next: () => {

        this.loading = false;
        this.enviado = true;

        this.contactForm.reset();
        toast.success('Correo enviado correctamente');
        setTimeout(() => this.enviado = false, 5000);

      },
      error: () => {
        //console.error('Error al enviar:', err);
        toast.error('No se pudo enviar el correo');
        this.loading = false;
      }
    });
  }
}
