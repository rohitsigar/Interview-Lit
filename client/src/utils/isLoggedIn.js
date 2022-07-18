export const isLoggedIn = () => {
  if (localStorage.getItem('codex_token')) return true;
  return false;
};
