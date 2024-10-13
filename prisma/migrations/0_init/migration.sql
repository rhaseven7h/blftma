CREATE TABLE accounts
(
    id   integer                NOT NULL,
    name character varying(128) NOT NULL,
    CONSTRAINT check_name CHECK ((length(TRIM(BOTH FROM name)) > 0))
);

CREATE SEQUENCE accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE assessments
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


CREATE SEQUENCE assessments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE projects
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


CREATE SEQUENCE projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY accounts
    ALTER COLUMN id SET DEFAULT nextval('blftma.accounts_id_seq'::regclass);

ALTER TABLE ONLY assessments
    ALTER COLUMN id SET DEFAULT nextval('blftma.assessments_id_seq'::regclass);

ALTER TABLE ONLY projects
    ALTER COLUMN id SET DEFAULT nextval('blftma.projects_id_seq'::regclass);

SELECT pg_catalog.setval('blftma.accounts_id_seq', 1, false);

SELECT pg_catalog.setval('blftma.assessments_id_seq', 1, false);

SELECT pg_catalog.setval('blftma.projects_id_seq', 1, false);

ALTER TABLE ONLY accounts
    ADD CONSTRAINT accounts_pk PRIMARY KEY (id);

ALTER TABLE ONLY assessments
    ADD CONSTRAINT assessments_pk PRIMARY KEY (id);

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_pk PRIMARY KEY (id);

CREATE UNIQUE INDEX accounts_name_uindex ON accounts USING btree (name);

CREATE UNIQUE INDEX assessments_project_id_year_quarter_uindex ON assessments USING btree (project_id DESC, year DESC, quarter DESC);

CREATE UNIQUE INDEX projects_name_uindex ON projects USING btree (name);
