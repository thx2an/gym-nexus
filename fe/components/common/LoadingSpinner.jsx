export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <span className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full"></span>
    </div>
  );
}
