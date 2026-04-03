import { useNavigate } from 'react-router-dom'
import type { Course } from '../../data/mockCourses'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate()
  const progress = course.totalLessons > 0
    ? Math.round((course.completedLessons / course.totalLessons) * 100)
    : 0

  return (
    <div className="group flex flex-col rounded-2xl bg-white border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-2">
      {/* Cover image — 30% height, cropped */}
      <div className="h-32 w-full overflow-hidden">
        <img
          src={course.coverImage}
          alt={course.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Icon */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white text-xs font-bold mb-3 -mt-8 relative z-10"
          style={{ backgroundColor: course.color }}
        >
          {course.icon}
        </div>

        <h2
          className="text-base font-bold text-[#0d1c2f] mb-1"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {course.title}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">
          {course.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100">
            <div
              className="h-1.5 rounded-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CTA — gap spreads on hover */}
        <button
          onClick={() => navigate(`/course/${course.slug}`)}
          className="w-full rounded-xl py-2.5 px-5 text-sm font-bold text-white flex items-center justify-center gap-2 group-hover:gap-4 transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)' }}
        >
          Go to Course
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
