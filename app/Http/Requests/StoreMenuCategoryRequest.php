<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMenuCategoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'code' => 'required|string|max:255|unique:menu_categories,code',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:menu_categories,slug',
            'status' => 'required|in:active,inactive',
        ];
    }

    public function messages()
    {
        return [
            'code.required' => 'Code is required',
            'code.unique' => 'This code is already in use, please use a different one',
            'code.max' => 'Code cannot exceed 255 characters',
            'name.required' => 'Category name is required',
            'name.max' => 'Category name cannot exceed 255 characters',
            'slug.required' => 'Slug is required',
            'slug.unique' => 'This slug is already in use, please use a different one',
            'slug.max' => 'Slug cannot exceed 255 characters',
            'status.required' => 'Status is required',
            'status.in' => 'Invalid status value',
        ];
    }
} 