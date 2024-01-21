"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddTodo = () => {
  const { refresh } = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/todos/", task);
      console.log("Todo added successfully");
      setTask({ title: "", description: "" });
      refresh();
    } catch (error: any) {
      console.error("Error :", error.message);
    }
  };

  return (
    <main>
      <div className=" mt-4">
        {/* title input */}
        <Input
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          type="text"
          placeholder="Enter Todo Title"
          value={task.title}
        />

        {/* description input  */}
        <div className="mt-2">
          <Input
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            type="text"
            placeholder="Enter Todo Description"
            value={task.description}
          />
        </div>
        <div className="mt-3">
          <Button onClick={handleSubmit}>
            <PlusIcon size={22} />
            Add Todo
          </Button>
        </div>
      </div>
    </main>
  );
};

export default AddTodo;
