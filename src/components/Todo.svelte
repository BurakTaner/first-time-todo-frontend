<script>
  import { userStore } from "../ts/userStore";
  function logout() {
    localStorage.removeItem("user");
    userStore.set(null);
  }
</script>

<button on:click={logout}>Logout</button>
