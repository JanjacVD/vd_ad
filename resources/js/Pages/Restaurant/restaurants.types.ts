import { User } from "@/types";

export type Restaurant = {
    id: number;
    name: string;
    img: string;
    confirmed: boolean;
    address: Address;
    is_open: boolean;
    is_accepting_deliveries: boolean;
    delivery_fee: boolean;
    work_days: WorktimeSchedule;
    tags: Tag[];
    employees: User[];
};
export type Tag = {
    id: number;
    img: string;
    name: string;
};

export type Address = {
    place_id: string;
    formatted_address: string;
    lat: number;
    lng: number;
};

export type RestaurantForm = {
    name: string;
    address?: Address;
    work_days: WorktimeSchedule;
    img: File | null;
    tags: number[];
};

export type Worktime = {
    from: string;
    to: string;
};
export type WorktimeSchedule = {
    mon?: Worktime | null;
    tue?: Worktime | null;
    wed?: Worktime | null;
    thu?: Worktime | null;
    fri?: Worktime | null;
    sat?: Worktime | null;
    sun?: Worktime | null;
};
