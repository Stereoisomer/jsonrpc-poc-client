import { useState } from "react";
import { jsonRpcRequest } from "../jsonRpc/jsonRpcRequest";
import ApiRequestButton from "./ApiRequestButton";

function ApiContainer () {

  const [currentReq, setCurrentReq] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const requests: {
    name: string,
    request: jsonRpcRequest
  }[] = [
    {
      name: "register user",
      request: {
        "jsonrpc": "2.0",
        "method": "auth/register",
        "params": {
          "user": "mary"
        },
        "id": "1233211234567"
      }
    }, {
      name: "register employee",
      request: {
        "jsonrpc": "2.0",
        "method": "auth/employee",
        "params": {
          "id": 15,
          "name": "tom",
          "salary": 1.1
        },
        "id": "1233211234567"
      }
    }, {
      name: "get user",
      request: {
        "jsonrpc": "2.0",
        "method": "auth/getUser",
        "params": {
          "user": "mary"
        },
        "id": "1233211234567"
      }
    }, {
      name: "get users",
      request: {
        "jsonrpc": "2.0",
        "method": "auth/getUsers",
        "id": "1233211234567"
      }
    },
  ];

  function onSelectRequest(request: jsonRpcRequest) {
    console.log("selected", request);
    setCurrentReq(JSON.stringify(request, null, 2));
    setResponse("...")
  }

  async function onSubmit() {
    try {
      JSON.parse(currentReq);
    } catch (e) {
      console.error(e);
    }
    fetch("http://localhost:8080/api/1.0", {
      method: 'POST',
      body: currentReq,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(resp => {
      setResponse(JSON.stringify(resp, null, 2));
    }).catch(e => {
      console.error(e);
    })
  }

  return (
    <div>
      <div className="request-buttons">
        {
          requests.map((it, i) => (
            <ApiRequestButton key={i} name={it.name} request={it.request} onClick={onSelectRequest} />
          ))
        }
      </div>
      <div className="request-body">
        <textarea value={currentReq} onChange={(e) => setCurrentReq(e.target.value)} />
        <button onClick={onSubmit}>SEND</button>
      </div>
      <hr />
      <div className="response">
        <textarea value={response} />
      </div>
    </div>
  )
}




export default ApiContainer;