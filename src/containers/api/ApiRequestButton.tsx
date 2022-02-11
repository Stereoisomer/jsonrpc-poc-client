import { jsonRpcRequest } from "../jsonRpc/jsonRpcRequest";

function ApiRequestButton(props: {
  name: string,
  request: jsonRpcRequest,
  onClick: (obj: jsonRpcRequest) => any
}) {
  return (
    <button onClick={() => props.onClick(props.request)}>{props.name}</button>
  )
}

export default ApiRequestButton;