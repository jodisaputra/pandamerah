@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Edit Menu</div>
                <div class="card-body">
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <form action="{{ route('menus.update', $menu->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label>Menu Category</label>
                            <select name="menu_category_id" class="form-control" required disabled>
                                @foreach($categories as $cat)
                                    <option value="{{ $cat->id }}" {{ $menu->menu_category_id == $cat->id ? 'selected' : '' }}>{{ $cat->name }} ({{ $cat->code }})</option>
                                @endforeach
                            </select>
                            <input type="hidden" name="menu_category_id" value="{{ $menu->menu_category_id }}">
                        </div>
                        <div class="form-group">
                            <label>Code</label>
                            <input type="text" name="code" class="form-control" value="{{ $menu->code }}" readonly>
                        </div>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="name" class="form-control" value="{{ old('name', $menu->name) }}" required>
                        </div>
                        <div class="form-group">
                            <label>Price (IDR)</label>
                            <input type="number" name="price" class="form-control" value="{{ old('price', $menu->price) }}" min="0" required>
                        </div>
                        <div class="form-group">
                            <label>Image</label>
                            @if($menu->image)
                                <div class="mb-2">
                                    <img src="/storage/{{ $menu->image }}" width="100">
                                </div>
                            @endif
                            <input type="file" name="image" class="form-control-file">
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <select name="status" class="form-control" required>
                                <option value="active" {{ $menu->status == 'active' ? 'selected' : '' }}>Active</option>
                                <option value="inactive" {{ $menu->status == 'inactive' ? 'selected' : '' }}>Inactive</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Update</button>
                        <a href="{{ route('menus.index') }}" class="btn btn-secondary">Back</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection 