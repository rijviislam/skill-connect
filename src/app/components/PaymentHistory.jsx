"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function PaymentHistory() {
  const { data: session } = useSession();
  const [currUser, setCurrUser] = useState(null);
  const userEmail = session?.user?.email;
  // Fetch profiles from API by email
  const fetchUserByEmail = async () => {
    try {
      const response = await fetch(`/api/get-user?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setCurrUser(data);
      } else {
        console.error("Failed to fetch user:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchUserByEmail();
  }, [userEmail]);
  const paymentInfo = currUser?.paymentInfo?.paymentMethods;
  console.log("P", paymentInfo);
  return (
    <div>
      <h2 className="text-3xl">Payment History</h2>
      <Table
        removeWrapper
        aria-label="Example static collection table"
        className="my-10"
      >
        <TableHeader>
          <TableColumn className="bg-purple-300">PAYMENT METHOD</TableColumn>
          <TableColumn className="bg-purple-300">DATE</TableColumn>
          <TableColumn className="bg-purple-300">CURRENTCY</TableColumn>
          <TableColumn className="bg-purple-300">STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {paymentInfo?.map((info, idx) => (
            <TableRow key={idx}>
              <TableCell>{info?.payment_method}</TableCell>
              <TableCell>
                {info ? new Date(info.created * 1000).toLocaleString() : "N/A"}
              </TableCell>
              <TableCell>{info?.currency}</TableCell>
              <TableCell>{info?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
