import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import Description from "@/components/shared/Description";
import Comments from "@/components/shared/Comments";
import Recommendations from "@/components/shared/Recommendations";

export default function CourseFooter({
  course_id,
  user,
}: {
  course_id: string;
  user: any;
}) {
  return (
    <>
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="recommendations" className="hidden md:flex">
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="summary" className="hidden md:flex">
            Generate summary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Description course_id={course_id} />
        </TabsContent>
        <TabsContent value="recommendations">
          <Recommendations course_id={course_id} user={user} />
        </TabsContent>
        <TabsContent value="comments">
          <Comments course_id={course_id} user={user} />
        </TabsContent>
        <TabsContent value="summary">summary</TabsContent>
      </Tabs>
    </>
  );
}
