import Image from "next/image";
import Link from "next/link";

const imagePrefix = process.env.NODE_ENV === 'development' ? '' : 'https://clickhouse.com/learn'

export function Footer() {
  return (
    <div className="flex bg-light-purple1 py-8 px-4 md:px-0 text-white">
      <div className="container mx-auto md:flex justify-between max-w-7xl px-8 2xl:px-0 ">
        <div className="flex flex-col md:w-8/12 md:border-r border-light-purple3">
          <div className="sitemap md:flex pt-4">
            <div className="flex flex-col md:w-4/12 pb-6 md:pb-0">
              <h5>Product</h5>
              <br />
              <div className="flex flex-row md:flex-col space-x-4 md:space-x-0">
                <Link
                  href="https://clickhouse.com/clickhouse/"
                  className="text-white font-normal"
                >
                  ClickHouse
                </Link>
                <Link
                  href="https://clickhouse.com/clickhouse-cloud/"
                  className="text-white font-normal"
                >
                  ClickHouse Cloud
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:w-4/12 pb-6 md:pb-0">
              <h5>Resources</h5>
              <br />
              <div className="flex flex-row md:flex-col gap-4 md:gap-0 flex-wrap">
                <Link
                  href="https://clickhouse.com/docs/"
                  className="text-white font-normal"
                >
                  Documentation
                </Link>
                <Link
                  href="https://clickhouse.com/learn/"
                  className="text-white font-normal"
                >
                  Training
                </Link>
                <Link
                  href="https://support.clickhouse.com/s/"
                  className="text-white font-normal"
                >
                  Support
                </Link>
                <Link href="#" className="text-white font-normal">
                  Comparison
                </Link>
                <Link
                  href="https://clickhouse.com/customer-stories"
                  className="text-white font-normal"
                >
                  Use cases
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:w-4/12 pb-6 md:pb-0">
              <h5>Company</h5>
              <br />
              <div className="flex w-full flex-row md:flex-col gap-4 md:gap-0 flex-wrap">
                <Link
                  href="https://clickhouse.com/blog/"
                  className="text-white font-normal"
                >
                  Blog
                </Link>
                <Link
                  href="https://clickhouse.com/company/our-story/"
                  className="text-white font-normal"
                >
                  Our story
                </Link>
                <Link
                  href="https://clickhouse.com/company/careers/"
                  className="text-white font-normal"
                >
                  Careers
                </Link>
                <Link
                  href="https://clickhouse.com/company/contact/"
                  className="text-white font-normal"
                >
                  Contact us
                </Link>
                <Link
                  href="https://clickhouse.com/company/news-events/"
                  color="white"
                  className="text-white font-normal"
                >
                  News and events
                </Link>
              </div>
            </div>
          </div>
          <div className="flex pt-12">
            <div className="md:w-64 mr-4">
              <Image
                src={`${imagePrefix}/logo.svg`}
                alt="CH Logo"
                width={30}
                height={30}
              />
            </div>
            <div className="px-4 self-end">
              <p>
                ClickHouse source code is published under the Apache 2.0
                License. Software is distributed on an &ldquo;AS IS&ldquo;
                BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
                express or implied.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col md:w-4/12 pl-12">
          <h4>Subscribe to our newsletter</h4>
          <p>
            Stay informed on feature releases, product roadmap, future support,
            and cloud offerings!
          </p>
          <div className="flex align-middle items-center space-x-2">
            <div className="mt-1">
              <Link href="#">Sign up</Link>
            </div>
          </div>

          <div className="flex flex-col pt-2">
            <p>Join the ClickHouse conversation on </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#">
                <div className="bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1">
                  <Image
                    src={`${imagePrefix}/icon-github.svg`}
                    className="hover:cursor-pointer hover:animate-pulse"
                    alt="CH Logo"
                    width={21}
                    height={20}
                  />
                </div>
              </Link>

              <Link href="#">
                <div className="bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1">
                  <Image
                    src={`${imagePrefix}/icon-slack.svg`}
                    className="hover:cursor-pointer hover:animate-pulse"
                    alt="CH Logo"
                    width={21}
                    height={20}
                  />
                </div>
              </Link>

              <Link href="#">
                <div className="bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1">
                  <Image
                    src={`${imagePrefix}/icon-telegram.svg`}
                    className="hover:cursor-pointer hover:animate-pulse"
                    alt="CH Logo"
                    width={21}
                    height={20}
                  />
                </div>
              </Link>

              <Link href="#">
                <div className="bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1">
                  <Image
                    src={`${imagePrefix}/icon-twitter.svg`}
                    className="hover:cursor-pointer hover:animate-pulse"
                    alt="CH Logo"
                    width={21}
                    height={20}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
