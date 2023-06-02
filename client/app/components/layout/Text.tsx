import { PortableText } from "@portabletext/react";
import { Image } from "./Image";

export function Text({ value }: { value: any[] | undefined | null }) {
  if (!value || !value.length) return null;
  return (
    <PortableText
      value={value}
      components={{
        types: {
          image: ({ value }) => <Image image={value} />,
        },
      }}
    />
  );
}
