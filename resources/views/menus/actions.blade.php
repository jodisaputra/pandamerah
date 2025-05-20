<a href="{{ route('menus.edit', $row->id) }}" class="btn btn-sm btn-info">
    <i class="fas fa-edit"></i>
</a>
<button type="button" class="btn btn-sm btn-danger delete-menu" data-id="{{ $row->id }}">
    <i class="fas fa-trash"></i>
</button> 