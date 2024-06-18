"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "../components/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_COURSE } from "@/graphql/course.action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
// import FroalaEditor from "react-froala-wysiwyg";
// import "froala-editor/js/plugins/image.min.js";
// import "froala-editor/js/plugins/char_counter.min.js";
// import "froala-editor/js/plugins/save.min.js";
// import "froala-editor/js/plugins/markdown.min.js";
// import "froala-editor/js/plugins/code_view.min.js";

interface SubTopic {
  title: string;
  content: string[];
}

interface Topic {
  title: string;
  subTopics: SubTopic[];
}

export default function CourseUpload({ user }: { user: any }) {
  const [topics, setTopics] = useState<Topic[]>([
    {
      title: "Introduction",
      subTopics: [{ title: "Introduction", content: [] }],
    },
  ]);

  // Load topics from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTopics = localStorage.getItem("topics");
      if (savedTopics) {
        setTopics(JSON.parse(savedTopics));
      }
    }
  }, []);

  // Save topics to localStorage whenever topics state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("topics", JSON.stringify(topics));
    }
  }, [topics]);

  const handleAddTopic = () => {
    const newTopics = [
      ...topics,
      { title: "", subTopics: [{ title: "", content: [] }] },
    ];
    setTopics(newTopics);
  };

  const handleAddSubTopic = (topicIndex: number) => {
    const newTopics = topics.map((topic, index) => {
      if (index === topicIndex) {
        return {
          ...topic,
          subTopics: [...topic.subTopics, { title: "", content: [] }],
        };
      }
      return topic;
    });
    setTopics(newTopics);
  };

  const handleTopicTitleChange = (
    e: ChangeEvent<HTMLInputElement>,
    topicIndex: number
  ) => {
    const newTopics = topics.map((topic, index) => {
      if (index === topicIndex) {
        return { ...topic, title: e.target.value };
      }
      return topic;
    });
    setTopics(newTopics);
  };

  const handleSubTopicTitleChange = (
    e: ChangeEvent<HTMLInputElement>,
    topicIndex: number,
    subTopicIndex: number
  ) => {
    const newTopics = topics.map((topic, index) => {
      if (index === topicIndex) {
        const newSubTopics = topic.subTopics.map((subTopic, i) => {
          if (i === subTopicIndex) {
            return { ...subTopic, title: e.target.value };
          }
          return subTopic;
        });
        return { ...topic, subTopics: newSubTopics };
      }
      return topic;
    });
    setTopics(newTopics);
  };

  const handleAddContent = (topicIndex: number, subTopicIndex: number) => {
    const newTopics = topics.map((topic, index) => {
      if (index === topicIndex) {
        const newSubTopics = topic.subTopics.map((subTopic, i) => {
          if (i === subTopicIndex) {
            return { ...subTopic, content: [...subTopic.content, ""] };
          }
          return subTopic;
        });
        return { ...topic, subTopics: newSubTopics };
      }
      return topic;
    });
    setTopics(newTopics);
  };

  const handleContentChange = (
    e: ChangeEvent<HTMLInputElement>,
    topicIndex: number,
    subTopicIndex: number,
    contentIndex: number
  ) => {
    const newTopics = topics.map((topic, index) => {
      if (index === topicIndex) {
        const newSubTopics = topic.subTopics.map((subTopic, i) => {
          if (i === subTopicIndex) {
            const newContent = subTopic.content.map((content, j) => {
              if (j === contentIndex) {
                return e.target.value;
              }
              return content;
            });
            return { ...subTopic, content: newContent };
          }
          return subTopic;
        });
        return { ...topic, subTopics: newSubTopics };
      }
      return topic;
    });
    setTopics(newTopics);
  };

  const handleDeleteTopic = (topicIndex: number) => {
    const newTopics = topics.filter((_, index) => index !== topicIndex);
    setTopics(newTopics);
  };

  //uploading the created course && user_id is required
  const [createCourse, { loading }] = useMutation(CREATE_COURSE, {
    onCompleted: (data) => {
      toast("Course created", {
        description: "Edit and publish your course in the instructor dashboard",
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Error creating course!!!!!", {
        description: error.message,
      });
    },
  });

  const handleSubmit = () => {
    if (user.id && topics.length > 1) {
      createCourse({
        variables: {
          user_id: user.id,
          course_content: JSON.stringify(topics),
        },
      });
    } else {
      toast("Cannot create course!!", {
        description: "Add more than one section!!",
      });
    }
  };

  //submit btn loading

  //login user after 5-seconds in the dashboard
  const route = useRouter();
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        route.push("/api/auth/login");
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [user, route]);

  //editor config
  // const [model, setModel] = React.useState<string>(() => {
  //   return localStorage.getItem("savedHtml") || "";
  // });
  return (
    <div className={`p-4 relative w-full  ${!user ? "blur-sm" : ""}`}>
      {topics.map((topic, topicIndex) => (
        <div
          key={topicIndex}
          className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <label className="font-light">Topic {topicIndex + 1}:</label>
              <input
                type="text"
                className="ml-2 p-1 border rounded focus:border-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-300"
                value={topic.title}
                onChange={(e) => handleTopicTitleChange(e, topicIndex)}
                placeholder="Topic title"
              />
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteTopic(topicIndex)}
            >
              Delete section
            </Button>
          </div>
          <div className="ml-4">
            {topic.subTopics.map((subTopic, subTopicIndex) => (
              <div key={subTopicIndex} className="mb-2">
                <div className="flex items-center mb-2 p-2 border border-gray-200 rounded-lg bg-white">
                  <input
                    type="text"
                    className="flex-1 p-1 border rounded mr-3 focus:border-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-300"
                    value={subTopic.title}
                    onChange={(e) =>
                      handleSubTopicTitleChange(e, topicIndex, subTopicIndex)
                    }
                    placeholder={`Sub-topic ${subTopicIndex + 1} title`}
                  />
                  <Button
                    variant={"outline"}
                    onClick={() => handleAddContent(topicIndex, subTopicIndex)}
                  >
                    + Content
                  </Button>
                </div>
                <div className="ml-4">
                  {subTopic.content.map((content, contentIndex) => (
                    // here for editor
                    // <FroalaEditor
                    //   model={content}
                    //   onModelChange={(event: any) =>
                    //     handleContentChange(
                    //       event,
                    //       topicIndex,
                    //       contentIndex,
                    //       subTopicIndex
                    //     )
                    //   }
                    //   key={contentIndex}
                    //   config={{
                    //     placeholderText: `Start writing content ${
                    //       contentIndex + 1
                    //     }`,
                    //     saveInterval: 2000,
                    //     event: {
                    //       "save.before": function (html: string) {
                    //         localStorage.setItem("savedHtml", html);
                    //       },
                    //     },
                    //   }}
                    //   tag="input"
                    // />
                    <input
                      key={contentIndex}
                      type="text"
                      className="w-full mb-2 p-1 border rounded focus:border-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-300"
                      value={content}
                      onChange={(e) =>
                        handleContentChange(
                          e,
                          topicIndex,
                          subTopicIndex,
                          contentIndex
                        )
                      }
                      placeholder={`Content ${contentIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button
            variant={"outline"}
            onClick={() => handleAddSubTopic(topicIndex)}
          >
            + Sub topic
          </Button>
        </div>
      ))}
      <Button
        variant={"default"}
        size={"lg"}
        onClick={handleSubmit}
        disabled={loading}
        className={`absolute right-4 bottom-4 ${
          loading ? "cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </div>
        ) : (
          "Submit"
        )}
      </Button>
      <Button variant={"default"} onClick={handleAddTopic}>
        + Section
      </Button>
    </div>
  );
}
