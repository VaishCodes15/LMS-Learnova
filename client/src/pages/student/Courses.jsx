// import { Skeleton } from "@/components/ui/skeleton";
// import React from "react";
// import Course from "./Course";

// const Courses = () => {
//   const isLoading = true;
//   return (
//     <div className="bg-gray-50">
//       <div className="max-w-7xl mx-auto p-6">
//         <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {isLoading ? (
//             Array.from({ length: 8 }).map((_, index) => (
//               <CourseSkeleton key={index} />
//             ))
//           ) : (
//             <Course />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

// const CourseSkeleton = () => {
//   return (
//     <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
//       <Skeleton className="w-full h-36" />
//       <div className="px-5 py-4 space-y-3">
//         <Skeleton className="h-6 w-3/4" />
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Skeleton className="h-6 w-6 rounded-full" />
//             <Skeleton className="h-4 w-20" />
//           </div>
//           <Skeleton className="h-4 w-16" />
//         </div>
//         <Skeleton className="h-4 w-1/4" />
//       </div>
//     </div>
//   );
// };


import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";

const courses = [1,2,3,4,5,6];

const Courses = () => {
  const isLoading = false;
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-bold text-3xl text-center mb-10 text-gray-800">Our Courses</h2>
        
        {/* Grid layout adjusted to match standard 3 or 4 columns cleanly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
            courses.map((course, index)=><Course key={index}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-gray-100">
      {/* Explicit gray background added so skeleton placeholder blocks are clearly visible */}
      <Skeleton className="w-full h-36 bg-gray-200" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-gray-200" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-gray-200" />
            <Skeleton className="h-4 w-20 bg-gray-200" />
          </div>
          <Skeleton className="h-4 w-16 bg-gray-200" />
        </div>
        <Skeleton className="h-4 w-1/4 bg-gray-200" />
      </div>
    </div>
  );
};