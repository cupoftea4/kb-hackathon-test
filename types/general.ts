export type APIResponse<T> = {
  data: T;
  error?: string;
};

export type JwtUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type JwtPayload = {
  sub?: string;
  id_token?: string;
  access_token?: string;
  expires_at?: number;
  user: JwtUser;
};
