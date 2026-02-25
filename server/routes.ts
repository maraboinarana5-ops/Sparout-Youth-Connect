import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMasterSchema, insertStudentSchema, insertParentSchema, insertClassSchema, insertBookingSchema, insertTournamentSchema, insertTournamentRegistrationSchema, insertReviewSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/masters", async (_req, res) => {
    const masters = await storage.getMasters();
    res.json(masters);
  });

  app.get("/api/masters/:id", async (req, res) => {
    const master = await storage.getMaster(req.params.id);
    if (!master) return res.status(404).json({ message: "Master not found" });
    res.json(master);
  });

  app.post("/api/masters", async (req, res) => {
    const parsed = insertMasterSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
    const master = await storage.createMaster(parsed.data);
    res.status(201).json(master);
  });

  app.get("/api/students", async (_req, res) => {
    const students = await storage.getStudents();
    res.json(students);
  });

  app.get("/api/students/:id", async (req, res) => {
    const student = await storage.getStudent(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  });

  app.post("/api/students", async (req, res) => {
    const parsed = insertStudentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
    const student = await storage.createStudent(parsed.data);
    res.status(201).json(student);
  });

  app.get("/api/parents", async (_req, res) => {
    const parents = await storage.getParents();
    res.json(parents);
  });

  app.post("/api/parents", async (req, res) => {
    const parsed = insertParentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
    const parent = await storage.createParent(parsed.data);
    res.status(201).json(parent);
  });

  app.get("/api/classes", async (_req, res) => {
    const allClasses = await storage.getClasses();
    res.json(allClasses);
  });

  app.get("/api/classes/master/:masterId", async (req, res) => {
    const cls = await storage.getClassesByMaster(req.params.masterId);
    res.json(cls);
  });

  app.get("/api/classes/:id", async (req, res) => {
    const cls = await storage.getClass(req.params.id);
    if (!cls) return res.status(404).json({ message: "Class not found" });
    res.json(cls);
  });

  app.post("/api/classes", async (req, res) => {
    const parsed = insertClassSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
    const cls = await storage.createClass(parsed.data);
    res.status(201).json(cls);
  });

  app.get("/api/bookings", async (_req, res) => {
    const allBookings = await storage.getBookings();
    res.json(allBookings);
  });

  app.post("/api/bookings", async (req, res) => {
    const parsed = insertBookingSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
    const booking = await storage.createBooking(parsed.data);
    res.status(201).json(booking);
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status required" });
    const booking = await storage.updateBookingStatus(req.params.id, status);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  });

  app.get("/api/tournaments", async (_req, res) => {
    const allTournaments = await storage.getTournaments();
    res.json(allTournaments);
  });

  app.get("/api/tournaments/:id", async (req, res) => {
    const tournament = await storage.getTournament(req.params.id);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    res.json(tournament);
  });

  app.post("/api/tournaments", async (req, res) => {
    const parsed = insertTournamentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
    const tournament = await storage.createTournament(parsed.data);
    res.status(201).json(tournament);
  });

  app.get("/api/tournaments/:id/registrations", async (req, res) => {
    const regs = await storage.getTournamentRegistrations(req.params.id);
    res.json(regs);
  });

  app.post("/api/tournament-registrations", async (req, res) => {
    const parsed = insertTournamentRegistrationSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
    const reg = await storage.createTournamentRegistration(parsed.data);
    res.status(201).json(reg);
  });

  app.get("/api/reviews/:masterId", async (req, res) => {
    const allReviews = await storage.getReviews(req.params.masterId);
    res.json(allReviews);
  });

  app.post("/api/reviews", async (req, res) => {
    const parsed = insertReviewSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
    const review = await storage.createReview(parsed.data);
    res.status(201).json(review);
  });

  return httpServer;
}
