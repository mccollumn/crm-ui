"use client";

import React from "react";
import { FormEvent } from "react";
import { NewCaseForm, INITIAL_DATA } from "@/app/forms/NewCaseForm";

const NewCase = () => {
  const [data, setData] = React.useState(INITIAL_DATA);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    // POST data
  };

  return (
    <form onSubmit={handleSubmit}>
      <NewCaseForm {...data} setData={setData} />
    </form>
  );
};

export default NewCase;
