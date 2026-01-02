import { message } from "antd";
import { useEffect } from "react";

function SuccessMessage({ successMessage }) {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!successMessage?.text) return;
    messageApi.open({
      type: "success",
      content: successMessage.text,
    });
  }, [successMessage?.key]);

  return <>{contextHolder}</>;
}

export default SuccessMessage;
