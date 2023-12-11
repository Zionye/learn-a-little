import React from 'react'
import CourseCard from '@/components/CourseCard';
import dotenv from "dotenv"
import path from 'path';

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;
if (isDev) {
  dotenv.config({
    path: path.resolve(__dirname, "../.env.development"),
    override: true,
  });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.resolve(__dirname, "../.env.production") });
} else {
  console.error(`无效的 NODE_ENV:${process.env.NODE_ENV}`);
}

interface Course{
  id: string;
  title: string;
}

async function fetchCourses(): Promise<Course[]> {
  const basePath = process.env.BASE_PATH;
  const response = await fetch(`${basePath}/course/api`);
 
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const res = await response.json();
 
  return res.data
}

const Courses = async ()=>{
  const courses = await fetchCourses()

  return (
    <div>
      <div>
        <ul>
          {
            courses.map(course => {
              return <li key={course.id}>
                <CourseCard course={course} />
              </li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Courses