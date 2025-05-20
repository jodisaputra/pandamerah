<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Services\MenuService;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class MenuController extends Controller
{
    protected $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        if ($request->ajax()) {
            $query = $this->menuService->getAll();
            return DataTables::of($query)
                ->addIndexColumn()
                ->addColumn('category', function ($row) {
                    return $row->category ? $row->category->name : '-';
                })
                ->editColumn('price', function ($row) {
                    return 'Rp ' . number_format($row->price, 0, ',', '.');
                })
                ->addColumn('status', function ($row) {
                    if ($row->status == 'active') {
                        return '<span class="badge badge-success">Active</span>';
                    } else {
                        return '<span class="badge badge-danger">Inactive</span>';
                    }
                })
                ->addColumn('action', function ($row) {
                    return view('menus.actions', compact('row'))->render();
                })
                ->rawColumns(['status', 'action'])
                ->make(true);
        }
        return view('menus.index');
    }

    public function create()
    {
        $categories = MenuCategory::all();
        return view('menus.create', compact('categories'));
    }

    public function store(StoreMenuRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image');
        }
        $this->menuService->create($data);
        return redirect()->route('menus.index')->with('success', 'Menu has been successfully added');
    }

    public function edit(Menu $menu)
    {
        $categories = MenuCategory::all();
        return view('menus.edit', compact('menu', 'categories'));
    }

    public function update(UpdateMenuRequest $request, Menu $menu)
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image');
        }
        $this->menuService->update($menu, $data);
        return redirect()->route('menus.index')->with('success', 'Menu has been successfully updated');
    }

    public function destroy(Menu $menu)
    {
        $this->menuService->delete($menu);
        return response()->json(['success' => true, 'message' => 'Menu has been successfully deleted']);
    }

    public function generateCode(Request $request)
    {
        $categoryId = $request->input('menu_category_id');
        $code = $this->menuService->generateCode($categoryId);
        return response()->json(['code' => $code]);
    }
} 