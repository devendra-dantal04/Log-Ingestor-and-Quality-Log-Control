import React from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

function RequestToolbar() {
  const { toast } = useToast();
  const api1Request = async (type = "") => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/api1/login?type=${type}`;

      const res = await fetch(url, {
        method: "POST",
      });

      toast({
        title: "Request to API 1",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const api2Request = async (username = "") => {
    try {
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/api2/repos?username=${username}`;

      const res = await fetch(url);

      toast({
        title: "Request to API 2",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const api3Request = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/api3/price`;

      const res = await fetch(url);
      toast({
        title: "Request to API 3",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-between mb-2 gap-2">
      <Button className="text-sm" size="sm" onClick={() => api1Request()}>
        Request to API 1
      </Button>
      <Button
        className="text-sm"
        size="sm"
        onClick={() => api1Request("unsuccessful")}
      >
        Request to API 1 (unsuccessful)
      </Button>
      <Button
        className="text-sm"
        size="sm"
        onClick={() => api2Request("devendra-dantal04")}
      >
        Request to API 2 (success)
      </Button>
      <Button
        className="text-sm"
        size="sm"
        onClick={() => api2Request("devendra-dantal0")}
      >
        Request to API 2 (unsuccessful)
      </Button>
      <Button className="text-sm" size="sm" onClick={() => api3Request()}>
        Request to API 3
      </Button>
    </div>
  );
}

export default RequestToolbar;
