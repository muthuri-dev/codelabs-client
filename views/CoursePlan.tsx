"use client";
import { ArrowDown } from "lucide-react";
import React from "react";

export default function CoursePlan() {
  const [openSection, setOpenSection] = React.useState(null);

  const toggleSection = (index: any) => {
    setOpenSection(openSection === index ? null : index);
  };

  const steps = [
    {
      title: "Planning Your Course",
      content: (
        <>
          <p>
            <strong>1. Choose a Topic:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              Identify a topic you are passionate about and knowledgeable in.
            </li>
            <li>
              Research to ensure there is interest and a need for this topic
              within the community.
            </li>
            <li>
              Analyze existing courses to find gaps or unique angles you can
              cover.
            </li>
          </ul>
          <p>
            <strong>2. Define Your Audience:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              Determine the skill level of your target audience (beginner,
              intermediate, advanced).
            </li>
            <li>
              Understand their needs, challenges, and what they hope to gain
              from your course.
            </li>
            <li>
              Consider creating learner personas to tailor your content
              effectively.
            </li>
          </ul>
          <p>
            <strong>3. Set Learning Objectives:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              Outline what learners will be able to do after completing your
              course.
            </li>
            <li>Make the objectives clear, measurable, and achievable.</li>
            <li>
              Ensure each objective aligns with the overall goals of the course.
            </li>
          </ul>
          <p>
            <strong>4. Create a Course Outline:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              Break down the topic into sections, including topics and
              subtopics.
            </li>
            <li>List key points and concepts for each section.</li>
            <li>Ensure a logical flow from one section to the next.</li>
            <li>
              Include a mix of instructional methods to cater to different
              learning styles.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Creating Your Course Content",
      content: (
        <>
          <p>
            <strong>1. Develop Your Content:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              Write detailed content for each topic and subtopic using the rich
              text editor.
            </li>
            <li>
              Use examples, case studies, and real-world applications to
              illustrate concepts.
            </li>
            <li>
              Incorporate interactive elements like questions for reflection or
              discussion prompts.
            </li>
          </ul>
          <p>
            <strong>2. Organize Content Effectively:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              Use headings, bullet points, and numbered lists to structure your
              text.
            </li>
            <li>Highlight important information using bold or italics.</li>
            <li>Include links to external resources for further reading.</li>
          </ul>
          <p>
            <strong>3. Enhance Readability:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>Keep paragraphs short and focused.</li>
            <li>Use clear and concise language.</li>
            <li>
              Include images or diagrams where relevant to support your text.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Uploading Your Course",
      content: (
        <>
          <p>
            <strong>1. Create a New Course:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>Log in to your account.</li>
            <li>Navigate to the Create Course section.</li>
            <li>Click on New Course.</li>
          </ul>
          <p>
            <strong>2. Add Course Details:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>Enter the course title and a brief description.</li>
            <li>Specify the target audience and skill level.</li>
            <li>List the learning objectives.</li>
            <li>
              Add tags and categories to make your course easily searchable.
            </li>
          </ul>
          <p>
            <strong>3. Organize Sections:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>Create sections according to your course outline.</li>
            <li>
              Use the rich text editor to input your written content for each
              topic and subtopic.
            </li>
            <li>Ensure a clear and intuitive structure for easy navigation.</li>
          </ul>
          <p>
            <strong>4. Preview and Edit:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>Review the course content to ensure everything is in place.</li>
            <li>Edit any errors or make improvements as necessary.</li>
            <li>
              Use the platforms preview feature to see how your course will
              appear to learners.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Publishing Your Course",
      content: (
        <>
          <p>
            <strong>1. Submit for Review:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              Once you are satisfied with your course, submit it for review.
            </li>
            <li>Our team will check for quality, clarity, and completeness.</li>
            <li>
              Be prepared to provide additional information or clarifications if
              requested.
            </li>
          </ul>
          <p>
            <strong>2. Make Revisions:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>If any revisions are needed, you will receive feedback.</li>
            <li>Make the necessary changes and resubmit the course.</li>
            <li>Ensure all feedback is addressed comprehensively.</li>
          </ul>
          <p>
            <strong>3. Publish:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              After approval, your course will be published and available to the
              community.
            </li>
            <li>
              Promote your course within your network and encourage feedback.
            </li>
            <li>
              Use social media, forums, and email newsletters to reach a wider
              audience.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Engaging with Learners",
      content: (
        <>
          <p>
            <strong>1. Respond to Questions:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>Engage with learners in the course discussion forums.</li>
            <li>Answer questions and provide additional insights.</li>
            <li>
              Encourage a supportive and collaborative learning environment.
            </li>
          </ul>
          <p>
            <strong>2. Update Content:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              Regularly update your course to keep it current and relevant.
            </li>
            <li>
              Add new materials or revise existing ones based on feedback.
            </li>
            <li>Announce updates to keep learners informed and engaged.</li>
          </ul>
          <p>
            <strong>3. Gather Feedback:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>Encourage learners to provide feedback and reviews.</li>
            <li>Use feedback to make continuous improvements.</li>
            <li>
              Celebrate positive reviews and address constructive criticism
              proactively.
            </li>
          </ul>
          <p>
            <strong>4. Monitor Progress:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>Track learner progress and participation.</li>
            <li>
              Identify areas where learners struggle and provide additional
              support.
            </li>
            <li>Use analytics to improve course content and delivery.</li>
          </ul>
        </>
      ),
    },
  ];
  return (
    <div
      className="max-w-full mx-auto bg-no-repeat bg-cover "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')",
      }}
    >
      <div className=" bg-white/80 w-full p-4 md:p-6">
        <h2 className="text-2xl font-mono text-gray-800 leading-tight mb-4 underline text-center">
          How to plan and upload a course on the platform
        </h2>
        {steps.map((step, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleSection(index)}
              className=" flex gap-4 w-full text-left text-lg font-mono py-2 border-b-2 border-gray-200 focus:outline-none"
            >
              {step.title} <ArrowDown color="#8f00ff" size={"16"} />
            </button>
            {openSection === index && (
              <div className=" mt-2 text-violet-700/70 font-extralight">
                {step.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
