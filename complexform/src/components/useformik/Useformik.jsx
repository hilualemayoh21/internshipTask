import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const FORM_STORAGE_KEY = "professionalInfo";

function useformikForm({ onSubmitSuccess }) {
  const DEFAULT_VALUES = {
    name: "",
    email: "",
    profilePicture: null,
    skillLevel: "",
    interestedTopics: [],
    phoneNumber: "",
    portfolioLink: "",
    profilePreview: "",
    profileBase64: "",
    mentorshipArea: "",
    times: [],
    laptopSupport: false,
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    password: "",
    confirmPassword: "",
    requireSupport: "",
    sponsorshipCode: "",
  };

  // Helper to reconstruct File from base64
  const reconstructFileFromBase64 = (base64, fileName = "profile.png") => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  // Load saved data and reconstruct profilePicture if necessary
  const getInitialValues = () => {
    const savedRaw = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY));
    const savedData = savedRaw ? { ...DEFAULT_VALUES, ...savedRaw } : DEFAULT_VALUES;

    // Reconstruct file from base64
    if (
      savedData.profileBase64 &&
      (!savedData.profilePicture || typeof savedData.profilePicture !== "object" || !savedData.profilePicture.type)
    ) {
      savedData.profilePicture = reconstructFileFromBase64(savedData.profileBase64);
      savedData.profilePreview = savedData.profileBase64;
    }

    return savedData;
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: Yup.object({
      name: Yup.string().max(100).required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "Phone number must be digits only")
        .required("Phone number is required"),
      profilePicture: Yup.mixed()
        .required("Profile picture is required")
        .test("fileType", "Only JPG or PNG allowed", (value) =>
          value ? ["image/jpeg", "image/png"].includes(value.type) : false
        )
        .test("fileSize", "Image must be less than 400KB", (value) =>
          value ? value.size <= 400 * 1024 : false
        ),
      skillLevel: Yup.string()
        .oneOf(["Beginner", "Intermediate", "Advanced"])
        .required("Skill level is required"),
      interestedTopics: Yup.array()
        .min(1, "Select at least one topic")
        .required("Interested topics are required"),
      portfolioLink: Yup.string().url("Must be a valid URL").when("skillLevel", {
        is: "Advanced",
        then: (schema) => schema.required("Portfolio link is required for advanced"),
      }),
      mentorshipArea: Yup.string().when("skillLevel", {
        is: "Beginner",
        then: (schema) => schema.required("Please choose your mentorship area"),
      }),
      startDate: Yup.date()
        .min(new Date(), "Start date must be in the future")
        .required("Start date is required"),
      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date must be same or after start date")
        .required("End date is required"),
      times: Yup.array()
        .min(1, "Select at least one available time")
        .required("Available times are required"),
      laptopSupport: Yup.boolean().when("times", {
        is: (times) => Array.isArray(times) && times.includes("Weekdays"),
        then: (schema) => schema.oneOf([true, false]).required("Laptop support info is required for weekdays"),
      }),
      password: Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .test("has-letter", "Password must contain at least one letter", (val) =>
    /[A-Za-z]/.test(val || "")
  )
  .test("has-number", "Password must contain at least one number", (val) =>
    /\d/.test(val || "")
  )
  .test("has-special", "Password must contain at least one special character", (val) =>
    /[@$!%*#?&]/.test(val || "")
  ),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
      requireSupport: Yup.string().when("interestedTopics", {
        is: (topics) =>
          Array.isArray(topics) &&
          topics.some((t) =>
            ["Accessibility", "Inclusive Design", "Assistive Tech"].includes(t)
          ),
        then: (schema) => schema.required("Please specify if you need support staff"),
      }),
      sponsorshipCode: Yup.string().when(["skillLevel", "interestedTopics"], {
        is: (skill, topics) =>
          skill === "Intermediate" && topics.includes("Project Management"),
        then: (schema) => schema.required("Sponsorship code is required for this combination"),
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      try {
        const existing = JSON.parse(localStorage.getItem("submitedData")) || [];
        const updated = [...existing, values];
        localStorage.setItem("submitedData", JSON.stringify(updated));
        resetForm({ values: DEFAULT_VALUES });
        localStorage.removeItem(FORM_STORAGE_KEY);
        toast.success("Form submitted successfully! 🎉");
        if (onSubmitSuccess) onSubmitSuccess();
      } catch (error) {
        toast.error("Submission failed. Please try again.");
        console.error("Submission error:", error);
      }
    },
  });

  // Save form data to localStorage on every change
  useEffect(() => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formik.values));
  }, [formik.values]);

  return formik;
}

export default useformikForm;
