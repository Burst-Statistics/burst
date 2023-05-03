import { useState, useEffect } from "react";

const InputWarning = ({
  type = "warning",
  message,
  timeout = 5000,
  onTimeout = () => {},
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
      clearTimeout(timer);
    }, timeout);
  }, [timeout, onTimeout]);

  const className = `burst-warning ${type}`;

  return <div className={className}>{message}</div>;
};

export default InputWarning;
