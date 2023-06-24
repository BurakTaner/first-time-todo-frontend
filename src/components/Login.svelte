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

<form on:submit|preventDefault={login} class="auth-form">
  <label for="username" class="auth-label">Username</label>
  <input type="text" bind:value={username} class="auth-input" id="username" />
  <label for="password" class="auth-label">Password</label>
  <input type="text" bind:value={password} class="auth-input" id="password" />
  <button type="submit">Submit</button>
</form>
