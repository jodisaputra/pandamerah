<?php

namespace App\Services;

use App\Models\Menu;
use App\Models\MenuCategory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class MenuService
{
    public function generateCode($menuCategoryId)
    {
        $category = MenuCategory::findOrFail($menuCategoryId);
        $prefix = $category->code;
        $lastMenu = Menu::where('menu_category_id', $menuCategoryId)
            ->orderByDesc('id')
            ->first();
        $number = 1;
        if ($lastMenu) {
            $lastCode = (int)substr($lastMenu->code, strlen($prefix));
            $number = $lastCode + 1;
        }
        return $prefix . str_pad($number, 3, '0', STR_PAD_LEFT);
    }

    public function getAll()
    {
        return Menu::with('category');
    }

    public function create(array $data)
    {
        $data['code'] = $this->generateCode($data['menu_category_id']);
        if (isset($data['image'])) {
            $data['image'] = $this->uploadImage($data['image']);
        }
        return Menu::create($data);
    }

    public function update(Menu $menu, array $data)
    {
        if (isset($data['image'])) {
            if ($menu->image) {
                Storage::delete($menu->image);
            }
            $data['image'] = $this->uploadImage($data['image']);
        }
        $menu->update($data);
        return $menu;
    }

    public function delete(Menu $menu)
    {
        if ($menu->image) {
            Storage::delete($menu->image);
        }
        return $menu->delete();
    }

    protected function uploadImage($file)
    {
        return $file->store('menus', 'public');
    }
} 