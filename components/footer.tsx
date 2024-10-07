export default function Footer() {
  return (
    <div className="flex h-14 flex-none items-center justify-center border-t-2">
      <p>&copy; {new Date().getFullYear()}</p>
    </div>
  );
}
