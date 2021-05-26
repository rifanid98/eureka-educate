import Status from './status';

type Error = string | any | any[];
type Message = string | any | any[];

interface IResponse {
  status: number;
  message?: Message;
  data?: any | any[];
  error?: Error;
  total?: number;
}

type Success = {
  message?: string;
  data?: any | any[];
  total?: number;
};

type Created = {
  message?: string;
  data?: any | any[];
};

class Response {
  static resp: IResponse;

  /**
   * Created Response
   *
   * @param {object} {message?, data?}
   * @returns {object}
   */
  static created(param?: Created): IResponse {
    this.clear();
    this.resp.status = Status.created;
    this.resp.message = param?.message ? param.message : 'Created';
    if (param?.data) this.resp.data = param.data;
    return this.resp;
  }

  /**
   * Success Response
   *
   * @param {object} {message?, data?}
   * @returns {object}
   */
  static success(param?: Success): IResponse {
    this.clear();
    this.resp.status = Status.success;
    this.resp.message = param?.message ? param.message : 'Success';
    if (param?.data) this.resp.data = param.data;
    if (param?.total) this.resp.total = param.total;
    return this.resp;
  }

  /**
   * Error Response
   *
   * @param {object} {message?, data?}
   * @returns {object}
   */
  static error(error?: Error): IResponse {
    this.clear();
    this.resp.status = Status.error;
    this.resp.error = error || 'Internal Server Error';
    return this.resp;
  }

  /**
   * Bad Request Response
   *
   * @param {object} {message?, data?}
   * @returns {object}
   */
  static badrequest(message?: Message): IResponse {
    this.clear();
    this.resp.status = Status.badrequest;
    this.resp.message = message || 'Bad Request';
    return this.resp;
  }

  /**
   * Not Found Response
   *
   * @param {object} {message?, data?}
   * @returns {object}
   */
  static notfound(message?: Message): IResponse {
    this.clear();
    this.resp.status = Status.notfound;
    this.resp.message = message || 'No Data Found';
    return this.resp;
  }

  /**
   * Unauthorized Response
   *
   * @param {object} {message?, data?}
   * @returns {object}
   */
  static unauthorized(message?: Message): IResponse {
    this.clear();
    this.resp.status = Status.unathorized;
    this.resp.message = message || 'Unauthorized';
    return this.resp;
  }

  /**
   * Forbidden Response
   *
   * @param {object} {message?, data?}
   * @returns {object}
   */
  static forbidden(message?: Message): IResponse {
    this.clear();
    this.resp.status = Status.forbidden;
    this.resp.message = message || 'Forbidden';
    return this.resp;
  }

  /**
   * Conflict Response
   *
   * @param {object} {message?, data?}
   * @returns {object}
   */
  static conflict(message?: Message): IResponse {
    this.clear();
    this.resp.status = Status.conflict;
    this.resp.message = message || 'Conflict';
    return this.resp;
  }

  /**
   * Gone Response
   *
   * @param {object} {message?, data?}
   * @returns {object}
   */
  static gone(message?: Message): IResponse {
    this.clear();
    this.resp.status = Status.gone;
    this.resp.message = message || 'Created';
    return this.resp;
  }

  /**
   * Clearing response for new use
   */
  static clear(): void {
    this.resp = { status: 0 };
  }
}

export { IResponse, Response };
