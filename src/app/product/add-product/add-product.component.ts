import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  imports: [CommonModule, FormsModule],
})
export class AddProductComponent {
  product = {
  name: '',
  price: 0,
  description: '',
  imageUrl: ''
};

previewUrl: string | ArrayBuffer | null = null;
selectedImageFile: File | null = null;

onImageSelected(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedImageFile = fileInput.files[0];

    // Optional: Preview image
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedImageFile);
  }
}

addProduct(): void {
  if (this.selectedImageFile) {
    // For now, we'll just set the file name (mock)
    this.product.imageUrl = this.selectedImageFile.name;

    // TODO: You can later upload this file to a server or Firebase etc.
  }

  console.log('Product added:', this.product);
  // Reset form
  this.product = { name: '', price: 0, description: '', imageUrl: '' };
  this.previewUrl = null;
  this.selectedImageFile = null;
}
}
