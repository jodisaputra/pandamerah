@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Menu Categories</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createModal">
                            Add Category
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered table-striped" id="menuCategoriesTable">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Create Modal -->
<div class="modal fade" id="createModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add Menu Category</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <form id="createForm">
                @csrf
                <div class="modal-body">
                    <div class="form-group">
                        <label>Category Name</label>
                        <input type="text" class="form-control" name="name">
                    </div>
                    <div class="form-group">
                        <label>Slug</label>
                        <input type="text" class="form-control" name="slug">
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select class="form-control" name="status">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Code</label>
                        <input type="text" class="form-control" name="code">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Menu Category</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <form id="editForm">
                @csrf
                @method('PUT')
                <input type="hidden" name="id" id="edit_id">
                <div class="modal-body">
                    <div class="form-group">
                        <label>Category Name</label>
                        <input type="text" class="form-control" name="name" id="edit_name">
                    </div>
                    <div class="form-group">
                        <label>Slug</label>
                        <input type="text" class="form-control" name="slug" id="edit_slug">
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select class="form-control" name="status" id="edit_status">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Code</label>
                        <input type="text" class="form-control" name="code" id="edit_code">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
$(document).ready(function() {
    // Initialize DataTable
    var table = $('#menuCategoriesTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: "{{ route('menu-categories.getData') }}",
        columns: [
            {data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false},
            {data: 'name', name: 'name'},
            {data: 'slug', name: 'slug'},
            {data: 'status', name: 'status'},
            {data: 'code', name: 'code'},
            {data: 'action', name: 'action', orderable: false, searchable: false}
        ]
    });

    // Generate slug on name input
    $('input[name="name"]').on('keyup', function() {
        var name = $(this).val();
        if (name) {
            $.get("{{ route('menu-categories.generateSlug') }}", { name: name }, function(data) {
                $('input[name="slug"]').val(data.slug);
            });
        }
    });

    // Create form submit
    $('#createForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: "{{ route('menu-categories.store') }}",
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                if (response.success) {
                    $('#createModal').modal('hide');
                    table.ajax.reload();
                    toastr.success(response.message);
                }
            },
            error: function(xhr) {
                var errors = xhr.responseJSON.errors;
                $.each(errors, function(key, value) {
                    toastr.error(value[0]);
                });
            }
        });
    });

    // Edit form submit
    $('#editForm').on('submit', function(e) {
        e.preventDefault();
        var id = $('#edit_id').val();
        $.ajax({
            url: "/menu-categories/" + id,
            method: 'PUT',
            data: $(this).serialize(),
            success: function(response) {
                if (response.success) {
                    $('#editModal').modal('hide');
                    table.ajax.reload();
                    toastr.success(response.message);
                }
            },
            error: function(xhr) {
                var errors = xhr.responseJSON.errors;
                $.each(errors, function(key, value) {
                    toastr.error(value[0]);
                });
            }
        });
    });

    // Delete category
    $(document).on('click', '.delete-category', function() {
        var id = $(this).data('id');
        if (confirm('Are you sure you want to delete this category?')) {
            $.ajax({
                url: "/menu-categories/" + id,
                method: 'DELETE',
                success: function(response) {
                    if (response.success) {
                        table.ajax.reload();
                        toastr.success(response.message);
                    }
                }
            });
        }
    });

    // Edit modal
    $(document).on('click', '.edit-category', function() {
        $('#editForm')[0].reset(); // Reset form first
        var id = $(this).data('id');
        var code = $(this).data('code');
        var name = $(this).data('name');
        var slug = $(this).data('slug');
        var status = $(this).data('status');

        $('#edit_id').val(id);
        $('#edit_code').val(code);
        $('#edit_name').val(name);
        $('#edit_slug').val(slug);
        $('#edit_status').val(status);

        $('#editModal').modal('show');
    });

    // Reset create form when modal is shown
    $('#createModal').on('show.bs.modal', function () {
        $('#createForm')[0].reset();
    });
});
</script>
@endpush 