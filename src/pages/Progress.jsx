import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CreateSchedul() {
  const [formData, setFormData] = useState({
    progressState: "",
    description: "",
    date: "",
    state: [],
  });
  const [publishError, setPublishError] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleExerciseChange = (idx, field, val) => {
    const updated = formData.state.map((item, i) =>
      i === idx ? { ...item, [field]: val.trim() } : item
    );
    setFormData((prev) => ({ ...prev, state: updated }));
  };

  const handleAddExercise = () => {
    setFormData((prev) => ({
      ...prev,
      state: [...prev.state, { name: "", completed: "", burend_callary: "" }],
    }));
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    // using native date picker, so skip regex validation
    setFormData((prev) => ({ ...prev, date }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/CreateProgress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      alert("Submission successful!");
      navigate("/");
    } catch {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        

        <div className="relative z-10 max-w-4xl w-full bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Create Progress
            </h2>
            <Link to="/viewprogreess">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                My Progress →
              </button>
            </Link>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Course Name */}
            <div>
              <label
                htmlFor="progressState"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Name
              </label>
              <select
                id="progressState"
                onChange={handleChange}
                value={formData.progressState}
                required
                className="block w-full rounded-lg border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a course…</option>
                {/* your options here */}
                <option>Unlocking the Basics: A Beginner’s Guide</option>
                <option>Foundations First: Learn the Essentials</option>
                <option>Crash Course 101: Get Started Fast</option>
                <option>Skill Sprint: Learn in an Hour</option>
                <option>Demo Masterclass: See It in Action</option>
                <option>Try & Learn: Interactive Demo Course</option>
                <option>QuickStart Demo: Edition</option>
                <option>Fast Track Fundamentals</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Start Date
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleDateChange}
                required
                className="block w-full rounded-lg border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                maxLength={1000}
                required
                className="block w-full rounded-lg border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Dynamic Progress Entries */}
            <fieldset className="border-t border-b border-gray-200 py-6 space-y-6">
              <legend className="text-lg font-semibold text-gray-800">
                My Learning Progress
              </legend>
              {formData.state.map((entry, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                >
                  <div>
                    <label
                      htmlFor={`name-${idx}`}
                      className="block text-sm font-medium text-gray-600"
                    >
                      Day {idx + 1} Description
                    </label>
                    <input
                      id={`name-${idx}`}
                      type="text"
                      placeholder="Short description"
                      value={entry.name}
                      onChange={(e) =>
                        handleExerciseChange(idx, "name", e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`completed-${idx}`}
                      className="block text-sm font-medium text-gray-600"
                    >
                      Hours
                    </label>
                    <input
                      id={`completed-${idx}`}
                      type="number"
                      min="0"
                      max="24"
                      placeholder="0"
                      value={entry.completed}
                      onChange={(e) =>
                        handleExerciseChange(idx, "completed", e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`burend_callary-${idx}`}
                      className="block text-sm font-medium text-gray-600"
                    >
                      Time per Day
                    </label>
                    <input
                      id={`burend_callary-${idx}`}
                      type="text"
                      placeholder="e.g. 30m"
                      maxLength={5}
                      value={entry.burend_callary}
                      onChange={(e) =>
                        handleExerciseChange(
                          idx,
                          "burend_callary",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-lg border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddExercise}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                + Add Day
              </button>
            </fieldset>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Progress
              </button>
              {publishError && (
                <p className="mt-2 text-center text-sm text-red-600">
                  {publishError}
                </p>
              )}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
);
}
