<?php

namespace App\Services;

use App\Models\MenuCategory;
use Illuminate\Support\Str;

class MenuCategoryService
{
    public function generateSlug($name)
    {
        return MenuCategory::generateUniqueSlug($name);
    }

    public function getAll()
    {
        return MenuCategory::query();
    }

    public function create(array $data)
    {
        if (empty($data['slug'])) {
            $data['slug'] = $this->generateSlug($data['name']);
        }
        // 'code' will be mass assigned via $fillable
        return MenuCategory::create($data);
    }

    public function update(MenuCategory $category, array $data)
    {
        if (empty($data['slug'])) {
            $data['slug'] = $this->generateSlug($data['name']);
        }
        // 'code' will be mass assigned via $fillable
        $category->update($data);
        return $category;
    }

    public function delete(MenuCategory $category)
    {
        return $category->delete();
    }
} 