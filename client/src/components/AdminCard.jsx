import React from "react";

export default function AdminCard({ title, icon, desc }) {
  return (
    <main
      className="m-5 p-4 text-slate-700 pt-7 pb-7 rounded-lg flex justify-between w-60 h-fit items-center hover:brightness-105 cursor-pointer border-green-600 border bg-green-600/5"
    >
      <div>
        <div className="flex items-center gap-2 text-lg">
          {icon}
          <p>{desc}</p>
        </div>
        <h1 className="text-green-600">
          {title}
        </h1>
      </div>
      <div>something</div>
    </main>
  );
}
