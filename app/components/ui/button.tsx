interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "border-2 border-slate-200 bg-transparent text-slate-500 hover:bg-slate-50"
  };

  return (
    <button
      {...props}
      className={`w-full p-2 rounded-md font-semibold transition-colors ${variants[variant]} disabled:bg-gray-400`}
    >
      {children}
    </button>
  );
};