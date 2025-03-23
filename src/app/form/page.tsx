"use client";

import { GenericFormProvider } from "@/components/form/generic-form";
import React from "react";

const page = () => {
  return (
    <div>
      <GenericFormProvider>
        <input name="name" />
        <input name="email" />
        <button type="submit">Submit</button>
      </GenericFormProvider>
    </div>
  );
};

export default page;
