import Center from "./layouts/Center";
import Cover from "./layouts/Cover";

export default function LoadingIndicator() {
  return (
    <Center>
      <Cover className="text:center">
        <strong aria-busy="true" role="alert">
          Loading...
        </strong>
      </Cover>
    </Center>
  );
};