<?php

namespace App\Http\Requests\Admin;

use App\Concerns\HasIndonesianMessages;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreFaqRequest extends FormRequest
{
    use HasIndonesianMessages;

    /**
     * Admin content routes are intentionally public for this project.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'question' => ['required', 'string', 'max:255'],
            'answer' => ['required', 'string'],
            'sort_order' => ['integer'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'question' => 'pertanyaan',
            'answer' => 'jawaban',
            'sort_order' => 'urutan',
        ];
    }
}
