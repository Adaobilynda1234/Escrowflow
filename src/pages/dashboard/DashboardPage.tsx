import { useAuthStore } from '../../store/authStore';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <p className="text-gray-500">{user?.roles.join(', ')}</p>
      <button onClick={logout} className="mt-4 text-red-500 underline">Logout</button>
    </div>
  );
}
