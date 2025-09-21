export class ResponseAPI<T> {
	sucess: boolean;
	message?: string;
	data?: T;
	status?: number;

	constructor({
		sucess,
		message,
		data,
		status,
	}: {
		sucess: boolean;
		message?: string;
		data?: T;
		status?: number;
	}) {
		this.sucess = sucess;
		this.message = message;
		this.data = data;
		this.status = status;
	}

	createResponse(): {
		sucess: boolean;
		message?: string;
		data?: T;
		status?: number;
	} {
		return {
			sucess: this.sucess,
			message: this.message,
			data: this.data,
			status: this.status,
		};
	}

	static success<U>(
		data: U,
		message?: string,
		status?: number
	): ResponseAPI<U> {
		return new ResponseAPI<U>({
			sucess: true,
			message,
			data,
			status,
		});
	}

	static error({
		message,
		status,
		errorMessage,
	}: {
		message: string;
		status?: number;
		errorMessage: string;
	}): ResponseAPI<null> {
		return new ResponseAPI<null>({
			sucess: false,
			message: `${message} - ${errorMessage}`,
			data: null,
			status,
		});
	}
}
