<script lang="ts">
  import type CreateTodoRequest from "../../contracts/CreateTodoRequest";
  import type UpdateTodoContract from "../../contracts/UpdateTodoContract";
  import type Todo from "../../interfaces/Todo";
  import {
    createTodo,
    deleteTodo,
    readTodo,
    updateTodo,
  } from "../../ts/todoCrud";
  import { todoModalStore } from "../../ts/todoModalStore";
  import { userStore } from "../../ts/userStore";

  let title: string;
  let description: string;
  let isFinished: string;
  const createSubmit = async (e: SubmitEvent) => {
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const todo: CreateTodoRequest = {
      title,
      description,
    };
    await createTodo(todo, $todoModalStore?.value);
    todoModalStore.set(null);
  };

  const updateSubmit = async (e: SubmitEvent) => {
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const todo: UpdateTodoContract = {
      title: formData.get("title")!.toString(),
      description: formData.get("description")!.toString(),
      isFinished: isFinished === "on" ? true : false,
    };
    const id = $todoModalStore!.value;
    await updateTodo(todo, id);
    todoModalStore.set(null);
  };

  function closeModal() {
    todoModalStore.set(null);
  }
  function returnKeysAsKeyO(todo: Todo): (keyof Todo)[] {
    const keys: (keyof Todo)[] = Object.keys(todo) as (keyof Todo)[];
    return keys;
  }
</script>

<section>
  {#if $todoModalStore}
    {#if $todoModalStore.method === "create"}
      <article class="container">
        <form on:submit|preventDefault={createSubmit}>
          <label for="title">Title</label>
          <input type="text" id="title" bind:value={title} />
          <label for="description">Description</label>
          <input type="text" id="description" bind:value={description} />
          <button type="submit">Create</button>
        </form>
        <button on:click|preventDefault={closeModal}>Cancel</button>
      </article>
    {:else if $todoModalStore.method === "delete"}
      <article class="container">
        <p>Are you sure you want to delete this?</p>
        <div class="btn-container">
          <button
            on:click|preventDefault={async () => {
              if (typeof $todoModalStore?.value === "number") {
                await deleteTodo($todoModalStore.value);
                todoModalStore.set(null);
              }
            }}>Yes</button
          >
          <button on:click|preventDefault={closeModal}>Cancel</button>
        </div>
      </article>
    {:else if $todoModalStore.method === "read"}
      <article class="container">
        {#await readTodo($todoModalStore.value)}
          ...
        {:then todo}
          {#if typeof todo === "string"}
            <p>{todo}</p>
          {:else}
            {@const keys = returnKeysAsKeyO(todo)}
            <h2>Todo Information</h2>
            <ol class="info-list">
              {#each keys as key (key)}
                <li>
                  <h2>{key}</h2>
                  <p>{todo[key]}</p>
                </li>
              {/each}
            </ol>
          {/if}
        {/await}
        <button on:click|preventDefault={closeModal}>Cancel</button>
      </article>
    {:else if $todoModalStore.method === "update"}
      {@const Utodo = $userStore?.todos.find(
        (a) => a.id === $todoModalStore?.value
      )}
      <article class="container">
        <form on:submit|preventDefault={updateSubmit}>
          <label for="title">Title</label>
          <input type="text" id="title" value={Utodo?.title} name="title" />
          <label for="description">Description</label>
          <input
            type="text"
            id="description"
            value={Utodo?.description}
            name="description"
          />
          <label for="isfinished">IsFinished</label>
          <input
            type="checkbox"
            id="isfinished"
            checked={Utodo?.isFinished}
            bind:value={isFinished}
          />
          <button type="submit">Update</button>
        </form>
        <button on:click|preventDefault={closeModal}>Cancel</button>
      </article>
    {/if}
  {/if}
</section>

<style lang="scss">
  section {
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);

    .container {
      display: flex;
      flex-direction: column;
      gap: 30px;
      padding: 40px;
      color: white;
      background: purple;

      .btn-container {
        display: flex;
        flex-direction: row;

        button {
          display: inline-block;
          width: 50%;
        }
      }
    }
  }

  .info-list {
    list-style: none;
    li {
      margin: 20px auto;
    }
    p {
      font-size: 1.5rem;
    }
  }
</style>
