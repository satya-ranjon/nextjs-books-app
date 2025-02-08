interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
      ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"} 
      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
      ${className}`}
      {...props}
    />
  );
}
