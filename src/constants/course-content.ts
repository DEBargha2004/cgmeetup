export const courseContent = [
  {
    title: "Introduction",
    lectures_count: 3,
    gross_duration_in_minutes: 210,
    sections: [
      {
        title: "About This Course",
        is_video: true,
        is_preview_available: true,
        lecture_duration_in_minutes: 34,
        url: "some-url"
      },
      {
        title: "Course Overview",
        is_video: true,
        is_preview_available: false,
        lecture_duration_in_minutes: 45,
        url: "some-url"
      },
      {
        title: "Getting Started",
        is_video: true,
        is_preview_available: false,
        lecture_duration_in_minutes: 131,
        url: "some-url"
      }
    ]
  },
  {
    title: "Module 1: Basics",
    lectures_count: 4,
    gross_duration_in_minutes: 290,
    sections: [
      {
        title: "Introduction to Basics",
        is_video: true,
        is_preview_available: true,
        lecture_duration_in_minutes: 20,
        url: "some-url"
      },
      {
        title: "Core Concepts",
        is_video: true,
        is_preview_available: false,
        lecture_duration_in_minutes: 75,
        url: "some-url"
      },
      {
        title: "Practical Examples",
        is_video: true,
        is_preview_available: false,
        lecture_duration_in_minutes: 95,
        url: "some-url"
      },
      {
        title: "Summary",
        is_video: false,
        is_preview_available: true,
        lecture_duration_in_minutes: 100,
        url: "some-url"
      }
    ]
  },
  {
    title: "Module 2: Advanced Topics",
    lectures_count: 3,
    gross_duration_in_minutes: 180,
    sections: [
      {
        title: "Advanced Techniques",
        is_video: true,
        is_preview_available: true,
        lecture_duration_in_minutes: 60,
        url: "some-url"
      },
      {
        title: "Case Studies",
        is_video: true,
        is_preview_available: false,
        lecture_duration_in_minutes: 90,
        url: "some-url"
      },
      {
        title: "Final Thoughts",
        is_video: true,
        is_preview_available: true,
        lecture_duration_in_minutes: 30,
        url: "some-url"
      }
    ]
  },
  {
    title: "Module 3: Special Topics",
    lectures_count: 5,
    gross_duration_in_minutes: 240,
    sections: [
      {
        title: "Introduction to Special Topics",
        is_video: true,
        is_preview_available: true,
        lecture_duration_in_minutes: 40,
        url: "some-url"
      },
      {
        title: "Special Techniques",
        is_video: true,
        is_preview_available: false,
        lecture_duration_in_minutes: 60,
        url: "some-url"
      },
      {
        title: "Special Case Studies",
        is_video: true,
        is_preview_available: false,
        lecture_duration_in_minutes: 70,
        url: "some-url"
      },
      {
        title: "Guest Lecture",
        is_video: true,
        is_preview_available: true,
        lecture_duration_in_minutes: 40,
        url: "some-url"
      },
      {
        title: "Wrap-Up",
        is_video: true,
        is_preview_available: true,
        lecture_duration_in_minutes: 30,
        url: "some-url"
      }
    ]
  },
  {
    title: "Module 4: Expert Level",
    lectures_count: 4,
    gross_duration_in_minutes: 270,
    sections: [
      {
        title: "Mastering the Basics",
        is_video: true,
        is_preview_available: true,
        lecture_duration_in_minutes: 60,
        url: "some-url"
      },
      {
        title: "Advanced Concepts",
        is_video: true,
        is_preview_available: false,
        lecture_duration_in_minutes: 80,
        url: "some-url"
      },
      {
        title: "Expert Techniques",
        is_video: true,
        is_preview_available: false,
        lecture_duration_in_minutes: 75,
        url: "some-url"
      },
      {
        title: "Final Review",
        is_video: true,
        is_preview_available: true,
        lecture_duration_in_minutes: 55,
        url: "some-url"
      }
    ]
  },
  {
    title: "Module 5: Capstone Project",
    lectures_count: 2,
    gross_duration_in_minutes: 150,
    sections: [
      {
        title: "Project Overview",
        is_video: true,
        is_preview_available: true,
        lecture_duration_in_minutes: 50,
        url: "some-url"
      },
      {
        title: "Project Submission Guidelines",
        is_video: true,
        is_preview_available: false,
        lecture_duration_in_minutes: 100,
        url: "some-url"
      }
    ]
  }
];

export type CourseContent = typeof courseContent;
