import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  /** Permite solo teclas numéricas en el campo de teléfono */
  soloNumeros(event: KeyboardEvent): boolean {
    const charCode = event.which ?? event.keyCode;
    // Permitir teclas de control (backspace, delete, flechas, tab)
    if (charCode === 0 || charCode === 8) return true;
    // Bloquear cualquier carácter que no sea dígito (0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  /** Limpia el contenido pegado para aceptar solo dígitos y máx. 10 */
  pegadoNumeros(event: ClipboardEvent): void {
    event.preventDefault();
    const texto = event.clipboardData?.getData('text') ?? '';
    const soloDigitos = texto.replace(/\D/g, '').slice(0, 10);
    const input = event.target as HTMLInputElement;
    input.value = soloDigitos;
  }

  onSubmit(): void {
    // Aquí puedes agregar la lógica de envío del formulario
    console.log('Formulario enviado');
  }
}
