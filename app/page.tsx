import { logOut } from "@/lib/auth-actions";

export default function HomePage() {
  return (
    <div>
      <p>HomePage</p>
      <form action={logOut}>
        <button type="submit">logOut</button>
      </form>
    </div>
  );
}
