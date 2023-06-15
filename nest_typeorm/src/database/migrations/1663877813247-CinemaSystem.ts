import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Movies table
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'title', type: 'varchar' },
          { name: 'duration', type: 'integer' },
          { name: 'release_date', type: 'date' },
        ],
      }),
    );

    // Create Shows table
    await queryRunner.createTable(
      new Table({
        name: 'shows',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'movie_id', type: 'integer' },
          { name: 'start_time', type: 'timestamp' },
          { name: 'end_time', type: 'timestamp' },
          { name: 'is_booked_out', type: 'boolean', default: false },
        ],
      }),
    );

    // Create Showrooms table
    await queryRunner.createTable(
      new Table({
        name: 'showrooms',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'name', type: 'varchar' },
        ],
      }),
    );

    // Create CinemaOwners table
    await queryRunner.createTable(
      new Table({
        name: 'cinema_owners',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'name', type: 'varchar' },
        ],
      }),
    );

    // Create ShowPricing table
    await queryRunner.createTable(
      new Table({
        name: 'show_pricing',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'show_id', type: 'integer' },
          { name: 'cinema_owner_id', type: 'integer' },
          { name: 'price', type: 'decimal', precision: 10, scale: 2 },
        ],
      }),
    );

    // Create SeatTypes table
    await queryRunner.createTable(
      new Table({
        name: 'seat_types',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'name', type: 'varchar' },
          {
            name: 'premium_percentage',
            type: 'decimal',
            precision: 5,
            scale: 2,
          },
        ],
      }),
    );

    // Create Seats table
    await queryRunner.createTable(
      new Table({
        name: 'seats',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'showroom_id', type: 'integer' },
          { name: 'seat_type_id', type: 'integer' },
          { name: 'row_number', type: 'integer' },
          { name: 'seat_number', type: 'integer' },
          { name: 'is_available', type: 'boolean', default: true },
        ],
      }),
    );

    // Create Tickets table
    await queryRunner.createTable(
      new Table({
        name: 'tickets',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'show_id', type: 'integer' },
          { name: 'seat_id', type: 'integer' },
          { name: 'user_name', type: 'varchar' },
        ],
      }),
    );

    // Add foreign keys
    await queryRunner.createForeignKey(
      'shows',
      new TableForeignKey({
        columnNames: ['movie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'show_pricing',
      new TableForeignKey({
        columnNames: ['show_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shows',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'show_pricing',
      new TableForeignKey({
        columnNames: ['cinema_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cinema_owners',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'seats',
      new TableForeignKey({
        columnNames: ['showroom_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'showrooms',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'seats',
      new TableForeignKey({
        columnNames: ['seat_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seat_types',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tickets',
      new TableForeignKey({
        columnNames: ['show_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shows',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tickets',
      new TableForeignKey({
        columnNames: ['seat_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seats',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tickets');
    await queryRunner.dropTable('seats');
    await queryRunner.dropTable('seat_types');
    await queryRunner.dropTable('show_pricing');
    await queryRunner.dropTable('cinema_owners');
    await queryRunner.dropTable('showrooms');
    await queryRunner.dropTable('shows');
    await queryRunner.dropTable('movies');
  }
}
