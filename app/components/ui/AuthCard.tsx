export const AuthCard = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="flex items-center justify-center p-4">
    <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">{title}</h1>
      {children}
    </div>
  </div>
);