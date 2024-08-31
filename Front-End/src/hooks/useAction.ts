import { useState } from "react";
import { message } from "antd";

type UseActionReturn<T, P extends any[]> = [
  T | null,
  boolean,
  (...args: P) => Promise<ResponseSuccess<T> | undefined>
];

const useAction = <T, P extends any[]>(
  asyncFunction: (...args: P) => Promise<ResponseSuccess<T>>
): UseActionReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setPending] = useState<boolean>(false);

  const execute = async (...args: P) => {
    try {
      setPending(true);
      const response = await asyncFunction(...args);
      setData(response.data);
      message.success(response.message);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Server error");
      }
    } finally {
      setPending(false);
    }
  };

  return [data, isPending, execute];
};

export default useAction;
