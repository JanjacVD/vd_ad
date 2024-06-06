import { Address } from "@/Pages/Restaurant/restaurants.types";
import { Loader } from "@googlemaps/js-api-loader";
import { useState } from "react";
const useFetchLocation = () => {
    const [isLoading, setIsLoading] = useState(false);
    const fetchLocation = async (
        address: string,
        ref: React.RefObject<HTMLDivElement>,
        setData: (value: Address) => void
    ) => {
        setIsLoading(true);
        const apiKey = import.meta.env.VITE_MAPS_API_KEY;
        const loader = new Loader({ apiKey, region: "HR", version: "weekly" });

        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        await geocoder.geocode(
            { address, region: "HR" },
            (results: any, status: any) => {
                setIsLoading(false);
                if (status === "OK") {
                    const mapOptions = {
                        center: results[0].geometry.location,
                        zoom: 17,
                    };
                    const map = new google.maps.Map(
                        ref.current as Element,
                        mapOptions
                    );
                    console.log(map);
                    new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        title: results[0].formatted_address,
                    });
                    setData({
                        place_id: results[0].place_id,
                        formatted_address: results[0].formatted_address,
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    });
                } else {
                    throw new Error("No address found");
                }
            }
        );
    };
    return {
        isLoading,
        fetchLocation,
    };
};
export default useFetchLocation;
