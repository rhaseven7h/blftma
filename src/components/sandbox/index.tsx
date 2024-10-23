import blftmaApi from '@/store/services/blftma';
import { ApiError } from '@/types/application';
import { Projects } from '@/types/projects';

interface DataResponse<T> {
  status: string;
  data?: T;
}

interface ErrorResponse {
  status: string;
  error: {
    status: number;
    data: ApiError | string;
  };
}

class NormalizedServiceResponse<T> {
  private readonly response: DataResponse<T> | ErrorResponse;
  private aKind?: 'data' | 'error' | 'pending';
  private aData?: T;
  private aCode?: string;
  private aMessage?: string;

  constructor(response: DataResponse<T> | ErrorResponse) {
    this.response = response;
    this.normalize();
  }

  private normalize() {
    if (this.response.status === 'pending') {
      this.aKind = 'pending';
    } else if (this.response.status === 'fulfilled') {
      this.aKind = 'data';
      this.aData = (this.response as DataResponse<T>).data;
    } else if (this.response.status === 'rejected') {
      const error = (this.response as ErrorResponse).error;
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
}

const Sandbox = () => {
  const result = blftmaApi.useGetProjectsQuery();
  // if (result.status !== 'pending') console.log(JSON.stringify(result, null, 2));
  const normalizedResult = new NormalizedServiceResponse<Projects | ApiError>(result);
  console.log('normalizedResult', {
    kind: normalizedResult.kind,
    code: normalizedResult.code,
    message: normalizedResult.message ? normalizedResult.message.slice(0, 80) + '...' : normalizedResult.message,
    data: normalizedResult.data ? JSON.stringify(normalizedResult.data).slice(0, 80) + '...' : normalizedResult.data,
    isPending: normalizedResult.isPending(),
    isData: normalizedResult.isData(),
    isError: normalizedResult.isError(),
    fullMessage: normalizedResult.fullMessage()
  });
  return (
    <div>
      <h1>Sandbox</h1>
      <div>{JSON.stringify(result, null, 2)}</div>
      <div data-testid='status'>{result.status}</div>
    </div>
  );
};

export default Sandbox;
