export interface ServiceResponse<T> {
	data: T | null;
	error: string | null;
}
