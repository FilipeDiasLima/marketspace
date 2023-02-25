import {
  TextArea as NativeBaseTextArea,
  ITextAreaProps,
  FormControl,
} from "native-base";

type Props = ITextAreaProps & {
  error?: string | null;
};

export const TextArea = ({ error = null, ...rest }: Props) => {
  return (
    <FormControl isInvalid={!!error}>
      <NativeBaseTextArea
        autoCompleteType={false}
        bg="gray.700"
        rounded="lg"
        py={4}
        px={4}
        borderWidth={0}
        fontSize="md"
        isInvalid={!!error}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        fontFamily="body"
        placeholderTextColor="gray.400"
        _focus={{
          borderWidth: 2,
          borderColor: "gray.300",
          bg: "gray.700",
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
