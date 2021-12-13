import React from "react";

const NewPromptModal = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    console.log(data);
  };

  return (
    <div>
      <h1>New Prompt Modal</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" name="prompt" />
        </label>
        {/* Date Picker */}
        <label>
          Date:
          <input type="date" name="date" />
        </label>
        {/* Time Picker */}
        <label>
          Time:
          <input type="time" name="time" />
        </label>
        {/* Submit Button */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewPromptModal;
