import {
  ClientErrorCode,
  APIErrorCode,
  isNotionClientError,
} from "@notionhq/client";
import { NextApiResponse } from "next";

export const handleError = (error: unknown, res: NextApiResponse) => {
  if (isNotionClientError(error)) {
    switch (error.code) {
      case ClientErrorCode.RequestTimeout:
        break;
      case ClientErrorCode.ResponseError:
        break;
      case APIErrorCode.Unauthorized:
        console.log("API token is invalid");
        break;
      case APIErrorCode.RestrictedResource:
        break;
      case APIErrorCode.ObjectNotFound:
        break;
      case APIErrorCode.RateLimited:
        break;
      case APIErrorCode.InvalidJSON:
        break;
      case APIErrorCode.InvalidRequestURL:
        break;
      case APIErrorCode.InvalidRequest:
        break;
      case APIErrorCode.ValidationError:
        break;
      case APIErrorCode.ConflictError:
        break;
      case APIErrorCode.InternalServerError:
        break;
      case APIErrorCode.ServiceUnavailable:
        break;
      default:
        assertNever(error);
        break;
    }
  }
  res.status(500).json({ message: "notion api is failed", error: error });
};

function assertNever(error: never) {
  console.log(`Unexpected object: `, error);
}
