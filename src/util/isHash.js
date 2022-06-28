export default function isHash(string) {
  return new RegExp(/^0x([A-Fa-f0-9]{64})$/).test(string);
}
