const mongoose = require("mongoose");

const { Schema } = mongoose;

const jobSchema = new Schema({
  companyName: {
    type: String,
    requied: true,
    unique: true,
  },
  roles: [
    {
      name: {
        type: String,
        required: true,
      },
      package: {
        type: Number,
      },
    },
  ],
  eligibleBranch: {
    type: Array,
    required: true,
  },
  eligibilityCriteria: {
    type: Array,
    required: true,
  },
  companyDetails: {
    type: String,
    required: true,
    max: 300,
    min: 200,
  },
  teckStack: {
    type: Array,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  location: {
    type: Array,
    required: true,
  },
  registrationDetails: {
    isActive: {
      type: Boolean,
    },
    starts: {
      type: Date,
      required: true,
    },
    closes: {
      type: Date,
      required: true,
    },
    // Registration Related
  },
  selectionProcess: {
    type: String,
  },
  schedule: {
    type: Date,
  },
  contacts: {
    type: String,
  },
});

export default mongoose.models.Job || mongoose.model("Job", jobSchema);
