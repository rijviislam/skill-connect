import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Link,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

export default function FreelancerProfilePage() {
  return (
    <div className="mx-10">
      <h2 className="text-4xl font-bold bg-gradient-to-l from-[#90EE90] to-[#2E8B57] bg-clip-text text-transparent text-center">
        Freelancer Profile Page
      </h2>
      {/* SEARCH BAR  */}
      <div className="lg:w-[400px] mt-5">
        <Input
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      {/* GRID CARD  */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:my-10 md:my-5 my-5 place-items-center gap-5">
        <Card className="py-4 ">
          <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
            <Image
              alt="Card background"
              className="object-cover w-[100px] h-[100px] rounded-full"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={270}
            />
            <div className="mt-3">
              <h4 className="text-sm">Rijvi Islam</h4>
              <h5 className="text-sm font-semibold">Full Stack Developer</h5>
              {/* WHEN THE USER CLICKS ON THE PORTFOLIO, IT OPENS IN A NEW TAB AND REDIRECTS THEM DIRECTLY TO THE PORTFOLIO PAGE. */}
              <Link href="#" className="text-sm font-semibold cursor-pointer">
                Portfolio
              </Link>
            </div>
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
            <small>
              {" "}
              <strong>Location:</strong> Dhaka Bangladesh
            </small>
            <small>
              <strong>Availability:</strong> vailable for hire
            </small>
            <p className="text-xs">
              A Full Stack Developer builds both frontend and backend of web
              applications, handling user interfaces, server logic, databases,
              and API integrations, ensuring the whole system works smoothly.
            </p>
            <small className="text-xs">
              {" "}
              <strong>Skills and Expertise:</strong> HTML, CSS, JavaScript,
              React
            </small>
            <div className="mt-5 w-full ">
              <Button
                size="md"
                className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
              >
                Details
              </Button>
            </div>
          </CardHeader>
        </Card>
        <Card className="py-4 ">
          <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
            <Image
              alt="Card background"
              className="object-cover w-[100px] h-[100px] rounded-full"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={270}
            />
            <div className="mt-3">
              <h4 className="text-sm">Rijvi Islam</h4>
              <h5 className="text-sm font-semibold">Full Stack Developer</h5>
              {/* WHEN THE USER CLICKS ON THE PORTFOLIO, IT OPENS IN A NEW TAB AND REDIRECTS THEM DIRECTLY TO THE PORTFOLIO PAGE. */}
              <Link href="#" className="text-sm font-semibold cursor-pointer">
                Portfolio
              </Link>
            </div>
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
            <small>
              {" "}
              <strong>Location:</strong> Dhaka Bangladesh
            </small>
            <small>
              <strong>Availability:</strong> vailable for hire
            </small>
            <p className="text-xs">
              A Full Stack Developer builds both frontend and backend of web
              applications, handling user interfaces, server logic, databases,
              and API integrations, ensuring the whole system works smoothly.
            </p>
            <small className="text-xs">
              {" "}
              <strong>Skills and Expertise:</strong> HTML, CSS, JavaScript,
              React
            </small>
            <div className="mt-5 flex items-end w-full justify-end">
              <Button
                size="md"
                className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
              >
                Details
              </Button>
            </div>
          </CardHeader>
        </Card>
        <Card className="py-4 ">
          <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
            <Image
              alt="Card background"
              className="object-cover w-[100px] h-[100px] rounded-full"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={270}
            />
            <div className="mt-3">
              <h4 className="text-sm">Rijvi Islam</h4>
              <h5 className="text-sm font-semibold">Full Stack Developer</h5>
              {/* WHEN THE USER CLICKS ON THE PORTFOLIO, IT OPENS IN A NEW TAB AND REDIRECTS THEM DIRECTLY TO THE PORTFOLIO PAGE. */}
              <Link href="#" className="text-sm font-semibold cursor-pointer">
                Portfolio
              </Link>
            </div>
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
            <small>
              {" "}
              <strong>Location:</strong> Dhaka Bangladesh
            </small>
            <small>
              <strong>Availability:</strong> vailable for hire
            </small>
            <p className="text-xs">
              A Full Stack Developer builds both frontend and backend of web
              applications, handling user interfaces, server logic, databases,
              and API integrations, ensuring the whole system works smoothly.
            </p>
            <small className="text-xs">
              {" "}
              <strong>Skills and Expertise:</strong> HTML, CSS, JavaScript,
              React
            </small>
            <div className="mt-5 flex items-end w-full justify-end">
              <Button
                size="md"
                className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
              >
                Details
              </Button>
            </div>
          </CardHeader>
        </Card>
        <Card className="py-4 ">
          <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
            <Image
              alt="Card background"
              className="object-cover w-[100px] h-[100px] rounded-full"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={270}
            />
            <div className="mt-3">
              <h4 className="text-sm">Rijvi Islam</h4>
              <h5 className="text-sm font-semibold">Full Stack Developer</h5>
              {/* WHEN THE USER CLICKS ON THE PORTFOLIO, IT OPENS IN A NEW TAB AND REDIRECTS THEM DIRECTLY TO THE PORTFOLIO PAGE. */}
              <Link href="#" className="text-sm font-semibold cursor-pointer">
                Portfolio
              </Link>
            </div>
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
            <small>
              {" "}
              <strong>Location:</strong> Dhaka Bangladesh
            </small>
            <small>
              <strong>Availability:</strong> vailable for hire
            </small>
            <p className="text-xs">
              A Full Stack Developer builds both frontend and backend of web
              applications, handling user interfaces, server logic, databases,
              and API integrations, ensuring the whole system works smoothly.
            </p>
            <small className="text-xs">
              {" "}
              <strong>Skills and Expertise:</strong> HTML, CSS, JavaScript,
              React
            </small>
            <div className="mt-5 flex items-end w-full justify-end">
              <Button
                size="md"
                className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
              >
                Details
              </Button>
            </div>
          </CardHeader>
        </Card>
        <Card className="py-4 ">
          <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
            <Image
              alt="Card background"
              className="object-cover w-[100px] h-[100px] rounded-full"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={270}
            />
            <div className="mt-3">
              <h4 className="text-sm">Rijvi Islam</h4>
              <h5 className="text-sm font-semibold">Full Stack Developer</h5>
              {/* WHEN THE USER CLICKS ON THE PORTFOLIO, IT OPENS IN A NEW TAB AND REDIRECTS THEM DIRECTLY TO THE PORTFOLIO PAGE. */}
              <Link href="#" className="text-sm font-semibold cursor-pointer">
                Portfolio
              </Link>
            </div>
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
            <small>
              {" "}
              <strong>Location:</strong> Dhaka Bangladesh
            </small>
            <small>
              <strong>Availability:</strong> vailable for hire
            </small>
            <p className="text-xs">
              A Full Stack Developer builds both frontend and backend of web
              applications, handling user interfaces, server logic, databases,
              and API integrations, ensuring the whole system works smoothly.
            </p>
            <small className="text-xs">
              {" "}
              <strong>Skills and Expertise:</strong> HTML, CSS, JavaScript,
              React
            </small>
            <div className="mt-5 flex items-end w-full justify-end">
              <Button
                size="md"
                className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
              >
                Details
              </Button>
            </div>
          </CardHeader>
        </Card>
        <Card className="py-4 ">
          <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
            <Image
              alt="Card background"
              className="object-cover w-[100px] h-[100px] rounded-full"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={270}
            />
            <div className="mt-3">
              <h4 className="text-sm">Rijvi Islam</h4>
              <h5 className="text-sm font-semibold">Full Stack Developer</h5>
              {/* WHEN THE USER CLICKS ON THE PORTFOLIO, IT OPENS IN A NEW TAB AND REDIRECTS THEM DIRECTLY TO THE PORTFOLIO PAGE. */}
              <Link href="#" className="text-sm font-semibold cursor-pointer">
                Portfolio
              </Link>
            </div>
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
            <small>
              {" "}
              <strong>Location:</strong> Dhaka Bangladesh
            </small>
            <small>
              <strong>Availability:</strong> vailable for hire
            </small>
            <p className="text-xs">
              A Full Stack Developer builds both frontend and backend of web
              applications, handling user interfaces, server logic, databases,
              and API integrations, ensuring the whole system works smoothly.
            </p>
            <small className="text-xs">
              {" "}
              <strong>Skills and Expertise:</strong> HTML, CSS, JavaScript,
              React
            </small>
            <div className="mt-5 flex items-end w-full justify-end">
              <Button
                size="md"
                className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
              >
                Details
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
      {/* MODAL  */}
    </div>
  );
}
