"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BanIcon, PencilIcon, ShieldCloseIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const getData = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000?_=" + new Date().getTime());
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};
const TodoList = () => {
  const { refresh } = useRouter();
  const [todos, setTodos] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [editingId, setEditingId] = useState<null | number>(null);
  const [newTitle, setNewTitle] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setTodos(data);
    };

    fetchData();
  }, []);
  //Edit Function
  const handleEdit = (id: any) => {
    setEditingId(id);
    const todoToEdit: any = todos.find((todo: any) => todo.id === id);
    setNewTitle(todoToEdit.title);
    setNewDescription(todoToEdit.description);
  };

  const handleSaveEdit = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        refresh();
        throw new Error(
          `Failed to update todo. Server response: ${errorMessage}`
        );
      }

      const updatedTodos: any = todos.map((todo: any) =>
        todo.id === id
          ? { ...todo, title: newTitle, description: newDescription }
          : todo
      );

      setTodos(updatedTodos);
      setEditingId(null);
      setNewTitle("");
      setNewDescription("");
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  //Delete Function
  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      const UpdatedTodos = todos.filter((todo: any) => todo.id !== id);
      setTodos(UpdatedTodos);
      refresh();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    
    <div className="max-h-[300px] overflow-auto overscroll-auto mb-4">
      {todos.map((item: any) => (
        <div
          key={item.id}
          className="px-4 py-2.5 bg-gray-100 rounded-lg flex items-center gap-x-3 shadow my-2"
        >
          {/* circle */}
          <div className="h-3 w-3 bg-orange-600 rounded-full"></div>
          {/* input field for editing */}
          {editingId === item.id ? (
            <Input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            <p className="text-lg font-medium">{item.title}</p>
          )}
          {/* Edit todo */}
          <div className="flex gap-x-2">
            {editingId === item.id ? (
              <>
                <Button
                  variant={"outline"}
                  onClick={() => handleSaveEdit(item.id as number)}
                >
                  Save
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => setEditingId(null)}
                >
                  <ShieldCloseIcon size={18} className="pr-1" />
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    handleEdit(item.id as number);
                  }}
                >
                  <PencilIcon size={18} className="pr-1" />
                  Edit
                </Button>

                {/* Delete todo */}
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 size={18} className="pr-1" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
