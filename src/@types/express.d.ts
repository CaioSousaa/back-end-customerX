declare namespace Express {
  export interface Request {
    customer: {
      id: string;
      fullname: string;
      email: string;
    };
  }
}
