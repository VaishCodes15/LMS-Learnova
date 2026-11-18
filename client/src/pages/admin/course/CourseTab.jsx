import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const isPublished = false;
  const navigate = useNavigate();
  const params = useParams();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const courseId = params.courseId;

  const { data: courseByIdData, isLoading: courseByIdLoading } =
    useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;

      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: "",
      });
      if (course.courseThumbnail) {
        setPreviewThumbnail(course.courseThumbnail);
      }
    }
  }, [courseByIdData]);


  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  //get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated.");
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course.");
    }
  }, [isSuccess, error,data, navigate]);
  

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click 'Save' when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button className="text-white bg-black hover:cursor-pointer">
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mt-4">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Fullstack developer"
          />
        </div>
        <div className="space-y-2 mt-5">
          <Label>Subtitle</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Become a Fullstack developer from 0 to hero in 3 months"
          />
        </div>
        <div className="space-y-2 mt-5">
          <Label>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>
        <div className="py-5 flex items-center gap-5">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={input.category} onValueChange={selectCategory}>
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
          <div className="space-y-2">
            <Label>Course Level</Label>
            <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select course level" />
              </SelectTrigger>
              <SelectContent position="popper" className="w-full bg-white">
                <SelectGroup>
                  <SelectLabel className="font-semibold">Level</SelectLabel>
                  <SelectItem className="hover:bg-gray-100" value="Beginner">
                    Beginner
                  </SelectItem>
                  <SelectItem value="Medium" className="hover:bg-gray-100">
                    Medium
                  </SelectItem>
                  <SelectItem value="Advance" className="hover:bg-gray-100">
                    Advance
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Price in (INR)</Label>
            <Input
              className="w-full"
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="399"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Course Thumbnail</Label>
          <Input
            type="file"
            onChange={selectThumbnail}
            accept="image/*"
            className="w-fit"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="w-64 my-2"
              alt="Course Thumbnail"
            />
          )}
        </div>
        <br />
        <div>
          <Button
            className="hover:cursor-pointer"
            variant="outline"
            onClick={() => navigate("/admin/course")}
          >
            Cancel
          </Button>
          <Button
            onClick={updateCourseHandler}
            disabled={isLoading}
            className="text-white bg-black hover:cursor-pointer ml-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
