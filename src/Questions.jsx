const QUESTIONS = [
  {
    category: "Basic Business Details",
    question: "Full Name",
    type: "text",
    validation: {
      required: "Full Name is required",
      minLength: { value: 3, message: "Full Name must be at least 3 characters long" },
      maxLength: { value: 50, message: "Full Name must be under 50 characters" },
    },
  },
  {
    category: "Basic Business Details",
    question: "Company Name",
    type: "text",
    validation: {
      required: "Company Name is required",
      minLength: { value: 3, message: "Company Name must be at least 3 characters" },
      maxLength: { value: 100, message: "Company Name must be under 100 characters" },
    },
  },
  {
    category: "Basic Business Details",
    question: "Business Email",
    type: "email",
    validation: {
      required: "Business Email is required",
      pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Enter a valid email address" },
    },
  },
  {
    category: "Basic Business Details",
    question: "Phone Number",
    type: "number",
    note: "With country code",
    validation: {
      required: "Phone Number is required",
      pattern: { value: /^[0-9]{7,15}$/, message: "Enter a valid phone number with country code" },
    },
  },
  {
    category: "Basic Business Details",
    question: "Company Website",
    type: "url",
    validation: {
      required: 'it is required',
      pattern: { value: /^(https?:\/\/)?([\w-]+)+([\w-./?%&=]*)?$/, message: "Enter a valid website URL" },
    },
  },
  {
    category: "Basic Business Details",
    question: "Business Address",
    type: "textarea",
    validation: {
      required: 'Address is required',
      maxLength: { value: 200, message: "Address should not exceed 200 characters" },
    },
  },
  {
    category: "Business Interests & Requirements",
    question: "Industry Type",
    type: "select",
    options: [
      "IT & Software",
      "Hospitality",
      "Healthcare",
      "Education",
      "Construction",
      "E-commerce",
      "Other",
    ],
    hasOther: true,
    validation: {
      required: "Please select an industry type",
    },
  },
  {
    category: "Business Interests & Requirements",
    question: "Services Required",
    type: 'checkbox',
    options: [
      "Web Development",
      "Mobile App Development",
      "UI/UX Design",
      "Digital Marketing",
      "Custom Software Development",
      "Cloud Solutions",
      "Other",
    ],
    hasOther: true,
    validation: {
      required: "Please select at least one service",
    },
  },
  {
    category: "Business Interests & Requirements",
    question: "Project Budget",
    type: "select",
    validation: {
      required: "Please select your project budget ",
    },
    options: [
      "Below ₹50,000",
      "₹50,000 - ₹2,00,000",
      "₹2,00,000 - ₹5,00,000",
      "₹5,00,000+",
    ],
  },
  {
    category: "Business Interests & Requirements",
    question: "Project Timeline",
    type: "select",
    options: [
      "Urgent (Within 1 month)",
      "1-3 months",
      "3-6 months",
      "Flexible",
    ],
    validation: {
      required: "Please select a project timeline",
    },
  },
  {
    category: "Business Interests & Requirements",
    question: "Brief Project Description",
    type: "textarea",
    validation: {
      required: "Please provide a brief project description",
      minLength: { value: 10, message: "Description must be at least 10 characters" },
      maxLength: { value: 500, message: "Description must not exceed 500 characters" },
    },
  },
  {
    category: "Business Interests & Requirements",
    question: "Preferred Contact Method",
    type: "radio",
    options: ["Email", "Phone Call", "WhatsApp"],
    validation: {
      required: "Please select a preferred contact method",
    },
  },
  {
    category: "Business Interests & Requirements",
    question: "How Did You Hear About Us?",
    type: "select",
    validation:{
      required: "Please select how you heard about us"
    },
    options: ["Google Search", "Social Media", "Referral", "Other"],
    hasOther: true,
  },
];

export default QUESTIONS;
