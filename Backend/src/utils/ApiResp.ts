class ApiResponse {
  // Type
  statusCode: number;
  message: string;
  data: any;
  status: boolean;
  // Constructor
  constructor(statusCode: number, message = "Success", data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.status = statusCode < 400;
  }
}
export { ApiResponse };
