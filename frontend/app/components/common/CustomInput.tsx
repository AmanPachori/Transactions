interface CustomInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const CustomInput = ({
  label,
  placeholder,
  type,
  onChange,
  value,
}: CustomInputType) => {
  return (
    <div>
      <label className="block  text-sm  text-black font-semibold">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
};
