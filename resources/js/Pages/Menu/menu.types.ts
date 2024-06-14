import { Translatable } from "@/types/common.types";
import { Restaurant } from "../Restaurant/restaurants.types";

type Form<T> = Omit<T, "id" | "order" | "img"> & {
    img: File | null;
};
export type Category = {
    id: number;
    name: Translatable;
    order: number;
    img: string;
};

export type RestaurantWithCategory = Restaurant & { categories: Category[] };

export type CategoryForm = Form<Category>;

export type Item = {
    id: number;
    name: Translatable;
    img: string;
    order: number;
    price: number;
    description: Translatable;
};

export type ItemForm = Form<Item>;

export type CategoryWithItems = Category & { items: Item[] };
