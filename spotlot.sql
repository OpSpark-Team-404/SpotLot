CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "image_url" varchar(255),
  "bio" varchar(255),
  "name" varchar(64),
  "billing_info" varchar(150),
  "email" text UNIQUE,
  "google_token" text UNIQUE
);

CREATE TABLE "review" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "lot_id" int,
  "rating" int,
  "description" varchar(255)
);

CREATE TABLE "spot" (
  "id" SERIAL PRIMARY KEY,
  "lot_id" int,
  "user_id" int
);

CREATE TABLE "vehicle" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "make" varchar(25),
  "model" varchar(25),
  "license_plate" varchar(8),
  "color" varchar(25),
  "state" varchar(2)
);

CREATE TABLE "lot" (
  "id" SERIAL PRIMARY KEY,
  "owner_id" integer,
  "image_url" varchar,
  "price" integer,
  "longitude" integer,
  "latitude" integer,
  "is_open" boolean,
  "lot_close" timestamp,
  "max_reserve" timestamp,
  "max_spots" integer,
  "current_spots" integer,
  "description" varchar(255)
);

ALTER TABLE "spot" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "spot" ADD FOREIGN KEY ("lot_id") REFERENCES "lot" ("id");

ALTER TABLE "lot" ADD FOREIGN KEY ("owner_id") REFERENCES "user" ("id");

ALTER TABLE "vehicle" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "review" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "review" ADD FOREIGN KEY ("lot_id") REFERENCES "lot" ("id");
