"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { UploadDropzone } from "@/utils/uploadthing";
import React from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/category.actions";
import { GET_LEVELS } from "@/graphql/level.actions";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UPDATE_COURSE } from "@/graphql/course.action";

interface ICategory {
  id: string;
  category: string;
}

interface ILevel {
  id: string;
  level: string;
}

//zod schema
const courseSchema = z.object({
  id: z.string(),
  main_title: z.string().nonempty("Course title is required"),
  short_description: z.string().nonempty("description is required"),
  course_description: z.string().nonempty("Detailed description is required"),
  course_thumbnail: z.string().nonempty("Display image is required"),
  course_type: z.string().nonempty("Select type"),
  level_id: z.string().nonempty("Target group level is required"),
  category_id: z.string().nonempty("category is required"),
  publish: z.boolean({ required_error: "is publish true or false?" }),
});

type FormValues = z.infer<typeof courseSchema>;

export default function MyCourse({
  user,
  course_id,
}: {
  user: any;
  course_id: string;
}) {
  //getting levels and categories from the db
  const { data: categories } = useQuery(GET_CATEGORIES);
  const dbCategories: ICategory[] = categories?.getCategories;

  const { data: levels } = useQuery(GET_LEVELS);
  const dbLevels: ILevel[] = levels?.getLevels;

  //react hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: { id: course_id },
  });

  //updating course mutation
  const [updateCourse] = useMutation(UPDATE_COURSE, {
    onCompleted: (data) => {
      console.log("Mutation completed:", data);
      toast("Course updated 😊", {
        description: "See course now 💯",
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      console.log(error);
      toast.error("Error updating course!!!!! 🫨", {
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    updateCourse({
      variables: {
        id: course_id,
        main_title: data.main_title,
        short_description: data.short_description,
        course_description: data.course_description,
        course_thumbnail: data.course_thumbnail,
        course_type: data.course_type,
        level_id: data.level_id,
        category_id: data.category_id,
        publish: data.publish,
      },
    });
  };

  return (
    <form
      className={`p-4 relative min-w-full  ${!user ? "blur-md" : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Course Details
          </h2>
          <p className="mt-1 text-sm font-mono leading-6 text-gray-600">
            This information will be displayed publicly .
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Course title
              </label>
              <div className="mt-2">
                <Input
                  {...register("main_title")}
                  type="text"
                  placeholder="interesting title"
                  className="h-12 "
                />
                {errors.main_title && (
                  <div className="text-red-500">
                    {errors.main_title.message}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Short description
              </label>
              <div className="mt-2">
                <Textarea
                  {...register("short_description")}
                  placeholder="Eye catching description to show user when scrolling"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {errors.short_description ? (
                  <div className="text-red-500">
                    {errors.short_description.message}
                  </div>
                ) : (
                  "  Write a few sentences about the course."
                )}
              </p>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Detailed description
              </label>
              <div className="mt-2">
                <Textarea
                  {...register("course_description")}
                  placeholder="Explain in details what the course entils eg the technologies"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a detailed description about the course.
                {errors.course_description && (
                  <div className="text-red-500">
                    {errors.course_description.message}
                  </div>
                )}
              </p>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail Image
              </label>

              <UploadDropzone
                appearance={{
                  container: {
                    border: "1px dashed violet",
                  },
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  toast("Image uploaded successful");

                  if (res && res.length > 0) {
                    setValue("course_thumbnail", res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  toast(`Error occured!!! ${error.message}`);
                }}
              />
              <input type="hidden" {...register("course_thumbnail")} />
              {errors.course_thumbnail && (
                <div className="text-red-500">
                  {errors.course_thumbnail.message}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 font-mono text-xl leading-6 text-gray-600">
            Get to select the information..
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Course category
              </label>
              <div className="mt-2">
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-4/5 py-6">
                        <SelectValue placeholder="Select course category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {dbCategories &&
                            dbCategories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.category}
                              >
                                {category.category}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category_id && (
                  <div className="text-red-500">
                    {errors.category_id.message}
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Course level
              </label>
              <div className="mt-2">
                <Controller
                  name="level_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-4/5 py-6">
                        <SelectValue placeholder="Select course level" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectLabel>Level</SelectLabel>
                          {dbLevels &&
                            dbLevels.map((level) => (
                              <SelectItem key={level.id} value={level.level}>
                                {level.level}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.level_id && (
                  <div className="text-red-500">{errors.level_id.message}</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Course type
              </label>
              <div className="mt-2">
                <Controller
                  name="course_type"
                  control={control}
                  defaultValue="FFREE"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-1/2 py-6">
                        <SelectValue placeholder="Select free or paid" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectLabel>Type</SelectLabel>
                          <SelectItem value="FREE">FREE</SelectItem>
                          <SelectItem value="PAID">PAID</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.course_type && (
                  <div className="text-red-500">
                    {errors.course_type.message}
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Publish course
              </label>
              <div className="mt-2">
                <Controller
                  name="publish"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      } // Convert the string value to a boolean
                      value={field.value ? "true" : "false"}
                    >
                      <SelectTrigger className="w-4/5 py-6">
                        <SelectValue placeholder="Select true to publish" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectLabel>Publish</SelectLabel>
                          <SelectItem value="true">TRUE</SelectItem>
                          <SelectItem value="false">FALSE</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.publish && (
                  <div className="text-red-500">{errors.publish.message}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button type="submit" size={"lg"}>
          Save
        </Button>
      </div>
    </form>
  );
}
