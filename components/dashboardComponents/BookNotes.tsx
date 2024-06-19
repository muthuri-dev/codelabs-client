"use client";
import { GET_BOOKMARKS } from "@/graphql/bookmark.actions";
import { GET_COURSE_BY_ID } from "@/graphql/course.action";
import { useQuery } from "@apollo/client";
import { NoteText, Trash } from "iconsax-react";

interface IBookmark {
  course_id: string;
  user_id: string;
}
function BookNotes({ user }: { user: any }) {
  const { data } = useQuery(GET_BOOKMARKS);
  const bookmarks: IBookmark[] = data?.getBookmarks;
  return (
    <div className="border text-gray-500 w-full  p-3 rounded-2xl">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm gap-2">
          <NoteText size={18} />
          <p className="text-gray-800 font-medium">Favourites</p>
        </div>
      </div>

      <hr className="bg-gray-400 my-4" />

      {/* content */}
      <div className="space-y-3">
        {/* note 1 */}
        {bookmarks &&
          bookmarks
            .filter((book) => book.user_id === user?.id)
            .map((book, index) => (
              <div key={index}>
                <BookmarkCourse course_id={book.course_id} />
              </div>
            ))}
      </div>
    </div>
  );
}

export default BookNotes;

type TCourse = {
  main_title: string;
  level_id: string;
  course_thumbnail: string;
  short_description: string;
  course_type: string;
};
function BookmarkCourse({ course_id }: { course_id: string }) {
  //getting courses
  const {
    data: courseData,
    loading,
    error,
  } = useQuery(GET_COURSE_BY_ID, {
    variables: { id: course_id },
  });
  const course: TCourse = courseData?.getCourseById;
  return (
    <>
      {course ? (
        <div>
          <div className="flex items-start gap-3 w-full">
            <button className="w-4 shrink-0 mt-1 h-4 border-2 border-gray-300 rounded-full" />
            <div className="w-full space-y-1">
              <p className="text-sm text-gray-800 font-medium">
                {course.main_title}
              </p>
              <p className="text-xs">{course.short_description.slice(0, 30)}</p>
              <div className="flex justify-between items-end">
                <div className="space-x-2 font-medium">
                  <button className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-500">
                    {course.level_id}
                  </button>
                  <button className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-500">
                    {course.course_type}
                  </button>
                </div>
                <p className="flex items-center gap-1 text-xs">
                  <Trash color="#8F00FF" variant="Outline" size={"24"} />
                </p>
              </div>
            </div>
          </div>

          <hr className="bg-gray-400 mt-3" />
        </div>
      ) : (
        <>Add favourites bookmarks</>
      )}
    </>
  );
}
