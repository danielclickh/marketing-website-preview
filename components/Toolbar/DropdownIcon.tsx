import React from "react";
import Image from 'next/image'
const imagePrefix =
  process.env.NODE_ENV === "development" ? "" : "https://clickhouse.com/learn";

function DropdownIcon(props: any) {
  return (
    <Image
      alt='image'
      src={`${imagePrefix}/icon-down-caret.svg`}
      width={10}
      height={6}
    />
  );
}

export default DropdownIcon;
