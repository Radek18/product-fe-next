import {
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import { logOut } from "@/lib/auth-actions";

export default async function Header() {
  const { user } = (await auth()) || {};

  return (
    <header className="fixed flex h-14 w-full items-center justify-end gap-10 border-b-2 bg-white">
      <div className="flex gap-2">
        <UserCircleIcon className="aspect-square h-6" />

        <p>{user?.email}</p>
      </div>

      <form action={logOut}>
        <button
          className="mr-5 flex cursor-pointer gap-2 transition-all hover:text-slate-900"
          type="submit"
        >
          <span>Odhlásit</span>
          <ArrowRightStartOnRectangleIcon className="aspect-square h-6" />
        </button>
      </form>
    </header>
  );
}
