import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

// Define the ICourse interface for TypeScript
interface ICourse {
  id: string;
  main_title: string;
  category_id: string;
  level_id: string;
  course_thumbnail: string;
  course_type: string;
  publish: boolean;
  create_at: string;
  updated_at: string;
}

// Define the props for the Chart component
interface ChartProps {
  courses?: ICourse[]; // Make courses optional
}

// Chart component that accepts courses as a prop
const Chart: React.FC<ChartProps> = ({ courses = [] }) => {
  // Group courses by date and count the number of courses per date
  const groupedByDate = courses.reduce((acc, course) => {
    const date = course.create_at.split("T")[0];
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert the grouped data into an array of objects for Recharts
  const data = Object.keys(groupedByDate).map((date) => ({
    date,
    count: groupedByDate[date],
  }));

  return (
    <LineChart width={400} height={300} data={data}>
      <Line type="monotone" dataKey="count" stroke="#8F00FF" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default Chart;
