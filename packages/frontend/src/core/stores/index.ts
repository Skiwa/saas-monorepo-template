import type { Mutate, StoreApi } from 'zustand';

export type QueryCommandResult = {
  error: string | null;
  isLoading: boolean;
};

export const INITIAL_QUERY_COMMAND_RESULT: QueryCommandResult = {
  error: null,
  isLoading: false,
};

type ExecuteUseCaseAndUpdateStateParams<UseCaseResult, State> = {
  key: keyof State;
  set: Mutate<StoreApi<State>, []>['setState'];
  useCase: () => Promise<UseCaseResult>;
};

export const executeUseCaseAndUpdateState = async <UseCaseResult, State>(
  params: ExecuteUseCaseAndUpdateStateParams<UseCaseResult, State>
): Promise<UseCaseResult> => {
  try {
    const result = await params.useCase();
    params.set((state) => ({ ...state, [params.key]: { isLoading: false, error: null } }));
    return result;
  } catch (error: unknown) {
    const errorMessage: string = error instanceof Error ? error.message : 'An error occurred';
    params.set((state) => ({ ...state, [params.key]: { isLoading: false, error: errorMessage } }));
    throw error;
  }
};
