import { useState } from "react";
import { useForm } from "react-hook-form";
import bg from './assets/bg.jpg'
const questions = [
  "How are you?",
  "How was your experience?",
  "Any suggestions for improvement?",
];

function FeedbackForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const nextQuestion = () => {
    if (getValues(`answer${currentQuestion}`)) {
      setCurrentQuestion((prev) => {
        const next = prev + 1;
        setValue(`answer${next}`, ""); // Clear input for next question
        return next;
      });
    }
  };

  const submitFeedback = async (data) => {
    const response = await fetch("send_feedback.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      alert("Thank you for your feedback!");
    } else {
      alert("Failed to send feedback. Please try again.");
    }
  };

  return (
    <div
    className="flex flex-col items-center justify-center min-h-screen bg-gray-white bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${bg})` }}
  >
      <div className=" p-8 rounded-lg w-full md:w-[70%] lg:w-[50%] ">
        <h2 className="text-2xl md:text-5xl font-semibold mb-4">{questions[currentQuestion]}</h2>
        <form onSubmit={handleSubmit(submitFeedback)}>
          <input
            type="text"
            {...register(`answer${currentQuestion}`, { required: "This field is required" })}
            className="px-4 py-2 border-b-4 w-full md:w-[70%] lg:w-[50%] border-black outline-none"
            placeholder="Input the answer"
          />
          {errors[`answer${currentQuestion}`] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[`answer${currentQuestion}`].message}
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

export default FeedbackForm