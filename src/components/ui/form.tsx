interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}

interface FormFieldProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
