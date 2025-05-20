@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Menus</h3>
                    <div class="card-tools">
                        <a href="{{ route('menus.create') }}" class="btn btn-primary">Add Menu</a>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered table-striped" id="menusTable">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
$(document).ready(function() {
    var table = $('#menusTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: "{{ route('menus.index') }}",
        columns: [
            {data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false},
            {data: 'code', name: 'code'},
            {data: 'name', name: 'name'},
            {data: 'category', name: 'category'},
            {data: 'price', name: 'price'},
            {data: 'status', name: 'status'},
            {data: 'image', name: 'image', orderable: false, searchable: false, render: function(data) {
                if (data) {
                    return '<img src="/storage/' + data + '" width="50">';
                }
                return '';
            }},
            {data: 'action', name: 'action', orderable: false, searchable: false}
        ]
    });

    // Delete menu
    $(document).on('click', '.delete-menu', function() {
        var id = $(this).data('id');
        if (confirm('Are you sure you want to delete this menu?')) {
            $.ajax({
                url: "/menus/" + id,
                method: 'DELETE',
                data: {
                    _token: '{{ csrf_token() }}'
                },
                success: function(response) {
                    if (response.success) {
                        table.ajax.reload();
                        toastr.success(response.message);
                    }
                }
            });
        }
    });
});
</script>
@endpush 