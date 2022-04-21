export async function fetchENS(address) {
  const apiUrl = "https://api.ensideas.com/ens/resolve/";

  try {
    const resp = await fetch(apiUrl + address);
    const json = await resp.json();

    return json;
  } catch (_) {
    return false;
  }
}
