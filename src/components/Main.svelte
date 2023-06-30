<script lang="ts">
  import { userStore } from "../ts/userStore";
  import Login from "../components/Login.svelte";
  import Register from "../components/Register.svelte";
  import Todo from "./todo/Todo.svelte";
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
  <section id="auth-sec">
    <h2>{title}</h2>
    {#if displayLgn || registered}
      <Login />
    {:else}
      <Register on:succes={changeDisplayOnRegister} />
    {/if}
    <button on:click={changeForm} class="chang-btn"
      >{title === "Login" ? "Register" : "Login"}</button
    >
  </section>
{:else}
  <section id="todos-sec" class="todos-sec">
    <Todo />
  </section>
{/if}

<style lang="scss">
  $form-bg: rgba(220, 31, 22, 0.6);
  $inp-bg: rgb(87, 30, 89);

  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(.auth-form) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 25px;
    height: 100%;
    background: $form-bg;
    padding: 20px;
  }

  #auth-sec,
  :global(.todos-sec) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .chang-btn {
    margin-top: 50px;
  }
</style>
