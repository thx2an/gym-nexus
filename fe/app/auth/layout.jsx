export const metadata = {
  title: "Authentication – GymNexus",
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-primarySurface">
      {children}
    </div>
  );
}
