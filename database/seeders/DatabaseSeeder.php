<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Restaurant;
use App\Models\Tag;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    public function run(): void
    {
        // $tags = array(
        //     array('id' => '1', 'created_at' => '2024-06-12 00:45:36', 'updated_at' => '2024-06-12 00:45:36', 'name' => '{"en":"accusantium"}', 'img' => ''),
        //     array('id' => '2', 'created_at' => '2024-06-12 00:45:36', 'updated_at' => '2024-06-12 00:45:36', 'name' => '{"en":"quidem"}', 'img' => ''),
        //     array('id' => '3', 'created_at' => '2024-06-12 00:45:36', 'updated_at' => '2024-06-12 00:45:36', 'name' => '{"en":"mollitia"}', 'img' => ''),
        //     array('id' => '4', 'created_at' => '2024-06-12 00:45:36', 'updated_at' => '2024-06-12 00:45:36', 'name' => '{"en":"omnis"}', 'img' => ''),
        //     array('id' => '5', 'created_at' => '2024-06-12 00:45:36', 'updated_at' => '2024-06-12 00:45:36', 'name' => '{"en":"autem"}', 'img' => '')
        // );
        // $addresses = array(
        //     array('id' => '1', 'created_at' => '2024-06-12 00:46:03', 'updated_at' => '2024-06-12 00:46:03', 'user_id' => NULL, 'place_id' => 'ChIJI2RUQfvXNBMRvQ80nv4Fyd0', 'formatted_address' => 'Ul. Kamila Pamukovića 96, 22211, Vodice, Croatia', 'lat' => '43.7596079', 'lng' => '15.7751186', 'is_primary' => '0')
        // );
        // $restaurants = array(
        //     array('id' => '1', 'contact' => "+385957533130", 'created_at' => '2024-06-12 00:46:03', 'updated_at' => '2024-06-12 00:46:03', 'name' => 'vdad', 'img' => 'jJj0v0DwOJVxyuFdDIb9fxLmydAI05m3rdyHbLX5.png', 'user_id' => '1', 'address_id' => '1', 'is_open' => '0', 'confirmed' => '0', 'is_accepting_deliveries' => '0', 'delivery_fee' => "1", 'work_days' => '{"mon":{"from":"04:47","to":"05:49"},"tue":{"from":"04:47","to":"05:49"},"wed":{"from":"04:47","to":"05:49"},"thu":{"from":"04:47","to":"05:49"},"fri":null,"sat":null,"sun":null}')
        // );
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Valentino Janjac',
        //     'email' => 'valentino.janjac@gmail.com',
        //     'phone' => '+385957533130'
        // ]);

        // foreach ($tags as $tag) {
        //     Tag::create($tag);
        // }
        // foreach ($addresses as $tag) {
        //     Address::create($tag);
        // }
        // foreach ($restaurants as $tag) {
        //     Restaurant::create($tag);
        // }
    }
}
