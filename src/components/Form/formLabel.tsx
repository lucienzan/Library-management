type Props = {
  name: string;
  label: string;
};
export function FormLabel(prop: Props) {
  return (
    <label
      htmlFor={prop.name}
      className="block mb-2 text-sm font-medium
       text-gray-900 dark:text-white"
    >
      {prop.label}
    </label>
  );
}
