import { create } from 'zustand';

interface IAuthUser {
  name: string;
  email: string;
}

interface ISaveAuth {
  user?: IAuthUser;
  acessToken?: string;
}

interface IAuthUserState {
  authUser: IAuthUser | {};
  acessToken: string;
  saveAuth: ({ user, acessToken }: ISaveAuth) => void;
}

export const useAuthState = create<IAuthUserState>()(set => ({
  authUser: {},
  acessToken: '',
  saveAuth: ({ user, acessToken }) =>
    set(state => ({
      authUser: user || state.authUser,
      acessToken: acessToken || state.acessToken,
    })),
}));
