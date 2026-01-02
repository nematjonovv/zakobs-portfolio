import { message } from "antd";
import { useEffect } from "react";

function ErrorMessage({ errMessage }) {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!errMessage?.text) return;
    messageApi.open({
      type: "error",
      content: errMessage.text,
    });
  }, [errMessage]);

  return <>{contextHolder}</>;
}

export default ErrorMessage;
