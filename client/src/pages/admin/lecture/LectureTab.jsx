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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setButtonDisable] = useState(true);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          console.log(res);

          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });

          setButtonDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click 'Save' when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-red-800 text-white hover:cursor-pointer"
            variant="desctructive"
          >
            {" "}
            Remove Lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mt-4">
          <Label>Title</Label>
          <Input type="text" placeholder="Ex. Introduction to JS" />
        </div>
        <div className="space-y-2 mt-6">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input type="file" accept="video/*" className="w-fit" onChange={fileChangeHandler} />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Is this video lecture free?</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-7">
          <Button className="text-white bg-black cursor-pointer">
            Update Lecture
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
