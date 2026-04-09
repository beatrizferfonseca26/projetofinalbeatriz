Saloon — Beauty Appointment Management System

Web application for managing beauty salon appointments, services, staff, and inventory. Developed as a final course project.

Project Status

This project was developed using a private database that is not included in this repository. As a result:

Product data is not displayed
New user registration is disabled
Appointment persistence is limited
Some database-dependent features are not functional

The core architecture and application logic remain intact.

Links
Live Demo: https://projetofinalbeatriz.vercel.app/

Objectives

The application provides:

Appointment scheduling
Staff availability management
Client management
Service management
Inventory control
Payment tracking support
Role-based access control
Tech Stack
Next.js
React
TypeScript
Node.js
Prisma ORM
MySQL
NextAuth
CSS
User Roles

Client

Create appointments
Reschedule or cancel bookings
View appointment history

Staff

Manage appointments
View schedules

Administrator

Manage clients, staff, and services
Manage products and inventory
Configure availability
Full CRUD operations
Architecture Overview
Frontend: Next.js (App Router)
Backend: Next.js API routes
ORM: Prisma
Database: MySQL
Authentication: NextAuth
Deployment: Vercel
Known Limitations

Due to the absence of a public database:

Registration is disabled
Products are not populated
Some scheduling flows are inactive
Inventory validation is not functional

To enable full functionality, configure a database connection.
Future Improvements
Seed database for public demo
Email notification service
WhatsApp integration
Payment gateway integration
Dashboard analytics
Real-time availability
Automated testing
Docker support
Academic Context

Final course project developed in October 2025.
