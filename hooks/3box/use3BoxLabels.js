import useSWR from "swr";
import useSpace from "./useSpace";

const getLabels = (space) => async (key) => {
  return getSpacePrivate(space, { key });
};

export default function use3BoxLabels() {
  const { data: space } = useSpace();

  const shouldFetch = !!space;

  const { data, mutate } = useSWR(
    shouldFetch ? "labels" : null,
    getLabels(space)
  );

  const setLabel = async (address, label) => {
    const key = address.toLowerCase();

    await setSpacePrivate(space, {
      key: "labels",
      value: {
        ...data,
        [key]: label,
      },
    });

    await mutate({
      ...data,
      [key]: label,
    });
  };

  const getLabel = (address) => {
    const key = address.toLowerCase();
    if (data && data.hasOwnProperty(key)) return data[key];
    return undefined;
  };

  return { data, getLabel, setLabel };
}

export async function setSpacePrivate(space, { key, value }) {
  if (typeof value !== "string") value = JSON.stringify(value);

  await space.private.set(key, value);
}

export async function getSpacePrivate(space, { key }) {
  let result = await space.private.get(key);
  try {
    result = JSON.parse(result);
  } catch (error) {
    // ignore error
  }

  return result;
}

export async function removeSpacePrivate(space, { key }) {
  await space.private.remove(key);
}
