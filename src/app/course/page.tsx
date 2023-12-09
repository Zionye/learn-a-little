import React from 'react'

interface Course{
  id: string;
  title: string;
}

async function fetchCourses(): Promise<Course[]> {
  const response = await fetch(`http://localhost:3000/course/api`);
 
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
              return <li key={course.id}>{course.title}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Courses