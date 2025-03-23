import { createContext, useContext } from "react";
import { Control, useForm } from "react-hook-form";
import { Form } from "../ui/form";

type GenericFormContext = {
  control: Control<any>;
};

const GenericFormContext = createContext<GenericFormContext | null>(null);

export const useGenericFormContext = () => {
  const context = useContext(GenericFormContext);
  if (!context) {
    throw new Error(
      "useGenericFormContext must be used within a GenericFormProvider"
    );
  }
  return context;
};

type GenericFormProps = {
  children: React.ReactNode;
};

export const GenericFormProvider: React.FC<GenericFormProps> = ({
  children,
}) => {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <GenericFormContext.Provider value={{ control: form.control }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
      </Form>
    </GenericFormContext.Provider>
  );
};
