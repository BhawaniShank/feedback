import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "./assets/bg.jpg";

const questions = [
  { category: "General", question: "How are you?" },
  { category: "Feedback", question: "How was your experience?" },
  { category: "Suggestions", question: "Any suggestions for improvement?" }
];


function FeedbackForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); // Store all answers
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const nextQuestion = () => {
    const currentAnswer = getValues(`answer${currentQuestion}`);
    if (currentAnswer) {
      setAnswers((prev) => ({
        ...prev,
        [`answer${currentQuestion}`]: currentAnswer,
      }));
      setCurrentQuestion((prev) => prev + 1);
      setValue(`answer${currentQuestion + 1}`, ""); // Reset input for next question
    } else {
      toast.error("Please answer the question before proceeding.");
    }
  };

  const submitFeedback = async (data) => {
    const lastAnswer = getValues(`answer${currentQuestion}`);
    if (!lastAnswer) {
      toast.error("Please answer the question before submitting.");
      return;
    }
  
    const finalData = {
      ...answers,
      [`answer${currentQuestion}`]: lastAnswer,
    };
  

    try {
      const response = await fetch("send_feedback.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        toast.success("Thank you for your feedback!");
      } else {
        toast.error("Failed to submit feedback.");
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
      
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-white bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="p-8 rounded-lg w-full md:w-[70%] lg:w-[50%]">
        <h2 className="text-2xl md:text-5xl font-semibold mb-4">
  {questions[currentQuestion].question}
</h2>
          <form onSubmit={handleSubmit(submitFeedback)}>
            <input
              type="text"
              {...register(`answer${currentQuestion}`, {
                required: "This field is required",
              })}
              className="px-4 py-2 border-b-4 w-full md:w-[70%] lg:w-[50%] border-black outline-none"
              placeholder="Input the answer"
            />
           {errors?.[`answer${currentQuestion}`] && (
  <p className="text-red-500 text-sm mt-1">
    {errors[`answer${currentQuestion}`]?.message}
  </p>
)}


            <div className="mt-6 flex justify-end">
              {currentQuestion < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={nextQuestion}
                  className="bg-black text-white px-6 py-2 rounded-lg flex items-center"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-lg"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
  );
}

export default FeedbackForm;
