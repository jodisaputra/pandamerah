<button type="button" class="btn btn-sm btn-info edit-category" 
    data-id="{{ $row->id }}"
    data-name="{{ $row->name }}"
    data-slug="{{ $row->slug }}"
    data-status="{{ $row->status }}">
    <i class="fas fa-edit"></i>
</button>

<button type="button" class="btn btn-sm btn-danger delete-category" data-id="{{ $row->id }}">
    <i class="fas fa-trash"></i>
</button> 