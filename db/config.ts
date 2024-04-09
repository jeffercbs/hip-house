import { column, defineDb, defineTable } from "astro:db";

const Reserve = defineTable({
  columns: {
    reserve_id: column.text({ unique: true, primaryKey: true }),
    reserve_date: column.date(),
    reserve_time: column.text(),
    reserve_status: column.text({ default: "ACTIVE" }),
    visitor_name: column.text(),
    visitor_dni: column.number(),
    visitor_email: column.text(),
    visitor_phone: column.text(),
  },
});

const User = defineTable({
  columns: {
    user_id: column.text({ unique: true, primaryKey: true }),
    user_role: column.text({ default: "client" }),
    user_picture: column.text({ optional: true }),
    user_name: column.text(),
    user_email: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Reserve,
    User,
  },
});
