import useLocalStorage
from "./useLocalstorage";

import {
  FILE_SYSTEM,
} from "../Constants/Filesysystem";

export default function useFileSystem() {
  const [
    fileSystem,
    setFileSystem,
  ] = useLocalStorage(
    "webos-filesystem",
    FILE_SYSTEM
  );

  return [
    fileSystem,
    setFileSystem,
  ];
}