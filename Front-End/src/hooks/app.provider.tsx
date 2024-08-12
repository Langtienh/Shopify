// "use client";
// import { IUser } from "@/auth/next-auth";
// import { logout } from "@/services/auth";
// import { loginTrigger } from "@/services/hooks";
// import { signOut } from "next-auth/react";
// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// const AppContext = createContext<{
//   user: IUser | null;
//   setUser: (user: IUser | null) => void;
//   cartSize: number;
//   addCartItem: (id: number) => void;
//   subCartItem: (id: number) => void;
//   wishList: number[];
//   pushWishListItem: (id: number) => void;
//   popWishListItem: (id: number) => void;
//   isShowLoginmodal: boolean;
//   toggleLoginModal: (callbackUrl?: string) => void;
//   logout: () => void;
//   calbackUrl: string;
// }>({
//   user: null,
//   setUser: () => {},
//   cartSize: 0,
//   addCartItem: () => {},
//   subCartItem: () => {},
//   wishList: [],
//   pushWishListItem: () => {},
//   popWishListItem: () => {},
//   isShowLoginmodal: false,
//   toggleLoginModal: () => {},
//   logout: () => {},
//   calbackUrl: "",
// });

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   return context;
// };

// export default function ContextWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // initial state, funcion
//   const [user, setUser] = useState<IUser | null>(null);
//   const [cartSize, setCartSize] = useState<number>(0);
//   const [wishList, setWishList] = useState<number[]>([]);
//   const [isShowLoginmodal, setToggleLoginModal] = useState<boolean>(false);
//   const [calbackUrl, setCallbackUrl] = useState<string>("");

//   // trigger
//   useEffect(() => {
//     const trigger = async () => {
//       const res = await loginTrigger();
//       setUser(res.user);
//       setCartSize(res.cartSize);
//       setWishList(res.wishList);
//     };
//     trigger();
//   }, []);

//   // cart Action
//   const addCartItem = (quantity: number = 1) =>
//     setCartSize((preState) => preState + quantity);
//   const subCartItem = (quantity: number = 1) =>
//     setCartSize((preState) => preState - quantity);

//   // wishList action
//   // todo
//   const pushWishListItem = (item: number) =>
//     setWishList((preState) => {
//       const _state = [...preState, item];
//       return _state;
//     });
//   const popWishListItem = (id: number) =>
//     setWishList((preState) => {
//       const _state = preState.filter((item) => item !== id);
//       return _state;
//     });
//   // todo
//   const _setUser = (user: IUser | null) => setUser(user);

//   // toggle login modal
//   const toggleLoginModal = (calbackUrl?: string) => {
//     if (calbackUrl) setCallbackUrl(calbackUrl);
//     setToggleLoginModal((preState) => !preState);
//   };

//   // logout
//   const handleLogout = async () => {
//     await logout();
//     await signOut({ callbackUrl: "/login" });
//   };

//   // reset
//   const reset = () => {
//     setUser(null);
//     setCartSize(0);
//     setWishList([]);
//   };
//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         setUser: _setUser,
//         cartSize,
//         wishList,
//         addCartItem,
//         subCartItem,
//         pushWishListItem,
//         popWishListItem,
//         isShowLoginmodal,
//         toggleLoginModal,
//         logout: handleLogout,
//         calbackUrl,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }
