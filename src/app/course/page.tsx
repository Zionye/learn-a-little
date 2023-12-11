import React from 'react'
import CourseCard from '@/components/CourseCard';

interface Course{
  id: string;
  title: string;
}

async function fetchCourses(): Promise<Course[]> {
  const basePath = process.env.API_URL;
  console.log('basePath: -->', basePath);
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
    <div className='p-8'>
      <div className="flex items-center hover:no-underline">
        <h1 className='text-2xl font-bold text-fuchsia-500 lg:text-4xl'>
          <span>Learn English</span>
        </h1>
      </div>

      <div>
        <ul className='flex flex-wrap'>
          {
            courses.map(course => {
              return <li className='p-8' key={course.id}>
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