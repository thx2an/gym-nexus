export default function Footer() {
  return (
    <footer className="w-full bg-primarySurface border-t border-borderColor-light py-6 mt-10">
      <div className="text-center text-text-medium text-sm">
        © {new Date().getFullYear()} Gym Fitness. All rights reserved.
      </div>
    </footer>
  );
}
