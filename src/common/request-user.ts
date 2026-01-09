export type RequestUser = {
  userId: string;
  teamId: string;
  role: string;
};

declare module "express" {
  interface Request {
    user?: RequestUser;
  }
}
