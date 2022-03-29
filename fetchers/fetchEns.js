export async function fetchENS(address) {
  const apiUrl = "/api/ens/";

  try {
    const resp = await fetch(apiUrl + address);
    const json = await resp.json();

    return json;
  } catch (_) {
    return false;
  }
}
