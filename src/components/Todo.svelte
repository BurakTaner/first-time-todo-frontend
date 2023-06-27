<script lang="ts">
  import { each } from "svelte/internal";
  import type Todo from "../interfaces/Todo";
  import { userStore } from "../ts/userStore";
  const todos: Todo[] = $userStore.todos;
  function logout() {
    localStorage.removeItem("user");
    userStore.set(null);
  }
</script>

<div>
  <button on:click={logout} class="logout-btn">Logout</button>
  <table>
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Description</th>
        <th>IsFinished</th>
      </tr>
    </thead>
    <tbody
      >{#each todos as todo, i}
        <tr>
          <th>{i + 1}</th>
          <td>{todo.title}</td>
          <td
            ><p class="des-p">
              {todo.description}
            </p></td
          >
          <td>{todo.isFinished}</td>
        </tr>
      {/each}</tbody
    >
  </table>
</div>

<style lang="scss">
  $btn-bg: #c0b9af;
  table {
    &,
    th,
    td {
      padding: 10px;
    }
  }

  .logout-btn {
    position: fixed;
    top: 50px;
    left: 100px;
    background: $btn-bg;
    padding: 5px;

    &:hover {
      background: #{$btn-bg}6F;
    }
  }

  .des-p {
    width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
