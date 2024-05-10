import React from "react";

export default function AdminCard({ title, icon, desc, data, count }) {
  const dataSet = [];
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      dataSet.push({
        course: value.course.name,
        revenue: value.revenue,
      });
    });
  }
  return (
    <main
      className={`m-5 p-4 text-slate-700 pt-7 pb-7 rounded-lg flex justify-between ${
        data ? "w-fit gap-10" : "w-60"
      } h-fit items-center hover:brightness-105 cursor-pointer border-sky-600/10 border shadow-lg shadow-slate-200 bg-sky-600/5`}
    >
      <div>
        <div className="flex items-center gap-2 text-lg">
          {icon}
          <p>{desc}</p>
        </div>
        <h1 className="text-sky-600">{title}</h1>
      </div>
      {data && (
        <section className="flex flex-col gap-5">
          {dataSet.map((d) => (
            <div key={d.course} className="flex justify-between gap-5">
              <p> {d.course} </p>
              <p> ${d.revenue} </p>
            </div>
          ))}
        </section>
      )}
      {count && <div>+{count} this month</div>}
    </main>
  );
}
