import {
  type Master, type InsertMaster,
  type Student, type InsertStudent,
  type Parent, type InsertParent,
  type Class, type InsertClass,
  type Booking, type InsertBooking,
  type Tournament, type InsertTournament,
  type TournamentRegistration, type InsertTournamentRegistration,
  type Review, type InsertReview,
  type User, type InsertUser,
  masters, students, parents, classes, bookings, tournaments, tournamentRegistrations, reviews, users
} from "@shared/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export interface IStorage {
  getMasters(): Promise<Master[]>;
  getMaster(id: string): Promise<Master | undefined>;
  createMaster(master: InsertMaster): Promise<Master>;

  getStudents(): Promise<Student[]>;
  getStudent(id: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;

  getParents(): Promise<Parent[]>;
  getParent(id: string): Promise<Parent | undefined>;
  createParent(parent: InsertParent): Promise<Parent>;

  getClasses(): Promise<Class[]>;
  getClassesByMaster(masterId: string): Promise<Class[]>;
  getClass(id: string): Promise<Class | undefined>;
  createClass(cls: InsertClass): Promise<Class>;

  getBookings(): Promise<Booking[]>;
  getBookingsByStudent(studentId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;

  getTournaments(): Promise<Tournament[]>;
  getTournament(id: string): Promise<Tournament | undefined>;
  createTournament(tournament: InsertTournament): Promise<Tournament>;

  getTournamentRegistrations(tournamentId: string): Promise<TournamentRegistration[]>;
  createTournamentRegistration(reg: InsertTournamentRegistration): Promise<TournamentRegistration>;

  getReviews(masterId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getMasters(): Promise<Master[]> {
    return db.select().from(masters);
  }

  async getMaster(id: string): Promise<Master | undefined> {
    const [master] = await db.select().from(masters).where(eq(masters.id, id));
    return master;
  }

  async createMaster(master: InsertMaster): Promise<Master> {
    const [created] = await db.insert(masters).values(master).returning();
    return created;
  }

  async getStudents(): Promise<Student[]> {
    return db.select().from(students);
  }

  async getStudent(id: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student;
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    const [created] = await db.insert(students).values(student).returning();
    return created;
  }

  async getParents(): Promise<Parent[]> {
    return db.select().from(parents);
  }

  async getParent(id: string): Promise<Parent | undefined> {
    const [parent] = await db.select().from(parents).where(eq(parents.id, id));
    return parent;
  }

  async createParent(parent: InsertParent): Promise<Parent> {
    const [created] = await db.insert(parents).values(parent).returning();
    return created;
  }

  async getClasses(): Promise<Class[]> {
    return db.select().from(classes);
  }

  async getClassesByMaster(masterId: string): Promise<Class[]> {
    return db.select().from(classes).where(eq(classes.masterId, masterId));
  }

  async getClass(id: string): Promise<Class | undefined> {
    const [cls] = await db.select().from(classes).where(eq(classes.id, id));
    return cls;
  }

  async createClass(cls: InsertClass): Promise<Class> {
    const [created] = await db.insert(classes).values(cls).returning();
    return created;
  }

  async getBookings(): Promise<Booking[]> {
    return db.select().from(bookings);
  }

  async getBookingsByStudent(studentId: string): Promise<Booking[]> {
    return db.select().from(bookings).where(eq(bookings.studentId, studentId));
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [created] = await db.insert(bookings).values(booking).returning();
    return created;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const [updated] = await db.update(bookings).set({ status: status as any }).where(eq(bookings.id, id)).returning();
    return updated;
  }

  async getTournaments(): Promise<Tournament[]> {
    return db.select().from(tournaments);
  }

  async getTournament(id: string): Promise<Tournament | undefined> {
    const [tournament] = await db.select().from(tournaments).where(eq(tournaments.id, id));
    return tournament;
  }

  async createTournament(tournament: InsertTournament): Promise<Tournament> {
    const [created] = await db.insert(tournaments).values(tournament).returning();
    return created;
  }

  async getTournamentRegistrations(tournamentId: string): Promise<TournamentRegistration[]> {
    return db.select().from(tournamentRegistrations).where(eq(tournamentRegistrations.tournamentId, tournamentId));
  }

  async createTournamentRegistration(reg: InsertTournamentRegistration): Promise<TournamentRegistration> {
    const [created] = await db.insert(tournamentRegistrations).values(reg).returning();
    return created;
  }

  async getReviews(masterId: string): Promise<Review[]> {
    return db.select().from(reviews).where(eq(reviews.masterId, masterId));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [created] = await db.insert(reviews).values(review).returning();
    return created;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
}

export const storage = new DatabaseStorage();
