declare namespace Express {
  export interface Request {
    payload: any;
  }
}

declare namespace globalThis {
  var prisma: any;
}
