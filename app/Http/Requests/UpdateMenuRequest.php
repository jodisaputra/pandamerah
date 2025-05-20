<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMenuRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'menu_category_id' => 'required|exists:menu_categories,id',
            'price' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:active,inactive',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Menu name is required',
            'name.max' => 'Menu name cannot exceed 255 characters',
            'menu_category_id.required' => 'Menu category is required',
            'menu_category_id.exists' => 'Selected menu category does not exist',
            'price.required' => 'Price is required',
            'price.integer' => 'Price must be a number',
            'price.min' => 'Price must be at least 0',
            'image.image' => 'File must be an image',
            'image.mimes' => 'Image must be a file of type: jpeg, png, jpg, gif',
            'image.max' => 'Image size cannot exceed 2MB',
            'status.required' => 'Status is required',
            'status.in' => 'Invalid status value',
        ];
    }
} 