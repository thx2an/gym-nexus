import Image from "next/image";

export default function Avatar({ src, size = 40 }) {
  return (
    <Image
      src={src || "/uploads/gymlogo.png"}
      alt="avatar"
      width={size}
      height={size}
      className="rounded-full border border-borderColor-light"
    />
  );
}
