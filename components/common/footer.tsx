import React from "react";
import MyImage from "../../public/Niraj.jpg";
import Link from "next/link";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className=" py-12 ">
      <div className="flex justify-between items-center px-8">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-gray-300 m-2 flex justify-center items-center">
            <img
              src="../../Niraj.jpg"
              alt="My Image"
              className="rounded-full w-14 h-14 object-cover"
            />
          </div>
          <div className="text-base font-medium text-gray-500">
            Made with Niraj❤️
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="text-base font-semibold ">Social Links</div>
          <div className="flex flex-col gap-y-2.5">
            <Link href="https://www.linkedin.com/in/nirajkumarwk/" passHref>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:underline hover:text-rose-500"
              >
                LinkedIn
              </a>
            </Link>
            <Link href="https://github.com/nirajkumarwk" passHref>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:underline hover:text-rose-500"
              >
                Github
              </a>
            </Link>
            <Link href="https://www.behance.net/neerajkumar192" passHref>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:underline hover:text-rose-500"
              >
                Design Portfolio
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
