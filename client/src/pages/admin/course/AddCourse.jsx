import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse,{data,isLoading,error,isSuccess}] = useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  const createCourseHandler = async () => {
    await createCourse({courseTitle,category});
  };

  //for displaying toast msg
  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  },[isSuccess,error])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Let's create a new course</h1>
        <p className="text-sm">Also add basic details for your new course</p>
      </div>
      <div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Your Course Name"
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent position="popper" className="w-full bg-white">
                <SelectGroup>
                  <SelectLabel className="font-semibold">Category</SelectLabel>
                  <SelectItem className="hover:bg-gray-100" value="Next JS">
                    Next JS
                  </SelectItem>
                  <SelectItem
                    value="Data Science"
                    className="hover:bg-gray-100"
                  >
                    Data Science
                  </SelectItem>
                  <SelectItem
                    value="Frontend Development"
                    className="hover:bg-gray-100"
                  >
                    Frontend Development
                  </SelectItem>
                  <SelectItem
                    value="Fullstack Development"
                    className="hover:bg-gray-100"
                  >
                    Fullstack Development
                  </SelectItem>
                  <SelectItem
                    value="MERN Stack Development"
                    className="hover:bg-gray-100"
                  >
                    MERN Stack Development
                  </SelectItem>
                  <SelectItem value="Javascript" className="hover:bg-gray-100">
                    Javascript
                  </SelectItem>
                  <SelectItem value="Python" className="hover:bg-gray-100">
                    Python
                  </SelectItem>
                  <SelectItem value="Docker" className="hover:bg-gray-100">
                    Docker
                  </SelectItem>
                  <SelectItem value="MongoDB" className="hover:bg-gray-100">
                    MongoDB
                  </SelectItem>
                  <SelectItem value="HTML" className="hover:bg-gray-100">
                    HTML
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hover:cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/admin/course")}
            >
              Back
            </Button>
            <Button
              className="text-white bg-black hover:bg-gray-900 hover:cursor-pointer"
              disabled={isLoading}
              onClick={createCourseHandler}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Pleast wait
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
