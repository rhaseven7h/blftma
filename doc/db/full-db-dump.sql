-- noinspection SpellCheckingInspectionForFile

--
-- PostgreSQL database dump
--

-- Generated with:
-- pg_dump --host=localhost --username=blftma --password --inserts --column-inserts --clean blftma > full-db-dump.sql
-- Password used is 'blftma'

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP INDEX blftma.projects_name_uindex;
DROP INDEX blftma.assessments_project_id_year_quarter_uindex;
DROP INDEX blftma.accounts_name_uindex;
ALTER TABLE ONLY blftma.projects
    DROP CONSTRAINT projects_pk;
ALTER TABLE ONLY blftma.assessments
    DROP CONSTRAINT assessments_pk;
ALTER TABLE ONLY blftma.accounts
    DROP CONSTRAINT accounts_pk;
ALTER TABLE ONLY blftma._prisma_migrations
    DROP CONSTRAINT _prisma_migrations_pkey;
ALTER TABLE blftma.projects
    ALTER COLUMN id DROP DEFAULT;
ALTER TABLE blftma.assessments
    ALTER COLUMN id DROP DEFAULT;
ALTER TABLE blftma.accounts
    ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE blftma.projects_id_seq;
DROP TABLE blftma.projects;
DROP SEQUENCE blftma.assessments_id_seq;
DROP TABLE blftma.assessments;
DROP SEQUENCE blftma.accounts_id_seq;
DROP TABLE blftma.accounts;
DROP TABLE blftma._prisma_migrations;
DROP SCHEMA blftma;
--
-- Name: blftma; Type: SCHEMA; Schema: -; Owner: blftma
--

CREATE SCHEMA blftma;


ALTER SCHEMA blftma OWNER TO blftma;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: blftma; Owner: blftma
--

CREATE TABLE blftma._prisma_migrations
(
    id                  character varying(36)                  NOT NULL,
    checksum            character varying(64)                  NOT NULL,
    finished_at         timestamp with time zone,
    migration_name      character varying(255)                 NOT NULL,
    logs                text,
    rolled_back_at      timestamp with time zone,
    started_at          timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer                  DEFAULT 0     NOT NULL
);


ALTER TABLE blftma._prisma_migrations
    OWNER TO blftma;

--
-- Name: accounts; Type: TABLE; Schema: blftma; Owner: blftma
--

CREATE TABLE blftma.accounts
(
    id   integer                NOT NULL,
    name character varying(128) NOT NULL,
    CONSTRAINT check_name CHECK ((length(TRIM(BOTH FROM name)) > 0))
);


ALTER TABLE blftma.accounts
    OWNER TO blftma;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: blftma; Owner: blftma
--

CREATE SEQUENCE blftma.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE blftma.accounts_id_seq
    OWNER TO blftma;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: blftma; Owner: blftma
--

ALTER SEQUENCE blftma.accounts_id_seq OWNED BY blftma.accounts.id;


--
-- Name: assessments; Type: TABLE; Schema: blftma; Owner: blftma
--

CREATE TABLE blftma.assessments
(
    id               integer NOT NULL,
    project_id       integer NOT NULL,
    year             integer NOT NULL,
    quarter          integer NOT NULL,
    level_initial    integer NOT NULL,
    level_managed    integer NOT NULL,
    level_defined    integer NOT NULL,
    level_measured   integer NOT NULL,
    level_optimizing integer NOT NULL,
    CONSTRAINT check_level_defined CHECK (((level_defined >= 1) AND (level_defined <= 5))),
    CONSTRAINT check_level_initial CHECK (((level_initial >= 1) AND (level_initial <= 5))),
    CONSTRAINT check_level_managed CHECK (((level_managed >= 1) AND (level_managed <= 5))),
    CONSTRAINT check_level_measured CHECK (((level_measured >= 1) AND (level_measured <= 5))),
    CONSTRAINT check_level_optimizing CHECK (((level_optimizing >= 1) AND (level_optimizing <= 5))),
    CONSTRAINT check_quarter CHECK (((quarter >= 1) AND (quarter <= 4))),
    CONSTRAINT check_year CHECK (((year >= 2020) AND (year <= 2099)))
);


ALTER TABLE blftma.assessments
    OWNER TO blftma;

--
-- Name: assessments_id_seq; Type: SEQUENCE; Schema: blftma; Owner: blftma
--

CREATE SEQUENCE blftma.assessments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE blftma.assessments_id_seq
    OWNER TO blftma;

--
-- Name: assessments_id_seq; Type: SEQUENCE OWNED BY; Schema: blftma; Owner: blftma
--

ALTER SEQUENCE blftma.assessments_id_seq OWNED BY blftma.assessments.id;


--
-- Name: projects; Type: TABLE; Schema: blftma; Owner: blftma
--

CREATE TABLE blftma.projects
(
    id          integer                NOT NULL,
    account_id  integer                NOT NULL,
    name        character varying(128) NOT NULL,
    owner_name  character varying(128) NOT NULL,
    owner_email character varying(128) NOT NULL,
    CONSTRAINT check_name CHECK ((length(TRIM(BOTH FROM name)) > 0)),
    CONSTRAINT check_owner_email CHECK ((length(TRIM(BOTH FROM owner_email)) > 0)),
    CONSTRAINT check_owner_name CHECK ((length(TRIM(BOTH FROM owner_name)) > 0))
);


ALTER TABLE blftma.projects
    OWNER TO blftma;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: blftma; Owner: blftma
--

CREATE SEQUENCE blftma.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE blftma.projects_id_seq
    OWNER TO blftma;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: blftma; Owner: blftma
--

ALTER SEQUENCE blftma.projects_id_seq OWNED BY blftma.projects.id;


--
-- Name: accounts id; Type: DEFAULT; Schema: blftma; Owner: blftma
--

ALTER TABLE ONLY blftma.accounts
    ALTER COLUMN id SET DEFAULT nextval('blftma.accounts_id_seq'::regclass);


--
-- Name: assessments id; Type: DEFAULT; Schema: blftma; Owner: blftma
--

ALTER TABLE ONLY blftma.assessments
    ALTER COLUMN id SET DEFAULT nextval('blftma.assessments_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: blftma; Owner: blftma
--

ALTER TABLE ONLY blftma.projects
    ALTER COLUMN id SET DEFAULT nextval('blftma.projects_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: blftma; Owner: blftma
--

INSERT INTO blftma._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at,
                                       applied_steps_count)
VALUES ('114604f8-afd7-4f88-a296-816808ebd064', 'dbac403d4d154153ed7280ecb57389e801297d113581f83e041ae4dbe721af73',
        '2024-10-12 18:22:53.714198-06', '0_init', '', NULL, '2024-10-12 18:22:53.714198-06', 0);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: blftma; Owner: blftma
--

INSERT INTO blftma.accounts (id, name)
VALUES (1, 'Okuneva Group');
INSERT INTO blftma.accounts (id, name)
VALUES (2, 'Fay Inc');
INSERT INTO blftma.accounts (id, name)
VALUES (3, 'Rippin - Volkman');
INSERT INTO blftma.accounts (id, name)
VALUES (4, 'Friesen, Kohler and Homenick');
INSERT INTO blftma.accounts (id, name)
VALUES (5, 'Donnelly - Kiehn');
INSERT INTO blftma.accounts (id, name)
VALUES (6, 'Lemke Group');
INSERT INTO blftma.accounts (id, name)
VALUES (7, 'Nienow - Denesik');
INSERT INTO blftma.accounts (id, name)
VALUES (8, 'Brekke LLC');
INSERT INTO blftma.accounts (id, name)
VALUES (9, 'Medhurst LLC');
INSERT INTO blftma.accounts (id, name)
VALUES (10, 'Waters Group');
INSERT INTO blftma.accounts (id, name)
VALUES (11, 'Ritchie - Abbott');
INSERT INTO blftma.accounts (id, name)
VALUES (12, 'Nolan and Sons');


--
-- Data for Name: assessments; Type: TABLE DATA; Schema: blftma; Owner: blftma
--

INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (1, 1, 2024, 1, 1, 1, 5, 3, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (2, 2, 2024, 1, 1, 1, 2, 3, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (3, 3, 2024, 1, 4, 1, 2, 4, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (4, 4, 2024, 1, 4, 2, 3, 3, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (5, 5, 2024, 1, 4, 4, 1, 4, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (6, 6, 2024, 1, 4, 4, 4, 2, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (7, 7, 2024, 1, 1, 2, 5, 3, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (8, 8, 2024, 1, 3, 2, 3, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (9, 9, 2024, 1, 3, 5, 3, 1, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (10, 10, 2024, 1, 4, 5, 1, 2, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (11, 11, 2024, 1, 1, 5, 5, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (12, 12, 2024, 1, 3, 2, 2, 5, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (13, 13, 2024, 1, 4, 4, 3, 5, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (14, 14, 2024, 1, 5, 1, 3, 1, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (15, 15, 2024, 1, 4, 4, 2, 2, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (16, 16, 2024, 1, 3, 1, 5, 4, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (17, 17, 2024, 1, 1, 5, 3, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (18, 18, 2024, 1, 3, 5, 4, 2, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (19, 19, 2024, 1, 3, 1, 3, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (20, 20, 2024, 1, 3, 3, 5, 5, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (21, 21, 2024, 1, 2, 5, 4, 2, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (22, 22, 2024, 1, 4, 1, 2, 4, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (23, 23, 2024, 1, 3, 4, 3, 3, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (24, 24, 2024, 1, 5, 3, 2, 3, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (25, 25, 2024, 1, 5, 2, 4, 1, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (26, 26, 2024, 1, 1, 2, 4, 4, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (27, 27, 2024, 1, 2, 2, 5, 4, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (28, 28, 2024, 1, 5, 2, 2, 3, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (29, 29, 2024, 1, 1, 2, 4, 1, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (30, 30, 2024, 1, 2, 4, 5, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (31, 31, 2024, 1, 4, 4, 2, 1, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (32, 32, 2024, 1, 4, 1, 3, 2, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (33, 33, 2024, 1, 2, 5, 3, 3, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (34, 34, 2024, 1, 1, 5, 1, 1, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (35, 35, 2024, 1, 4, 3, 4, 3, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (36, 36, 2024, 1, 5, 3, 2, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (37, 1, 2024, 2, 3, 1, 3, 3, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (38, 2, 2024, 2, 3, 1, 2, 2, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (39, 3, 2024, 2, 4, 2, 2, 3, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (40, 4, 2024, 2, 3, 2, 3, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (41, 5, 2024, 2, 5, 1, 2, 4, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (42, 6, 2024, 2, 5, 4, 1, 1, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (43, 7, 2024, 2, 2, 3, 1, 4, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (44, 8, 2024, 2, 3, 3, 3, 1, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (45, 9, 2024, 2, 2, 3, 5, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (46, 10, 2024, 2, 1, 2, 4, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (47, 11, 2024, 2, 1, 3, 3, 2, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (48, 12, 2024, 2, 2, 4, 3, 3, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (49, 13, 2024, 2, 2, 2, 3, 2, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (50, 14, 2024, 2, 2, 1, 3, 4, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (51, 15, 2024, 2, 2, 1, 3, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (52, 16, 2024, 2, 4, 4, 4, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (53, 17, 2024, 2, 4, 1, 4, 4, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (54, 18, 2024, 2, 2, 4, 1, 2, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (55, 19, 2024, 2, 3, 1, 2, 1, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (56, 20, 2024, 2, 5, 2, 1, 4, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (57, 21, 2024, 2, 4, 3, 2, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (58, 22, 2024, 2, 2, 4, 2, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (59, 23, 2024, 2, 4, 1, 4, 2, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (60, 24, 2024, 2, 4, 5, 5, 2, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (61, 25, 2024, 2, 5, 3, 5, 3, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (62, 26, 2024, 2, 4, 2, 5, 4, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (63, 27, 2024, 2, 3, 2, 4, 5, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (64, 28, 2024, 2, 4, 1, 2, 1, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (65, 29, 2024, 2, 3, 1, 3, 1, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (66, 30, 2024, 2, 2, 4, 4, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (67, 31, 2024, 2, 2, 5, 4, 3, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (68, 32, 2024, 2, 4, 5, 5, 5, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (69, 33, 2024, 2, 2, 5, 4, 2, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (70, 34, 2024, 2, 4, 4, 5, 2, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (71, 35, 2024, 2, 2, 4, 5, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (72, 36, 2024, 2, 4, 1, 2, 1, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (73, 1, 2024, 3, 5, 4, 1, 4, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (74, 2, 2024, 3, 3, 3, 3, 4, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (75, 3, 2024, 3, 3, 2, 1, 4, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (76, 4, 2024, 3, 5, 4, 4, 3, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (77, 5, 2024, 3, 4, 3, 3, 1, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (78, 6, 2024, 3, 2, 2, 4, 3, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (79, 7, 2024, 3, 4, 1, 3, 5, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (80, 8, 2024, 3, 3, 3, 4, 2, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (81, 9, 2024, 3, 4, 4, 5, 4, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (82, 10, 2024, 3, 3, 2, 4, 5, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (83, 11, 2024, 3, 1, 4, 4, 4, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (84, 12, 2024, 3, 2, 5, 3, 4, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (85, 13, 2024, 3, 2, 5, 4, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (86, 14, 2024, 3, 2, 2, 3, 3, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (87, 15, 2024, 3, 1, 1, 1, 2, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (88, 16, 2024, 3, 3, 4, 3, 3, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (89, 17, 2024, 3, 2, 5, 4, 5, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (90, 18, 2024, 3, 5, 4, 5, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (91, 19, 2024, 3, 5, 4, 2, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (92, 20, 2024, 3, 2, 3, 3, 3, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (93, 21, 2024, 3, 2, 4, 4, 3, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (94, 22, 2024, 3, 3, 5, 5, 2, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (95, 23, 2024, 3, 4, 4, 4, 3, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (96, 24, 2024, 3, 3, 5, 2, 1, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (97, 25, 2024, 3, 5, 4, 3, 1, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (98, 26, 2024, 3, 1, 4, 3, 5, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (99, 27, 2024, 3, 2, 3, 2, 3, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (100, 28, 2024, 3, 2, 3, 5, 4, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (101, 29, 2024, 3, 5, 1, 4, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (102, 30, 2024, 3, 3, 2, 3, 2, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (103, 31, 2024, 3, 5, 2, 5, 3, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (104, 32, 2024, 3, 4, 2, 4, 4, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (105, 33, 2024, 3, 2, 1, 3, 4, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (106, 34, 2024, 3, 1, 2, 4, 2, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (107, 35, 2024, 3, 5, 2, 2, 1, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (108, 36, 2024, 3, 4, 2, 5, 3, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (109, 1, 2024, 4, 4, 5, 2, 5, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (110, 2, 2024, 4, 3, 2, 3, 2, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (111, 3, 2024, 4, 4, 1, 1, 1, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (112, 4, 2024, 4, 1, 1, 2, 4, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (113, 5, 2024, 4, 3, 3, 1, 5, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (114, 6, 2024, 4, 1, 3, 1, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (115, 7, 2024, 4, 4, 3, 2, 1, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (116, 8, 2024, 4, 1, 5, 5, 4, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (117, 9, 2024, 4, 3, 3, 3, 1, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (118, 10, 2024, 4, 2, 5, 3, 5, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (119, 11, 2024, 4, 2, 1, 5, 4, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (120, 12, 2024, 4, 3, 3, 1, 5, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (121, 13, 2024, 4, 3, 2, 1, 3, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (122, 14, 2024, 4, 2, 5, 4, 4, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (123, 15, 2024, 4, 3, 5, 4, 5, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (124, 16, 2024, 4, 5, 3, 5, 4, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (125, 17, 2024, 4, 2, 1, 1, 2, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (126, 18, 2024, 4, 1, 2, 5, 2, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (127, 19, 2024, 4, 4, 5, 2, 3, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (128, 20, 2024, 4, 5, 5, 3, 2, 1);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (129, 21, 2024, 4, 5, 2, 5, 2, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (130, 22, 2024, 4, 1, 4, 4, 5, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (131, 23, 2024, 4, 4, 3, 1, 1, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (132, 24, 2024, 4, 3, 2, 1, 1, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (133, 25, 2024, 4, 2, 2, 2, 3, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (134, 26, 2024, 4, 1, 3, 2, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (135, 27, 2024, 4, 1, 1, 5, 1, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (136, 28, 2024, 4, 2, 3, 5, 2, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (137, 29, 2024, 4, 1, 5, 5, 5, 4);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (138, 30, 2024, 4, 2, 3, 1, 5, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (139, 31, 2024, 4, 3, 1, 1, 2, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (140, 32, 2024, 4, 5, 3, 1, 4, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (141, 33, 2024, 4, 1, 1, 3, 3, 3);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (142, 34, 2024, 4, 4, 3, 2, 3, 5);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (143, 35, 2024, 4, 3, 5, 1, 4, 2);
INSERT INTO blftma.assessments (id, project_id, year, quarter, level_initial, level_managed, level_defined,
                                level_measured, level_optimizing)
VALUES (144, 36, 2024, 4, 1, 3, 4, 1, 5);


--
-- Data for Name: projects; Type: TABLE DATA; Schema: blftma; Owner: blftma
--

INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (1, 11, 'Progressive directional firmware', 'Heather Crona', 'heather_crona11@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (2, 3, 'Synchronised client-driven contingency', 'Payton Blick', 'payton_blick87@yahoo.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (3, 6, 'Down-sized eco-centric concept', 'Sallie Powlowski', 'sallie_powlowski6@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (4, 9, 'Object-based zero defect budgetary management', 'Else Wuckert-Bashirian',
        'else_wuckert-bashirian4@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (5, 1, 'Stand-alone regional time-frame', 'Opal Kirlin', 'opal.kirlin33@yahoo.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (6, 12, 'Proactive fresh-thinking pricing structure', 'Mohammed Flatley', 'mohammed_flatley54@yahoo.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (7, 7, 'Distributed multi-tasking moderator', 'Felix Stanton', 'felix.stanton@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (8, 8, 'Reactive multimedia contingency', 'Alfreda Rogahn', 'alfreda.rogahn21@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (9, 8, 'Customer-focused dedicated leverage', 'Josh Heller', 'josh_heller@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (10, 4, 'Networked zero tolerance archive', 'Melvina Hickle', 'melvina_hickle94@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (11, 3, 'Inverse content-based superstructure', 'Erwin Hane', 'erwin_hane92@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (12, 1, 'Reduced intermediate framework', 'Vernon Bins', 'vernon_bins85@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (13, 4, 'Integrated multi-state alliance', 'Savanna Harber', 'savanna.harber78@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (14, 5, 'Proactive full-range portal', 'Merlin Hackett', 'merlin_hackett@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (15, 1, 'User-friendly 24 hour portal', 'Jed Lemke', 'jed_lemke14@yahoo.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (16, 3, 'Optional cohesive hub', 'Preston Williamson', 'preston_williamson92@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (17, 8, 'Object-based asynchronous standardization', 'Eva Langosh', 'eva.langosh@yahoo.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (18, 10, 'Persevering intermediate function', 'Jaeden Heathcote', 'jaeden_heathcote@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (19, 4, 'Innovative zero tolerance initiative', 'Mike Borer', 'mike_borer@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (20, 4, 'Automated fresh-thinking adapter', 'Lolita Kuhn', 'lolita.kuhn6@yahoo.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (21, 7, 'Optimized tertiary workforce', 'Charlene Lakin', 'charlene.lakin86@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (22, 1, 'Synchronised explicit throughput', 'Earline Treutel', 'earline_treutel@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (23, 2, 'Persevering mission-critical database', 'Eleazar Ruecker', 'eleazar.ruecker@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (24, 4, 'Profound executive protocol', 'Barton Batz', 'barton.batz37@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (25, 2, 'Diverse multi-state policy', 'Ottilie Emard', 'ottilie_emard@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (26, 3, 'Sharable heuristic process improvement', 'Angela Durgan', 'angela_durgan21@yahoo.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (27, 5, 'Customizable zero administration installation', 'Durward Skiles', 'durward.skiles@yahoo.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (28, 5, 'Front-line context-sensitive conglomeration', 'Meggie Wilderman', 'meggie.wilderman@yahoo.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (29, 7, 'Switchable systematic contingency', 'Jane Kihn', 'jane_kihn30@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (30, 2, 'Organized dedicated challenge', 'America Klocko', 'america.klocko@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (31, 10, 'Progressive modular capability', 'Luna Considine', 'luna.considine1@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (32, 1, 'Right-sized needs-based help-desk', 'Dax Kshlerin', 'dax_kshlerin@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (33, 8, 'Organized 24 hour workforce', 'Charlie Blick', 'charlie_blick95@hotmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (34, 8, 'Persistent directional benchmark', 'Consuelo Batz', 'consuelo_batz43@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (35, 3, 'Public-key exuding definition', 'Wellington Grant', 'wellington_grant10@gmail.com');
INSERT INTO blftma.projects (id, account_id, name, owner_name, owner_email)
VALUES (36, 3, 'Inverse well-modulated toolset', 'Trever Schmeler', 'trever.schmeler59@yahoo.com');


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: blftma; Owner: blftma
--

SELECT pg_catalog.setval('blftma.accounts_id_seq', 12, true);


--
-- Name: assessments_id_seq; Type: SEQUENCE SET; Schema: blftma; Owner: blftma
--

SELECT pg_catalog.setval('blftma.assessments_id_seq', 144, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: blftma; Owner: blftma
--

SELECT pg_catalog.setval('blftma.projects_id_seq', 36, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: blftma; Owner: blftma
--

ALTER TABLE ONLY blftma._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_pk; Type: CONSTRAINT; Schema: blftma; Owner: blftma
--

ALTER TABLE ONLY blftma.accounts
    ADD CONSTRAINT accounts_pk PRIMARY KEY (id);


--
-- Name: assessments assessments_pk; Type: CONSTRAINT; Schema: blftma; Owner: blftma
--

ALTER TABLE ONLY blftma.assessments
    ADD CONSTRAINT assessments_pk PRIMARY KEY (id);


--
-- Name: projects projects_pk; Type: CONSTRAINT; Schema: blftma; Owner: blftma
--

ALTER TABLE ONLY blftma.projects
    ADD CONSTRAINT projects_pk PRIMARY KEY (id);


--
-- Name: accounts_name_uindex; Type: INDEX; Schema: blftma; Owner: blftma
--

CREATE UNIQUE INDEX accounts_name_uindex ON blftma.accounts USING btree (name);


--
-- Name: assessments_project_id_year_quarter_uindex; Type: INDEX; Schema: blftma; Owner: blftma
--

CREATE UNIQUE INDEX assessments_project_id_year_quarter_uindex ON blftma.assessments USING btree (project_id DESC, year DESC, quarter DESC);


--
-- Name: projects_name_uindex; Type: INDEX; Schema: blftma; Owner: blftma
--

CREATE UNIQUE INDEX projects_name_uindex ON blftma.projects USING btree (name);


--
-- PostgreSQL database dump complete
--

