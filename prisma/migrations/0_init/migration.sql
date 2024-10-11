-- CreateTable
CREATE TABLE "dummy_related"
(
    "id"             SERIAL      NOT NULL,
    "dummy_table_id" INTEGER     NOT NULL,
    "nickname"       VARCHAR(32) NOT NULL,

    CONSTRAINT "dummy_related_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "dummy_related_check_nickname" CHECK (TRIM("nickname") <> '')
);

-- CreateTable
CREATE TABLE "dummy_table"
(
    "id"   SERIAL      NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "age"  INTEGER     NOT NULL,

    CONSTRAINT "dummy_table_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "dummy_table_check_name" CHECK (TRIM("name") <> ''),
    CONSTRAINT "dummy_table_check_age" CHECK ("age" > 0 and "age" < 120)
);

-- CreateIndex
CREATE UNIQUE INDEX "dummy_related_nickname_u" ON "dummy_related" ("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "dummy_table_name_u" ON "dummy_table" ("name");

-- AddForeignKey
ALTER TABLE "dummy_related"
    ADD CONSTRAINT "dummy_table_fk" FOREIGN KEY ("dummy_table_id") REFERENCES "dummy_table" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

