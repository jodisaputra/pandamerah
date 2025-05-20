<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMenuCategoryRequest;
use App\Http\Requests\UpdateMenuCategoryRequest;
use App\Models\MenuCategory;
use App\Services\MenuCategoryService;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class MenuCategoryController extends Controller
{
    protected $menuCategoryService;

    public function __construct(MenuCategoryService $menuCategoryService)
    {
        $this->menuCategoryService = $menuCategoryService;
        $this->middleware('auth');
    }

    public function index()
    {
        return view('menu-categories.index');
    }

    public function getData()
    {
        $query = $this->menuCategoryService->getAll();
        
        return DataTables::of($query)
            ->addIndexColumn()
            ->addColumn('action', function ($row) {
                return view('menu-categories.actions', compact('row'))->render();
            })
            ->editColumn('status', function ($row) {
                return view('menu-categories.status', compact('row'))->render();
            })
            ->rawColumns(['action', 'status'])
            ->make(true);
    }

    public function generateSlug(Request $request)
    {
        $name = $request->input('name');
        $slug = $this->menuCategoryService->generateSlug($name);
        
        return response()->json(['slug' => $slug]);
    }

    public function store(StoreMenuCategoryRequest $request)
    {
        try {
            $category = $this->menuCategoryService->create($request->validated());
            return response()->json([
                'success' => true,
                'message' => 'Menu category has been successfully added',
                'data' => $category
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateMenuCategoryRequest $request, MenuCategory $menuCategory)
    {
        try {
            $category = $this->menuCategoryService->update($menuCategory, $request->validated());
            return response()->json([
                'success' => true,
                'message' => 'Menu category has been successfully updated',
                'data' => $category
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(MenuCategory $menuCategory)
    {
        try {
            $this->menuCategoryService->delete($menuCategory);
            return response()->json([
                'success' => true,
                'message' => 'Menu category has been successfully deleted'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }
} 