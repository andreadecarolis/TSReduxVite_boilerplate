import { z } from "zod";

/* #region HttpRequest */
export interface HttpRequest<P> {
  token?: string;
  requestCode: string;
  payload: P;
}
/* #endregion */

/* #region HttpResponse */
export const HttpResponseSchema = z.object({
  ErrorCode: z.number(),
  ErrorMessage: z.string(),
  status: z.number(),
});
export type HttpResponse = z.infer<typeof HttpResponseSchema>;

export const HttpResponseFailureSchema = z.object({
  ErrorCode: z.number(),
  ErrorMessage: z.string(),
  status: z.number(),
});
export type HttpResponseFailure = z.infer<typeof HttpResponseFailureSchema>;
/* #endregion */

/* #region ExtraOptions */
export type ExtraOptionsNotification = {
  onSuccessMessage: string;
  onFailureMessage: string;
};

export type ExtraOptions = {
  notification?: ExtraOptionsNotification;
};
/* #endregion */
