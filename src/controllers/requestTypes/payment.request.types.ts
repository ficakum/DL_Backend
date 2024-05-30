import { Request } from "express";

type PayOrderRequestType = Request<{ id: string }, object, object, object>;

export type { PayOrderRequestType };
