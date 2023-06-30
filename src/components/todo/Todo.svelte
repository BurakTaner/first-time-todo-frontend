<script lang="ts">
  import type Todo from "../../interfaces/Todo";
  import TodoModal from "./TodoModal.svelte";
  import { userStore } from "../../ts/userStore";
  import { todoModalStore } from "../../ts/todoModalStore";
  $: showModal = $todoModalStore !== null;
  $: todos = $userStore!.todos as Todo[];
  function logout() {
    localStorage.removeItem("user");
    userStore.set(null);
  }

  const displayModal = async (method: string, id: number = 0) => {
    switch (method) {
      case "delete":
        todoModalStore.set({
          method,
          value: id,
        });
        break;

      case "read":
        todoModalStore.set({
          method,
          value: id,
        });
        break;

      case "update":
        todoModalStore.set({
          method,
          value: id,
        });
        break;

      case "create":
        todoModalStore.set({
          method: "create",
          value: $userStore!.id,
        });
        break;
    }
  };
</script>

<div>
  <button on:click|once|preventDefault={logout} class="logout-btn"
    >Logout</button
  >
  <button
    on:click|preventDefault={() => displayModal("create")}
    class="create-btn">Create</button
  >
  <table>
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Description</th>
        <th>IsFinished</th>
      </tr>
    </thead>
    <tbody>
      {#each todos as todo, i (todo.id)}
        <tr>
          <th id={`${todo.id}-nth-todo`}>{i + 1}</th>
          <td>{todo.title}</td>
          <td
            ><p class="des-p">
              {todo.description}
            </p></td
          >
          <td>{todo.isFinished}</td>
          <i
            class="fa-solid fa-xmark delete"
            id="delete-i"
            on:click|preventDefault={() => displayModal("delete", todo.id)}
          />
          <i
            class="fa-solid fa-magnifying-glass info"
            id="read-i"
            on:click|preventDefault={() => displayModal("read", todo.id)}
          />
          <i
            class="fa-solid fa-pen edit"
            id="update-i"
            on:click|preventDefault={() => displayModal("update", todo.id)}
          />
        </tr>
      {/each}
    </tbody>
    {#if showModal}
      <TodoModal />
    {/if}
  </table>
</div>

<style lang="scss">
  $btn-bg: #c0b9af;
  $hvr-tools: rgba(236, 160, 87, 0.8);
  table {
    border-collapse: collapse;
    &,
    th,
    td {
      padding: 15px;
    }
    tbody {
      tr {
        border-bottom: 1px solid black;
      }
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

  .create-btn {
    position: fixed;
    top: 50px;
    right: 100px;
    background: $btn-bg;
    padding: 5px;
  }

  .des-p {
    width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  i {
    margin: auto 15px;
    &:hover {
      color: #{$hvr-tools};
      cursor: pointer;
    }
  }

  .delete {
    font-size: 30px;
    margin-top: 10px;
  }

  .info {
    font-size: 25px;
  }

  .edit {
    font-size: 25px;
  }
</style>
