import { create } from "zustand";

// 课程
interface Statement{
  chinese: string;
  english: string;
  soundmark: string
}
interface CourseData{
  id: string;
  title: string;
  statements: Statement[]
}
interface State{
  statementIndex: number;
  currentCourse?: CourseData;
  currentStatement?: Statement;
  toNextStatement: ()=>void;
  fetchCourse: (courseId: CourseData["id"])=> void;
  getCurrentStatement: ()=>Statement | undefined;
  checkCorrect: (input: string)=>boolean;
}
export const useCourse = create<State>((set, get)=>({
  statementIndex: 0,
  currentCourse: undefined,
  async fetchCourse(courseId: CourseData["id"]){
    // 拉取后端数据
    try {
      // 从 pdf.json 获取数据
      // const response = await fetch(`/api/course-pdf`);
      // 从 courses 来获取
      const response = await fetch(`/course/${courseId}/api`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();
      set({currentCourse: res.data})

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  toNextStatement(){
    set((state)=>({statementIndex: state.statementIndex + 1}))
  },
  getCurrentStatement(){
    const {currentCourse, statementIndex} = get()
    return currentCourse?.statements[statementIndex]
  },
  checkCorrect(input: string){
    console.log('||||')
    const currentStatement = get().getCurrentStatement()
    return input === currentStatement?.english
  },
}));

// export function useActions(store: State){
//   return {
//     checkCorrect(input: string){
//       const currentStatement = store.getCurrentStatement()
//       return input === currentStatement?.english
//     }
//   }
// }

// 失败记录
interface FailedCountState{
  count: number;
  increaseFailedCount: (cb: ()=>void)=>void;
}
const failedCountTotal = 3
export const useFailedCount = create<FailedCountState>((set)=>({
  count: 0,
  increaseFailedCount(cb){
    set((state)=>{
      const nextCount = state.count + 1
      if(nextCount >= failedCountTotal){
        cb()
        return{
          count: 0
        }
      }
      return {
        count: nextCount
      }
    })
  }
}))
