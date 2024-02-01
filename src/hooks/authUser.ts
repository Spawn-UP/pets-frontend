import { create } from 'zustand';

interface IAuthUser {
  name: string;
  email: string;
}

interface IAuthUserState {
  authUser: IAuthUser | {};
  acessToken: string;
  tryChangeAuthUser: (user: IAuthUser) => void;
  tryChangeAcessToken: (acessToken: string) => void;
}

export const useAuthState = create<IAuthUserState>()(set => ({
  authUser: {},
  acessToken: '',
  tryChangeAuthUser: authUser => set({ authUser }),
  tryChangeAcessToken: acessToken => set({ acessToken }),
}));
