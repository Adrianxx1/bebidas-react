import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useAppStore } from "../stores/useAppStore";
import { useEffect } from "react";
import Notification from "../components/Notifications";

export default function Layout() {
  const loadFavorites = useAppStore((state) => state.loadFavorites);
  useEffect(() => {
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      <main className="container mx-auto py-16 bg-white">
        <Outlet />
      </main>
      <Modal />
      <Notification />
    </>
  );
}
