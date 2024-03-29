import { BadRequestError } from "./BadRequest";

export class EmptyDataError extends BadRequestError {
  constructor(message?: string) {
    super(message || "Empty data found in form data");
  }
}
