import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

interface Props {
  title?: string;
  text?: string;
}

const ErrorMessage = (props: Props) => (
  <Alert status="error">
    <AlertIcon />
    <AlertTitle>{props.title ?? "Something went wrong"}</AlertTitle>
    <AlertDescription>
      {props.text ?? "Something unexpected happened"}
    </AlertDescription>
  </Alert>
);

export default ErrorMessage;
