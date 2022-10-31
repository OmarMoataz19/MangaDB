const mongoose = require("mongoose");
const connection = require("../config/database");

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  courseImage: {
    type: String,
  },
  coursePrice: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  rating: {
    type: Number,
    default: 5,
  },
  reviews: {
    type: [String],
  },
  requirements: {
    type: [String],
  },
  views: {
    type: Number,
    default: 0,
  },
  certificate: {
    type: String,
  },

  discount: {
    type: Number,
    default: 0,
  },
  discountedPrice: {
    type: Number,
  },
  // exams: {
  //     type: [ExamSchema.schema],
  // },
  subtitles: {
    type: [
      {
        subtitle: {
          type: String,
    
        },
        subtitleTime: {
          type: String,
        },
        introductionVideo: {
          type: String,
        },
        description: {
          type: String,
        },
        exercises: {
          type: [
            {
              question: { type: String },
              answer: { type: String },
              options: { type: [String] },
            },
          ],
        },
        sources: {
          type: [
            {
              sourceType: {
                type: String,
                enum: ["Video", "Audio", "Text"],
              },
              link: {
                type: String,
              },
              description: {
                type: String,
              },
            },
          ],
        },
      },
    ],
  },
});

const Course = connection.model("Course", courseSchema);

module.exports = Course;