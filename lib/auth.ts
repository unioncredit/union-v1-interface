export async function login() {
  try {
    await window?.cookieStore?.set("eager_connect", "true");
  } catch (err) {
    console.error(err);
  }
}

export async function logout() {
  try {
    await window?.cookieStore?.delete("eager_connect");
  } catch (err) {
    console.error(err);
  }
}
