export type PagingRequest = { page?: number; limit?: number };

export type PagingResponse<T> = { items: T[]; total: number };

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;

export function calculateLimitAndOffset(pagingRequest: PagingRequest) {
  const page = pagingRequest.page || DEFAULT_PAGE;
  const limit = pagingRequest.limit || DEFAULT_LIMIT;
  const offset = (page - 1) * limit;
  return { limit, offset };
}
