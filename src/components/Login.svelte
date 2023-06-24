<script lang="ts">
  import { userStore } from "../ts/userStore";
  let username: string;
  let password: string;
  async function login(): Promise<void> {
    if (username && password) {
      const user = {
        username,
        password,
      };
      try {
        const response = await fetch("http://localhost:5154/login", {
          method: "POST",
          body: JSON.stringify(user),
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(user));
          userStore.set({ username, password });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
</script>

<form on:submit|preventDefault={login}>
  <input type="text" bind:value={username} />
  <input type="text" bind:value={password} />
  <button type="submit">Submit</button>
</form>
