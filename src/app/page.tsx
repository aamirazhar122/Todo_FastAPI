import Image from "next/image";
import TodoList from "../components/ui/TodoList";
import AddTodo from "@/components/AddTodo";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center bg-gradient-to-tr from-orange-600 to-pink-600 h-screen">
        <div className="px-3 py-4 rounded-xl bg-white/40 w-full max-w-md">
          {/* TodoList component is here 👇🏻 👇🏻 👇🏻 👇🏻 👇🏻 👇🏻 👇 */}
          {/* @ts-ignore*/}
          <TodoList />
          {/* Add Todo */}
          <AddTodo />
          <div className="w-1/2 h-1.5 bg-black/80 mx-auto rounded mt-4"></div>
        </div>
      </div>
    </main>
  );
}
