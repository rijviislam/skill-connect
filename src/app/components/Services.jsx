"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "./SearchIcon";

export default function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const { isOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(100); // Default to 100
  const [loading, setLoading] = useState(true);

  // Fetch services from the backend
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/services?search=${searchTerm}`);
      const data = await response.json();
      setServices(data);
      setFilteredServices(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle changes to the search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle changes to the price range slider
  const handlePriceRange = (newVal) => {
    setPriceRange(newVal);
  };

  // Apply filtering on the services based on price range

  useEffect(() => {
    if (priceRange !== 100) {
      const filtered = services.filter(
        (product) => product.price <= priceRange
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services);
    }
  }, [priceRange, services]);
  //   AND THIS FILTERING IS NOW WORKING PERFECTLY NEED TO IMPROVE IT AFTER THIS WEEK //
  console.log(filteredServices);
  useEffect(() => {
    fetchServices();
  }, [searchTerm]);

  return (
    <div>
      <h2 className="text-4xl font-medium">Services</h2>
      {/* SEARCH AND FILTER  */}
      <div className="flex justify-between items-end mt-10 ">
        <div className="lg:w-[400px] mt-5 ">
          <Input
            isClearable
            radius="lg"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>

        {/* FILTER */}
        <Slider
          key="success"
          showTooltip={true}
          color="success"
          step={50}
          maxValue={5000}
          minValue={100}
          defaultValue={100}
          value={priceRange}
          onChange={handlePriceRange}
          aria-label="Number"
          className="w-[250px]"
        />
      </div>
      {/* GRID  */}
      {loading ? (
        <div className="flex justify-center my-10">
          <Spinner size="lg" color="success" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:my-10 md:my-5 my-5 place-items-center gap-5">
          {filteredServices?.map((profile, idx) => (
            <Card className="py-4" key={idx}>
              <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
                <div className="mt-3">
                  <h4 className="text-sm">{profile.name}</h4>
                  <h5 className="text-sm font-semibold">{profile.title}</h5>
                </div>
              </CardBody>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
                <small>
                  <strong>Delivery Time:</strong> {profile.deliveryTime}
                </small>
                <small>
                  <strong>Price:</strong> {profile.price}
                </small>
                <p className="text-xs">{profile.description}</p>
                <small className="text-xs flex items-center">
                  <strong>Skills:</strong>
                  <div className="pl-1 flex gap-1">
                    {profile?.tags?.map((skill, index) => (
                      <p key={index} className="text-xs">
                        {skill}
                      </p>
                    ))}
                  </div>
                </small>
                <div className="mt-5 w-full">
                  <Button
                    size="md"
                    onPress={() => onOpenChange(true)}
                    className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
                  >
                    View
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* MODAL */}
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary">Hire</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
