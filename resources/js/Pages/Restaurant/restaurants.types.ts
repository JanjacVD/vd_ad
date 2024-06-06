export type Restaurant = {};
export type Tag = {};

export type Address = {
    place_id: string;
    formatted_address: string;
    lat: number;
    lng: number;
};

export type RestaurantForm = {
    name: string;
    address?: Address;
    worktime: WorktimeSchedule;
    img: File | null;
};

export type Worktime = {
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
