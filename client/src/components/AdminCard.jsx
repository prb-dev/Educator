import React from "react";

export default function AdminCard({ title, icon, desc }) {
  return (
    <main
      style={{ backgroundColor: "#141b2d" }}
      className="m-5 text-white p-4 pt-7 pb-7 rounded-lg flex justify-between w-60 items-center hover:brightness-105 cursor-pointer"
    >
      <div>
        <div className="flex items-center gap-2 text-lg">
          {icon}
          <p>{desc}</p>
        </div>
        <h1 className="" style={{ color: "#4cceac" }}>
          {title}
        </h1>
      </div>
      <div>something</div>
    </main>
  );
}
