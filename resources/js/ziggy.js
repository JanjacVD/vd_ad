const Ziggy = {
    url: "http://localhost:8000",
    port: 8000,
    defaults: {},
    routes: {
        "swagger.json": {
            uri: "swagger/documentation/json",
            methods: ["GET", "HEAD"],
        },
        "sanctum.csrf-cookie": {
            uri: "sanctum/csrf-cookie",
            methods: ["GET", "HEAD"],
        },
        dashboard: { uri: "dashboard", methods: ["GET", "HEAD"] },
        "employees.acceptInvite": { uri: "invite", methods: ["GET", "HEAD"] },
        "employees.index": {
            uri: "my-restaurants/{restaurant}/employees",
            methods: ["GET", "HEAD"],
            parameters: ["restaurant"],
        },
        "employees.update": {
            uri: "my-restaurants/{restaurant}/employees/{employee}",
            methods: ["PUT", "PATCH"],
            parameters: ["restaurant", "employee"],
        },
        "employees.destroy": {
            uri: "my-restaurants/{restaurant}/employees/{employee}",
            methods: ["DELETE"],
            parameters: ["restaurant", "employee"],
        },
        "my-restaurants.index": {
            uri: "my-restaurants",
            methods: ["GET", "HEAD"],
        },
        "my-restaurants.create": {
            uri: "my-restaurants/create",
            methods: ["GET", "HEAD"],
        },
        "my-restaurants.store": { uri: "my-restaurants", methods: ["POST"] },
        "my-restaurants.show": {
            uri: "my-restaurants/{my_restaurant}",
            methods: ["GET", "HEAD"],
            parameters: ["my_restaurant"],
        },
        "my-restaurants.edit": {
            uri: "my-restaurants/{my_restaurant}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["my_restaurant"],
        },
        "my-restaurants.destroy": {
            uri: "my-restaurants/{my_restaurant}",
            methods: ["DELETE"],
            parameters: ["my_restaurant"],
        },
        "categories.index": {
            uri: "my-restaurants/{restaurant}/categories",
            methods: ["GET", "HEAD"],
            parameters: ["restaurant"],
        },
        "categories.create": {
            uri: "my-restaurants/{restaurant}/categories/create",
            methods: ["GET", "HEAD"],
            parameters: ["restaurant"],
        },
        "categories.store": {
            uri: "my-restaurants/{restaurant}/categories",
            methods: ["POST"],
            parameters: ["restaurant"],
        },
        "categories.show": {
            uri: "my-restaurants/{restaurant}/categories/{category}",
            methods: ["GET", "HEAD"],
            parameters: ["restaurant", "category"],
        },
        "categories.edit": {
            uri: "my-restaurants/{restaurant}/categories/{category}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["restaurant", "category"],
        },
        "categories.destroy": {
            uri: "my-restaurants/{restaurant}/categories/{category}",
            methods: ["DELETE"],
            parameters: ["restaurant", "category"],
        },
        "my-restaurants.update": {
            uri: "my-restaurants/{restaurant}",
            methods: ["POST"],
            parameters: ["restaurant"],
        },
        "employees.sendInvite": {
            uri: "my-restaurants/{restaurant}/employees",
            methods: ["POST"],
            parameters: ["restaurant"],
        },
        "categories.update": {
            uri: "my-restaurants/{restaurant}/categories/{category}",
            methods: ["POST"],
            parameters: ["restaurant", "category"],
        },
        "items.index": {
            uri: "{category}/items",
            methods: ["GET", "HEAD"],
            parameters: ["category"],
        },
        "items.create": {
            uri: "{category}/items/create",
            methods: ["GET", "HEAD"],
            parameters: ["category"],
        },
        "items.store": {
            uri: "{category}/items",
            methods: ["POST"],
            parameters: ["category"],
        },
        "items.show": {
            uri: "{category}/items/{item}",
            methods: ["GET", "HEAD"],
            parameters: ["category", "item"],
        },
        "items.edit": {
            uri: "{category}/items/{item}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["category", "item"],
        },
        "items.update": {
            uri: "items/{item}",
            methods: ["POST"],
            parameters: ["item"],
        },
        "items.destroy": {
            uri: "items/{item}/delete",
            methods: ["DELETE"],
            parameters: ["item"],
        },
        "tags.update": {
            uri: "tags/{tag}",
            methods: ["POST"],
            parameters: ["tag"],
        },
        "tags.index": { uri: "tags", methods: ["GET", "HEAD"] },
        "tags.create": { uri: "tags/create", methods: ["GET", "HEAD"] },
        "tags.store": { uri: "tags", methods: ["POST"] },
        "tags.show": {
            uri: "tags/{tag}",
            methods: ["GET", "HEAD"],
            parameters: ["tag"],
            bindings: { tag: "id" },
        },
        "tags.edit": {
            uri: "tags/{tag}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["tag"],
        },
        "tags.destroy": {
            uri: "tags/{tag}",
            methods: ["DELETE"],
            parameters: ["tag"],
        },
        "restaurants.index": { uri: "restaurants", methods: ["GET", "HEAD"] },
        "restaurants.create": {
            uri: "restaurants/create",
            methods: ["GET", "HEAD"],
        },
        "restaurants.store": { uri: "restaurants", methods: ["POST"] },
        "restaurants.show": {
            uri: "restaurants/{restaurant}",
            methods: ["GET", "HEAD"],
            parameters: ["restaurant"],
        },
        "restaurants.edit": {
            uri: "restaurants/{restaurant}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["restaurant"],
        },
        "restaurants.update": {
            uri: "restaurants/{restaurant}",
            methods: ["PUT", "PATCH"],
            parameters: ["restaurant"],
        },
        "restaurants.destroy": {
            uri: "restaurants/{restaurant}",
            methods: ["DELETE"],
            parameters: ["restaurant"],
        },
        "users.index": { uri: "users", methods: ["GET", "HEAD"] },
        "users.create": { uri: "users/create", methods: ["GET", "HEAD"] },
        "users.store": { uri: "users", methods: ["POST"] },
        "users.show": {
            uri: "users/{user}",
            methods: ["GET", "HEAD"],
            parameters: ["user"],
        },
        "users.edit": {
            uri: "users/{user}/edit",
            methods: ["GET", "HEAD"],
            parameters: ["user"],
        },
        "users.update": {
            uri: "users/{user}",
            methods: ["PUT", "PATCH"],
            parameters: ["user"],
        },
        "users.destroy": {
            uri: "users/{user}",
            methods: ["DELETE"],
            parameters: ["user"],
        },
        "profile.edit": { uri: "profile", methods: ["GET", "HEAD"] },
        "profile.update": { uri: "profile", methods: ["PATCH"] },
        "profile.destroy": { uri: "profile", methods: ["DELETE"] },
        register: { uri: "register", methods: ["GET", "HEAD"] },
        login: { uri: "login", methods: ["GET", "HEAD"] },
        "password.request": {
            uri: "forgot-password",
            methods: ["GET", "HEAD"],
        },
        "password.email": { uri: "forgot-password", methods: ["POST"] },
        "password.reset": {
            uri: "reset-password/{token}",
            methods: ["GET", "HEAD"],
            parameters: ["token"],
        },
        "password.store": { uri: "reset-password", methods: ["POST"] },
        "verification.notice": {
            uri: "verify-email",
            methods: ["GET", "HEAD"],
        },
        "verification.verify": {
            uri: "verify-email/{id}/{hash}",
            methods: ["GET", "HEAD"],
            parameters: ["id", "hash"],
        },
        "verification.send": {
            uri: "email/verification-notification",
            methods: ["POST"],
        },
        "password.confirm": {
            uri: "confirm-password",
            methods: ["GET", "HEAD"],
        },
        "password.update": { uri: "password", methods: ["PUT"] },
        logout: { uri: "logout", methods: ["POST"] },
    },
};
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
