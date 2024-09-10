"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<{
  isShow: boolean;
  calbackUrl: string;
  showLoginModal: (calbackUrl: string) => void;
  hiddenLoginModal: () => void;
}>({
  isShow: false,
  calbackUrl: "/login",
  showLoginModal: () => {},
  hiddenLoginModal: () => {},
});
export const useLoginModal = () => {
  const context = useContext(AppContext);
  return context;
};
export default function LoginModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [calbackUrl, setCallbackUrl] = useState<string>("/login");
  const [isShow, setShow] = useState<boolean>(false);
  const showLoginModal = (calbackUrl: string) => {
    setCallbackUrl(`/login?callbackUrl=${calbackUrl}`);
    setShow(true);
  };
  const path = usePathname();
  useEffect(() => {
    setShow(false);
  }, [path]);
  const hiddenLoginModal = () => {
    setShow(false);
    setCallbackUrl("/login");
  };
  return (
    <AppContext.Provider
      value={{
        isShow,
        calbackUrl,
        hiddenLoginModal,
        showLoginModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
