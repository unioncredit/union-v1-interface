export async function fetchENS(address) {
  // https://twitter.com/frolic <- what a legend
  const apiUrl = "https://api.ensideas.com/ens/resolve/";

  try {
    const resp = await fetch(apiUrl + address);
    const json = await resp.json();

    return json;
  } catch (_) {
    return false;
  }
}
