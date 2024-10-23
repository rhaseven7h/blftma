import { AxiosError } from 'axios';

interface NormalizedDataResponse<T> {
  status: string;
  data?: T;
}

interface NormalizedErrorResponse {
  status: string;
  error: {
    status: number;
    data: AxiosError | string;
  };
}

class NormalizedServiceResponse<T> {
  private readonly response: NormalizedDataResponse<T> | NormalizedErrorResponse;
  private aKind?: 'data' | 'error' | 'pending';
  private aData?: T;
  private aCode?: string;
  private aMessage?: string;

  constructor(response: NormalizedDataResponse<T> | NormalizedErrorResponse) {
    this.response = response;
    this.normalize();
  }

  get kind() {
    return this.aKind;
  }

  get code() {
    return this.aCode;
  }

  get message() {
    return this.aMessage;
  }

  get data() {
    return this.aData;
  }

  public isPending() {
    return this.aKind === 'pending';
  }

  public isData() {
    return this.aKind === 'data';
  }

  public isError() {
    return this.aKind === 'error';
  }

  public fullMessage() {
    const codePart = this.code ? `${this.code}: ` : '';
    const messagePart = this.message ? this.message : '';
    const finalMessage = codePart + messagePart;
    if (finalMessage.trim() === '') return undefined;
    return finalMessage;
  }

  private normalize() {
    if (this.response.status === 'pending') {
      this.aKind = 'pending';
    } else if (this.response.status === 'fulfilled') {
      this.aKind = 'data';
      this.aData = (this.response as NormalizedDataResponse<T>).data;
    } else if (this.response.status === 'rejected') {
      const error = (this.response as NormalizedErrorResponse).error;
      if (typeof error.data === 'string') {
        this.aKind = 'error';
        this.aMessage = error.data;
      } else {
        this.aKind = 'error';
        this.aCode = error.data.code;
        this.aMessage = error.data.message;
      }
    } else {
      throw new Error('Unknown response status');
    }
  }
}

export default NormalizedServiceResponse;
