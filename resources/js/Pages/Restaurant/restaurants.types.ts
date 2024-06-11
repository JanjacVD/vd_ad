export type Restaurant = {
    id: string;
    name: string;
    img: string;
    confirmed: boolean;
    address: Address;
    is_open: boolean;
    is_accepting_deliveries: boolean;
    delivery_fee: number;
    work_days: WorktimeSchedule;
    tags: Tag[];
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
    day: number;
    isWorking: boolean;
    from: string;
    to: string;
};
export type WorktimeSchedule = {
    0?: Worktime;
    1?: Worktime;
    2?: Worktime;
    3?: Worktime;
    4?: Worktime;
    5?: Worktime;
    6?: Worktime;
};
