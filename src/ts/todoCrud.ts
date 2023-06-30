import type CreateTodoRequest from "../contracts/CreateTodoRequest";
import type UpdateTodoContract from "../contracts/UpdateTodoContract";
import type Todo from "../interfaces/Todo";
import type User from "../interfaces/User";
import { userStore } from "./userStore";

export async function deleteTodo(id: number):Promise<void> {
  const response = await fetch(`http://localhost:5154/todos/${id}`, {
    method: "DELETE",
    mode: "cors"
  });

  if (response.status === 204) {
    userStore.update((a:User|null) => {
      if (a) {
        const newUser: User | null = { ...a };
        newUser.todos = a.todos.filter(a => a.id !== id);
        localStorage.setItem("user", JSON.stringify(newUser));
        userStore.set(newUser);
        return newUser;
      }
      return null;
    });
  }
}

export async function updateTodo(todo: UpdateTodoContract, id: number):Promise<void> {
  const response = await fetch(`http://localhost:5154/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title:todo.title,
      description: todo.description,
      isFinished: todo.isFinished
    }),
    mode: "cors",
    headers: {
     "Content-Type": "application/json" 
    }
  });
  if (response.status === 204) {
    userStore.update(a => {
      if (a) {
        const todos = a.todos.filter(a => a.id !== id);
        todos.push({
          id,
          title: todo.title,
          description: todo.description,
          isFinished: todo.isFinished
        });
        a.todos = todos;
        localStorage.setItem("user", JSON.stringify(a));
        return a;
      }
      return null;
    });
  }
}

export async function readTodo(id: number):Promise<Todo|string> {
  const response = await fetch(`http://localhost:5154/todos/todo/${id}`, {
    method: "GET",
    mode: "cors"
  });

  if(response.status === 200) {
    return await response.json();
  }
  else {
    return "Not Found";
  }
}

export async function createTodo(todo: CreateTodoRequest, userId:number | undefined):Promise<void> {
  const response = await fetch("http://localhost:5154/todos", {
    method: "POST",
    body: JSON.stringify({...todo, userId}),
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if(response.status === 201) {
    const content:Todo = await response.json();
    userStore.update((a:User|null) => {
      if(a) {
        const todos = a.todos;
        todos.push({
                  id: content.id,
                  title: content.title,
                  isFinished: content.isFinished,
                  description: content.description
        });
        localStorage.setItem("user", JSON.stringify({a}))
        return {...a}
      }
      return null;
    });
  }
}
