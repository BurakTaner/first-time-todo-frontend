<script lang="ts">
  import { userStore } from "../ts/userStore";
  import Login from "../components/Login.svelte";
  import Register from "../components/Register.svelte";
  import Todo from "./Todo.svelte";
  let displayLgn = true;
  let title = "Login";
  let registered = false;

  function changeForm() {
    if (title === "Login") {
      displayLgn = false;
      title = "Register";
    } else {
      displayLgn = true;
      title = "Login";
    }
  }

  function changeDisplayOnRegister() {
    title = "Login";
    registered = true;
  }
</script>

{#if !$userStore}
  <h2 class="form-title">{title}</h2>
  {#if displayLgn || registered}
    <Login />
  {:else}
    <Register on:succes={changeDisplayOnRegister} />
  {/if}
{:else}
  <Todo />
{/if}

<button on:click={changeForm}>Change</button>

<style>
  .form-title {
    text-align: center;
    margin-top: 150px;
  }
</style>
