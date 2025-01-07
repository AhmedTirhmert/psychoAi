export default function useLayout() {
  const isSideBarPinned = useCookie('sidebarPinned', {
    default: () => false,
  });
  const { width: ScreebWidth } = useWindowSize({ type: 'inner' });
  const toggleSideBar = useToggle(isSideBarPinned);
  const hideSideBar = () => (isSideBarPinned.value = false);
  const isMobile = computed(() => ScreebWidth.value <= 1024);
  return { isSideBarPinned, toggleSideBar, hideSideBar, isMobile };
}
