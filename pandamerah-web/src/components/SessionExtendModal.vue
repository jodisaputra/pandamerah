<template>
  <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Session Expired</h5>
        </div>
        <div class="modal-body">
          <p>Your session has expired. Would you like to extend your login?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="$emit('logout')">No, Logout</button>
          <button class="btn btn-primary" @click="$emit('extend')">Yes, Extend</button>
        </div>
      </div>
    </div>
  </div>
</template> 