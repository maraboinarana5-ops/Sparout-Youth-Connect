import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, pgEnum, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userRoleEnum = pgEnum("user_role", ["master", "student", "parent", "admin"]);
export const bookingStatusEnum = pgEnum("booking_status", ["pending", "confirmed", "completed", "cancelled"]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").notNull().default("student"),
  fullName: text("full_name").notNull(),
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const masterProfiles = pgTable("master_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  displayName: text("display_name").notNull(),
  username: text("username").notNull().unique(),
  bio: text("bio"),
  coverPhotoUrl: text("cover_photo_url"),
  photoUrl: text("photo_url"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull().default("India"),
  styles: text("styles").array().notNull(),
  experienceYears: integer("experience_years").notNull().default(0),
  certifications: text("certifications").array(),
  federationAffiliations: text("federation_affiliations").array(),
  trainingFormats: text("training_formats").array(),
  pricePerSession: decimal("price_per_session", { precision: 10, scale: 2 }),
  priceMonthly: decimal("price_monthly", { precision: 10, scale: 2 }),
  currency: text("currency").notNull().default("INR"),
  schedule: jsonb("schedule"),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  isVerified: boolean("is_verified").notNull().default(false),
  galleryUrls: text("gallery_urls").array(),
  gender: text("gender"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  studentsCount: integer("students_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const studentProfiles = pgTable("student_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  displayName: text("display_name").notNull(),
  username: text("username").notNull().unique(),
  bio: text("bio"),
  photoUrl: text("photo_url"),
  age: integer("age"),
  city: text("city"),
  state: text("state"),
  parentId: varchar("parent_id"),
  goals: text("goals"),
  profileCompleteness: integer("profile_completeness").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const martialArtsJourney = pgTable("martial_arts_journey", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  style: text("style").notNull(),
  startDate: text("start_date"),
  currentRank: text("current_rank"),
  achievements: jsonb("achievements"),
  certificateUrls: text("certificate_urls").array(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  masterId: varchar("master_id").notNull(),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  martialArt: text("martial_art"),
  message: text("message"),
  status: bookingStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  federationId: varchar("federation_id"),
  title: text("title").notNull(),
  description: text("description"),
  date: text("date").notNull(),
  endDate: text("end_date"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  martialArt: text("martial_art"),
  ageGroups: text("age_groups").array(),
  weightClasses: text("weight_classes").array(),
  registrationUrl: text("registration_url"),
  entryFee: text("entry_fee"),
  contactInfo: text("contact_info"),
  imageUrl: text("image_url"),
  createdBy: varchar("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const federations = pgTable("federations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  masterId: varchar("master_id").notNull(),
  bookingId: varchar("booking_id"),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  studentName: text("student_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  message: text("message"),
  isRead: boolean("is_read").notNull().default(false),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertMasterProfileSchema = createInsertSchema(masterProfiles).omit({ id: true, createdAt: true, updatedAt: true });
export const insertStudentProfileSchema = createInsertSchema(studentProfiles).omit({ id: true, createdAt: true, updatedAt: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true, updatedAt: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });
export const insertFederationSchema = createInsertSchema(federations).omit({ id: true, createdAt: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type MasterProfile = typeof masterProfiles.$inferSelect;
export type InsertMasterProfile = z.infer<typeof insertMasterProfileSchema>;
export type StudentProfile = typeof studentProfiles.$inferSelect;
export type InsertStudentProfile = z.infer<typeof insertStudentProfileSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Federation = typeof federations.$inferSelect;
export type InsertFederation = z.infer<typeof insertFederationSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type MartialArtsJourney = typeof martialArtsJourney.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
