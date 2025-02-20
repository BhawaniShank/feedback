import { useState } from "react";
import { useForm } from "react-hook-form";
import bg from "./assets/bg.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QUESTIONS from "./Questions";

const questions = QUESTIONS;

function FeedbackForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm();

  const nextQuestion = async () => {
    const isValid = await trigger(`answer${currentQuestion}`); // Validate current field
    if (isValid) {
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
    console.log(data);
    

    if (response.ok) {
      toast.success("Thank you for your feedback!");
    } else {
      toast.error("Failed to send feedback. Please try again.");
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
          {["checkbox", "radio"].includes(questions[currentQuestion].type) ? (
            <div>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index}>
                  <input
                    id={`option-${currentQuestion}-${index}`}
                    type={questions[currentQuestion].type}
                    {...register(`answer${currentQuestion}`, {
                      required: questions[currentQuestion].validation?.required,
                    })}
                    className="mr-2"
                    value={option}
                  />
                  <label htmlFor={`option-${currentQuestion}-${index}`}>
                    {option}
                  </label>
                </div>
              ))}
              {errors[`answer${currentQuestion}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`answer${currentQuestion}`].message}
                </p>
              )}
            </div>
          ) : questions[currentQuestion].type === "select" ? (
            <div>
              <select
                {...register(`answer${currentQuestion}`, {
                  required: questions[currentQuestion].validation?.required,
                })}
                className="px-4 py-2 border-b-4 w-full md:w-[70%] lg:w-[50%] border-black outline-none"
              >
                <option value="">Select an option</option>
                {questions[currentQuestion].options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors[`answer${currentQuestion}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`answer${currentQuestion}`].message}
                </p>
              )}
            </div>
          ) : 
          
          questions[currentQuestion].type == 'textarea' ? 
          (
            <div>
              <textarea 
              rows={5}
              {...register(`answer${currentQuestion}`,
                {
                  required: questions[currentQuestion].validation?.required,
                }
              )}
              className="px-4 py-2 border-b-4 border rounded-t-sm w-full md:w-[70%] lg:w-[50%] border-black outline-none"
                placeholder="Input the answer"
              ></textarea>
              {errors[`answer${currentQuestion}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`answer${currentQuestion}`].message}
                </p>
              )}
            </div>
          )
          :
          (
            <div>
              <input
                type={questions[currentQuestion].type}
                {...register(`answer${currentQuestion}`, questions[currentQuestion].validation)}
                className="px-4 py-2 border-b-4 w-full md:w-[70%] lg:w-[50%] border-black outline-none"
                placeholder="Input the answer"
              />
              {errors[`answer${currentQuestion}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`answer${currentQuestion}`].message}
                </p>
              )}
            </div>
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
