<script lang="ts">
  import { userStore } from "../ts/userStore";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let username: string;
  let password: string;
  let message: string;
  async function register(): Promise<void> {
    const user = {
      username,
      password,
    };
    try {
      const response = await fetch("http://localhost:5154/register", {
        method: "POST",
        body: JSON.stringify(user),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        message = "Your account has been created";
        setTimeout(() => {
          dispatch("succes");
        }, 5000);
      }
    } catch (e) {
      console.log(e);
    }
  }
</script>

{#if message}
  <p class="succes-msg">{message}</p>
{/if}
<form on:submit|preventDefault={register}>
  <input type="text" bind:value={username} />
  <input type="text" bind:value={password} />
  <button type="submit">Submit</button>
</form>

<style>
  .succes-msg {
    color: green;
  }
</style>
