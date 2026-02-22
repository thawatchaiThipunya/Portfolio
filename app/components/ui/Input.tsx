interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => (
  <div className="w-full mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all 
                 text-zinc-900 placeholder:text-zinc-400 bg-white" 
    />
  </div>
);