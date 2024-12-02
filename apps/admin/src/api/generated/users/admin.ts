/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * New Year Game API
 * OpenAPI spec version: 1.0.0
 */
import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import { baseApiRequest } from '../../baseApiRequest'
import type {
  CreateTaskRequest,
  PostApiAdminUserIdChangeIsLotteryUserBody,
  SignInRequest,
  SignInResponse,
  Task,
  UpdateTaskRequest,
  UpdateTextRequest,
  UserBasic,
  UserDetailed,
} from './model'

/**
 * @summary Admin sign in
 */
export const postApiAdminSignIn = (
  signInRequest: SignInRequest,
  signal?: AbortSignal,
) => {
  return baseApiRequest<SignInResponse>({
    url: `/api/admin/sign_in`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: signInRequest,
    signal,
  })
}

export const getPostApiAdminSignInMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiAdminSignIn>>,
    TError,
    { data: SignInRequest },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiAdminSignIn>>,
  TError,
  { data: SignInRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiAdminSignIn>>,
    { data: SignInRequest }
  > = props => {
    const { data } = props ?? {}

    return postApiAdminSignIn(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type PostApiAdminSignInMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiAdminSignIn>>
>
export type PostApiAdminSignInMutationBody = SignInRequest
export type PostApiAdminSignInMutationError = unknown

/**
 * @summary Admin sign in
 */
export const usePostApiAdminSignIn = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiAdminSignIn>>,
    TError,
    { data: SignInRequest },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiAdminSignIn>>,
  TError,
  { data: SignInRequest },
  TContext
> => {
  const mutationOptions = getPostApiAdminSignInMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * @summary Get all tasks
 */
export const getApiAdminTask = (signal?: AbortSignal) => {
  return baseApiRequest<Task[]>({
    url: `/api/admin/task`,
    method: 'GET',
    signal,
  })
}

export const getGetApiAdminTaskQueryKey = () => {
  return [`/api/admin/task`] as const
}

export const getGetApiAdminTaskQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiAdminTask>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiAdminTask>>, TError, TData>
  >
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetApiAdminTaskQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAdminTask>>> = ({
    signal,
  }) => getApiAdminTask(signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiAdminTask>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiAdminTaskQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiAdminTask>>
>
export type GetApiAdminTaskQueryError = unknown

export function useGetApiAdminTask<
  TData = Awaited<ReturnType<typeof getApiAdminTask>>,
  TError = unknown,
>(options: {
  query: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiAdminTask>>, TError, TData>
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiAdminTask>>,
        TError,
        TData
      >,
      'initialData'
    >
}): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetApiAdminTask<
  TData = Awaited<ReturnType<typeof getApiAdminTask>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiAdminTask>>, TError, TData>
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiAdminTask>>,
        TError,
        TData
      >,
      'initialData'
    >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiAdminTask<
  TData = Awaited<ReturnType<typeof getApiAdminTask>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiAdminTask>>, TError, TData>
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get all tasks
 */

export function useGetApiAdminTask<
  TData = Awaited<ReturnType<typeof getApiAdminTask>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiAdminTask>>, TError, TData>
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetApiAdminTaskQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Create new task
 */
export const postApiAdminTask = (
  createTaskRequest: CreateTaskRequest,
  signal?: AbortSignal,
) => {
  return baseApiRequest<void>({
    url: `/api/admin/task`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: createTaskRequest,
    signal,
  })
}

export const getPostApiAdminTaskMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiAdminTask>>,
    TError,
    { data: CreateTaskRequest },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiAdminTask>>,
  TError,
  { data: CreateTaskRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiAdminTask>>,
    { data: CreateTaskRequest }
  > = props => {
    const { data } = props ?? {}

    return postApiAdminTask(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type PostApiAdminTaskMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiAdminTask>>
>
export type PostApiAdminTaskMutationBody = CreateTaskRequest
export type PostApiAdminTaskMutationError = unknown

/**
 * @summary Create new task
 */
export const usePostApiAdminTask = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiAdminTask>>,
    TError,
    { data: CreateTaskRequest },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiAdminTask>>,
  TError,
  { data: CreateTaskRequest },
  TContext
> => {
  const mutationOptions = getPostApiAdminTaskMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * @summary Update task
 */
export const putApiAdminTaskId = (
  id: string,
  updateTaskRequest: UpdateTaskRequest,
) => {
  return baseApiRequest<void>({
    url: `/api/admin/task/${id}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: updateTaskRequest,
  })
}

export const getPutApiAdminTaskIdMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putApiAdminTaskId>>,
    TError,
    { id: string; data: UpdateTaskRequest },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof putApiAdminTaskId>>,
  TError,
  { id: string; data: UpdateTaskRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putApiAdminTaskId>>,
    { id: string; data: UpdateTaskRequest }
  > = props => {
    const { id, data } = props ?? {}

    return putApiAdminTaskId(id, data)
  }

  return { mutationFn, ...mutationOptions }
}

export type PutApiAdminTaskIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof putApiAdminTaskId>>
>
export type PutApiAdminTaskIdMutationBody = UpdateTaskRequest
export type PutApiAdminTaskIdMutationError = unknown

/**
 * @summary Update task
 */
export const usePutApiAdminTaskId = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putApiAdminTaskId>>,
    TError,
    { id: string; data: UpdateTaskRequest },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof putApiAdminTaskId>>,
  TError,
  { id: string; data: UpdateTaskRequest },
  TContext
> => {
  const mutationOptions = getPutApiAdminTaskIdMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * @summary Delete task
 */
export const deleteApiAdminTaskId = (id: string) => {
  return baseApiRequest<void>({
    url: `/api/admin/task/${id}`,
    method: 'DELETE',
  })
}

export const getDeleteApiAdminTaskIdMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiAdminTaskId>>,
    TError,
    { id: string },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiAdminTaskId>>,
  TError,
  { id: string },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiAdminTaskId>>,
    { id: string }
  > = props => {
    const { id } = props ?? {}

    return deleteApiAdminTaskId(id)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeleteApiAdminTaskIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiAdminTaskId>>
>

export type DeleteApiAdminTaskIdMutationError = unknown

/**
 * @summary Delete task
 */
export const useDeleteApiAdminTaskId = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiAdminTaskId>>,
    TError,
    { id: string },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiAdminTaskId>>,
  TError,
  { id: string },
  TContext
> => {
  const mutationOptions = getDeleteApiAdminTaskIdMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * @summary Update lottery text and time
 */
export const putApiAdminText = (updateTextRequest: UpdateTextRequest) => {
  return baseApiRequest<void>({
    url: `/api/admin/text`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: updateTextRequest,
  })
}

export const getPutApiAdminTextMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putApiAdminText>>,
    TError,
    { data: UpdateTextRequest },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof putApiAdminText>>,
  TError,
  { data: UpdateTextRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putApiAdminText>>,
    { data: UpdateTextRequest }
  > = props => {
    const { data } = props ?? {}

    return putApiAdminText(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type PutApiAdminTextMutationResult = NonNullable<
  Awaited<ReturnType<typeof putApiAdminText>>
>
export type PutApiAdminTextMutationBody = UpdateTextRequest
export type PutApiAdminTextMutationError = unknown

/**
 * @summary Update lottery text and time
 */
export const usePutApiAdminText = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putApiAdminText>>,
    TError,
    { data: UpdateTextRequest },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof putApiAdminText>>,
  TError,
  { data: UpdateTextRequest },
  TContext
> => {
  const mutationOptions = getPutApiAdminTextMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * @summary Get all users
 */
export const getApiAdminUsers = (signal?: AbortSignal) => {
  return baseApiRequest<UserBasic[]>({
    url: `/api/admin/users`,
    method: 'GET',
    signal,
  })
}

export const getGetApiAdminUsersQueryKey = () => {
  return [`/api/admin/users`] as const
}

export const getGetApiAdminUsersQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiAdminUsers>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiAdminUsers>>, TError, TData>
  >
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetApiAdminUsersQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiAdminUsers>>
  > = ({ signal }) => getApiAdminUsers(signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiAdminUsers>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiAdminUsersQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiAdminUsers>>
>
export type GetApiAdminUsersQueryError = unknown

export function useGetApiAdminUsers<
  TData = Awaited<ReturnType<typeof getApiAdminUsers>>,
  TError = unknown,
>(options: {
  query: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiAdminUsers>>, TError, TData>
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiAdminUsers>>,
        TError,
        TData
      >,
      'initialData'
    >
}): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetApiAdminUsers<
  TData = Awaited<ReturnType<typeof getApiAdminUsers>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiAdminUsers>>, TError, TData>
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiAdminUsers>>,
        TError,
        TData
      >,
      'initialData'
    >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiAdminUsers<
  TData = Awaited<ReturnType<typeof getApiAdminUsers>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiAdminUsers>>, TError, TData>
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get all users
 */

export function useGetApiAdminUsers<
  TData = Awaited<ReturnType<typeof getApiAdminUsers>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiAdminUsers>>, TError, TData>
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetApiAdminUsersQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Get user details
 */
export const getApiAdminUserId = (id: string, signal?: AbortSignal) => {
  return baseApiRequest<UserDetailed>({
    url: `/api/admin/user/${id}`,
    method: 'GET',
    signal,
  })
}

export const getGetApiAdminUserIdQueryKey = (id: string) => {
  return [`/api/admin/user/${id}`] as const
}

export const getGetApiAdminUserIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiAdminUserId>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiAdminUserId>>,
        TError,
        TData
      >
    >
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetApiAdminUserIdQueryKey(id)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiAdminUserId>>
  > = ({ signal }) => getApiAdminUserId(id, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiAdminUserId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiAdminUserIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiAdminUserId>>
>
export type GetApiAdminUserIdQueryError = unknown

export function useGetApiAdminUserId<
  TData = Awaited<ReturnType<typeof getApiAdminUserId>>,
  TError = unknown,
>(
  id: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiAdminUserId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminUserId>>,
          TError,
          TData
        >,
        'initialData'
      >
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiAdminUserId<
  TData = Awaited<ReturnType<typeof getApiAdminUserId>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiAdminUserId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminUserId>>,
          TError,
          TData
        >,
        'initialData'
      >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiAdminUserId<
  TData = Awaited<ReturnType<typeof getApiAdminUserId>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiAdminUserId>>,
        TError,
        TData
      >
    >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get user details
 */

export function useGetApiAdminUserId<
  TData = Awaited<ReturnType<typeof getApiAdminUserId>>,
  TError = unknown,
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiAdminUserId>>,
        TError,
        TData
      >
    >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetApiAdminUserIdQueryOptions(id, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Change user lottery status
 */
export const postApiAdminUserIdChangeIsLotteryUser = (
  id: string,
  postApiAdminUserIdChangeIsLotteryUserBody: PostApiAdminUserIdChangeIsLotteryUserBody,
  signal?: AbortSignal,
) => {
  return baseApiRequest<void>({
    url: `/api/admin/user/${id}/changeIsLotteryUser`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: postApiAdminUserIdChangeIsLotteryUserBody,
    signal,
  })
}

export const getPostApiAdminUserIdChangeIsLotteryUserMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiAdminUserIdChangeIsLotteryUser>>,
    TError,
    { id: string; data: PostApiAdminUserIdChangeIsLotteryUserBody },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiAdminUserIdChangeIsLotteryUser>>,
  TError,
  { id: string; data: PostApiAdminUserIdChangeIsLotteryUserBody },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiAdminUserIdChangeIsLotteryUser>>,
    { id: string; data: PostApiAdminUserIdChangeIsLotteryUserBody }
  > = props => {
    const { id, data } = props ?? {}

    return postApiAdminUserIdChangeIsLotteryUser(id, data)
  }

  return { mutationFn, ...mutationOptions }
}

export type PostApiAdminUserIdChangeIsLotteryUserMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiAdminUserIdChangeIsLotteryUser>>
>
export type PostApiAdminUserIdChangeIsLotteryUserMutationBody =
  PostApiAdminUserIdChangeIsLotteryUserBody
export type PostApiAdminUserIdChangeIsLotteryUserMutationError = unknown

/**
 * @summary Change user lottery status
 */
export const usePostApiAdminUserIdChangeIsLotteryUser = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiAdminUserIdChangeIsLotteryUser>>,
    TError,
    { id: string; data: PostApiAdminUserIdChangeIsLotteryUserBody },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof postApiAdminUserIdChangeIsLotteryUser>>,
  TError,
  { id: string; data: PostApiAdminUserIdChangeIsLotteryUserBody },
  TContext
> => {
  const mutationOptions =
    getPostApiAdminUserIdChangeIsLotteryUserMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * @summary Download reviews excel
 */
export const getApiAdminExcelAllReviews = (signal?: AbortSignal) => {
  return baseApiRequest<Blob>({
    url: `/api/admin/excel/all_reviews`,
    method: 'GET',
    responseType: 'blob',
    signal,
  })
}

export const getGetApiAdminExcelAllReviewsQueryKey = () => {
  return [`/api/admin/excel/all_reviews`] as const
}

export const getGetApiAdminExcelAllReviewsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
      TError,
      TData
    >
  >
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getGetApiAdminExcelAllReviewsQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>
  > = ({ signal }) => getApiAdminExcelAllReviews(signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiAdminExcelAllReviewsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>
>
export type GetApiAdminExcelAllReviewsQueryError = unknown

export function useGetApiAdminExcelAllReviews<
  TData = Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
  TError = unknown,
>(options: {
  query: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
      TError,
      TData
    >
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
        TError,
        TData
      >,
      'initialData'
    >
}): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetApiAdminExcelAllReviews<
  TData = Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
      TError,
      TData
    >
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
        TError,
        TData
      >,
      'initialData'
    >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiAdminExcelAllReviews<
  TData = Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
      TError,
      TData
    >
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Download reviews excel
 */

export function useGetApiAdminExcelAllReviews<
  TData = Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiAdminExcelAllReviews>>,
      TError,
      TData
    >
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetApiAdminExcelAllReviewsQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Download lottery numbers excel
 */
export const getApiAdminExcelLotteryNumbers = (signal?: AbortSignal) => {
  return baseApiRequest<Blob>({
    url: `/api/admin/excel/lottery_numbers`,
    method: 'GET',
    responseType: 'blob',
    signal,
  })
}

export const getGetApiAdminExcelLotteryNumbersQueryKey = () => {
  return [`/api/admin/excel/lottery_numbers`] as const
}

export const getGetApiAdminExcelLotteryNumbersQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
      TError,
      TData
    >
  >
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getGetApiAdminExcelLotteryNumbersQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>
  > = ({ signal }) => getApiAdminExcelLotteryNumbers(signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetApiAdminExcelLotteryNumbersQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>
>
export type GetApiAdminExcelLotteryNumbersQueryError = unknown

export function useGetApiAdminExcelLotteryNumbers<
  TData = Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
  TError = unknown,
>(options: {
  query: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
      TError,
      TData
    >
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
        TError,
        TData
      >,
      'initialData'
    >
}): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetApiAdminExcelLotteryNumbers<
  TData = Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
      TError,
      TData
    >
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
        TError,
        TData
      >,
      'initialData'
    >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetApiAdminExcelLotteryNumbers<
  TData = Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
      TError,
      TData
    >
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Download lottery numbers excel
 */

export function useGetApiAdminExcelLotteryNumbers<
  TData = Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getApiAdminExcelLotteryNumbers>>,
      TError,
      TData
    >
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetApiAdminExcelLotteryNumbersQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}
