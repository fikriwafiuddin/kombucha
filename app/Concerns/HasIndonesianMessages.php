<?php

namespace App\Concerns;

/**
 * Provides Indonesian (Bahasa Indonesia) validation messages so form
 * validation errors are returned in Indonesian instead of Laravel's English
 * defaults. Pair this trait with an {@see attributes()} method on the request
 * to translate the ":attribute" placeholder into a human-readable field label.
 */
trait HasIndonesianMessages
{
    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'string' => ':attribute harus berupa teks.',
            'integer' => ':attribute harus berupa angka bulat.',
            'numeric' => ':attribute harus berupa angka.',
            'boolean' => ':attribute harus berupa benar atau salah.',
            'array' => ':attribute harus berupa daftar.',

            'email' => ':attribute harus berupa alamat email yang valid.',
            'url' => ':attribute harus berupa URL yang valid.',
            'unique' => ':attribute sudah digunakan.',
            'confirmed' => 'Konfirmasi :attribute tidak cocok.',
            'current_password' => ':attribute tidak sesuai dengan catatan kami.',
            'in' => ':attribute yang dipilih tidak valid.',

            'image' => ':attribute harus berupa gambar.',
            'mimes' => ':attribute harus berformat salah satu dari: :values.',

            'between.numeric' => ':attribute harus bernilai antara :min dan :max.',
            'between.string' => ':attribute harus terdiri dari :min sampai :max karakter.',
            'between.array' => ':attribute harus memiliki :min sampai :max item.',

            'min.numeric' => ':attribute minimal :min.',
            'min.string' => ':attribute minimal :min karakter.',
            'min.array' => ':attribute minimal :min item.',
            'min.file' => 'Ukuran :attribute minimal :min kilobyte.',

            'max.numeric' => ':attribute maksimal :max.',
            'max.string' => ':attribute maksimal :max karakter.',
            'max.array' => ':attribute maksimal :max item.',
            'max.file' => 'Ukuran :attribute maksimal :max kilobyte.',

            // Aturan kompleksitas kata sandi (Laravel Password::default()).
            'letters' => ':attribute harus mengandung setidaknya satu huruf.',
            'mixed' => ':attribute harus mengandung huruf besar dan huruf kecil.',
            'numbers' => ':attribute harus mengandung setidaknya satu angka.',
            'symbols' => ':attribute harus mengandung setidaknya satu simbol.',
            'uncompromised' => ':attribute pernah muncul dalam kebocoran data. Silakan gunakan :attribute lain.',
        ];
    }
}
