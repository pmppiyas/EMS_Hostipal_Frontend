
"use client";

interface IFieldErrorProps {
  errors: { field: string; message: string }[] | null;
  field: string;
}

const FieldError = ({ errors, field }: IFieldErrorProps) => {
  const error = errors?.find((e) => e.field === field);
  if (!error) return null;

  return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
};

export default FieldError;
