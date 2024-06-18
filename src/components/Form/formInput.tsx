import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  type?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  value?: string;
  id: string;
};

const formInput = <T extends FieldValues>({
  id,
  name,
  register,
  type = "text",
  placeholder,
  value
}: FormInputProps<T>) => {
  let style: string;
  if (type === "checkbox") {
    style = "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";
  } else {
    style = `
      bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    `;
  }
  return (
    <input
      type={type}
      id={id}
      {...register(name)}
      placeholder={placeholder}
      value={value}
      className={style}
    />
  );
};

export default formInput;
