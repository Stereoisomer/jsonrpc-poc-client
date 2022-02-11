export interface jsonRpcRequest {
  "jsonrpc": "2.0",
  "method": string,
  "params"?: Object | Object[],
  "id": string | number
}