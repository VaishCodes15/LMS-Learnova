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
import React from "react";

const CourseTab = () => {
  const isPublished = false;
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click 'save' when you're done.
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
            placeholder="Ex. Fullstack developer"
            name="courseTitle"
          />
        </div>
         <div className="space-y-2 mt-5">
          <Label>Subtitle</Label>
          <Input
            type="text"
            placeholder="Ex. Fullstack developer"
            name="courseTitle"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
