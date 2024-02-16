import mongoose from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema({
  personalInfo: {
    // doubt
    image: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      // min: 10000000000,
      // max: 10000000000,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      current: {
        type: String,
        required: true,
      },
      permanent: {
        type: String,
        required: true,
      },
    },
    socialLinks: {
      type: Array,
      required: true,
    },
  },
  summary: {
    type: String,
    // max: 300,
    // mix: 150,
  },
  skills: {
    technical: { type: Array, required: true },
    soft: { type: Array, required: true },
  },
  education: {
    ssc: {
      schoolName: {
        type: String,
        required: true,
      },
      yearOfPassing: {
        type: Date,
        required: true,
      },
      percentage: {
        type: Number,
        max: 100,
        min: 0,
        required: true,
      },
      marksheet: {
        type: Array,
        required: true,
      },
    },
    hsc: {
      schoolName: {
        type: String,
        required: true,
      },
      yearOfPassing: {
        type: Date,
        required: true,
      },
      major: {
        type: String,
        required: true,
      },
      percentage: {
        type: Number,
        max: 100,
        min: 0,
        required: true,
      },
      marksheet: {
        type: Array,
        required: true,
      },
    },
    diploma: {
      schoolName: {
        type: String,
        required: true,
      },
      yearOfPassing: {
        type: Date,
        required: true,
      },
      major: {
        type: String,
        required: true,
      },
      percentage: {
        type: Number,
        max: 100,
        min: 0,
        required: true,
      },
      marksheet: {
        type: Array,
        required: true,
      },
    },
    degree: {
      collegeName: {
        type: String,
        required: true,
      },
      university: {
        type: String,
        required: true,
      },
      yearOfPassing: {
        type: Date,
        required: true,
      },
      major: {
        type: String,
        required: true,
      },
      cgpa: {
        type: Number,
        max: 10,
        min: 0,
        required: true,
      },
      marksheet: {
        type: Array,
        required: true,
      },
    },
  },
  workExperience: [
    {
      companyName: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      duration: {
        start: {
          type: Date,
          required: true,
        },
        end: {
          type: Date,
        },
      },
      location: {
        type: String,
        required: true,
      },
      skills: {
        type: Array,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  certification: {
    type: Array,
  },
  projects: [
    {
      projectName: {
        type: String,
        required: true,
      },
      duration: {
        start: {
          type: Date,
          required: true,
        },
        end: {
          type: Date,
        },
      },
      description: {
        type: String,
        max: 300,
        min: 150,
      },
      techStack: {
        type: Array,
        required: true,
      },
      githubLink: {
        type: String,
        required: true,
      },
    },
  ],
  otherDetails: {
    languageSpoken: {
      type: Array,
    },
    hobbies: {
      type: Array,
    },
    papersPublished: {
      type: Array,
    },
    achievements: {
      type: Array,
    },
    coCurricularActivities: {
      type: Array,
    },
  },
});

export default mongoose.models.Profile ||
  mongoose.model("Profile", profileSchema);
