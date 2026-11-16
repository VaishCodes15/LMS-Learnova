import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Course = () => {
  return (
    <Card className="p-0 overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWQGew2vf7J8dNVSAoaibpiyI9B8AWbGe-OhYy76IRbg&s=10"
          alt="course"
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-4 py-3 space-y-2">
        <h1 className="hover:underline font-bold text-lg truncate cursor-pointer">
          Nextjs Complete Course in Hindi 2026
        </h1>
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-medium text-sm">JS with Jhon</h1>
        </div>
        <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
         Advance
        </Badge>
        </div>
       <div className="text-lg font-bold">
        <span>₹499</span>
       </div>
      </CardContent>
    </Card>
  );
};

export default Course;

