"use client";

import { useCourse } from "@/store"
import { useRouter } from "next/navigation"; 
import dynamic from "next/dynamic";

export interface Course {
  title: string;
  id: string;
}

const CourseCard = ({course}: {course: Course})=>{
  const router = useRouter()
  const fetchCourseById = useCourse(state => state.fetchCourseById)

  const handleClick = async (courseId: string)=>{
    await fetchCourseById(courseId)
    router.push("/main")
  }

  return (
    <div
      className="w-52 h-24 bg-indigo-500 rounded-md p-1 shadow-lg hover:bg-indigo-700 cursor-pointer flex justify-center items-center transition-colors text-white"
    >
      <button onClick={()=>handleClick(course.id)}>{course.title}</button>
      {/* <Link href={'/main'}>
        {course.title}
      </Link> */}
    </div>
  )
}

export default CourseCard