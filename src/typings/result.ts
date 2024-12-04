export type Result<R, E> =
  | { result: R; error: null }
  | { result: null; error: E };
