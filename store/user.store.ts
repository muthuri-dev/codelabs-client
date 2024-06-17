import { create } from "zustand";

interface IUser {
  id: string;
  username: string;
  email: string;
  profile_image: string;
  preferences: string[];
  setUser: (user: {
    id: string;
    email: string;
    username: string;
    profile_image: string;
    preferences: string[];
  }) => void;
}

export const useUserStore = create<IUser>()((set) => ({
  id: "",
  username: "",
  email: "",
  profile_image: "",
  preferences: [""],
  setUser: (user) =>
    set(() => ({
      id: user.id,
      email: user.email,
      username: user.username,
      profile_image: user.profile_image,
      preferences: user.preferences,
    })),
}));
