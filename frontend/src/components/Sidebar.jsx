import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { User } from "lucide-react"; // Only User icon, not Users
import { useAuthStore } from "../store/useAuthStore";

export default function Sidebar() {
    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
        useChatStore();
    const { onlineUsers } = useAuthStore();

    const [showOnline, setShowOnline] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const filteredUser = showOnline
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;

    if (isUserLoading) {
        return <SidebarSkeleton />;
    }

    return (
        <aside className="flex flex-col w-20 h-full transition-all duration-200 lg:w-72 border-base-300">
            <div className="w-full p-5 border-b border-base-300">
                <div className="flex items-center gap-2">
                    <User className="size-6" />
                    <span className="hidden font-medium lg:block">Contacts</span>
                </div>
                <div className="items-center hidden gap-2 mt-3 lg:flex">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showOnline}
                            onChange={(e) => setShowOnline(e.target.checked)}
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">
                        ({onlineUsers.length - 1} online)
                    </span>
                </div>
            </div>

            <div className="w-full py-3 overflow-auto">
                <div className="w-full py-3 overflow-y-auto">
                    {filteredUser.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${selectedUser?._id === user._id
                                    ? "bg-base-300 ring-1 ring-base-300"
                                    : ""
                                }`}
                        >
                            <div className="relative mx-auto lg:mx-0">
                                <img
                                    src={user.profilePic || "/avatar.png"}
                                    alt={user.name}
                                    className="object-cover rounded-full size-12"
                                />
                                {onlineUsers.includes(user._id) && (
                                    <span className="absolute bottom-0 right-0 bg-green-500 rounded-full size-3 ring-2 ring-zinc-900" />
                                )}
                            </div>

                            {/* User info - only visible on larger screens */}
                            <div className="hidden min-w-0 text-left lg:block">
                                <div className="font-medium truncate">{user.fullName}</div>
                                <div className="text-sm text-zinc-400">
                                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>
                        </button>
                    ))}

                    {filteredUser.length === 0 && (
                        <div className="py-4 text-center text-zinc-500">
                            No online users
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
