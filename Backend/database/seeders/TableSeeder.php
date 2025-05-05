<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Table;

class TableSeeder extends Seeder
{
    public function run(): void
    {
        $tables = [
            ['table_number' => 'T1', 'capacity' => 2],
            ['table_number' => 'T2', 'capacity' => 4],
            ['table_number' => 'T3', 'capacity' => 2],
            ['table_number' => 'T4', 'capacity' => 6],
            ['table_number' => 'T5', 'capacity' => 4],
        ];

        foreach ($tables as $table) {
            Table::create($table);
        }
    }
}
