import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PopUp = ({ title, description, user, page }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  
  // Get backend URL from environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  // Construct the destination URL
  const destinationUrl = `${backendUrl}/api/v1/${user}/${page}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      navigate(`/${page}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [destinationUrl, navigate]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            setOpen(false);
            navigate(destinationUrl);
          }}>
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopUp;
