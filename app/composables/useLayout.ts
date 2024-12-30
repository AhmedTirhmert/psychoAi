export default function useLayout() {
  const isSideBarPinned = useCookie('sidebarPinned', {
    default: () => false,
  });

  const toggleSideBar = useToggle(isSideBarPinned);

  return { isSideBarPinned, toggleSideBar };
}
