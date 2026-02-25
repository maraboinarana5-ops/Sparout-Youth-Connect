import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookingStatusEnum = pgEnum("booking_status", ["pending", "confirmed", "cancelled"]);
export const userRoleEnum = pgEnum("user_role", ["student", "master", "parent"]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").notNull().default("student"),
});

export const masters = pgTable("masters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  bio: text("bio"),
  photoUrl: text("photo_url"),
  martialArts: text("martial_arts").array().notNull(),
  yearsExperience: integer("years_experience").notNull().default(0),
  verified: boolean("verified").notNull().default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  pricePerClass: decimal("price_per_class", { precision: 8, scale: 2 }).notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  studentsCount: integer("students_count").default(0),
  winsCount: integer("wins_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  age: integer("age").notNull(),
  martialArt: text("martial_art").notNull(),
  beltRank: text("belt_rank").notNull(),
  goal: text("goal"),
  parentId: varchar("parent_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const parents = pgTable("parents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const classes = pgTable("classes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  masterId: varchar("master_id").notNull(),
  title: text("title").notNull(),
  martialArt: text("martial_art").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  durationMinutes: integer("duration_minutes").notNull().default(60),
  price: decimal("price", { precision: 8, scale: 2 }).notNull(),
  maxStudents: integer("max_students").notNull().default(10),
  spotsRemaining: integer("spots_remaining").notNull().default(10),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  classId: varchar("class_id").notNull(),
  status: bookingStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tournaments = pgTable("tournaments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  martialArt: text("martial_art").notNull(),
  ageMin: integer("age_min").notNull(),
  ageMax: integer("age_max").notNull(),
  date: text("date").notNull(),
  location: text("location").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  entryFee: decimal("entry_fee", { precision: 8, scale: 2 }).notNull(),
  maxParticipants: integer("max_participants").notNull(),
  spotsRemaining: integer("spots_remaining").notNull(),
  rules: text("rules"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tournamentRegistrations = pgTable("tournament_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tournamentId: varchar("tournament_id").notNull(),
  studentId: varchar("student_id").notNull(),
  weightClass: text("weight_class"),
  status: text("status").notNull().default("registered"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  masterId: varchar("master_id").notNull(),
  studentId: varchar("student_id").notNull(),
  studentName: text("student_name").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({ username: true, password: true, role: true });
export const insertMasterSchema = createInsertSchema(masters).omit({ id: true, createdAt: true });
export const insertStudentSchema = createInsertSchema(students).omit({ id: true, createdAt: true });
export const insertParentSchema = createInsertSchema(parents).omit({ id: true, createdAt: true });
export const insertClassSchema = createInsertSchema(classes).omit({ id: true, createdAt: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });
export const insertTournamentSchema = createInsertSchema(tournaments).omit({ id: true, createdAt: true });
export const insertTournamentRegistrationSchema = createInsertSchema(tournamentRegistrations).omit({ id: true, createdAt: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Master = typeof masters.$inferSelect;
export type InsertMaster = z.infer<typeof insertMasterSchema>;
export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Parent = typeof parents.$inferSelect;
export type InsertParent = z.infer<typeof insertParentSchema>;
export type Class = typeof classes.$inferSelect;
export type InsertClass = z.infer<typeof insertClassSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Tournament = typeof tournaments.$inferSelect;
export type InsertTournament = z.infer<typeof insertTournamentSchema>;
export type TournamentRegistration = typeof tournamentRegistrations.$inferSelect;
export type InsertTournamentRegistration = z.infer<typeof insertTournamentRegistrationSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
