import { Center, Spinner } from "native-base";

export const LoadingChildren = () => {
  return (
    <Center w="full" h={200} alignItems="center" justifyContent="center">
      <Spinner />
    </Center>
  );
};
